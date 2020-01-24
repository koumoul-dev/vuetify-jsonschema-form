export default {
  methods: {

    renderSimpleProp(h) {
      const fullSchema = this.fullSchema
      let tag
      const props = { ...this.commonFieldProps }

      const domProps = {}
      const children = []
      const on = {
        input: value => this.input(value),
        change: value => this.change(value)
      }
      const scopedSlots = {}
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
          this.input(value)
          this.change(value)
        }
      }

      if (fullSchema.type === 'array' && fullSchema.items.type === 'string') {
        tag = 'v-combobox'

        props.chips = true
        props.multiple = true
        props.appendIcon = ''

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            this.modelWrapper[this.modelKey].splice(slotProps.index, 1)
            this.input(this.modelWrapper[this.modelKey])
            this.change(this.modelWrapper[this.modelKey])
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
      return tag ? h(tag, { props, domProps, on, scopedSlots }, children) : null
    }
  }
}
