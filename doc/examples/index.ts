import { examples, JSONLayoutExamplesCategory, JSONLayoutExample } from '@json-layout/examples'
import textField from './text-field'
import { examples as v2ExampleGroups } from './v2'

const vuetifyExamples: JSONLayoutExamplesCategory = {
  id: 'vuetify',
  title: 'Vuetify integration',
  description: '',
  examples: [textField]
}

const v2Examples: JSONLayoutExample[] = []
for (const v2ExamplesGroup of v2ExampleGroups) {
  for (const v2Example of v2ExamplesGroup.examples as JSONLayoutExample[]) {
    v2Examples.push({ ...v2Example, title: `${v2ExamplesGroup.title} - ${v2Example.title}` })
  }
}

const v2: JSONLayoutExamplesCategory = {
  id: 'v2',
  title: 'Vjsf 2 compatibility',
  description: 'The v2compat function can be used to produce a schema compatible with Vjsf v3. Compatibility is almost complete but not 100%, please test your schemas.',
  examples: v2Examples
}

export default examples.concat([vuetifyExamples, v2])
