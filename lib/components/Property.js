import SimpleField from './SimpleField'
import SelectIcon from './SelectIcon.vue'
import SelectItem from './SelectItem.vue'
import Tooltip from './Tooltip.vue'
import schemaUtils from '../utils/schema'
import selectUtils from '../utils/select'
const matchAll = require('match-all')
const md = require('markdown-it')()

export default {
  name: 'Property',
  components: { SelectIcon, SelectItem, Tooltip, SimpleField },
  props: ['schema', 'modelWrapper', 'modelRoot', 'modelKey', 'parentKey', 'required', 'options'],
  data() {
    return {
      ready: false,
      menu: false,
      rawSelectItems: null,
      selectItems: null,
      q: '',
      currentOneOf: null,
      showCurrentOneOf: true,
      fromUrlParams: {},
      loading: false,
      folded: true,
      showColorPicker: false,
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
      return schemaUtils.getRules(this.fullSchema, this.required, this.options)
    },
    fromUrl() {
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') === -1)
    },
    fromUrlWithQuery() {
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') !== -1)
    },
    fromUrlKeys() {
      // Look for variable parts in the URL used to fetch data
      if (!this.fullSchema['x-fromUrl']) return null
      return matchAll(this.fullSchema['x-fromUrl'], /\{(.*?)\}/g).toArray().filter(key => key !== 'q')
    },
    itemKey() {
      return this.fullSchema['x-itemKey'] || 'key'
    },
    itemTitle() {
      return this.fullSchema['x-itemTitle'] || 'title'
    },
    itemIcon() {
      return this.fullSchema['x-itemIcon'] || (this.fullSchema['x-display'] === 'icon' ? this.itemKey : null)
    },
    disabled() {
      return this.options.disableAll
    },
    foldable() {
      return this.options.autoFoldObjects && this.parentKey && this.fullSchema.title
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
    oneOfSelect() {
      return schemaUtils.isOneOfSelect(this.fullSchema)
    },
    slotName() {
      return this.fullSchema['x-display'] && this.fullSchema['x-display'].startsWith('custom-') ? this.fullSchema['x-display'] : this.fullKey
    },
    slotProps() {
      return { fullSchema: this.fullSchema, fullKey: this.fullKey, label: this.label, disabled: this.disabled, required: this.required, rules: this.rules, options: this.options, htmlDescription: this.htmlDescription }
    },
    propertyClass() {
      const cleanKey = this.fullKey.replace(/\./g, '-').replace(/[0-9]/g, '')
      return `vjsf-property vjsf-property-${cleanKey} xs12 ${this.fullSchema['x-class'] || ''}`
    }
  },
  watch: {
    q() {
      // This line prevents reloading the list just after selecting an item in an auto-complete
      if (this.modelWrapper[this.modelKey] && this.modelWrapper[this.modelKey][this.itemTitle] === this.q) return
      this.fetchSelectItems()
    },
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
    },
    rawSelectItems: {
      handler() {
        this.updateSelectItems()
      },
      immediate: true
    }
  },
  render(h) {
    // hide const ? Or make a readonly field ?
    if (!this.fullSchema || this.fullSchema.const !== undefined || this.fullSchema['x-display'] === 'hidden') return

    const mainChild = this.renderSimpleField(h) || this.renderObjectContainer(h)

    return h('v-flex', { class: this.propertyClass, style: this.fullSchema['x-style'] || '' }, [
      h('slot', { props: { name: `before-${this.slotName}`, ...this.slotProps } }),
      h('slot', { props: { name: this.slotName, ...this.slotProps } }, [mainChild]),
      h('slot', { props: { name: `after-${this.slotName}`, ...this.slotProps } })
    ])
  },
  methods: {
    renderObjectContainer(h) {
      const fullSchema = this.fullSchema
      if (fullSchema.type !== 'object') return
      const children = []

      // title block
      if (fullSchema.title) {
        children.push(h('v-subheader', {
          style: this.foldable ? 'cursor:pointer;' : '',
          class: 'mt-2',
          on: { click: () => { this.folded = !this.folded } }
        }, [
          `${fullSchema.title}\xa0`,
          this.foldable && this.folded && h('v-icon', this.options.icons.dropdown),
          this.foldable && !this.folded && h('v-icon', this.options.icons.dropup)
        ]))
      }

      const transmitOn = {
        error: e => this.$emit('error', e),
        input: err => this.$emit('input', err),
        change: err => this.$emit('change', err)
      }

      // all sub properties in a foldable container below the title
      children.push(h('v-slide-y-transition', [
        h('v-layout', {
          attrs: { row: true, wrap: true },
          class: 'ma-0',
          style: this.foldable && this.folded && 'display: none;'
        }, [fullSchema.description && h('p', { domProps: { innerHTML: this.htmlDescription } })]
          .concat(fullSchema.properties.map(childProp => h('property', {
            props: {
              schema: childProp,
              modelWrapper: this.modelWrapper[this.modelKey],
              modelRoot: this.modelRoot,
              modelKey: childProp.key,
              parentKey: `${this.fullKey}.`,
              required: !!(fullSchema.required && fullSchema.required.includes(childProp.key)),
              options: this.options
            },
            on: transmitOn
          })))
        )
        // TODO propagate slots to children
      ]))

      return h('div', children)
    },
    renderSimpleField(h) {
      const fullSchema = this.fullSchema
      let tag
      const props = { ...this.context, value: this.modelWrapper[this.modelKey] }
      const domProps = {}
      const children = [h('tooltip', { slot: 'append-outer', props: this.context })]
      const on = {
        input: value => this.$emit('input', value),
        change: value => this.$emit('change', value)
      }
      const scopedSlots = {}

      if (fullSchema.type === 'string') {
        tag = 'v-text-field'
        if (fullSchema['x-display'] === 'password') props.type = 'password'
        if (fullSchema['x-display'] === 'textarea' || (fullSchema.maxLength && fullSchema.maxLength > 1000 && fullSchema['x-display'] !== 'single-line')) {
          tag = 'v-textarea'
          props.filled = true
          domProps.class = 'v-text-field--box v-text-field--enclosed'
        }
      }

      if (['number', 'integer'].includes(fullSchema.type)) {
        tag = 'v-text-field'
        if (fullSchema['x-display'] === 'slider') tag = 'v-slider'

        props.type = 'number'
        if (fullSchema.minimum !== undefined) props.min = fullSchema.minimum
        if (fullSchema.maximum !== undefined) props.max = fullSchema.maximum
        props.step = fullSchema['x-step'] || (fullSchema.type === 'integer' ? 1 : 0.01)

        on.input = value => this.$emit('input', Number(value))
      }

      if (fullSchema.type === 'boolean') {
        tag = 'v-checkbox'
        on.change = value => {
          this.$emit('input', value)
          this.$emit('change', value)
        }
      }

      if (fullSchema.type === 'array' && fullSchema.items.type === 'string') {
        tag = 'v-combobox'

        props.chips = true
        props.multiple = true
        props.appendIcon = ''

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            this.value.splice(slotProps.index, 1)
            this.$emit('input', this.value)
            this.$emit('change', this.value)
          }
          return h('v-chip', {
            props: { close: true },
            on: {
              // @input is for vuetify1 and @click:close is for vuetify 2
              'click:close': onClose,
              input: onClose
            }
          }, slotProps.item)
        }
      }
      return tag ? h(tag, { props, domProps, on, scopedSlots }, children) : null
    },
    updateSelectItems() {
      const selectItems = selectUtils.getSelectItems(this.rawSelectItems, this.fullSchema, this.modelWrapper, this.modelKey, this.itemKey)
      if (this.fullSchema['x-display'] === 'list') {
        selectUtils.fillList(this.fullSchema, this.modelWrapper, this.modelKey, selectItems, this.itemKey)
      } else {
        selectUtils.fillSelectItems(this.fullSchema, this.modelWrapper, this.modelKey, selectItems, this.itemKey)
      }

      // we check for actual differences in order to prevent infinite loops
      if (JSON.stringify(selectItems) !== JSON.stringify(this.selectItems)) {
        this.selectItems = selectItems
      }
    },
    change() {
      this.updateSelectItems()
      this.$emit('change', { key: this.fullKey.replace(/allOf-([0-9]+)\./g, ''), model: this.modelWrapper[this.modelKey] })
    },
    input() {
      this.$emit('input', { key: this.fullKey.replace(/allOf-([0-9]+)\./g, ''), model: this.modelWrapper[this.modelKey] })
    },
    defaultValue(schema) {
      if (schema.type === 'object' && !schema['x-fromUrl'] && !schema['x-fromData'] && !schema.enum) return {}
      if (schema.type === 'array') return []
      return null
    },
    fetchSelectItems() {
      if (!this.options.httpLib) return this.$emit('error', 'No http lib found to perform ajax request')
      let url = this.fullSchema['x-fromUrl'].replace('{q}', this.q || '')
      for (const key of this.fromUrlKeys) {
        // URL parameters are incomplete
        if (this.fromUrlParams[key] === undefined) return
        else url = url.replace(`{${key}}`, this.fromUrlParams[key])
      }
      this.loading = true
      this.options.httpLib.get(url)
        .then(res => {
          const body = res.data || res.body
          const items = this.fullSchema['x-itemsProp'] ? body[this.fullSchema['x-itemsProp']] : body
          if (!Array.isArray(items)) throw new Error(`Result of http fetch ${url} is not an array`)
          this.rawSelectItems = items
          this.loading = false
        })
        .catch(err => {
          this.$emit('error', err.message)
          this.loading = false
        })
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
      if (this.fullSchema.type === 'string' && this.fullSchema.format === 'hexcolor') model = model || ''

      // Case of a select based on ajax query
      if (this.fromUrl) this.fetchSelectItems()
      // Case of select based on an enum
      if ((this.fullSchema.type === 'array' && this.fullSchema.items.enum) || this.fullSchema.enum) {
        this.rawSelectItems = this.fullSchema.type === 'array' ? this.fullSchema.items.enum : this.fullSchema.enum
      }
      // Case of select based on a oneof on simple types
      if (this.oneOfSelect) {
        this.rawSelectItems = (this.fullSchema.type === 'array' ? this.fullSchema.items : this.fullSchema).oneOf.map(item => ({ ...item, [this.itemKey]: item.const || (item.enum && item.enum[0]), [this.itemTitle]: item.title }))
      }
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && model && model[this.itemTitle] !== undefined) {
        this.q = model[this.itemTitle]
      }
      // Case of a select based on an array somewhere in the data
      if (this.fullSchema['x-fromData']) {
        this.$watch('modelRoot.' + this.fullSchema['x-fromData'], (val) => {
          this.rawSelectItems = val
        }, { immediate: true })
      }
      // Watch the dynamic parts of the URL used to fill the select field
      if (this.fromUrlKeys) {
        this.fromUrlKeys.forEach(key => {
          if (key.startsWith('context.')) {
            this.$watch('options.' + key, (val) => {
              this.fromUrlParams[key] = val
              this.fetchSelectItems()
            }, { immediate: true })
          } else {
            this.$watch('modelRoot.' + key, (val) => {
              this.fromUrlParams[key] = val
              this.fetchSelectItems()
            }, { immediate: true })
          }
        })
      }

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
