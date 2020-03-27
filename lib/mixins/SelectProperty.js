import selectUtils from '../utils/select'
const matchAll = require('match-all')

export default {
  data() {
    return {
      rawSelectItems: null,
      selectItems: null,
      q: '',
      fromUrlParams: {}
    }
  },
  computed: {
    isSelectProp() {
      if (this.fullSchema['x-display'] === 'list') return false
      if (this.fullSchema.enum) return true
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.enum) return true
      if (this.oneOfSelect) return true
      if (this.fromUrl) return true
      if (this.fromData) return true
      return false
    },
    oneOfSelect() {
      if (this.fullSchema.type === 'array' && ['string', 'integer', 'number'].includes(this.fullSchema.items.type) && this.fullSchema.items.oneOf) return true
      if (['string', 'integer', 'number'].includes(this.fullSchema.type) && this.fullSchema.oneOf) return true
      return false
    },
    fromUrl() {
      return this.fullSchema['x-fromUrl']
    },
    fromUrlWithQuery() {
      return !!(this.fullSchema['x-fromUrl'] && this.fullSchema['x-fromUrl'].indexOf('{q}') !== -1)
    },
    fromUrlKeys() {
      // Look for variable parts in the URL used to fetch data
      if (!this.fullSchema['x-fromUrl']) return null
      return matchAll(this.fullSchema['x-fromUrl'], /\{(.*?)\}/g).toArray().filter(key => key !== 'q')
    },
    fromData() {
      return this.fullSchema['x-fromData']
    },
    itemKey() {
      return this.fullSchema['x-itemKey'] || 'key'
    },
    itemTitle() {
      return this.fullSchema['x-itemTitle'] || 'title'
    },
    itemIcon() {
      return this.fullSchema['x-itemIcon'] || (this.fullSchema['x-display'] === 'icon' ? this.itemKey : null)
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
      },
      immediate: true
    }
  },
  methods: {
    initSelectProp(model) {
      // Case of an auto-complete field already defined
      if (this.fromUrlWithQuery && model && model[this.itemTitle] !== undefined) {
        this.q = model[this.itemTitle]
      }
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
      const watchPrefix = this.modelRoot ? 'modelRoot.' : 'value.'
      // Case of a select based on an array somewhere in the data
      if (this.fullSchema['x-fromData']) {
        this.$watch(watchPrefix + this.fullSchema['x-fromData'], (val) => {
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
            this.$watch(watchPrefix + key, (val) => {
              this.fromUrlParams[key] = val
              this.fetchSelectItems()
            }, { immediate: true })
          }
        })
      }
    },
    fetchSelectItems() {
      if (!this.fullOptions.httpLib) return this.$emit('error', 'No http lib found to perform ajax request')
      let url = this.fullSchema['x-fromUrl'].replace('{q}', this.q || '')
      for (const key of this.fromUrlKeys) {
        // URL parameters are incomplete
        if (this.fromUrlParams[key] === undefined) return
        else url = url.replace(`{${key}}`, this.fromUrlParams[key])
      }
      this.loading = true
      this.fullOptions.httpLib.get(url)
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
    updateSelectItems() {
      const selectItems = selectUtils.getSelectItems(this.rawSelectItems, this.fullSchema, this.itemKey, this.itemIcon)
      if (this.fullSchema['x-display'] === 'list') {
        this.$emit('input', selectUtils.fillList(this.fullSchema, this.value, selectItems, this.itemKey))
      } else {
        selectUtils.fillSelectItems(this.fullSchema, this.value, selectItems, this.itemKey)
      }

      // we check for actual differences in order to prevent infinite loops
      if (JSON.stringify(selectItems) !== JSON.stringify(this.selectItems)) {
        this.selectItems = selectItems
      }
    },
    renderSelectIcon(h, item) {
      if (!this.itemIcon) return
      const itemIcon = item[this.itemIcon]
      if (!itemIcon) return
      let iconChild = h('v-icon', null, itemIcon)
      if (itemIcon.startsWith('http://') || itemIcon.startsWith('https://')) {
        iconChild = h('img', { domProps: { src: itemIcon }, style: 'height:100%;width:100%;' })
      } else if (itemIcon.startsWith('<?xml') || itemIcon.startsWith('<svg')) {
        iconChild = h('div', { domProps: { innerHTML: itemIcon } })
      }
      return h('v-avatar', { props: { tile: true, size: 20 }, class: 'mr-2' }, [iconChild])
    },
    renderSelectItem(h, item) {
      const text = item[this.itemTitle] || item[this.itemKey]
      if (this.fullOptions.vuetifyVersion === 1) {
        return h('v-list-tile-content', [h('v-list-tile-title', text)])
      } else {
        return h('v-list-item-content', [h('v-list-item-title', text)])
      }
    },
    renderSelectProp(h) {
      if (!this.isSelectProp) return
      const props = {
        ...this.commonFieldProps,
        items: this.selectItems,
        clearable: !this.required,
        multiple: this.fullSchema.type === 'array',
        itemValue: this.itemKey,
        returnObject: this.fullSchema.type === 'object' || (this.fullSchema.items && this.fullSchema.items.type === 'object')
      }
      const on = {
        input: value => this.input(value),
        change: value => this.change(value)
      }
      const scopedSlots = {
        selection: (data) => {
          let text = data.item[this.itemTitle] || data.item[this.itemKey]
          if (this.fullSchema.type === 'array' && data.index !== this.value.length - 1) text += ',&nbsp;'
          return h('div', {
            class: 'v-select__selection v-select__selection--comma'
          }, [
            this.renderSelectIcon(h, data.item),
            h('span', { domProps: { innerHTML: text }, class: 'mt-1' })
          ])
        },
        item: (data) => {
          return [this.renderSelectIcon(h, data.item), this.renderSelectItem(h, data.item)]
        }
      }
      let tag = 'v-select'
      if (this.fromUrlWithQuery || (this.rawSelectItems && this.rawSelectItems.length > 20)) {
        tag = 'v-autocomplete'
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
      return [h(tag, { props, on, scopedSlots }, [this.renderTooltip(h, 'append-outer')])]
    }
  }
}
