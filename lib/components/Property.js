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

// TODO: do not require markdown-it, instead fetch it from context ?
// maybe optional, if not present only support raw text ?
const md = require('markdown-it')()

export default {
  name: 'Property',
  components: { SelectIcon, SelectItem, SimpleField },
  mixins: [ObjectContainer, SimpleProperty, DateProperty, ColorProperty, SelectProperty, Tooltip],
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options'],
  data() {
    return {
      ready: false,
      currentOneOf: null,
      showCurrentOneOf: true,
      loading: false,
      subModels: {}, // a container for objects from root oneOfs and allOfs
      // maintain vuetify1 compatibility without triggering warning on flat attribute for vuetify 2
      oldFlat: `
        background-color: none !important;
        border-color: none !important;
        `
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
    oneOfConstProp() {
      if (!this.fullSchema.oneOf) return
      const props = this.fullSchema.oneOf[0].properties
      const key = Object.keys(props).find(p => !!props[p].const)
      if (!key) return
      return { ...props[key], key, htmlDescription: md.render(props[key].description || '') }
    },
    oneOfRequired() {
      return !!(this.oneOfConstProp && this.fullSchema && this.fullSchema.required && this.fullSchema.required.find(r => r === this.oneOfConstProp.key))
    },
    oneOfRules() {
      const rules = []
      if (this.oneOfRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      return rules
    },
    slotName() {
      return this.fullSchema['x-display'] && this.fullSchema['x-display'].startsWith('custom-') ? this.fullSchema['x-display'] : this.fullKey
    },
    slotParams() {
      return {
        plots: { fullSchema: this.fullSchema, fullKey: this.fullKey, label: this.label, disabled: this.disabled, required: this.required, rules: this.rules, options: this.options, htmlDescription: this.htmlDescription }
      }
    },
    // props common to many vuetify fields
    commonFieldProps() {
      return {
        value: this.modelWrapper[this.modelKey], label: this.label, name: this.fullKey, disabled: this.disabled, rules: this.rules, required: this.required
      }
    },
    propertyClass() {
      const cleanKey = this.fullKey.replace(/\./g, '-').replace(/[0-9]/g, '')
      return `vjsf-property vjsf-property-${cleanKey} xs12 ${this.fullSchema['x-class'] || ''}`
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
    },
    currentOneOf(newVal, oldVal) {
      // use this boolean to force removing then re-creating the object property
      // base on the currentOneOf sub schema. If we don't the component is reused and reactivity creates some difficult bugs.
      this.showCurrentOneOf = false
      this.$nextTick(() => {
        this.showCurrentOneOf = true
        if (!this.currentOneOf) this.$set(this.subModels, 'currentOneOf', {})
        this.cleanUpExtraProperties()
      })
    },
    subModels: {
      handler() {
        this.cleanUpExtraProperties()
        this.applySubModels()
      },
      deep: true
    }
  },
  render(h) {
    // hide const ? Or make a readonly field ?
    if (!this.fullSchema || this.fullSchema.const !== undefined || this.fullSchema['x-display'] === 'hidden') return

    const mainChild = this.renderDateProp(h) || this.renderColorProp(h) || this.renderSelectProp(h) || this.renderSimpleProp(h) || this.renderObjectContainer(h)

    const beforeSlot = this.$scopedSlots[`before-${this.slotName}`]
    const mainSlot = this.$scopedSlots[this.slotName]
    const afterSlot = this.$scopedSlots[`after-${this.slotName}`]
    return h('v-flex', { class: this.propertyClass, style: this.fullSchema['x-style'] || '' }, [
      beforeSlot && beforeSlot(this.slotParams),
      mainSlot ? mainSlot(this.slotParams) : mainChild,
      afterSlot && afterSlot(this.slotParams)
    ])
  },
  methods: {
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

      // Init subModels for allOf subschemas
      if (this.fullSchema.type === 'object' && this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          this.$set(this.subModels, 'allOf-' + i, JSON.parse(JSON.stringify(model)))
        })
      }

      // Case of a sub type selection based on a oneOf
      this.currentOneOf = null
      if (this.fullSchema.type === 'object' && this.fullSchema.oneOf && !this.currentOneOf && this.oneOfConstProp) {
        if (model && model[this.oneOfConstProp.key]) {
          this.currentOneOf = this.fullSchema.oneOf.find(item => item.properties[this.oneOfConstProp.key].const === model[this.oneOfConstProp.key])
        } else if (this.fullSchema.default) {
          this.currentOneOf = this.fullSchema.oneOf.find(item => item.properties[this.oneOfConstProp.key].const === this.fullSchema.default[this.oneOfConstProp.key])
        }
      }

      // Init subModel for current oneOf
      if (this.currentOneOf) {
        this.$set(this.subModels, 'currentOneOf', JSON.parse(JSON.stringify(model)))
      } else {
        this.$set(this.subModels, 'currentOneOf', {})
      }

      // Cleanup arrays of empty items
      if (this.fullSchema.type === 'array') {
        model = model.filter(item => ![undefined, null].includes(item))
      }

      this.$set(this.modelWrapper, this.modelKey, model)
    }
  }
}
