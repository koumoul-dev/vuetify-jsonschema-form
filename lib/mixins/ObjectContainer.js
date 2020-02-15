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
    renderChildProp(h, prop, subModelKey, sectionDepth) {
      return h('property', {
        props: {
          schema: prop,
          modelWrapper: subModelKey ? this.subModels : this.modelWrapper[this.modelKey],
          modelRoot: this.modelRoot,
          modelKey: subModelKey || prop.key,
          parentKey: `${this.fullKey}.`,
          required: !!(this.fullSchema.required && this.fullSchema.required.includes(prop.key)),
          options: this.options,
          sectionDepth
        },
        scopedSlots: this.childScopedSlots(prop.key),
        on: this.transmitOn
      }, this.childSlots(h, prop.key))
    },
    renderObjectContainer(h) {
      if (this.fullSchema.type !== 'object') return

      this.transmitOn = {
        error: e => this.$emit('error', e),
        input: err => this.$emit('input', err),
        change: err => this.$emit('change', err)
      }

      const flatChildren = []
      let sectionsChildren = []
      this.fullSchema.properties.forEach(prop => {
        if (prop.properties && prop.title && !prop['x-fromUrl'] && !prop['x-fromData']) {
          sectionsChildren = sectionsChildren.concat(this.renderSection(h, prop.title, prop.key, this.renderChildProp(h, prop, null, this.sectionDepth + 1)))
        } else {
          flatChildren.push(this.renderChildProp(h, prop, null, this.sectionDepth))
        }
      })
      if (this.fullSchema.allOf) {
        this.fullSchema.allOf.forEach((allOf, i) => {
          if (allOf.properties && allOf.title && !allOf['x-fromUrl'] && !allOf['x-fromData']) {
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

      /*
      <v-select

        v-model="currentOneOf"
        :items="fullSchema.oneOf"
        :disabled="disabled"
        :item-value="item => {return oneOfConstProp ? item.properties[oneOfConstProp.key].const : item.title}"
        :label="oneOfConstProp ? (oneOfConstProp.title || oneOfConstProp.key) : 'Type'"
        :required="oneOfRequired"
        :clearable="!oneOfRequired"
        :rules="oneOfRules"
        item-text="title"
        return-object
        @change="change"
        @input="input"
      >
        <tooltip slot="append-outer" :options="options" :html-description="oneOfConstProp && oneOfConstProp.htmlDescription" />
      </v-select>
      */

      /* // title block
      if (this.fullSchema.title) {
        children.push(h('span', {
          style: this.foldable ? 'cursor:pointer;' : '',
          class: 'title',
          on: { click: () => { this.folded = !this.folded } }
        }, [
          `${this.fullSchema.title}\xa0`,
          this.foldable && this.folded && h('v-icon', this.options.icons.dropdown),
          this.foldable && !this.folded && h('v-icon', this.options.icons.dropup)
        ]))
      }

      // all sub properties in a foldable container below the title
      children.push(h('v-slide-y-transition', [
        h('v-layout', {
          attrs: { row: true, wrap: true },
          class: 'ma-0',
          style: this.foldable && this.folded && 'display: none;'
        }, [this.fullSchema.description && h('div', { class: 'xs12', domProps: { innerHTML: this.htmlDescription } })]
          .concat(this.fullSchema.properties.map(childProp => ))
        )
        // TODO propagate slots to children
      ])) */

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
