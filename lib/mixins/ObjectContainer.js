export default {
  data() {
    return {
      folded: true,
      currentOneOf: null,
      showCurrentOneOf: true,
      subModels: {} // a container for objects from root oneOfs and allOfs
    }
  },
  computed: {
    foldable() {
      return this.options.autoFoldObjects && this.parentKey && this.fullSchema.title
    },
    oneOfConstProp() {
      if (!this.fullSchema.oneOf) return
      const props = this.fullSchema.oneOf[0].properties
      const key = Object.keys(props).find(p => !!props[p].const)
      if (!key) return
      return { ...props[key], key, htmlDescription: this.md.render(props[key].description || '') }
    },
    oneOfRequired() {
      return !!(this.oneOfConstProp && this.fullSchema && this.fullSchema.required && this.fullSchema.required.find(r => r === this.oneOfConstProp.key))
    },
    oneOfRules() {
      const rules = []
      if (this.oneOfRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.options.requiredMessage)
      return rules
    }
  },
  watch: {
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
  methods: {
    isSection(prop) {
      return (prop.properties || Array.isArray(prop.items)) && prop.title && !prop['x-fromUrl'] && !prop['x-fromData']
    },
    initObjectContainer(model) {
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
    },
    renderSection(h, title, childKey, childProp) {
      if (this.fullSchema['x-display'] === 'expansion-panels') {
        return [h('v-expansion-panel', [
          h('v-expansion-panel-header', { class: { 'error--text': this.validated && this.childrenErrors[childKey] } }, [title]),
          h('v-expansion-panel-content', { props: { eager: true } }, [childProp])
        ])]
      } else if (this.fullSchema['x-display'] === 'tabs') {
        return [
          h('v-tab', { props: { href: `#tab-${this.fullKey}-${childKey}` } }, [
            h('span', { class: { 'error--text': this.validated && this.childrenErrors[childKey] } }, [title])
          ]),
          h('v-tab-item', { props: { value: `tab-${this.fullKey}-${childKey}`, eager: true } }, [h('v-card', { props: { tile: true, flat: true } }, [h('v-card-text', [childProp])])])
        ]
      } else {
        return [h('v-layout', { attrs: { row: true, wrap: true }, class: 'ma-0' }, [
          h('span', {
          // style: this.foldable ? 'cursor:pointer;' : '',
            class: 'pa-2 ' + (['headline', 'title', 'subtitle-1', 'subtitle-2'][this.sectionDepth] || 'subtitle-2')
          // on: { click: () => { this.folded = !this.folded } }
          }, [
            `${title}\xa0`,
            this.foldable && this.folded && h('v-icon', this.options.icons.dropdown),
            this.foldable && !this.folded && h('v-icon', this.options.icons.dropup)
          ]),
          childProp
        ])]
      }
    },
    renderChildProp(h, schema, subModelKey, sectionDepth) {
      const wrapper = subModelKey ? this.subModels : this.value
      const modelKey = subModelKey || schema.key

      // Manage default values
      let value = wrapper[modelKey]
      if (value === undefined) {
        value = this.defaultValue(schema)
        if (schema.default !== undefined) value = JSON.parse(JSON.stringify(schema.default))
      }
      return h('property', {
        props: {
          schema: { readOnly: this.fullSchema.readOnly, ...schema },
          value,
          modelRoot: this.modelRoot,
          modelKey,
          parentKey: `${this.fullKey}.`,
          required: !!(this.fullSchema.required && this.fullSchema.required.includes(schema.key)),
          options: this.options,
          sectionDepth
        },
        scopedSlots: this.childScopedSlots(schema.key),
        on: {
          error: e => this.$emit('error', e),
          input: v => {
            if (v === null || v === undefined || v === '') this.$delete(wrapper, modelKey)
            else this.$set(wrapper, modelKey, v)
            this.$emit('input', this.value)
          },
          change: v => this.$emit('change', this.value)
        }
      }, this.childSlots(h, schema.key))
    },
    renderObjectContainer(h) {
      if (this.fullSchema.type !== 'object' && !Array.isArray(this.fullSchema.items)) return

      const flatChildren = []
      let sectionsChildren = []
      if (this.fullSchema.properties) {
        this.fullSchema.properties.forEach(prop => {
          if (this.isSection(prop)) {
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, prop.title, prop.key, this.renderChildProp(h, prop, null, this.sectionDepth + 1)))
          } else {
            flatChildren.push(this.renderChildProp(h, prop, null, this.sectionDepth))
          }
        })
      }
      if (Array.isArray(this.fullSchema.items)) {
        this.fullSchema.items.forEach((item, i) => {
          if (this.isSection(item)) {
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, item.title, i, this.renderChildProp(h, { ...item, key: i }, null, this.sectionDepth + 1)))
          } else {
            flatChildren.push(this.renderChildProp(h, { ...item, key: i }, null, this.sectionDepth))
          }
        })
      }
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          if (this.isSection(allOf)) {
            const childProp = this.renderChildProp(h, { ...allOf, type: 'object' }, 'allOf-' + i, this.sectionDepth + 1)
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, allOf.title, 'allOf-' + i, childProp))
          } else {
            flatChildren.push(this.renderChildProp(h, { ...allOf, type: 'object' }, null, this.sectionDepth))
          }
        })
      }

      if (this.fullSchema['x-display'] === 'expansion-panels' && sectionsChildren.length) {
        const props = { ...this.fullSchema['x-props'] }
        sectionsChildren = [h('v-expansion-panels', { props }, sectionsChildren)]
      }
      if (this.fullSchema['x-display'] === 'tabs' && sectionsChildren.length) {
        const props = { ...this.fullSchema['x-props'] }
        if (this.validated && this.hasError) props.sliderColor = 'error'
        sectionsChildren = [h('v-tabs', { props }, sectionsChildren)]
      }

      if (this.fullSchema.oneOf && this.fullSchema.oneOf.length) {
        const props = {
          ...this.commonFieldProps,
          value: this.currentOneOf,
          label: this.oneOfConstProp ? (this.oneOfConstProp.title || this.oneOfConstProp.key) : 'Type',
          items: this.fullSchema.oneOf,
          required: this.oneOfRequired,
          clearable: !this.oneOfRequired,
          itemValue: item => this.oneOfConstProp ? item.properties[this.oneOfConstProp.key].const : item.title,
          itemText: 'title',
          rules: this.oneOfRules,
          returnObject: true
        }
        const on = { input: value => { this.currentOneOf = value } }
        flatChildren.push(h('v-select', { props, on }, [this.renderTooltip(h, 'append-outer')]))
        flatChildren.push(this.renderChildProp(h, { ...this.currentOneOf, type: 'object', title: null }, 'currentOneOf', this.sectionDepth + 1))
      }
      return [this.fullSchema.description && h('div', { class: 'xs12', domProps: { innerHTML: this.htmlDescription } })]
        .concat(flatChildren).concat(sectionsChildren)
    },
    // pass an  extract of $slots from current container to a child by matching then removing the prefix
    childSlots(h, childKey) {
      return Object.keys(this.$slots)
        .filter(slot => slot.startsWith(`${childKey}.`) || slot.startsWith(`${childKey}-`))
        .map(slot => {
          const childSlot = slot.startsWith(`${childKey}.`) ? slot.replace(`${childKey}.`, '') : slot.replace(`${childKey}-`, '')
          return h('template', { slot: childSlot }, this.$slots[slot])
        })
    },
    childScopedSlots(childKey) {
      return Object.keys(this.$scopedSlots)
        .filter(slot => slot.startsWith(`${childKey}.`) || slot.startsWith(`${childKey}-`) || slot === childKey)
        .reduce((a, slot) => {
          let childSlot = 'default'
          if (slot.startsWith(`${childKey}.`)) childSlot = slot.replace(`${childKey}.`, '')
          if (slot.startsWith(`${childKey}-`)) childSlot = slot.replace(`${childKey}-`, '')
          a[childSlot] = this.$scopedSlots[slot]
          return a
        }, {})
    }
  }
}
