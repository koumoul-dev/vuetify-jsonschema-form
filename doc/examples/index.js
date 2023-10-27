import { examples } from '@json-layout/examples'
import vuetifyExamples from './vuetify/index.js'
import { examples as v2ExampleGroups } from './v2/index.js'
import codeSlots from './merged/code-slots.js'

const slotsCategory = examples.find(e => e.id === 'slots')
slotsCategory?.examples.push(codeSlots)

/** @type {import("@json-layout/examples").JSONLayoutExample[]} */
const v2Examples = []
for (const v2ExamplesGroup of v2ExampleGroups) {
  for (const v2Example of v2ExamplesGroup.examples) {
    v2Examples.push({ ...v2Example, title: `${v2ExamplesGroup.title} - ${v2Example.title}` })
  }
}

/** @type {import('@json-layout/examples').JSONLayoutExamplesCategory} */
const v2 = {
  id: 'v2-compat',
  title: 'VJSF 2 compatibility',
  description: 'The v2compat function can be used to produce a schema compatible with VJSF v3. Compatibility is not 100% please test your schemas.',
  examples: v2Examples
}

/** @type {import('@json-layout/examples').JSONLayoutExamplesCategory[]} */
export default examples.concat([vuetifyExamples, v2])
