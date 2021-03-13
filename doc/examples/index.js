import basic from './basic'
import datePicker from './date-picker'
import colorPicker from './color-picker'
import select from './select'
import selectAutocomplete from './autocomplete'
import selectCombobox from './combobox'
// import selectRadio from './select-radio'
import selectHTTP from './select-http'
import selectIcon from './select-icon'
import selectDeps from './select-deps'
import selectSubschemas from './select-subschemas'
import selectionControls from './selection-controls'
import chipGroups from './chip-group'
import conditionals from './conditionals'
import files from './files'
import sections from './sections'
import sectionsExpansionPanels from './sections-expansion-panels'
import sectionsTab from './sections-tabs'
import sectionsStepper from './sections-stepper'
import editableArray from './editable-array'
import editableArrayInline from './editable-array-inline'
import prefilledArrays from './prefilled-arrays'
import defaultValues from './default-values'
import classes from './classes'
import vuetifyProps from './vuetify-props'
import slots from './slots'
import slotsWrappers from './slots-wrappers'
import validationBasic from './validation-basic'
import validationSections from './validation-sections'
import tuples from './tuples'
import readOnly from './read-only'
import localization from './localization'
import nullable from './nullable'
import resolvedSchema from './_resolved-schema'
import selectFilledDeps from './_select-filled-deps'
import selectFilledHttp from './_select-filled-http'
import readOnlySelectIcon from './_readonly-select-icon'
import ValidationExtraCases from './_validation-extra-cases'
import XIf from './_x-if'
import WrongTypes from './_wrong-types'

const examples = [
  basic,
  datePicker,
  colorPicker,
  select,
  selectAutocomplete,
  selectCombobox,
  // selectRadio,
  selectHTTP,
  selectIcon,
  selectDeps,
  selectSubschemas,
  selectionControls,
  chipGroups,
  conditionals,
  files,
  sections,
  sectionsExpansionPanels,
  sectionsTab,
  sectionsStepper,
  editableArray,
  editableArrayInline,
  prefilledArrays,
  defaultValues,
  classes,
  vuetifyProps,
  slots,
  slotsWrappers,
  validationBasic,
  validationSections,
  tuples,
  readOnly,
  localization,
  nullable,
  resolvedSchema,
  selectFilledDeps,
  selectFilledHttp,
  readOnlySelectIcon,
  ValidationExtraCases,
  XIf,
  WrongTypes
]

const defaultTemplate = '<v-jsf v-model="model" :schema="schema" :options="options" />'

export { examples, defaultTemplate }
