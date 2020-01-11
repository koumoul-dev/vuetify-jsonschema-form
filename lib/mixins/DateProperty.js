export default {
  data() {
    return {
      dateProp: {
        tab: 'tab-date',
        menu: false
      }
    }
  },
  methods: {
    renderDateProp(h) {
      const fullSchema = this.fullSchema
      if (fullSchema.type !== 'string' || !['date', 'date-time', 'time'].includes(fullSchema.format)) return

      let child
      const pickerProps = { locale: this.options.locale, value: this.modelWrapper[this.modelKey] }
      const pickerOn = { input: value => this.input(value), change: value => this.change(value) }
      let prependIcon = this.options.icons.calendar
      if (fullSchema.format === 'time') {
        child = h('v-time-picker', { props: pickerProps, on: pickerOn })
        prependIcon = this.options.icons.clock
      } else if (fullSchema.format === 'date') {
        child = h('v-date-picker', {
          props: { ...pickerProps, scrollable: true },
          on: { ...pickerOn, input: value => { this.input(value); this.dateProp.menu = false } }
        })
      } else {
        const dateParts = this.modelWrapper[this.modelKey] ? this.modelWrapper[this.modelKey].split('T') : []
        const tabs = [
          h('v-tab', { props: { href: '#tab-date' } }, [h('v-icon', [this.options.icons.calendar])]),
          h('v-tab', { props: { href: '#tab-time', disabled: !dateParts[0] } }, [h('v-icon', [this.options.icons.clock])]),
          h('v-tab-item', { props: { value: 'tab-date' } }, [h('v-date-picker', {
            props: { ...pickerProps, value: dateParts[0] },
            on: { ...pickerOn, input: value => { dateParts[0] = value; this.dateProp.tab = 'tab-time'; this.input(dateParts.join('T')) } }
          })]),
          h('v-tab-item', { props: { value: 'tab-time' } }, [h('v-time-picker', {
            props: { ...pickerProps, value: dateParts[1] },
            on: { ...pickerOn, input: value => { dateParts[1] = value; this.input(dateParts.join('T')) } }
          })])
        ]
        child = h('v-tabs', {
          props: { grow: true, value: this.dateProp.tab },
          on: { input: value => { this.dateProp.tab = value } },
          class: 'vjsf-date-time'
        }, tabs)
      }

      const scopedSlots = {}
      scopedSlots.activator = ({ on }) => {
        return h('v-text-field', {
          props: { value: this.modelWrapper[this.modelKey], label: this.label, rules: this.rules, required: this.required, clearable: !this.required, readonly: true, prependIcon },
          on: { ...on, input: value => this.input(value), change: value => this.change(value) }
        })
      }

      // TODO :return-value.sync="modelWrapper[modelKey]"
      return h('v-menu', {
        scopedSlots,
        props: {
          value: this.dateProp.menu,
          disabled: this.disabled,
          closeOnContentClick: false,
          nudgeRight: 40,
          transition: 'scale-transition',
          offsetY: true,
          fullWidth: true,
          minWidth: '290px'
        },
        on: { input: value => { this.dateProp.menu = value; this.dateProp.tab = 'tab-date' } }
      }, [child])
    }
  }
}
