export default {
  data() {
    return {
      folded: true,
      currentOneOf: null,
      showCurrentOneOf: true,
      subModels: {} // a container for objects from root subSchemass and allOfs
    }
  },
  computed: {
    foldable() {
      return this.fullOptions.autoFoldObjects && this.parentKey && this.fullSchema.title
    },
    subSchemas() {
      return this.fullSchema.oneOf || this.fullSchema.anyOf
    },
    subSchemasConstProp() {
      if (!this.subSchemas) return
      const props = this.subSchemas[0].properties
      const key = Object.keys(props).find(p => !!props[p].const)
      if (!key) return
      return { ...props[key], key, htmlDescription: this.fullOptions.markdown(props[key].description || '') }
    },
    subSchemasRequired() {
      if (!this.subSchemas || !this.subSchemasConstProp) return false
      if (this.fullSchema.oneOf) return true
      if (this.fullSchema.anyOf && this.fullSchema.required && this.fullSchema.required.find(r => r === this.oneOfConstProp.key)) return true
    },
    subSchemasRules() {
      const rules = []
      if (this.subSchemasRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.fullOptions.requiredMessage)
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

      // Case of a sub type selection based on a subSchemas
      this.currentOneOf = null
      if (this.fullSchema.type === 'object' && this.subSchemas && !this.currentOneOf && this.subSchemasConstProp) {
        if (model && model[this.subSchemasConstProp.key]) {
          this.currentOneOf = this.subSchemas.find(item => item.properties[this.subSchemasConstProp.key].const === model[this.subSchemasConstProp.key])
        } else if (this.fullSchema.default) {
          this.currentOneOf = this.subSchemas.find(item => item.properties[this.subSchemasConstProp.key].const === this.fullSchema.default[this.subSchemasConstProp.key])
        }
      }

      // Init subModel for current subSchemas
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
        return [h('v-layout', { attrs: { row: true, wrap: true }, class: `ma-0 ${this.fullOptions.sectionsClasses}` }, [
          h('span', {
            // style: this.foldable ? 'cursor:pointer;' : '',
            class: 'py-2 ' + (this.fullOptions.sectionsTitlesClasses[this.sectionDepth] || this.fullOptions.sectionsTitlesClasses[this.fullOptions.sectionsTitlesClasses.length - 1])
            // on: { click: () => { this.folded = !this.folded } }
          }, [
            `${title}\xa0`,
            this.foldable && this.folded && h('v-icon', this.fullOptions.icons.dropdown),
            this.foldable && !this.folded && h('v-icon', this.fullOptions.icons.dropup)
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
      return h('v-jsf', {
        props: {
          schema: { readOnly: this.fullSchema.readOnly, ...schema },
          value,
          modelRoot: this.modelRoot || this.value,
          modelKey,
          parentKey: `${this.fullKey}.`,
          required: !!(this.fullSchema.required && this.fullSchema.required.includes(schema.key)),
          options: this.fullOptions,
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

      if (this.subSchemas && this.subSchemas.length) {
        const props = {
          ...this.commonFieldProps,
          value: this.currentOneOf,
          label: (this.subSchemasConstProp && this.subSchemasConstProp.title) || this.fullSchema.title,
          items: this.subSchemas.filter(item => item.properties && item.properties[this.subSchemasConstProp.key]),
          required: this.subSchemasRequired,
          clearable: !this.subSchemasRequired,
          itemValue: item => this.subSchemasConstProp ? item.properties[this.subSchemasConstProp.key].const : item.title,
          itemText: 'title',
          rules: this.subSchemasRules,
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
