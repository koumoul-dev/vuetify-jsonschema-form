import { getRules } from '../utils/rules'
import schemaUtils from '../utils/schema'

export default {
  computed: {
    isSimpleProp() {
      const isPrimitive = (x) => ['number', 'integer', 'string', 'boolean'].includes(x)
      return isPrimitive(this.fullSchema.type) || (this.fullSchema.type === 'array' && isPrimitive(this.fullSchema.items.type))
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
      const scopedSlots = {}
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
        tag = (() => {
          switch (this.display) {
            case 'slider': return 'v-slider'
            default: return 'v-text-field'
          }
        })()

        props.type = 'number'
        props.min = this.fullSchema.minimum
        props.max = this.fullSchema.maximum
        props.step = this.fullSchema['x-step'] || (this.fullSchema.type === 'integer' ? 1 : 0.01)

        on.input = value => this.input(this.fullSchema.type === 'integer' ? parseInt(value, 10) : parseFloat(value))
      }

      if (this.fullSchema.type === 'boolean') {
        tag = (() => {
          switch (this.display) {
            case 'switch': return 'v-switch'
            default: return 'v-checkbox'
          }
        })()

        on.change = value => {
          this.input(value || false)
          this.change(value || false)
        }
      }

      if (this.fullSchema.type === 'array' && ['string', 'number', 'integer'].includes(this.fullSchema.items.type)) {
        tag = 'v-combobox'

        props.chips = true
        props.multiple = true
        props.appendIcon = ''
        props.type = 'string'
        const itemRules = getRules(schemaUtils.prepareFullSchema(this.fullSchema.items), this.fullOptions)
        props.rules = [
          ...props.rules,
          (values) => {
            // for value, rule in values, itemRules
            for (const value in values) {
              for (const rule in itemRules) {
                const ret = rule(value)
                // if the rule execution returns something not true, this implies an error message kicks in
                if (!ret) {
                  return ret
                }
              }
            }
            // at this point we let the validation pass, we had no valid messages to show anyway
            // formally, this could have had been to just return undefined
            return true
          }
        ]

        if (this.fullSchema.items.type !== 'string') {
          props.type = 'number'
          on.input = value => {
            const vals = value
              .map(val => this.fullSchema.items.type === 'integer' ? parseInt(val, 10) : parseFloat(val))
              .filter(val => !isNaN(val))
            this.input(vals)
          }
        }

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            this.value.splice(slotProps.index, 1)
            this.input(this.value)
            this.change(this.value)
          }
          const brokenRule = itemRules.find(rule => {
            return typeof rule(slotProps.item) === 'string'
          })
          return h('v-chip', {
            props: { close: true, color: brokenRule ? 'error' : 'default' },
            on: { 'click:close': onClose }
          }, slotProps.item)
        }
      }
      return tag ? [h(tag, { props, domProps, on, scopedSlots }, children)] : null
    }
  }
}
