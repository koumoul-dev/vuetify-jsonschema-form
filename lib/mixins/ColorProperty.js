export default {
  computed: {
    isColorProp() {
      return this.fullSchema.type === 'string' && (this.fullSchema.format === 'hexcolor' || this.display === 'color-picker')
    }
  },
  methods: {
    renderColorProp(h) {
      if (!this.isColorProp) return

      const children = [this.renderTooltip(h, 'append')]

      children.push(h('v-menu', {
        props: { closeOnContentClick: false, closeOneClick: true, direction: 'bottom', offsetY: true },
        scopedSlots: {
          activator: ({ on }) => h('div', { on, style: `background-color: ${this.value};margin-left: 10px;`, class: this.value ? 'color-picker-trigger' : 'color-picker-trigger color-picker-trigger-empty' }),
          default: () => h('v-color-picker', {
            props: { flat: true, ...this.fullOptions.colorPickerProps, ...this.fullSchema['x-props'], value: this.value || '' },
            on: { input: val => { console.log(val); this.input(val); this.change(val) } }
          })
        }
      }))
      return [h('v-input', {
        props: {
          name: this.fullKey,
          label: this.label,
          required: this.required,
          rules: this.rules,
          disabled: this.disabled,
          ...this.fullOptions.fieldProps
        }
      }, children)]
    }
  }
}
