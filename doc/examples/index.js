import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'
import select from './select'

const examples = [
  basic,
  datePicker,
  colorPicker,
  select
]

const defaultTemplate = '<v-jsf :model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
