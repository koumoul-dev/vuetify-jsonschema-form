import jrefs from './utils/json-refs'
import schemaUtils from './utils/schema'
import { defaultOptions, iconSets, localizedMessages, formats } from './utils/options'
import { getRules } from './utils/rules'
import ObjectContainer from './mixins/ObjectContainer'
import DateProperty from './mixins/DateProperty'
import SimpleProperty from './mixins/SimpleProperty'
import FileProperty from './mixins/FileProperty'
import ColorProperty from './mixins/ColorProperty'
import SelectProperty from './mixins/SelectProperty'
import EditableArray from './mixins/EditableArray'
import Tooltip from './mixins/Tooltip'
import Validatable from './mixins/Validatable'

export default {
  name: 'VJsf',
  // components,
  mixins: [ObjectContainer, SimpleProperty, DateProperty, ColorProperty, SelectProperty, FileProperty, EditableArray, Tooltip, Validatable],
  inject: ['theme'],
  props: {
    schema: { type: Object, required: true },
    value: { required: true },
    options: { type: Object },
    modelRoot: { type: Object },
    modelKey: { type: [String, Number], default: 'root' },
    parentKey: { type: String, default: '' },
    required: { type: Boolean, default: false },
    sectionDepth: { type: Number, default: 0 }
  },
  data() {
    return {
      ready: false,
      loading: false
    }
  },
  computed: {
    fullOptions() {
      const _global = (typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}
      const fullOptions = Object.assign({}, defaultOptions, this.options || {}, this.resolvedSchema['x-options'] || {})
      fullOptions.markdown = fullOptions.markdown || (_global.markdownit && (text => _global.markdownit(fullOptions.markdownit).render(text))) || ((text) => text)
      fullOptions.httpLib = fullOptions.httpLib || this.axios || this.$http || this.$axios || _global.axios
      const iconfont = (this.$vuetify.icons && this.$vuetify.icons.iconfont) || 'mdi'
      fullOptions.icons = { ...iconSets[iconfont], ...fullOptions.icons }
      fullOptions.messages = { ...(localizedMessages[fullOptions.locale] || localizedMessages.en), ...fullOptions.messages }
      fullOptions.formats = { ...formats, ...fullOptions.formats }
      if (fullOptions.deleteReadOnly) fullOptions.hideReadOnly = true
      return fullOptions
    },
    resolvedSchema() {
      if (this.modelKey === 'root') return jrefs.resolve(this.schema, { '~$locale~': (this.options && this.options.locale) || 'en' })
      else return this.schema
    },
    fullSchema() {
      return schemaUtils.prepareFullSchema(this.resolvedSchema, this.value)
    },
    htmlDescription() {
      return (this.fullSchema && this.fullSchema.description) ? this.fullOptions.markdown(this.fullSchema.description) : null
    },
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    display() { return this.modelKey === 'root' && this.fullOptions.rootDisplay ? this.fullOptions.rootDisplay : this.fullSchema['x-display'] },
    rules() {
      return getRules(this.fullSchema, this.fullOptions, this.required, this.isOneOfSelect)
    },
    disabled() {
      return this.fullOptions.disableAll || this.fullSchema.readOnly
    },
    slotName() {
      return this.fullSchema['x-display'] && this.fullSchema['x-display'].startsWith('custom-') ? this.fullSchema['x-display'] : this.fullKey
    },
    slotParams() {
      return {
        value: this.value,
        modelKey: this.modelKey,
        schema: this.schema,
        fullKey: this.fullKey,
        fullSchema: this.fullSchema,
        label: this.label,
        disabled: this.disabled,
        required: this.required,
        rules: this.rules,
        options: this.fullOptions,
        htmlDescription: this.htmlDescription,
        on: {
          input: (e) => this.input(e instanceof Event ? e.target.value : e),
          change: (e) => this.change(e)
        }
      }
    },
    dashKey() {
      return this.fullKey.replace(/\./g, '-')
    },
    // props common to many vuetify fields
    commonFieldProps() {
      return {
        value: this.value,
        inputValue: this.value,
        label: this.label,
        name: this.fullKey,
        id: this.fullOptions.idPrefix + this.dashKey,
        disabled: this.disabled,
        rules: this.rules,
        required: this.required,
        ...this.fullOptions.fieldProps,
        ...this.fullSchema['x-props']
      }
    },
    propertyClass() {
      return `vjsf-property vjsf-property-${this.dashKey} xs12 ${this.fullSchema['x-class'] || ''}`
    },
    xSlots() {
      return { ...this.fullSchema['x-slots'] }
    },
    formattedValue() {
      return this.value && this.fullSchema.format && this.fullOptions.formats[this.fullSchema.format] && this.fullOptions.formats[this.fullSchema.format](this.value, this.fullOptions.locale)
    }
  },
  watch: {
    fullSchema: {
      handler() {
        if (this.fullSchema && JSON.stringify(this.fullSchema) !== this.lastFullSchema) {
          this.lastFullSchema = JSON.stringify(this.fullSchema)
          // console.log('Schema changed', JSON.stringify(this.fullSchema))
          this.initFromSchema()
          this.fixProperties()
          this.ready = true
        }
      },
      immediate: true
    },
    value() {
      this.fixProperties()
    }
  },
  render(h) {
    // hide const ? Or make a readonly field ?
    if (!this.fullSchema || this.fullSchema.const !== undefined || this.display === 'hidden' || (this.fullSchema.readOnly && this.fullOptions.hideReadOnly)) {
      return
    }

    const children = []
    if (this.$scopedSlots.before) children.push(this.$scopedSlots.before(this.slotParams))
    else if (this.$slots.before) this.$slots.before.forEach(node => children.push(node))
    else if (this.xSlots.before) children.push(h('div', { domProps: { innerHTML: this.fullOptions.markdown(this.xSlots.before) } }))

    if (this.$scopedSlots.default) {
      children.push(this.$scopedSlots.default(this.slotParams))
    } else if (this.fullSchema['x-display'] && this.fullSchema['x-display'] && this.$scopedSlots[this.fullSchema['x-display']]) {
      children.push(this.$scopedSlots[this.fullSchema['x-display']](this.slotParams))
    } else {
      const mainChildren = this.renderDateProp(h) ||
        this.renderColorProp(h) ||
        this.renderSelectProp(h) ||
        this.renderFileProp(h) ||
        this.renderSimpleProp(h) ||
        this.renderObjectContainer(h) ||
        this.renderEditableArray(h) || []
      mainChildren.forEach(child => children.push(child))
    }

    if (this.$scopedSlots.after) children.push(this.$scopedSlots.after(this.slotParams))
    else if (this.$slots.after) this.$slots.after.forEach(node => children.push(node))
    else if (this.xSlots.after) {
      children.push(h('div', { domProps: { innerHTML: this.fullOptions.markdown(this.xSlots.after) } }))
    }

    return h('v-flex', { class: this.propertyClass, style: this.fullSchema['x-style'] || '' }, children)
  },
  methods: {
    renderPropSlots(h) {
      const slots = []
      Object.keys(this.xSlots).forEach(slot => {
        slots.push(h('div', { slot, domProps: { innerHTML: this.fullOptions.markdown(this.xSlots[slot]) } }))
      })
      Object.keys(this.$slots).forEach(slot => {
        slots.push(h('template', { slot }, this.$slots[slot]))
      })
      return slots
    },
    change() {
      this.updateSelectItems()
      this.$emit('change', this.value)
    },
    input(value) {
      this.$emit('input', value)
    },
    defaultValue(schema) {
      if (schema.type === 'object' && !schema['x-fromUrl'] && !schema['x-fromData'] && !schema.enum) return {}
      if (schema.type === 'array') return []
      return null
    },
    fixProperties() {
      if (this.fullSchema.type !== 'object') return

      // cleanup extra properties
      if (
        this.fullSchema.properties && this.fullSchema.properties.length &&
        (this.fullOptions.removeAdditionalProperties || this.fullSchema.additionalProperties === false) &&
        this.value
      ) {
        Object.keys(this.value).forEach(key => {
          if (!(this.fullSchema.properties || []).find(p => p.key === key)) {
            // console.log(`Remove key ${this.modelKey}.${key}`)
            this.$delete(this.value, key)
          }
        })
      }

      // apply submodels
      Object.keys(this.subModels).forEach(subModel => {
        Object.keys(this.subModels[subModel]).forEach(key => {
          if (this.value[key] !== this.subModels[subModel][key]) {
            // console.log(`Apply submodel ${this.modelKey}.${key}`, JSON.stringify(this.subModels[subModel][key]))
            this.$set(this.value, key, this.subModels[subModel][key])
          }
        })
      })
    },
    initFromSchema() {
      // console.log('Init from schema', this.modelKey)
      if (this.fullSchema.readOnly && this.fullOptions.deleteReadOnly) {
        return this.$emit('input', undefined)
      }
      let model = this.value
      if (this.fullSchema.type === 'object' && [undefined, null].includes(model) && !this.isSelectProp) {
        model = {}
      }
      // const always wins
      if (this.fullSchema.const !== undefined) model = this.fullSchema.const
      this.initSelectProp(model)
      this.initObjectContainer(model)
      // Cleanup arrays of empty items
      if (this.fullSchema.type === 'array') {
        model = model.filter(item => ![undefined, null].includes(item))
      }
      this.$emit('input', model)
    }
  }
}
