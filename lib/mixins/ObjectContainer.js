export default {
  data() {
    return {
      currentOneOf: null,
      currentTab: null,
      showCurrentOneOf: true,
      subModels: {} // a container for objects from root subSchemass and allOfs
    }
  },
  computed: {
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
      if (this.subSchemasRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.fullOptions.messages.required)
      return rules
    }
  },
  watch: {
    currentOneOf(newVal, oldVal) {
      // use this boolean to force removing then re-creating the object property
      // based on the currentOneOf sub schema. If we don't the component is reused and reactivity creates some difficult bugs.
      this.showCurrentOneOf = false
      this.$nextTick(() => {
        this.showCurrentOneOf = true
        if (!this.currentOneOf) this.$set(this.subModels, 'currentOneOf', {})
        else this.fixProperties()
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      })
    },
    subModels: {
      handler() {
        this.fixProperties()
      },
      deep: true
    }
  },
  methods: {
    isSection(prop) {
      return (prop.properties || prop.allOf || Array.isArray(prop.items)) && prop.title && !prop['x-fromUrl'] && !prop['x-fromData'] && !prop['contentMediaType'] && prop['x-display'] !== 'file'
    },
    initObjectContainer(model) {
      if (this.fullSchema.type !== 'object') return

      // Init subModels for allOf subschemas
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          this.$set(this.subModels, 'allOf-' + i, JSON.parse(JSON.stringify(model)))
        })
      }

      // Case of a sub type selection based on a subSchemas
      this.currentOneOf = null
      if (this.subSchemas && !this.currentOneOf && this.subSchemasConstProp) {
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
    renderSection(h, schema, subModelKey, childProp) {
      if (!childProp) return
      const modelKey = subModelKey || schema.key

      if (schema['x-display'] === 'hidden' || (schema.readOnly && this.fullOptions.hideReadOnly)) return [childProp]
      if (this.display === 'expansion-panels') {
        return [h('v-expansion-panel', [
          h('v-expansion-panel-header', { class: { 'error--text': this.childrenInputs[modelKey] && this.childrenInputs[modelKey].hasValidatedChildError } }, [schema.title]),
          h('v-expansion-panel-content', { props: { eager: true } }, [childProp])
        ])]
      } else if (this.display === 'tabs') {
        return [
          h('v-tab', { props: { href: `#tab-${this.fullOptions.idPrefix}${this.dashKey}-${modelKey}` } }, [
            h('span', { class: { 'error--text': this.childrenInputs[modelKey] && this.childrenInputs[modelKey].hasValidatedChildError } }, [schema.title])
          ]),
          h('v-tab-item', { props: { value: `tab-${this.fullOptions.idPrefix}${this.dashKey}-${modelKey}`, eager: true } }, [h('v-card', { props: { tile: true, flat: true } }, [h('v-card-text', [childProp])])])
        ]
      } else {
        return [h('v-row', { class: `ma-0 ${this.fullOptions.sectionsClass}` }, [
          h('span', {
            class: 'py-2 ' + (this.fullOptions.sectionsTitlesClasses[this.sectionDepth] || this.fullOptions.sectionsTitlesClasses[this.fullOptions.sectionsTitlesClasses.length - 1])
          }, [`${schema.title}\xa0`]),
          childProp
        ])]
      }
    },
    renderChildProp(h, schema, subModelKey, sectionDepth, forceRequired) {
      const wrapper = subModelKey ? this.subModels : this.value
      const modelKey = subModelKey || schema.key

      // Manage default values
      let value = wrapper[modelKey]
      if (value === undefined) {
        value = this.defaultValue(schema)
        if (schema.default !== undefined) value = JSON.parse(JSON.stringify(schema.default))
        if (value !== undefined && value !== null) {
          this.$set(wrapper, modelKey, value)
          this.$emit('input', this.value)
        }
      }
      return h('v-jsf', {
        props: {
          schema: { readOnly: this.fullSchema.readOnly, ...schema },
          value,
          modelRoot: this.modelRoot || this.value,
          modelKey,
          parentKey: `${this.fullKey}.`,
          required: forceRequired || !!(this.fullSchema.required && this.fullSchema.required.includes(schema.key)),
          options: this.fullOptions,
          sectionDepth
        },
        class: this.fullOptions.childrenClass,
        scopedSlots: this.childScopedSlots(schema.key),
        on: {
          error: e => this.$emit('error', e),
          input: v => {
            if (v === null || v === undefined || v === '') {
              // set empty value instead of deleting key in the special case of he parts
              // of a tuple (except the last part), otherwise we move last parts of the array to the beginning of the array
              if (Array.isArray(wrapper) && parseInt(modelKey) < (wrapper.length - 1)) {
                this.$set(wrapper, modelKey, v)
              } else {
                this.$delete(wrapper, modelKey)
              }
            } else {
              this.$set(wrapper, modelKey, v)
            }
            this.$emit('input', this.value)
          },
          change: v => this.$emit('change', this.value)
        }
      }, this.childSlots(h, schema.key))
    },
    renderObjectContainer(h) {
      if (this.fullSchema.type !== 'object' && !Array.isArray(this.fullSchema.items)) return
      this.isObjectContainer = true
      if ([undefined, null].includes(this.value)) return []

      const flatChildren = []
      let sectionsChildren = []
      if (this.fullSchema.properties) {
        this.fullSchema.properties.forEach(prop => {
          if (this.isSection(prop)) {
            const childProp = this.renderChildProp(h, prop, null, this.sectionDepth + 1)
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, prop, null, childProp))
          } else {
            flatChildren.push(this.renderChildProp(h, prop, null, this.sectionDepth))
          }
        })
      }
      if (Array.isArray(this.fullSchema.items)) {
        this.fullSchema.items.forEach((item, i) => {
          const schema = { ...item, key: '' + i }
          const forceRequired = this.value.length > i || (this.fullSchema.minItems && this.fullSchema.minItems > i)
          if (this.isSection(item)) {
            const childProp = this.renderChildProp(h, schema, null, this.sectionDepth + 1, forceRequired)
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, schema, null, childProp))
          } else {
            flatChildren.push(this.renderChildProp(h, schema, null, this.sectionDepth, forceRequired))
          }
        })
      }
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          const schema = { ...allOf, type: 'object', key: '' + i }
          if (this.isSection(allOf)) {
            const childProp = this.renderChildProp(h, schema, 'allOf-' + i, this.sectionDepth + 1)
            sectionsChildren = sectionsChildren.concat(this.renderSection(h, schema, 'allOf-' + i, childProp))
          } else {
            flatChildren.push(this.renderChildProp(h, schema, 'allOf-' + i, this.sectionDepth))
          }
        })
      }

      if (this.display === 'expansion-panels' && sectionsChildren.length) {
        const props = { ...this.fullOptions.expansionPanelsProps, ...this.fullSchema['x-props'] }
        sectionsChildren = [h('v-expansion-panels', { props }, sectionsChildren)]
      }
      if (this.display === 'tabs' && sectionsChildren.length) {
        const props = { ...this.fullOptions.tabsProps, ...this.fullSchema['x-props'] }
        if (this.currentTab && this.childrenInputs[this.currentTab] && this.childrenInputs[this.currentTab].hasValidatedChildError) {
          props.sliderColor = 'error'
        }
        sectionsChildren = [h('v-tabs', { props, on: { change: value => { this.currentTab = value.split('-').pop() } } }, sectionsChildren)]
      }

      if (this.subSchemas && this.subSchemas.length) {
        const props = {
          ...this.commonFieldProps,
          value: this.currentOneOf,
          label: (this.subSchemasConstProp && this.subSchemasConstProp.title) || this.fullSchema.title,
          items: this.subSchemas.filter(item => item.properties && item.properties[this.subSchemasConstProp.key]),
          required: this.subSchemasRequired,
          clearable: !this.subSchemasRequired,
          itemValue: item => item.properties[this.subSchemasConstProp.key].const,
          itemText: 'title',
          rules: this.subSchemasRules,
          returnObject: true
        }
        const on = {
          input: value => {
            this.currentOneOf = value
          }
        }
        flatChildren.push(h('v-select', { props, on }, [this.renderTooltip(h, 'append-outer')]))
        if (this.currentOneOf && this.showCurrentOneOf) {
          flatChildren.push(this.renderChildProp(h, { ...this.currentOneOf, type: 'object', title: null }, 'currentOneOf', this.sectionDepth + 1))
        }
      }
      return [h('v-row', { class: `ma-0 ${this.fullOptions.objectContainerClass}` }, [
        this.fullSchema.description && h('v-col', { props: { cols: 12 }, class: { 'pa-0': true }, domProps: { innerHTML: this.htmlDescription } })]
        .concat(flatChildren).concat(sectionsChildren))
      ]
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
        .filter(slot => slot.startsWith('custom-') || slot.startsWith(`${childKey}.`) || slot.startsWith(`${childKey}-`) || slot === childKey)
        .reduce((a, slot) => {
          let childSlot = 'default'
          if (slot.startsWith(`${childKey}.`)) childSlot = slot.replace(`${childKey}.`, '')
          if (slot.startsWith(`${childKey}-`)) childSlot = slot.replace(`${childKey}-`, '')
          if (slot.startsWith(`custom-`)) childSlot = slot
          a[childSlot] = this.$scopedSlots[slot]
          return a
        }, {})
    }
  }
}
