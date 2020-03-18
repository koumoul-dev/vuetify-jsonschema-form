import jrefs from './utils/json-refs'
import colors from './utils/colors'
import schemaUtils from './utils/schema'
import ObjectContainer from './mixins/ObjectContainer'
import DateProperty from './mixins/DateProperty'
import SimpleProperty from './mixins/SimpleProperty'
import ColorProperty from './mixins/ColorProperty'
import SelectProperty from './mixins/SelectProperty'
import EditableArray from './mixins/EditableArray'
import Tooltip from './mixins/Tooltip'
import Validatable from './mixins/Validatable'

const defaultOptions = {
  debug: false,
  disableAll: false,
  colors,
  autoFoldObjects: false,
  allOfTabs: false,
  requiredMessage: 'This information is required',
  noDataMessage: 'No matching value found',
  searchMessage: 'Search...',
  tabsMode: 'grow',
  locale: 'en',
  removeAdditionalProperties: true,
  maxDialogWidth: 500,
  formats: {
    time: (time) => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString()
    },
    date: (date) => {
      return new Date(date).toLocaleDateString()
    },
    'date-time': (dateTime) => {
      return new Date(dateTime).toLocaleString()
    }
  },
  sectionsClasses: 'pl-2',
  sectionsTitlesClasses: ['title', 'subtitle-1', 'subtitle-2']
}

const iconSets = {
  md: {
    calendar: 'event',
    clock: 'clock',
    info: 'info',
    dropdown: 'arrow_drop_down',
    dropup: 'arrow_drop_up',
    add: 'add',
    edit: 'create',
    reorder: 'reorder',
    delete: 'delete'
  },
  mdi: {
    calendar: 'mdi-calendar',
    clock: 'mdi-clock',
    info: 'mdi-information',
    dropdown: 'mdi-menu-down',
    dropup: 'mdi-menu-up',
    add: 'mdi-plus',
    edit: 'mdi-pencil',
    reorder: 'mdi-reorder-horizontal',
    delete: 'mdi-delete'
  }
}

export default {
  name: 'VJsf',
  // components,
  mixins: [ObjectContainer, SimpleProperty, DateProperty, ColorProperty, SelectProperty, EditableArray, Tooltip, Validatable],
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
      loading: false,
      // maintain vuetify1 compatibility without triggering warning on flat attribute for vuetify 2
      oldFlat: `
        background-color: none !important;
        border-color: none !important;
        `
    }
  },
  computed: {
    fullOptions() {
      const _global = (typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}
      const fullOptions = Object.assign({}, defaultOptions, this.options || {}, this.resolvedSchema['x-options'] || {})
      fullOptions.markdown = fullOptions.markdown || (_global.markdownit && (text => _global.markdownit().render(text))) || ((text) => text)
      fullOptions.httpLib = fullOptions.httpLib || this.axios || this.$http || this.$axios
      // we use the multi-themes functionality of vuetify2 as a clue of the version
      fullOptions.vuetifyVersion = fullOptions.vuetifyVersion || (this.$vuetify.theme.themes ? 2 : 1)
      // icons font is only variable in vuetify 2
      const iconfont = fullOptions.vuetifyVersion === 1 ? 'md' : ((this.$vuetify.icons && this.$vuetify.icons.iconfont) || 'mdi')
      const icons = iconSets[iconfont]
      fullOptions.icons = Object.assign(icons, fullOptions.icons || {})
      fullOptions.formats = Object.assign(defaultOptions.formats, fullOptions.formats)
      return fullOptions
    },
    resolvedSchema() {
      return jrefs.resolve(this.schema)
    },
    fullSchema() {
      return schemaUtils.prepareFullSchema(this.resolvedSchema, this.value)
    },
    htmlDescription() {
      return (this.fullSchema && this.fullSchema.description) ? this.fullOptions.markdown(this.fullSchema.description) : null
    },
    fullKey() { return (this.parentKey + this.modelKey).replace('root.', '') },
    label() { return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '') },
    rules() {
      const fullSchema = this.fullSchema
      const rules = []
      if (this.required) {
        rules.push((val) => (val !== undefined && val !== null && val !== '') || this.fullOptions.requiredMessage)
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
    // props common to many vuetify fields
    commonFieldProps() {
      return {
        value: this.value,
        label: this.label,
        name: this.fullKey,
        disabled: this.disabled,
        rules: this.rules,
        required: this.required,
        dense: this.fullOptions.dense || this.disabled,
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
    const mainChildren = this.renderDateProp(h) || this.renderColorProp(h) || this.renderSelectProp(h) || this.renderSimpleProp(h) || this.renderObjectContainer(h) || this.renderEditableArray(h) || []
    if (this.$scopedSlots.default) this.$scopedSlots.default(this.slotParams)
    const children = []
    if (this.$scopedSlots.before) children.push(this.$scopedSlots.before(this.slotParams))
    else if (this.$slots.before) this.$slots.before.forEach(node => children.push(node))
    else if (this.xSlots.before) children.push(h('template', { domProps: { innerHTML: this.fullOptions.markdown(this.xSlots.before) } }))
    if (this.$scopedSlots.default) children.push(this.$scopedSlots.default(this.slotParams))
    else mainChildren.forEach(child => children.push(child))
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
    cleanUpExtraProperties() {
      // cleanup extra properties
      if (
        this.fullSchema.type === 'object' &&
        (this.fullOptions.removeAdditionalProperties || this.fullSchema.additionalProperties === false) &&
        this.value
      ) {
        Object.keys(this.value).forEach(key => {
          if (!(this.fullSchema.properties || []).find(p => p.key === key)) {
            // console.log(`Remove key ${this.modelKey}.${key}`)
            delete this.value[key]
          }
        })
      }
    },
    applySubModels() {
      // console.log('Apply sub models')
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
      // console.log('Init from schema')
      let model = this.value

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
