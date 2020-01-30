import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'
import select from './select'
import selectIcon from './select-icon'
import vuetifyProps from './vuetify-props'
import slots from './slots'

const examples = [
  basic,
  datePicker,
  colorPicker,
  select,
  selectIcon,
  vuetifyProps,
  slots
]

const defaultTemplate = '<v-jsf :model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
