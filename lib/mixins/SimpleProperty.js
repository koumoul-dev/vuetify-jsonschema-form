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
      const fullSchema = this.fullSchema
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

      if (fullSchema.type === 'string') {
        tag = 'v-text-field'
        if (fullSchema['x-display'] === 'password') props.type = 'password'
        if (fullSchema['x-display'] === 'textarea' || (fullSchema.maxLength && fullSchema.maxLength > 1000 && fullSchema['x-display'] !== 'single-line')) {
          tag = 'v-textarea'
          props.filled = true
          domProps.class = 'v-text-field--box v-text-field--enclosed'
        }
      }

      if (['number', 'integer'].includes(fullSchema.type)) {
        tag = 'v-text-field'
        if (fullSchema['x-display'] === 'slider') tag = 'v-slider'

        props.type = 'number'
        if (fullSchema.minimum !== undefined) props.min = fullSchema.minimum
        if (fullSchema.maximum !== undefined) props.max = fullSchema.maximum
        props.step = fullSchema['x-step'] || (fullSchema.type === 'integer' ? 1 : 0.01)

        on.input = value => this.input(Number(value))
      }

      if (fullSchema.type === 'boolean') {
        tag = 'v-checkbox'
        on.change = value => {
          this.input(value || false)
          this.change(value || false)
        }
      }

      if (fullSchema.type === 'array' && fullSchema.items.type === 'string') {
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
            on: {
              // @input is for vuetify1 and @click:close is for vuetify 2
              'click:close': onClose,
              input: onClose
            }
          }, slotProps.item)
        }
      }
      return tag ? [h(tag, { props, domProps, on, scopedSlots }, children)] : null
    }
  }
}
