import { examples as jlExamples } from '@json-layout/examples'
import vuetifyExamples from './vuetify/index.js'
import { examples as v2ExampleGroups } from './v2/index.js'
import { additionalExamples, overwrites } from './merged/index.js'
import type { Category, Example } from './types'

interface V2ExampleGroup {
  title: string
  examples: Example[]
}

export function getExamples (): Category[] {
  const categories = structuredClone(jlExamples) as Category[]

  for (const category of categories) {
    if (additionalExamples[category.id]) {
      category.examples.push(...additionalExamples[category.id])
    }
    for (const example of category.examples) {
      if (overwrites[category.id]?.[example.id]) {
        Object.assign(example, overwrites[category.id][example.id])
      }
    }
  }

  const v2Examples: Example[] = []
  for (const group of v2ExampleGroups as V2ExampleGroup[]) {
    for (const example of group.examples) {
      v2Examples.push({ ...example, title: `${group.title} - ${example.title}` })
    }
  }

  const v2: Category = {
    id: 'v2-compat',
    title: 'VJSF 2 compatibility',
    description: 'The v2compat function can be used to produce a schema compatible with VJSF v3. Compatibility is not 100% please test your schemas.',
    examples: v2Examples,
  }

  return categories.concat([vuetifyExamples as Category, v2])
}
