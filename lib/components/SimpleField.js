import Tooltip from './Tooltip.vue'

export default {
  props: {
    context: { type: Object, default: null },
    value: {}
  },
  components: { Tooltip },
  render(h) {
    const { fullSchema } = this.context

    let tag
    const props = { ...this.context, value: this.value }
    const domProps = {}
    const children = [h('tooltip', { slot: 'append-outer', props: this.context })]
    const on = {
      input: value => this.$emit('input', value),
      change: value => this.$emit('change', value)
    }
    const scopedSlots = {}

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

      on.input = value => this.$emit('input', Number(value))
    }

    if (fullSchema.type === 'boolean') {
      tag = 'v-checkbox'
      on.change = value => {
        this.$emit('input', value)
        this.$emit('change', value)
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
          this.$emit('input', this.value)
          this.$emit('change', this.value)
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

    return h(tag, { props, domProps, on, scopedSlots }, children)
  }
}
