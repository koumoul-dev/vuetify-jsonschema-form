export default {
  methods: {
    renderColorProp(h) {
      if (this.fullSchema.type !== 'string' || this.fullSchema.format !== 'hexcolor') return

      const children = []
      if (this.fullSchema['x-display'] === 'color-picker') {
        children.push(h('v-menu', {
          props: { closeOnContentClick: false, closeOneClick: true, direction: 'bottom', offsetY: true },
          scopedSlots: {
            activator: ({ on }) => h('div', { on, style: `background-color: ${this.modelWrapper[this.modelKey]};margin-left: 10px;`, class: this.modelWrapper[this.modelKey] ? 'color-picker-trigger' : 'color-picker-trigger color-picker-trigger-empty' }),
            default: () => h('color-picker', {
              props: { value: this.modelWrapper[this.modelKey], presetColors: this.options.colors.swatches },
              on: { input: val => this.input(val.hex) }
            })
          }
        }))
      } else {
        children.push(h('swatches', {
          props: { value: this.modelWrapper[this.modelKey], disabled: this.disabled, colors: this.options.colors, triggerStyle: { width: '36px', height: '36px' }, shapes: 'circles' },
          on: { input: value => this.input(value) },
          style: 'margin-left: 10px;'
        }))
      }
      return h('v-input', {
        props: { name: this.fullKey, label: this.label, required: this.required, rules: this.rules, disabled: this.disabled }
      }, children)
    }
  }
}
