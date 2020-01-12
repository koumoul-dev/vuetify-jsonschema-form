import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'

const examples = [
  basic,
  datePicker,
  colorPicker
]

const defaultTemplate = '<v-jsf :model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
