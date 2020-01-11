import basic from './basic'
import datePicker from './date-picker'

const examples = [
  basic,
  datePicker
]

const defaultTemplate = '<v-jsf :model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
