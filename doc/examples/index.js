import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'
import select from './select'
import selectHTTP from './select-http'
import selectIcon from './select-icon'
import selectDeps from './select-deps'
import selectSubschemas from './select-subschemas'
import files from './files'
import sections from './sections'
import sectionsExpansionPanels from './sections-expansion-panels'
import sectionsTab from './sections-tabs'
import editableArray from './editable-array'
import prefilledArrays from './prefilled-arrays'
import classes from './classes'
import vuetifyProps from './vuetify-props'
import slots from './slots'
import validationBasic from './validation-basic'
import validationSections from './validation-sections'
import tuples from './tuples'
import readOnly from './read-only'

const examples = [
  basic,
  datePicker,
  colorPicker,
  select,
  selectHTTP,
  selectIcon,
  selectDeps,
  selectSubschemas,
  files,
  sections,
  sectionsExpansionPanels,
  sectionsTab,
  editableArray,
  prefilledArrays,
  classes,
  vuetifyProps,
  slots,
  validationBasic,
  validationSections,
  tuples,
  readOnly
]

const defaultTemplate = '<v-jsf v-model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
