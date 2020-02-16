export default {
  computed: {
    isColorProp() {
      return this.fullSchema.type === 'string' && this.fullSchema.format === 'hexcolor'
    }
  },
  methods: {
    renderColorProp(h) {
      if (!this.isColorProp) return

      const children = [this.renderTooltip(h, 'append')]
      if (this.fullSchema['x-display'] === 'color-picker') {
        children.push(h('v-menu', {
          props: { closeOnContentClick: false, closeOneClick: true, direction: 'bottom', offsetY: true },
          scopedSlots: {
            activator: ({ on }) => h('div', { on, style: `background-color: ${this.value};margin-left: 10px;`, class: this.value ? 'color-picker-trigger' : 'color-picker-trigger color-picker-trigger-empty' }),
            default: () => h('color-picker', {
              props: { value: this.value || '', presetColors: this.options.colors.swatches },
              on: { input: val => this.input(val.hex) }
            })
          }
        }))
      } else {
        children.push(h('swatches', {
          props: { value: this.value || '', disabled: this.disabled, colors: this.options.colors, triggerStyle: { width: '36px', height: '36px' }, shapes: 'circles' },
          on: { input: value => this.input(value) },
          style: 'margin-left: 10px;'
        }))
      }
      return [h('v-input', {
        props: { name: this.fullKey, label: this.label, required: this.required, rules: this.rules, disabled: this.disabled }
      }, children)]
    }
  }
}
