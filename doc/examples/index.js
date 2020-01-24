import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'
import select from './select'
import vuetifyProps from './vuetify-props'

const examples = [
  basic,
  datePicker,
  colorPicker,
  select,
  vuetifyProps
]

const defaultTemplate = '<v-jsf :model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
