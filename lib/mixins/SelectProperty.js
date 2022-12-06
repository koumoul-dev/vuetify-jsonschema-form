import { deepEqual } from 'fast-equals'
import selectUtils from '../utils/select'
const matchAll = require('match-all')
const debounce = require('debounce-promise')

export default {
  data() {
    return {
      rawSelectItems: null,
      selectItems: [],
      q: '',
      fromUrlParams: {}
    }
  },
  computed: {
    isSelectProp() {
      if (!this.fullSchema) return
      if (this.display === 'list') return false
      if (this.fullSchema.enum) return true
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.enum) return true
      if (this.oneOfSelect) return true
      if (this.examplesSelect) return true
      // WARNING: it is important not to use this.fromUrl here
      // because it is empty at first when fromUrlParams are not ready yet and it creates initialization problems
      if (this.fullSchema['x-fromUrl']) return true
      if (this.fromData) return true
      return false
    },
    oneOfSelect() {
      return selectUtils.isOneOfSelect(this.fullSchema)
    },
    examplesSelect() {
      if (!this.fullSchema) return
      if (this.fullSchema.type === 'array' && this.fullSchema.items && ['string', 'integer', 'number'].includes(this.fullSchema.items.type) && this.fullSchema.items.examples) return true
      if (['string', 'integer', 'number'].includes(this.fullSchema.type) && this.fullSchema.examples) return true
      return false
    },
    fromUrlWithQuery() {
      if (!this.fullSchema) return
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') !== -1)
    },
    fromUrlKeys() {
      if (!this.fullSchema) return
      // Look for variable parts in the URL used to fetch data
      if (!this.fullSchema['x-fromUrl']) return null
      return matchAll(this.fullSchema['x-fromUrl'], /\{(.*?)\}/g).toArray().filter(key => key !== 'q')
    },
    fromUrl() {
      if (!this.fullSchema) return
      let url = this.fullSchema['x-fromUrl']
      if (!url) return
      for (const key of this.fromUrlKeys) {
        // URL parameters are incomplete
        if (this.fromUrlParams[key] === undefined) return
        else url = url.replace(`{${key}}`, this.fromUrlParams[key])
      }
      return url
    },
    fromData() {
      if (!this.fullSchema) return
      return this.fullSchema['x-fromData']
    },
    itemKey() {
      if (!this.fullSchema) return
      return this.fullSchema['x-itemKey'] || 'key'
    },
    itemTitle() {
      if (!this.fullSchema) return
      return this.fullSchema['x-itemTitle'] || 'title'
    },
    itemIcon() {
      if (!this.fullSchema) return
      return this.fullSchema['x-itemIcon'] || (this.display === 'icon' ? this.itemKey : null)
    },
    returnObject() {
      if (!this.fullSchema) return
      return this.fullSchema.type === 'object' || (this.fullSchema.items && this.fullSchema.items.type === 'object')
    }
  },
  watch: {
    q() {
      // This line prevents reloading the list just after selecting an item in an auto-complete
      if (this.value && this.value[this.itemTitle] === this.q) return
      this.fetchSelectItems()
    },
    rawSelectItems: {
      handler() {
        this.updateSelectItems()
      }
    }
  },
  methods: {
    initSelectProp(model) {
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && model && model[this.itemTitle] !== undefined) {
        this.q = model[this.itemTitle]
      }
      // Case of a select based on ajax query
      if (this.fromUrl) {
        this.fetchSelectItems()
      }
      if (this.fullSchema['x-fromUrl']) {
        // do not use this.fromUrl to determine this.openEndedSelect as it might be null if missing parameters
        this.openEndedSelect = this.customTag === 'v-combobox' || this.fullSchema['x-display'] === 'combobox'
      }
      // Case of select based on an enum
      if ((this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.enum) || this.fullSchema.enum) {
        this.rawSelectItems = this.fullSchema.type === 'array' ? this.fullSchema.items.enum : this.fullSchema.enum
      }
      // Case of select based on a oneof on simple types
      if (this.oneOfSelect) {
        const schema = (this.fullSchema.type === 'array' ? this.fullSchema.items : this.fullSchema)
        const of = schema.anyOf || schema.oneOf
        this.openEndedSelect = schema.anyOf && !!schema.anyOf.find(item => !item.const && !item.enum)
        this.rawSelectItems = of
          .filter(item => !item['x-if'] || !!this.getFromExpr(item['x-if']))
          .filter(item => ('const' in item) || !!item.enum)
          .map(item => ({ ...item, [this.itemKey]: ('const' in item) ? item.const : (item.enum && item.enum[0]), [this.itemTitle]: item.title }))
      }

      // Case of combobox based on examples
      if (this.examplesSelect) {
        const examples = (this.fullSchema.type === 'array' ? (this.fullSchema.items.examples || this.fullSchema.examples) : this.fullSchema.examples)
        this.openEndedSelect = true
        this.rawSelectItems = examples.map(example => ({ [this.itemKey]: example, [this.itemTitle]: example }))
      }

      // Case of a select based on an array somewhere in the data
      if (this.fullSchema['x-fromData']) {
        this.openEndedSelect = this.customTag === 'v-combobox' || this.fullSchema['x-display'] === 'combobox'
        this.$watch(() => this.getFromExpr(this.fullSchema['x-fromData']), (val) => {
          this.rawSelectItems = val
        }, { immediate: true })
      }
      // Watch the dynamic parts of the URL used to fill the select field
      if (this.fromUrlKeys) {
        this.fromUrlKeys.forEach(key => {
          this.$watch(() => this.getFromExpr(key), (val) => {
            this.$set(this.fromUrlParams, key, val)
            this.fetchSelectItems()
          }, { immediate: true })
        })
      }
    },
    fetchSelectItems() {
      if (!this.fromUrl) return
      if (!this.fullOptions.httpLib) {
        console.error('No http lib found to perform ajax request')
        return this.$emit('error', 'No http lib found to perform ajax request')
      }
      this.debouncedFetch = this.debouncedFetch || debounce(async () => {
        this.loading = true
        try {
          this.rawSelectItems = await selectUtils.fetchRawItems(this.fullOptions, this.fullSchema, this.fromUrl, this.q)
        } catch (err) {
          console.error(err)
          this.$emit('error', err.message)
        }
        this.loading = false
      }, 250)
      const promise = this.debouncedFetch()
      // store all current promises in sharedData.asyncOperations so that we can delay change events
      // until after a user interaction has finished having async consequencies
      this.sharedData.asyncOperations = this.sharedData.asyncOperations || {}
      this.sharedData.asyncOperations[this.fullKey] = promise
      promise.finally(() => {
        if (this.sharedData.asyncOperations[this.fullKey] === promise) delete this.sharedData.asyncOperations[this.fullKey]
      })
    },
    async updateSelectItems() {
      const selectItems = selectUtils.getSelectItems(this.rawSelectItems, this.fullSchema, this.itemKey, this.itemIcon)
      if (this.display === 'list' && this.rawSelectItems) {
        this.input(selectUtils.fillList(this.fullSchema, this.value, selectItems, this.itemKey))
      }

      this.loading = true
      await selectUtils.fillSelectItems(
        this.fullOptions,
        this.fullSchema,
        this.separator && typeof this.value === 'string' ? this.value.split(this.separator) : this.value,
        selectItems,
        this.itemKey,
        this.itemTitle,
        this.fromUrlWithQuery && this.fromUrl,
        this.returnObject
      )
      this.loading = false

      // we check for actual differences in order to prevent infinite loops
      if (!deepEqual(selectItems, this.selectItems)) {
        this.selectItems = selectItems
      }
    },
    renderSelectIcon(h, item) {
      if (!this.itemIcon) return
      let itemIcon = item[this.itemIcon]
      if (!itemIcon) return
      let iconChild
      if (itemIcon.startsWith('http://') || itemIcon.startsWith('https://')) {
        iconChild = h('img', { domProps: { src: itemIcon }, style: 'height:100%;width:100%;' })
      } else if (itemIcon.startsWith('<?xml') || itemIcon.startsWith('<svg')) {
        iconChild = h('div', { domProps: { innerHTML: itemIcon } })
      } else {
        const prefix = this.fullOptions.iconfont + '-'
        if (this.fullOptions.iconfont && !itemIcon.startsWith(prefix)) itemIcon = prefix + itemIcon
        iconChild = h('v-icon', null, itemIcon)
      }
      return h('v-avatar', { props: { tile: true, size: 20 }, class: 'mr-2' }, [iconChild])
    },
    renderSelectCheckbox(h, value) {
      if (this.fullSchema.type !== 'array' || this.itemIcon) return
      return h('v-list-item-action', [h('v-checkbox', { props: { inputValue: value } })])
    },
    renderSelectItem(h, item) {
      const text = item[this.itemTitle] || item[this.itemKey]
      return h('v-list-item-content', [h('v-list-item-title', text)])
    },
    renderSelectionControlItem(h, item) {
      const label = item[this.itemTitle] || item[this.itemKey]
      const value = item[this.itemKey]
      const on = {
        change: (inputValue) => {
          this.input(inputValue)
          this.change()
        }
      }

      const props = {
        ...this.fullOptions.radioItemProps,
        label,
        value,
        inputValue: this.separator && typeof this.value === 'string' ? this.value.split(this.separator) : this.value,
        multiple: this.fullSchema.type === 'array' || !!this.separator,
        hideDetails: true
      }

      return h(`v-${this.display}`, { props, on, class: 'pb-1' })
    },
    renderSelectionControlGroup(h) {
      const on = {
        change: value => {
          this.input(value)
          this.change()
        }
      }
      const props = {
        ...this.commonFieldProps,
        multiple: this.fullSchema.type === 'array' || !!this.separator,
        label: null
      }
      // imitate a radio-group, but with checkboxes and switches
      const legend = h('legend', { class: `v-label theme--${this.theme.isDark ? 'dark' : 'light'} ${this.hasError ? 'error--text' : ''}` }, this.commonFieldProps.label)
      const itemsElements = this.selectItems.map(item => this.renderSelectionControlItem(h, item))
      return [
        h('v-input', { props, on, class: 'v-input--selection-controls v-input--radio-group v-input--radio-group--column' }, [
          h('div', { class: 'v-input--radio-group__input' }, [legend, ...itemsElements]),
          this.renderTooltip(h, 'append')
        ])

      ]
    },
    renderRadioItem(h, item) {
      const label = item[this.itemTitle] || item[this.itemKey]
      const value = item[this.itemKey]
      return h('v-radio', { props: { ...this.fullOptions.radioItemProps, label, value } })
    },
    renderRadioGroup(h) {
      const props = { ...this.commonFieldProps, ...this.fullOptions.radioGroupProps }
      const on = {
        change: value => {
          this.input(value)
          this.change()
        }
      }
      return [h('v-radio-group', { props, on }, [
        ...this.selectItems.map(item => this.renderRadioItem(h, item)), this.renderTooltip(h, 'append')
      ])]
    },
    renderSelectProp(h) {
      if (!this.isSelectProp) return

      // radio cannot be applied on an array
      if (this.display === 'radio') {
        if (this.fullSchema.type === 'array' || this.separator) {
          console.error('radio display is not available for arrays, use checkbox or switch')
        } else {
          return this.renderRadioGroup(h)
        }
      }

      if (['checkbox', 'switch'].includes(this.display)) {
        return this.renderSelectionControlGroup(h)
      }

      const on = {
        input: value => this.input(value),
        change: value => this.change()
      }
      const scopedSlots = {
        selection: (data) => {
          let item
          // combobox only gives us the value in selection results, not the full select item
          if (this.openEndedSelect) {
            item = (this.selectItems || []).find(item => item[this.itemKey] === data.item)
            if (!item) item = { [this.itemKey]: data.item, [this.itemTitle]: data.item }
          } else {
            item = data.item
          }
          let text = item[this.itemTitle] || item[this.itemKey]
          if (this.fullSchema.type === 'array' && data.index !== this.value.length - 1) text += ',&nbsp;'
          if (this.separator && this.commonFieldProps.value && data.index !== this.commonFieldProps.value.length - 1) text += ',&nbsp;'
          return h('div', {
            class: { 'v-select__selection': true, 'v-select__selection--comma': true, 'v-select__selection--disabled': this.disabled }
          }, [
            this.renderSelectIcon(h, item),
            h('span', { domProps: { innerHTML: text }, class: 'mt-1' })
          ])
        },
        item: (data) => {
          return [this.renderSelectIcon(h, data.item), this.renderSelectCheckbox(h, data.attrs.inputValue), this.renderSelectItem(h, data.item)]
        }
      }

      // checkbox can only be applied on an array
      /* if (this.display === 'checkbox' && this.fullSchema.type === 'array') {
        return [h('v-col', { props, scopedSlots }, [
          ...this.selectItems.map(item => this.renderCheckboxItem(h, item, on))
        ])]
      } */
      let tag = 'v-select'
      if (this.customTag) tag = this.customTag
      else if (this.display) {
        if (this.display === 'autocomplete') tag = 'v-autocomplete'
        if (this.display === 'select') tag = 'v-select'
      } else {
        if (this.fromUrlWithQuery || (this.rawSelectItems && this.rawSelectItems.length > 20)) tag = 'v-autocomplete'
      }

      const props = {
        ...this.commonFieldProps,
        ...this.fullOptions.selectProps,
        validateOnBlur: true, // without this we sometimes get a weird infinite render loop
        clearable: !this.required,
        multiple: this.fullSchema.type === 'array' || !!this.separator,
        itemValue: this.itemKey,
        itemText: this.itemTitle,
        items: this.selectItems || [],
        returnObject: !!this.returnObject,
        loading: this.loading
      }
      if (tag === 'v-autocomplete') {
        props.noDataText = this.fullOptions.messages.noData
        props.placeholder = this.fullOptions.messages.search
        if (this.fromUrlWithQuery) {
          props.filter = () => true
          props.searchInput = this.q
          on['update:search-input'] = (searchUpdate) => { this.q = searchUpdate }
        } else {
          props.filter = (item, q) => (item[this.itemTitle] || item[this.itemKey]).toLowerCase().includes(q.toLowerCase())
        }
      }

      if (this.openEndedSelect) {
        tag = 'v-combobox'
        if (!props.multiple) {
          props.hideSelected = true
          on.input = value => this.input(value || '')
        }
      }

      const children = [...this.renderPropSlots(h)]

      // "select all" action on top of the select
      if (tag === 'v-select' && props.multiple && this.fullOptions.selectAll) {
        const allIsSelected = props.items.length === this.value.length
        children.push(h('template', { slot: 'prepend-item' }, [
          h('v-list-item', [
            h('v-list-item-action', [h('v-checkbox', {
              props: { value: allIsSelected },
              on: { click: () => {
                if (allIsSelected) this.input([])
                else this.input(props.items.map(item => this.returnObject ? item : item[this.itemKey]))
                this.change()
              } }
            })]),
            h('v-list-item-content', [h('v-list-item-title', this.fullOptions.messages.selectAll)])
          ]),
          h('v-divider')
        ]))
      }

      if (this.htmlDescription) {
        children.push(this.renderTooltip(h, 'append-outer'))
      }

      return [h(tag, { props, on, scopedSlots }, children)]
    }
  }
}
