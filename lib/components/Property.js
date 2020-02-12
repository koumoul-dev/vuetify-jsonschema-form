import SimpleField from './SimpleField'
import SelectIcon from './SelectIcon.vue'
import SelectItem from './SelectItem.vue'
import schemaUtils from '../utils/schema'
import ObjectContainer from '../mixins/ObjectContainer'
import DateProperty from '../mixins/DateProperty'
import SimpleProperty from '../mixins/SimpleProperty'
import ColorProperty from '../mixins/ColorProperty'
import SelectProperty from '../mixins/SelectProperty'
import Tooltip from '../mixins/Tooltip'
import Validatable from '../mixins/Validatable'

// TODO: do not require markdown-it, instead fetch it from context ?
// maybe optional, if not present only support raw text ?
const md = require('markdown-it')()

export default {
  name: 'Property',
  components: { SelectIcon, SelectItem, SimpleField },
  mixins: [ObjectContainer, SimpleProperty, DateProperty, ColorProperty, SelectProperty, Tooltip, Validatable],
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options', 'sectionDepth'],
  data() {
    return {
      ready: false,
      loading: false,
      // maintain vuetify1 compatibility without triggering warning on flat attribute for vuetify 2
      oldFlat: `
        background-color: none !important;
        border-color: none !important;
        `,
      md
    }
  },
  computed: {
    fullSchema() {
      return schemaUtils.prepareFullSchema(this.schema, this.modelWrapper, this.modelKey)
    },
    htmlDescription() {
      return (this.fullSchema && this.fullSchema.description) ? md.render(this.fullSchema.description) : null
    },
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    rules() {
      const fullSchema = this.fullSchema
      const rules = []
      if (this.required) {
        rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      }
      if (fullSchema.type === 'array' && fullSchema.minItems !== undefined) {
        rules.push((val) => (!val || val.length >= fullSchema.minItems) || '')
      }
      if (fullSchema.type === 'array' && fullSchema.maxItems !== undefined) {
        rules.push((val) => (!val || val.length <= fullSchema.maxItems) || '')
      }
      if (fullSchema.type === 'string' && fullSchema.minLength !== undefined) {
        rules.push((val) => (val === undefined || val === null || val.length >= fullSchema.minLength) || '')
      }
      if (fullSchema.type === 'string' && fullSchema.maxLength !== undefined) {
        rules.push((val) => (val === undefined || val === null || val.length <= fullSchema.maxLength) || '')
      }
      if (['number', 'integer'].includes(fullSchema.type) && fullSchema.maximum !== undefined) {
        rules.push((val) => (val === undefined || val === null || val <= fullSchema.maximum) || '')
      }
      if (['number', 'integer'].includes(fullSchema.type) && fullSchema.minimum !== undefined) {
        rules.push((val) => (val === undefined || val === null || val >= fullSchema.minimum) || '')
      }
      if (fullSchema.enum) {
        rules.push((val) => (val === undefined || val === null || !!fullSchema.enum.find(item => JSON.stringify(item) === JSON.stringify(val))) || '')
      }
      if (fullSchema.type === 'array' && fullSchema.items.enum) {
        rules.push((val) => (val === undefined || val === null || !val.find(valItem => !fullSchema.items.enum.find(item => JSON.stringify(item) === JSON.stringify(valItem)))) || '')
      }
      if (this.isOneOfSelect && fullSchema.type !== 'array') {
        rules.push((val) => (val === undefined || val === null || !!fullSchema.oneOf.find(item => item.const === val)) || '')
      }
      if (this.isOneOfSelect && fullSchema.type === 'array') {
        rules.push((val) => (val === undefined || val === null || !val.find(valItem => !fullSchema.items.oneOf.find(item => item.const === valItem))) || '')
      }
      return rules
    },
    disabled() {
      return this.options.disableAll
    },
    slotName() {
      return this.fullSchema['x-display'] && this.fullSchema['x-display'].startsWith('custom-') ? this.fullSchema['x-display'] : this.fullKey
    },
    slotParams() {
      return {
        modelWrapper: this.modelWrapper, modelKey: this.modelKey, fullSchema: this.fullSchema, fullKey: this.fullKey, label: this.label, disabled: this.disabled, required: this.required, rules: this.rules, options: this.options, htmlDescription: this.htmlDescription
      }
    },
    // props common to many vuetify fields
    commonFieldProps() {
      return {
        value: this.modelWrapper[this.modelKey],
        label: this.label,
        name: this.fullKey,
        disabled: this.disabled,
        rules: this.rules,
        required: this.required,
        ...this.fullSchema['x-props']
      }
    },
    propertyClass() {
      const cleanKey = this.fullKey.replace(/\./g, '-').replace(/[0-9]/g, '')
      return `vjsf-property vjsf-property-${cleanKey} xs12 ${this.fullSchema['x-class'] || ''}`
    },
    xSlots() {
      return { ...this.fullSchema['x-slots'] }
    }
  },
  watch: {
    fullSchema: {
      handler() {
        if (this.fullSchema && JSON.stringify(this.fullSchema) !== this.lastFullSchema) {
          this.lastFullSchema = JSON.stringify(this.fullSchema)
          // console.log('Schema changed', JSON.stringify(this.fullSchema))
          this.initFromSchema()
          this.cleanUpExtraProperties()
          this.applySubModels()
          this.ready = true
        }
      },
      immediate: true
    }
  },
  render(h) {
    // hide const ? Or make a readonly field ?
    if (!this.fullSchema || this.fullSchema.const !== undefined || this.fullSchema['x-display'] === 'hidden') return
    const mainChildren = this.renderDateProp(h) || this.renderColorProp(h) || this.renderSelectProp(h) || this.renderSimpleProp(h) || this.renderObjectContainer(h)
    if (this.$scopedSlots.default) console.log(this.$scopedSlots.default(this.slotParams))
    const children = []
    if (this.$scopedSlots.before) children.push(this.$scopedSlots.before(this.slotParams))
    else if (this.$slots.before) this.$slots.before.forEach(node => children.push(node))
    else if (this.xSlots.before) children.push(h('template', { domProps: { innerHTML: md.render(this.xSlots.before) } }))
    if (this.$scopedSlots.default) children.push(this.$scopedSlots.default(this.slotParams))
    else mainChildren.forEach(child => children.push(child))
    if (this.$scopedSlots.after) children.push(this.$scopedSlots.after(this.slotParams))
    else if (this.$slots.after) this.$slots.after.forEach(node => children.push(node))
    else if (this.xSlots.after) {
      children.push(h('div', { domProps: { innerHTML: md.render(this.xSlots.after) } }))
    }
    return h('v-flex', { class: this.propertyClass, style: this.fullSchema['x-style'] || '' }, children)
  },
  methods: {
    renderPropSlots(h) {
      const slots = []
      Object.keys(this.xSlots).forEach(slot => {
        slots.push(h('div', { slot, domProps: { innerHTML: md.render(this.xSlots[slot]) } }))
      })
      Object.keys(this.$slots).forEach(slot => {
        slots.push(h('template', { slot }, this.$slots[slot]))
      })
      return slots
    },
    change() {
      this.updateSelectItems()
      this.$emit('change', { key: this.fullKey.replace(/allOf-([0-9]+)\./g, ''), model: this.modelWrapper[this.modelKey] })
    },
    input(value) {
      // TODO: should disappera if we move to using v-model conventions
      this.modelWrapper[this.modelKey] = value
      this.$emit('input', { key: this.fullKey.replace(/allOf-([0-9]+)\./g, ''), model: this.modelWrapper[this.modelKey] })
    },
    defaultValue(schema) {
      if (schema.type === 'object' && !schema['x-fromUrl'] && !schema['x-fromData'] && !schema.enum) return {}
      if (schema.type === 'array') return []
      return null
    },
    cleanUpExtraProperties() {
      // cleanup extra properties
      if (
        this.fullSchema.type === 'object' &&
        (this.options.removeAdditionalProperties || this.fullSchema.additionalProperties === false) &&
        this.fullSchema.properties &&
        Object.keys(this.fullSchema.properties).length &&
        this.modelWrapper[this.modelKey]
      ) {
        Object.keys(this.modelWrapper[this.modelKey]).forEach(key => {
          if (!this.fullSchema.properties.find(p => p.key === key)) {
            // console.log(`Remove key ${this.modelKey}.${key}`)
            delete this.modelWrapper[this.modelKey][key]
          }
        })
      }
    },
    applySubModels() {
      // console.log('Apply sub models')
      Object.keys(this.subModels).forEach(subModel => {
        Object.keys(this.subModels[subModel]).forEach(key => {
          if (this.modelWrapper[this.modelKey][key] !== this.subModels[subModel][key]) {
            // console.log(`Apply submodel ${this.modelKey}.${key}`, JSON.stringify(this.subModels[subModel][key]))
            this.$set(this.modelWrapper[this.modelKey], key, this.subModels[subModel][key])
          }
        })
      })
    },
    initFromSchema() {
      // console.log('Init from schema')
      let model = this.modelWrapper[this.modelKey]

      // Manage default values
      if (model === undefined) {
        model = this.defaultValue(this.fullSchema)
        if (this.fullSchema.default !== undefined) model = JSON.parse(JSON.stringify(this.fullSchema.default))
      }
      // const always wins
      if (this.fullSchema.const !== undefined) model = this.fullSchema.const

      // color pickers do not like null values
      if (this.isColorProp) model = model || ''

      this.initSelectProp(model)
      this.initObjectContainer(model)

      // Cleanup arrays of empty items
      if (this.fullSchema.type === 'array') {
        model = model.filter(item => ![undefined, null].includes(item))
      }

      this.$set(this.modelWrapper, this.modelKey, model)
    }
  }
}
