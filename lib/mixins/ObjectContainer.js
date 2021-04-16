import copy from 'fast-copy'

export default {
  data() {
    return {
      currentOneOf: null,
      currentTab: null,
      showCurrentOneOf: true,
      subModels: {}, // a container for objects from root subSchemass and allOfs
      currentStep: 1,
      steps: []
    }
  },
  computed: {
    isObjectContainer() {
      this.debug('compute isObjectContainer')
      if (!this.fullSchema) return
      if (this.fullSchema.type !== 'object' && !Array.isArray(this.fullSchema.items)) return false
      if (this.isSelectProp) return false
      if (this.isFileProp) return false
      return true
    },
    subSchemas() {
      this.debug('compute subSchemas')
      if (!this.fullSchema) return
      return this.fullSchema.oneOf || this.fullSchema.anyOf
    },
    subSchemasConstProp() {
      this.debug('compute subSchemasConstProp')
      if (!this.subSchemas) return
      const props = this.subSchemas[0].properties
      const key = Object.keys(props).find(p => !!props[p].const)
      if (!key) return
      return { ...props[key], key, htmlDescription: this.fullOptions.memMarkdown(props[key].description) }
    },
    subSchemasRequired() {
      this.debug('compute subSchemasRequired')
      if (!this.subSchemas || !this.subSchemasConstProp) return false
      if (this.fullSchema.oneOf) return true
      if (this.fullSchema.anyOf && this.fullSchema.required && this.fullSchema.required.find(r => r === this.oneOfConstProp.key)) return true
    },
    subSchemasRules() {
      this.debug('compute subSchemasRules')
      if (!this.fullSchema) return
      const rules = []
      if (this.subSchemasRequired) rules.push((val) => (val !== undefined && val !== null && val !== '') || this.fullOptions.messages.required)
      return rules
    }
  },
  watch: {
    currentOneOf(newVal, oldVal) {
      this.debug('watched currentOneOf')
      // use this boolean to force removing then re-creating the object property
      // based on the currentOneOf sub schema. If we don't the component is reused and reactivity creates some difficult bugs.
      this.showCurrentOneOf = false
      this.$nextTick(() => {
        this.showCurrentOneOf = true
        if (!this.currentOneOf) this.$set(this.subModels, 'currentOneOf', {})
        else this.input(this.fixProperties(this.value))
        if (this.triggerChangeCurrentOneOf) {
          this.triggerChangeCurrentOneOf = false
          this.change()
        }
      })
    },
    subModels: {
      handler() {
        this.debug('watched subModels')
        this.input(this.fixProperties(this.value))
      },
      deep: true
    }
  },
  methods: {
    isSection(prop) {
      return prop && (prop.properties || prop.allOf || Array.isArray(prop.items)) && prop.title && !prop['x-fromUrl'] && !prop['x-fromData'] && !prop['contentMediaType'] && prop['x-display'] !== 'file'
    },
    initObjectContainer(model) {
      if (this.fullSchema.type !== 'object') return

      // Init subModels for allOf subschemas
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          this.$set(this.subModels, 'allOf-' + i, copy(model))
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
        this.$set(this.subModels, 'currentOneOf', copy(model))
      } else {
        this.$set(this.subModels, 'currentOneOf', {})
      }
    },
    renderStepperStep(h, schema, subModelKey, childProp, step, isLast) {
      if (!childProp) return
      const modelKey = subModelKey || schema.key
      const hasError = this.dedupChildrenWithValidatedErrors.includes(modelKey)
      const props = {
        step,
        editable: step < this.currentStep,
        complete: step < this.currentStep,
        rules: [() => !hasError]
      }
      return [h('v-stepper-step', { props }, [schema.title]), isLast ? null : h('v-divider')]
    },
    renderSection(h, schema, subModelKey, childProp, step, isLast) {
      if (!childProp) return
      const modelKey = subModelKey || schema.key
      const key = 'section-' + modelKey

      if (schema['x-display'] === 'hidden' || (schema.readOnly && this.fullOptions.hideReadOnly)) return [childProp]
      if (this.display === 'expansion-panels') {
        return [h('v-expansion-panel', { key }, [
          h('v-expansion-panel-header', { class: { 'error--text': this.dedupChildrenWithValidatedErrors.includes(modelKey) } }, [schema.title]),
          h('v-expansion-panel-content', { props: { eager: true } }, [childProp])
        ])]
      } else if (this.display === 'tabs') {
        return [
          h('v-tab', { key, props: { href: `#tab-${this.fullOptions.idPrefix}${this.dashKey}-${modelKey}` } }, [
            h('span', { class: { 'error--text': this.dedupChildrenWithValidatedErrors.includes(modelKey) } }, [schema.title])
          ]),
          h('v-tab-item',
            { key, props: { value: `tab-${this.fullOptions.idPrefix}${this.dashKey}-${modelKey}`, eager: true } },
            [h('v-card', { props: { tile: true, flat: true } }, [h('v-card-text', [childProp])])]
          )
        ]
      } else if (this.display === 'stepper' || this.display === 'vertical-stepper') {
        return [
          h('v-stepper-content',
            { key, props: { step, eager: true } },
            [h('v-card', { props: { tile: true, flat: true } }, [
              h('v-card-text', { class: { 'pa-0': true } }, [childProp]),
              isLast ? null : h('v-card-actions', { class: { 'px-0': true } }, [h('v-btn', { props: { color: 'primary' },
                on: { click: () => {
                  console.log(childProp)
                  if (childProp.componentInstance.validate(true)) {
                    this.currentStep += 1
                  }
                } } }, 'continue')])
            ])]
          )
        ]
      } else {
        return [h('v-row', { key, class: `ma-0 ${this.fullOptions.sectionsClass}` }, [
          h('span', {
            class: 'py-2 ' + (this.fullOptions.sectionsTitlesClasses[this.sectionDepth] || this.fullOptions.sectionsTitlesClasses[this.fullOptions.sectionsTitlesClasses.length - 1])
          }, [`${schema.title}\xa0`]),
          childProp
        ])]
      }
    },
    renderChildProp(h, schema, subModelKey, sectionDepth, forceRequired) {
      this.objectContainerChildrenCount += 1
      let wrapper
      if (subModelKey) wrapper = this.subModels
      else if (Array.isArray(this.value)) wrapper = [...this.value]
      else wrapper = { ...this.value }

      const modelKey = subModelKey || schema.key

      // Manage default values
      let value = wrapper[modelKey]
      value = this.fixValueType(value, schema)
      if (value === undefined) {
        value = this.defaultValue(schema)
        if (schema.default !== undefined) value = copy(schema.default)
        if (value !== undefined && value !== null) {
          this.$set(wrapper, modelKey, value)
          if (!subModelKey) this.input(wrapper)
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
          options: { ...this.fullOptions, autofocus: this.fullOptions.autofocus && this.objectContainerChildrenCount === 1 },
          sectionDepth
        },
        class: this.fullOptions.childrenClass,
        scopedSlots: this.childScopedSlots(schema.key),
        key: modelKey,
        on: {
          error: e => this.$emit('error', e),
          input: v => {
            if (v === undefined) {
              // set empty value instead of deleting key in the special case of the parts
              // of a tuple (except the last part), otherwise we move last parts of the array to the beginning of the array
              if (Array.isArray(wrapper) && parseInt(modelKey) < (wrapper.length - 1)) {
                this.$set(wrapper, modelKey, v)
              } else {
                this.$delete(wrapper, modelKey)
              }
            } else {
              this.$set(wrapper, modelKey, v)
            }
            if (!subModelKey) this.input(wrapper)
          },
          change: v => this.change()
        }
      }, this.childSlots(h, schema.key))
    },
    renderObjectContainer(h) {
      if (!this.isObjectContainer) return
      if ([undefined, null].includes(this.value)) return []

      const flatChildren = []
      this.objectContainerChildrenCount = 0
      const sections = []
      if (this.fullSchema.properties) {
        this.fullSchema.properties.forEach((schema) => {
          if (this.isSection(schema)) {
            sections.push({ schema, subModelKey: null, forceRequired: false })
          } else {
            flatChildren.push(this.renderChildProp(h, schema, null, this.sectionDepth, false))
          }
        })
      }
      if (Array.isArray(this.fullSchema.items)) {
        this.fullSchema.items.forEach((schema, i) => {
          const forceRequired = this.value.length > i || (this.fullSchema.minItems && this.fullSchema.minItems > i)
          if (this.isSection(schema)) {
            sections.push({ schema, subModelKey: null, forceRequired })
          } else {
            flatChildren.push(this.renderChildProp(h, schema, null, this.sectionDepth, forceRequired))
          }
        })
      }
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          const schema = { ...allOf, type: 'object', key: '' + i }
          if (this.isSection(allOf)) {
            sections.push({ schema, subModelKey: 'allOf-' + i, forceRequired: false })
          } else {
            flatChildren.push(this.renderChildProp(h, schema, 'allOf-' + i, this.sectionDepth))
          }
        })
      }

      let sectionsChildren = []
      let stepperSteps = []
      sections.forEach((section, i) => {
        const childProp = this.renderChildProp(h, section.schema, section.subModelKey, this.sectionDepth + 1, section.forceRequired)
        sectionsChildren = sectionsChildren.concat(this.renderSection(h, section.schema, section.subModelKey, childProp, i + 1, i === sections.length - 1))
        if (this.display === 'stepper' || this.display === 'vertical-stepper') stepperSteps = stepperSteps.concat(this.renderStepperStep(h, section.schema, section.subModelKey, childProp, i + 1, i === sections.length - 1))
      })

      if (this.display === 'expansion-panels' && sectionsChildren.length) {
        const props = { ...this.fullOptions.expansionPanelsProps, ...this.fullSchema['x-props'] }
        sectionsChildren = [h('v-expansion-panels', { props }, sectionsChildren)]
      }
      if (this.display === 'tabs' && sectionsChildren.length) {
        const props = { ...this.fullOptions.tabsProps, ...this.fullSchema['x-props'] }
        if (this.currentTab && this.dedupChildrenWithValidatedErrors.includes(this.currentTab)) {
          props.sliderColor = 'error'
        }
        sectionsChildren = [h('v-tabs', { props, on: { change: value => { this.currentTab = value.split('-').pop() } } }, sectionsChildren)]
      }
      if (this.display === 'stepper' && sectionsChildren.length) {
        const props = { ...this.fullOptions.stepperProps, ...this.fullSchema['x-props'], value: this.currentStep }
        sectionsChildren = [h('v-stepper', { props, style: 'width: 100%;', on: { change: value => { this.currentStep = value } } }, [
          h('v-stepper-header', {}, stepperSteps),
          h('v-stepper-items', {}, sectionsChildren)
        ])]
      }
      if (this.display === 'vertical-stepper' && sectionsChildren.length) {
        const props = { ...this.fullOptions.verticallStepperProps, ...this.fullSchema['x-props'], vertical: true, value: this.currentStep }
        const stepperChildren = []
        for (let i = 0; i < sectionsChildren.length; i++) {
          stepperChildren.push(stepperSteps[i * 2])
          stepperChildren.push(sectionsChildren[i])
        }
        sectionsChildren = [h('v-stepper', { props, on: { change: value => { this.currentStep = value } } }, stepperChildren)]
      }

      if (this.subSchemas && this.subSchemas.length) {
        const props = {
          ...this.commonFieldProps,
          ...((this.subSchemasConstProp && this.subSchemasConstProp['x-props']) || {}),
          disabled: this.subSchemasConstProp && this.subSchemasConstProp.readOnly,
          value: this.currentOneOf,
          label: (this.subSchemasConstProp && this.subSchemasConstProp.title) || this.fullSchema.title,
          items: this.subSchemas
            .filter(item => !item['x-if'] || !!this.parsePath(this.watchKey(item['x-if'])))
            .filter(item => item.properties && item.properties[this.subSchemasConstProp.key]),
          required: this.subSchemasRequired,
          clearable: !this.subSchemasRequired,
          itemValue: item => item.properties[this.subSchemasConstProp.key].const,
          itemText: item => item.title || item.properties[this.subSchemasConstProp.key].const,
          rules: this.subSchemasRules,
          returnObject: true
        }
        const on = {
          input: value => {
            this.currentOneOf = value
            this.triggerChangeCurrentOneOf = true
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
