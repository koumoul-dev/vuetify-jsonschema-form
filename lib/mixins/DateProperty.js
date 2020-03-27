const padTimeComponent = (val) => {
  const s = '' + val
  return s.length === 1 ? '0' + s : s
}

const shortTime = (time) => {
  if (!time) return '00:00'
  const date = new Date(`2000-01-01T${time}`)
  return `${padTimeComponent(date.getHours())}:${padTimeComponent(date.getMinutes())}`
}

const longTime = (time) => {
  const date = new Date()
  const parts = time.split(':')
  date.setHours(parts[0] || '00')
  date.setMinutes(parts[1] || '00')
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.toISOString().split('T')[1]
}

export default {
  data() {
    return {
      dateProp: {
        tab: 'tab-date',
        menu: false
      },
      dateParts: [null, null],
      dateLastValue: null
    }
  },
  methods: {
    renderDateProp(h) {
      if (this.fullSchema.type !== 'string' || !['date', 'date-time', 'time'].includes(this.fullSchema.format)) return

      let child
      let prependIcon = this.fullOptions.icons.calendar
      if (this.fullSchema.format === 'time') {
        child = h('v-time-picker', {
          props: { locale: this.fullOptions.locale, value: shortTime(this.value) },
          on: {
            input: value => this.input(longTime(value)),
            change: value => this.change(longTime(value))
          }
        })
        prependIcon = this.fullOptions.icons.clock
      } else if (this.fullSchema.format === 'date') {
        child = h('v-date-picker', {
          props: { locale: this.fullOptions.locale, value: this.value, scrollable: true },
          on: {
            input: value => { this.input(value); this.dateProp.menu = false },
            change: value => this.change(value)
          }
        })
      } else {
        this.dateParts = this.value !== this.dateLastValue ? this.value.split('T') : this.dateParts
        this.dateLastValue = this.value
        const setValue = () => {
          if (this.dateParts[1]) {
            const newValue = this.dateParts.join('T')
            this.input(newValue)
            this.change(newValue)
          }
        }
        const tabs = [
          h('v-tab', { props: { href: '#tab-date' } }, [h('v-icon', [this.fullOptions.icons.calendar])]),
          h('v-tab', { props: { href: '#tab-time', disabled: !this.dateParts[0] } }, [h('v-icon', [this.fullOptions.icons.clock])]),
          h('v-tab-item', { props: { value: 'tab-date' } }, [h('v-date-picker', {
            props: { locale: this.fullOptions.locale, value: this.dateParts[0] },
            on: {
              input: value => { this.dateParts[0] = value; this.dateProp.tab = 'tab-time'; setValue() }
            }
          })]),
          h('v-tab-item', { props: { value: 'tab-time' } }, [h('v-time-picker', {
            props: { locale: this.fullOptions.locale, value: shortTime(this.dateParts[1]) },
            on: {
              input: value => { this.dateParts[1] = longTime(value); setValue() }
            }
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
          props: {
            ...this.commonFieldProps,
            value: this.value && this.fullOptions.formats[this.fullSchema.format](this.value, this.fullOptions.locale),
            clearable: !this.required,
            readonly: true,
            prependIcon
          },
          on: { ...on, input: value => this.input(value), change: value => this.change(value) }
        }, [this.renderTooltip(h, 'append-outer')])
      }

      return [h('v-menu', {
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
      }, [child])]
    }
  }
}
