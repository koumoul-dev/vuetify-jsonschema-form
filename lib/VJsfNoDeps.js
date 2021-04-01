import copy from 'fast-copy'
import { deepEqual } from 'fast-equals'
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
import MarkdownEditor from './mixins/MarkdownEditor'
import Tooltip from './mixins/Tooltip'
import Validatable from './mixins/Validatable'
import Dependent from './mixins/Dependent'

const debugFlag = global.localStorage && global.localStorage.debug

export default {
  name: 'VJsf',
  // components,
  mixins: [
    ObjectContainer,
    SimpleProperty,
    DateProperty,
    ColorProperty,
    SelectProperty,
    FileProperty,
    EditableArray,
    MarkdownEditor,
    Tooltip,
    Validatable,
    Dependent
  ],
  inject: ['theme'],
  props: {
    schema: { type: Object, required: true },
    value: { required: true },
    options: { type: Object },
    modelRoot: { type: [Object, Array, String, Number, Boolean] },
    modelKey: { type: [String, Number], default: 'root' },
    parentKey: { type: String, default: '' },
    required: { type: Boolean, default: false },
    sectionDepth: { type: Number, default: 0 }
  },
  data() {
    return {
      loading: false,
      fullSchema: null
    }
  },
  computed: {
    fullOptions() {
      this.debug('compute fullOptions')
      const _global = (typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}
      const fullOptions = Object.assign({}, defaultOptions, this.options || {}, this.resolvedSchema['x-options'] || {})

      fullOptions.markdown = fullOptions.markdown ||
        (_global.markdownit && (text => text ? _global.markdownit(fullOptions.markdownit).render(text) : '')) ||
        ((text) => text || '')
      fullOptions.memMarkdown = fullOptions.memMarkdown || (text => {
        this._vjsf_markdown = this._vjsf_markdown || {}
        const key = text + ''
        this._vjsf_markdown[key] = this._vjsf_markdown[key] || fullOptions.markdown(text)
        return this._vjsf_markdown[key]
      })

      fullOptions.httpLib = fullOptions.httpLib || this.axios || this.$http || this.$axios || _global.axios

      if (!fullOptions.validator) {
        let ajv = fullOptions.ajv
        if (!ajv) {
          const Ajv = _global.Ajv || (_global.ajv7 && _global.ajv7.default) || (_global.ajv2019 && _global.ajv2019.default)
          if (Ajv) ajv = new Ajv()
        }
        if (ajv) {
          fullOptions.validator = (schema) => {
            const validate = ajv.compile(schema)
            return (model) => {
              if (!validate(model)) return validate.errors
            }
          }
        }
      }
      const iconfont = (this.$vuetify.icons && this.$vuetify.icons.iconfont) || 'mdi'
      // importing default icon fonts from vuetify
      if (!fullOptions.defaultIcons) {
        const vuetifyCustomIcons = {}
        for (const [key, value] of Object.entries(this.$vuetify.icons.values)) {
          vuetifyCustomIcons[key] = value.props ? value.props.name : value
        }
        fullOptions.defaultIcons = { ...iconSets[iconfont], ...vuetifyCustomIcons }
        fullOptions.icons = { ...fullOptions.defaultIcons, ...fullOptions.icons }
      }

      fullOptions.messages = { ...(localizedMessages[fullOptions.locale] || localizedMessages.en), ...fullOptions.messages }
      fullOptions.formats = { ...formats, ...fullOptions.formats }
      if (fullOptions.deleteReadOnly) fullOptions.hideReadOnly = true
      return fullOptions
    },
    resolvedSchema() {
      if (this.modelKey === 'root') {
        this.debug('compute resolvedSchema')
        return jrefs.resolve(this.schema, { '~$locale~': (this.options && this.options.locale) || 'en' })
      } else {
        return this.schema
      }
    },
    htmlDescription() {
      this.debug('compute htmlDescription')
      return this.fullOptions.markdown(this.fullSchema && this.fullSchema.description)
    },
    fullKey() {
      return (this.parentKey + this.modelKey).replace('root.', '')
    },
    label() {
      if (!this.fullSchema) return
      return this.fullSchema.title || (typeof this.modelKey === 'string' ? this.modelKey : '')
    },
    display() {
      if (!this.fullSchema) return
      return this.modelKey === 'root' && this.fullOptions.rootDisplay ? this.fullOptions.rootDisplay : this.fullSchema['x-display']
    },
    customTag() {
      if (!this.fullSchema) return
      return this.fullSchema['x-tag']
    },
    rules() {
      this.debug('compute rules')
      if (!this.fullSchema) return
      return getRules(this.fullSchema, this.fullOptions, this.required, this.isOneOfSelect)
    },
    disabled() {
      if (!this.fullSchema) return
      return this.fullOptions.disableAll || this.fullSchema.readOnly
    },
    slotName() {
      if (!this.fullSchema) return
      return this.fullSchema['x-display'] && this.fullSchema['x-display'].startsWith('custom-') ? this.fullSchema['x-display'] : this.fullKey
    },
    slotParams() {
      this.debug('compute slotParams')
      if (!this.fullSchema) return
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
          change: () => this.change()
        }
      }
    },
    dashKey() {
      return this.fullKey.replace(/\./g, '-')
    },
    // props common to many vuetify fields
    commonFieldProps() {
      this.debug('compute commonFieldProps')
      if (!this.fullSchema) return
      return {
        value: this.value,
        inputValue: this.value,
        label: this.label,
        name: this.fullKey,
        id: this.fullOptions.idPrefix + this.dashKey,
        disabled: this.disabled,
        rules: this.rules,
        required: this.required,
        autofocus: this.fullOptions.autofocus,
        ...(this.fullSchema.readOnly ? this.fullOptions.readOnlyFieldProps : {}),
        ...this.fullOptions.fieldProps,
        ...this.fullSchema['x-props']
      }
    },
    propertyClass() {
      if (!this.fullSchema) return
      return `vjsf-property vjsf-property-${this.dashKey} pa-0 ${this.fullSchema['x-class'] || ''} ${this.fullSchema.readOnly ? 'read-only' : ''}`
        .replace(/ {2}/g, ' ').trim()
    },
    xSlots() {
      if (!this.fullSchema) return
      return { ...this.fullSchema['x-slots'] }
    },
    formattedValue() {
      if (!this.fullSchema) return
      return this.value && this.fullSchema.format && this.fullOptions.formats[this.fullSchema.format] && this.fullOptions.formats[this.fullSchema.format](this.value, this.fullOptions.locale)
    }
  },
  watch: {
    fullSchema: {
      handler() {
        if (!this.fullSchema) return
        this.initFromSchema()
        this.fixProperties()
        this.initValidation()
      }
    }
  },
  mounted() {
    this.debug('mounted')

    // optimize the watcher used to reprocess fullSchema so that we trigger less re-render of components
    let watcher = 'resolvedSchema'
    if (this.resolvedSchema.dependencies || this.resolvedSchema.if) {
      watcher = (vm) => [vm.resolvedSchema, vm.value]
    }
    this.$watch(watcher, () => {
      const fullSchema = schemaUtils.prepareFullSchema(this.resolvedSchema, this.value, this.fullOptions)
      // kinda hackish but prevents triggering large rendering chains when nothing meaningful changes
      if (deepEqual(fullSchema, this.fullSchema)) {
        this.debug('fullSchema no change detected')
      } else {
        this.debug('fullSchema changed')
        this.fullSchema = fullSchema
      }
    }, {
      immediate: true,
      deep: true
    })
  },
  render(h) {
    this.renderInc = (this.renderInc || 0) + 1
    /* DEVS NOTE: uncomment this when fighting against infinite loops
    if (this.renderInc === 100) {
      console.error('interrupt rendering loop')
      return
    } */
    this.debug('render', this.renderInc)

    // hide const ? Or make a readonly field ?
    if (!this.fullSchema || this.fullSchema.const !== undefined || this.display === 'hidden' || (this.fullSchema.readOnly && this.fullOptions.hideReadOnly)) {
      return
    }

    if (this.fullSchema['x-if'] && !this.parsePath(this.watchKey(this.fullSchema['x-if']))) {
      return
    }

    const children = []
    if (this.$scopedSlots.before) children.push(this.$scopedSlots.before(this.slotParams))
    else if (this.$slots.before) this.$slots.before.forEach(node => children.push(node))
    else if (this.xSlots.before) children.push(h('div', { domProps: { innerHTML: this.fullOptions.memMarkdown(this.xSlots.before) } }))

    if (this.$scopedSlots.default) {
      children.push(this.$scopedSlots.default(this.slotParams))
    } else if (this.fullSchema['x-display'] && this.fullSchema['x-display'] && this.$scopedSlots[this.fullSchema['x-display']]) {
      children.push(this.$scopedSlots[this.fullSchema['x-display']](this.slotParams))
    } else {
      const mainChildren = this.renderDateProp(h) ||
        this.renderColorProp(h) ||
        this.renderSelectProp(h) ||
        this.renderFileProp(h) ||
        this.renderMarkdownProp(h) ||
        this.renderSimpleProp(h) ||
        this.renderObjectContainer(h) ||
        this.renderEditableArray(h) || []
      mainChildren.forEach(child => children.push(child))
    }

    if (this.$scopedSlots.after) children.push(this.$scopedSlots.after(this.slotParams))
    else if (this.$slots.after) this.$slots.after.forEach(node => children.push(node))
    else if (this.xSlots.after) {
      children.push(h('div', { domProps: { innerHTML: this.fullOptions.memMarkdown(this.xSlots.after) } }))
    }

    let colProps = { ...this.fullOptions.fieldColProps }
    if (this.fullSchema['x-cols']) {
      if (typeof this.fullSchema['x-cols'] === 'object') {
        colProps = { ...colProps, ...this.fullSchema['x-cols'] }
      } else {
        colProps.cols = this.fullSchema['x-cols']
      }
    }
    return h('v-col', { props: colProps, class: this.propertyClass, style: this.fullSchema['x-style'] || '' }, children)
  },
  methods: {
    debug(msg, param) {
      if (debugFlag === '*' || debugFlag === this.fullKey) console.log(`[${this.fullKey}] ${msg}`, param || '')
    },
    cached(key, params, fn) {
      this._vjsf_cache = this._vjsf_cache || {}
      if (!this._vjsf_cache[key] || !deepEqual(this._vjsf_cache[key].params, params)) {
        // console.log('fill cache', key, this.fullKey)
        this._vjsf_cache[key] = { params: copy(params), value: fn() }
      } else {
        // console.log('use cache', key, this.fullKey)
      }
      return this._vjsf_cache[key].value
    },
    // inspired by https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L29
    parsePath(path) {
      const segments = path.split('.')
      let obj = this
      for (let i = 0; i < segments.length; i++) {
        if (!obj) return
        obj = obj[segments[i]]
      }
      return obj
    },
    renderPropSlots(h) {
      const slots = []
      Object.keys(this.xSlots).forEach(slot => {
        slots.push(h('div', { slot, domProps: { innerHTML: this.fullOptions.memMarkdown(this.xSlots[slot]) } }))
      })
      Object.keys(this.$slots).forEach(slot => {
        slots.push(h('template', { slot }, this.$slots[slot]))
      })
      return slots
    },
    change() {
      if (!this.changed) return
      // let input events be interpreted before sending this.value in change event
      this.$nextTick(() => {
        this.updateSelectItems()
        this.$emit('change', this.value)
        this.changed = false
      })
    },
    input(value) {
      // this.debug('input', JSON.stringify([this.value, value]))
      if (value === null || value === undefined || value === '') {
        if (this.fullSchema.nullable) {
          if (this.value !== null) {
            this.changed = true
            this.$emit('input', null)
          }
        } else {
          if (this.value !== undefined) {
            this.changed = true
            this.$emit('input', undefined)
          }
        }
      } else {
        if (!deepEqual(value, this.value)) {
          this.changed = true
          this.$emit('input', value)
        }
      }
    },
    fixValueType(value, schema) {
      if ([null, undefined].includes(value)) return value
      if (schema.type === 'string' && typeof value !== 'string') return undefined
      if (schema.type === 'integer' && typeof value !== 'number') return undefined
      if (schema.type === 'number' && typeof value !== 'number') return undefined
      if (schema.type === 'boolean' && typeof value !== 'boolean') return undefined
      if (schema.type === 'array' && !Array.isArray(value)) return undefined
      if (schema.type === 'object' && (typeof value !== 'object' || Array.isArray(value))) return undefined
      return value
    },
    defaultValue(schema) {
      if (schema.type === 'object' && !schema['x-fromUrl'] && !schema['x-fromData'] && !schema.enum) return {}
      if (schema.type === 'array') return []
      return null
    },
    fixProperties() {
      this.debug('fixProperties')
      if (this.fullSchema.type !== 'object' || !this.value) return

      const nonSchematized = (!this.fullSchema.properties || !this.fullSchema.properties.length) && (!Object.keys(this.subModels).length || !!this.fullSchema['x-fromData'] || !!this.fullSchema['x-fromUrl'])
      if (nonSchematized) return

      const value = { ...this.value }
      let hasChange = false

      // cleanup extra properties
      if (this.fullOptions.removeAdditionalProperties || this.fullSchema.additionalProperties === false) {
        Object.keys(value).forEach(key => {
          if (!(this.fullSchema.properties || []).find(p => p.key === key)) {
            // console.log(`Remove key ${this.modelKey}.${key}`)
            hasChange = true
            this.$delete(value, key)
          }
        })
      }

      // apply submodels
      Object.keys(this.subModels).forEach(subModel => {
        Object.keys(this.subModels[subModel]).forEach(key => {
          if (value[key] !== this.subModels[subModel][key]) {
            hasChange = true
            this.$set(value, key, this.subModels[subModel][key])
          }
        })
      })
      if (hasChange) this.input(value)
    },
    initFromSchema() {
      this.debug('initFromSchema')
      // initiallyDefined will by used in Validatable.js to perform initial validation or not
      this.initiallyDefined = this.value !== undefined && this.value !== null
      // we cannot consider empty objects and empty arrays as "defined" as they might have been initialized by vjsf itself
      if (this.fullSchema.type === 'array') this.initiallyDefined = !!(this.value && this.value.length)
      if (this.fullSchema.type === 'object') this.initiallyDefined = !!(this.value && Object.keys(this.value).length)

      // console.log('Init from schema', this.modelKey)
      if (this.fullSchema.readOnly && this.fullOptions.deleteReadOnly) {
        return this.input(undefined)
      }
      let value = this.value
      if (this.fullSchema.type === 'object' && [undefined, null].includes(value) && !this.isSelectProp) {
        value = {}
      }

      // const always wins
      if (this.fullSchema.const !== undefined) value = this.fullSchema.const
      this.initSelectProp(value)
      this.initObjectContainer(value)
      // Cleanup arrays of empty items
      if (this.fullSchema.type === 'array') {
        value = this.value.filter(item => ![undefined, null].includes(item))
      }
      this.input(value)
    },
    watchKey(key) {
      if (key.startsWith('context.')) return 'options.' + key
      if (key.startsWith('root.')) return key.replace('root.', 'modelRoot.')
      if (key.startsWith('modelRoot.')) return key

      // no specific prefix found, we use modelRoot for retro-compatibility
      if (this.modelRoot) return 'modelRoot.' + key
      return 'value.' + key
    }
  }
}
