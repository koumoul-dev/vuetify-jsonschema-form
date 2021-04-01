// 1 => 01, 12 => 12
const padTimeComponent = (val) => {
  const s = '' + val
  return s.length === 1 ? '0' + s : s
}

// storing ISO times with the user's timezone offset is more dense in information that always storing the base ISO date
// this way the application can either use the localized time or the ISO time by chosing to interpret or not the offset part
// cf https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes
// 2020-04-03T19:07:43.152Z => 2020-04-03T21:07:43+02:00
const getDateTimeWithOffset = (date) => {
  const offsetMinutes = date.getTimezoneOffset()
  const offsetAbs = `${padTimeComponent(parseInt(Math.abs(offsetMinutes / 60)))}:${padTimeComponent(Math.abs(offsetMinutes % 60))}`
  let offset
  if (offsetMinutes < 0) offset = `+${offsetAbs}`
  else if (offsetMinutes > 0) offset = `-${offsetAbs}`
  else offset = 'Z'
  return `${date.getFullYear()}-${padTimeComponent(date.getMonth() + 1)}-${padTimeComponent(date.getDate())}T${padTimeComponent(date.getHours())}:${padTimeComponent(date.getMinutes())}:${padTimeComponent(date.getSeconds())}${offset}`
}

// get the the date and short time components expected by date-time picker from a full date
// 2020-04-03T21:07:43+02:00 => ['2020-04-03', '19:07']
const getDateTimeParts = (date) => {
  return [`${date.getFullYear()}-${padTimeComponent(date.getMonth() + 1)}-${padTimeComponent(date.getDate())}`, `${padTimeComponent(date.getHours())}:${padTimeComponent(date.getMinutes())}`]
}

// get a full date-time from the date and time parts edited by date-time picker
// ['2020-04-03', '19:07'] => 2020-04-03T21:07:43+02:00
const getDateTime = (parts) => {
  const date = new Date()
  const dateParts = parts[0].split('-')
  date.setFullYear(Number(dateParts[0]))
  date.setMonth(Number(dateParts[1]) - 1)
  date.setDate(Number(dateParts[2]))
  const timeParts = parts[1].split(':')
  date.setHours(Number(timeParts[0] || '00'))
  date.setMinutes(Number(timeParts[1] || '00'))
  date.setSeconds(0)
  return getDateTimeWithOffset(date)
}

// get the short time representation expected by vuetify from a longer ISO time
const getShortTime = (time) => {
  if (!time) return ''
  return time.slice(0, 5)
}

const getLongTime = (time) => {
  return time + ':00Z'
}

export default {
  data() {
    return {
      dateProp: {
        tab: 'tab-date',
        menu: false,
        parts: [null, null],
        lastValue: null
      }
    }
  },
  methods: {
    renderDateProp(h) {
      if (this.fullSchema.type !== 'string' || !['date', 'date-time', 'time'].includes(this.fullSchema.format)) return

      let child
      let prependIcon = this.fullOptions.icons.calendar
      if (this.fullSchema.format === 'time') {
        child = h('v-time-picker', {
          props: {
            ...this.fullOptions.timePickerProps,
            locale: this.fullOptions.locale,
            value: getShortTime(this.value)
          },
          on: {
            input: value => this.input(getLongTime(value)),
            change: () => this.change()
          }
        })
        prependIcon = this.fullOptions.icons.clock
      } else if (this.fullSchema.format === 'date') {
        child = h('v-date-picker', {
          props: {
            ...this.fullOptions.datePickerProps,
            locale: this.fullOptions.locale,
            value: this.value
          },
          on: {
            input: value => { this.input(value); this.dateProp.menu = false },
            change: () => this.change()
          }
        })
      } else {
        if (this.value !== this.dateProp.lastValue) this.dateProp.parts = getDateTimeParts(new Date(this.value))
        this.dateProp.lastValue = this.value
        const setValue = () => {
          if (this.dateProp.parts[1]) {
            const newValue = getDateTime(this.dateProp.parts)
            this.input(newValue)
            this.change()
          }
        }
        const tabs = [
          h('v-tab', { props: { href: '#tab-date' } }, [h('v-icon', [this.fullOptions.icons.calendar])]),
          h('v-tab', { props: { href: '#tab-time', disabled: !this.dateProp.parts[0] } }, [h('v-icon', [this.fullOptions.icons.clock])]),
          h('v-tab-item', { props: { value: 'tab-date' } }, [h('v-date-picker', {
            props: {
              ...this.fullOptions.datePickerProps,
              locale: this.fullOptions.locale,
              value: this.dateProp.parts[0]
            },
            on: {
              input: value => { this.dateProp.parts[0] = value; this.dateProp.tab = 'tab-time'; setValue() }
            }
          })]),
          h('v-tab-item', { props: { value: 'tab-time' } }, [h('v-time-picker', {
            props: {
              ...this.fullOptions.timePickerProps,
              locale: this.fullOptions.locale,
              value: this.dateProp.parts[1]
            },
            on: {
              input: value => { this.dateProp.parts[1] = value; setValue() }
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
            value: this.formattedValue,
            clearable: !this.required,
            readonly: true,
            prependIcon
          },
          // text field is not editable, we listen to input/change for when it is cleared
          on: {
            ...on,
            input: value => this.input(value),
            change: value => this.change()
          }
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
