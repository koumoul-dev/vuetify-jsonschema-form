import { examples } from '@json-layout/examples'
import vuetifyExamples from './vuetify/index.js'
import { examples as v2ExampleGroups } from './v2/index.js'
import { additionalExamples, overwrites } from './merged/index.js'

for (const exampleCategory of examples) {
  if (additionalExamples[exampleCategory.id]) {
    exampleCategory.examples.push(...additionalExamples[exampleCategory.id])
  }
  for (const example of exampleCategory.examples) {
    if (overwrites[exampleCategory.id]?.[example.id]) {
      Object.assign(example, overwrites[exampleCategory.id]?.[example.id])
    }
  }
}

/** @type {import("./types.js").VJSFExample[]} */
const v2Examples = []
for (const v2ExamplesGroup of v2ExampleGroups) {
  for (const v2Example of v2ExamplesGroup.examples) {
    v2Examples.push({ ...v2Example, title: `${v2ExamplesGroup.title} - ${v2Example.title}` })
  }
}

/** @type {import('./types.js').VJSFExamplesCategory} */
const v2 = {
  id: 'v2-compat',
  title: 'VJSF 2 compatibility',
  description: 'The v2compat function can be used to produce a schema compatible with VJSF v3. Compatibility is not 100% please test your schemas.',
  examples: v2Examples
}

/** @type {import('./types.js').VJSFExamplesCategory[]} */
export default examples.concat([vuetifyExamples, v2])
