import { getRules } from '../utils/rules'
import schemaUtils from '../utils/schema'
import debounce from '../utils/debounce'

export default {
  computed: {
    isSimpleProp() {
      return this.fullSchema.type === 'string' ||
          ['number', 'integer'].includes(this.fullSchema.type) ||
          this.fullSchema.type === 'boolean' ||
          (this.fullSchema.type === 'array' && this.fullSchema.items && ['string', 'number', 'integer'].includes(this.fullSchema.items.type))
    }
  },
  methods: {
    parseNumber(type, str) {
      str = str + ''
      if (!str) return null
      if (str === '-') return null
      return this.fullSchema.type === 'integer' ? parseInt(str, 10) : parseFloat(str)
    },
    renderSimpleProp(h) {
      if (!this.isSimpleProp) return

      let tag
      const props = { ...this.commonFieldProps }

      const domProps = {}
      const children = this.renderPropSlots(h)
      const doInput = debounce((value) => this.input(value))
      let _value
      const on = {
        input: value => {
          _value = value
          doInput(value)
        },
        change: value => this.change(),
        blur: event => {
          if (event.type !== 'blur') {
            return
          }
          this.input(_value)
          doInput({ clear: true })
        }
      }
      const scopedSlots = {}
      let tooltipSlot = 'append-outer'
      // simple string
      if (this.fullSchema.type === 'string' && !this.separator) {
        if (this.display === 'textarea' || (this.fullSchema.maxLength && this.fullSchema.maxLength > 1000 && this.display !== 'single-line')) {
          tag = 'v-textarea'
          Object.assign(props, this.fullOptions.textareaProps)
          domProps.class = 'v-text-field--box v-text-field--enclosed'
        } else {
          tag = 'v-text-field'
          Object.assign(props, this.fullOptions.textFieldProps)
          if (this.display === 'password') props.type = 'password'
        }
        if (this.fullOptions.maxLengthCounter && this.fullSchema.maxLength) props.counter = this.fullSchema.maxLength
      }

      // multivalued string with separator
      if (this.fullSchema.type === 'string' && this.separator) {
        tag = 'v-combobox'
        Object.assign(props, this.fullOptions.comboboxProps)
        props.chips = true
        props.multiple = true
        props.appendIcon = ''
        props.type = 'string'
        props.validateOnBlur = true

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            const value = this.value ? this.value.split(this.separator) : []
            value.splice(slotProps.index, 1)
            this.input(value)
            this.change()
          }
          return h('v-chip', {
            props: { close: true },
            on: { 'click:close': onClose }
          }, slotProps.item)
        }
      }

      // simple boolean
      if (['number', 'integer'].includes(this.fullSchema.type)) {
        if (this.display === 'slider') {
          tag = 'v-slider'
          Object.assign(props, this.fullOptions.sliderProps)
        } else {
          tag = 'v-text-field'
          Object.assign(props, this.fullOptions.textFieldProps)
          Object.assign(props, this.fullOptions.numberProps)
        }
        props.type = 'number'
        if (this.fullSchema.minimum !== undefined) props.min = this.fullSchema.minimum
        if (this.fullSchema.maximum !== undefined) props.max = this.fullSchema.maximum
        props.step = this.fullSchema['x-step'] || (this.fullSchema.type === 'integer' ? 1 : 0.01)

        on.input = value => {
          _value = this.parseNumber(this.fullSchema.type, value)
          doInput(_value)
        }
      }

      if (this.fullSchema.type === 'boolean') {
        tooltipSlot = 'append'
        if (this.display === 'switch') {
          tag = 'v-switch'
          Object.assign(props, this.fullOptions.switchProps)
        } else {
          tag = 'v-checkbox'
          Object.assign(props, this.fullOptions.checkboxProps)
        }
        on.change = value => {
          _value = value || false
          doInput(_value)
          this.change()
        }
      }

      if (this.fullSchema.type === 'array' && ['string', 'number', 'integer'].includes(this.fullSchema.items.type)) {
        tag = 'v-combobox'
        Object.assign(props, this.fullOptions.comboboxProps)
        props.chips = true
        props.multiple = true
        props.appendIcon = ''
        props.type = 'string'
        props.validateOnBlur = true
        const itemRules = getRules(this.fullSchema.items, schemaUtils.prepareFullSchema(this.fullSchema.items, null, this.fullOptions), this.fullOptions)
        props.rules = props.rules.concat([(values) => {
          const valuesMessages = values.map(value => {
            const brokenRule = itemRules.find(rule => {
              return typeof rule(value) === 'string'
            })
            return brokenRule && brokenRule(value)
          })
          const firstMessage = valuesMessages.find(m => !!m)
          return firstMessage || true
        }])

        if (this.fullSchema.items.type !== 'string') {
          props.type = 'number'
          const parseNumber = (value) => {
            return value
              .map(val => this.parseNumber(this.fullSchema.items.type, val))
              .filter(val => !isNaN(val))
          }
          on.input = value => {
            _value = parseNumber(value)
            doInput(_value)
          }
        }

        scopedSlots.selection = slotProps => {
          const onClose = () => {
            const value = [...this.value]
            value.splice(slotProps.index, 1)
            this.input(value)
            this.change()
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

      if (this.htmlDescription) {
        children.push(this.renderTooltip(h, tooltipSlot))
      }

      tag = this.customTag ? this.customTag : tag

      return tag ? [h(tag, { props, domProps, on, scopedSlots, directives: this.directives, value: this.value }, children)] : null
    }
  }
}
