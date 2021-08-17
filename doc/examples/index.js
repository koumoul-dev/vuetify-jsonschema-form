import singleProperties from './single-properties'
import dynamicContent from './dynamic-content'
import sections from './sections'
import arrays from './arrays'
import validation from './validation'
import miscJsonSchema from './misc-json-schema'
import vuetify from './vuetify'
import dev from './dev'

const examples = [
  singleProperties,
  sections,
  arrays,
  dynamicContent,
  validation,
  miscJsonSchema,
  vuetify,
  dev
]

const defaultTemplate = '<v-jsf v-model="model" :schema="schema" :options="options" @input="logEvent(\'input\', $event)" @change="logEvent(\'change\', $event)" @input-child="logEvent(\'input-child\', $event)" @change-child="logEvent(\'change-child\', $event)" />'

export { examples, defaultTemplate }
