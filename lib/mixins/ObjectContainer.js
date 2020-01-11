export default {
  data() {
    return {
      folded: true
    }
  },
  computed: {
    foldable() {
      return this.options.autoFoldObjects && this.parentKey && this.fullSchema.title
    }
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
    }
  }
}
