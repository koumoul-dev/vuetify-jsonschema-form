import singleProperties from './single-properties/index.js'
import dynamicContent from './dynamic-content/index.js'
import sections from './sections/index.js'
import arrays from './arrays/index.js'
import validation from './validation/index.js'
import miscJsonSchema from './misc-json-schema/index.js'
import advanced from './advanced/index.js'
import dev from './dev/index.js'

const examples = [
  singleProperties,
  sections,
  arrays,
  dynamicContent,
  validation,
  miscJsonSchema,
  advanced,
  dev
]

const defaultTemplate = '<v-jsf v-model="model" :schema="schema" :options="options" @input="logEvent(\'input\', $event)" @change="logEvent(\'change\', $event)" @input-child="logEvent(\'input-child\', $event)" @change-child="logEvent(\'change-child\', $event)" />'

export { examples, defaultTemplate }
