export default {
  computed: {
    isSimpleProp() {
      return this.fullSchema.type === 'string' ||
        ['number', 'integer'].includes(this.fullSchema.type) ||
        this.fullSchema.type === 'boolean' ||
        (this.fullSchema.type === 'array' && this.fullSchema.items.type === 'string')
    }
  },
  methods: {
    renderSimpleProp(h) {
      if (!this.isSimpleProp) return
      let tag
      const props = { ...this.commonFieldProps }

      const domProps = {}
      const children = [...this.renderPropSlots(h)]
      const on = {
        input: value => this.input(value),
        change: value => this.change(value)
      }
      const scopedSlots = { ...this.commonFieldSlots }
      if (this.htmlDescription) {
        children.push(this.renderTooltip(h, 'append-outer'))
      }

      if (this.fullSchema.type === 'string') {
        tag = 'v-text-field'
        if (this.display === 'password') props.type = 'password'
        if (this.display === 'textarea' || (this.fullSchema.maxLength && this.fullSchema.maxLength > 1000 && this.display !== 'single-line')) {
          tag = 'v-textarea'
          props.filled = true
          domProps.class = 'v-text-field--box v-text-field--enclosed'
        }
      }

      if (['number', 'integer'].includes(this.fullSchema.type)) {
        tag = 'v-text-field'
        if (this.display === 'slider') tag = 'v-slider'

        props.type = 'number'
        if (this.fullSchema.minimum !== undefined) props.min = this.fullSchema.minimum
        if (this.fullSchema.maximum !== undefined) props.max = this.fullSchema.maximum
        props.step = this.fullSchema['x-step'] || (this.fullSchema.type === 'integer' ? 1 : 0.01)

        on.input = value => this.input(Number(value))
      }

      if (this.fullSchema.type === 'boolean') {
        tag = 'v-checkbox'
        on.change = value => {
          this.input(value || false)
          this.change(value || false)
        }
      }

      if (this.fullSchema.type === 'array' && this.fullSchema.items.type === 'string') {
        tag = 'v-combobox'

        props.chips = true
        props.multiple = true
        props.appendIcon = ''

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            this.value.splice(slotProps.index, 1)
            this.input(this.value)
            this.change(this.value)
          }
          return h('v-chip', {
            props: { close: true },
            on: { 'click:close': onClose }
          }, slotProps.item)
        }
      }
      return tag ? [h(tag, { props, domProps, on, scopedSlots }, children)] : null
    }
  }
}
