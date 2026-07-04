import type { Example } from '../examples/types'
import type { DemoCollection } from './types'
import home from './introduction/home'
import gettingStarted from './introduction/getting-started'
import validation from './behavior/validation'

const collections: DemoCollection[] = [home, gettingStarted, validation]

export function getDemoCollections (): DemoCollection[] { return collections }

export function findDemo (key: string): { example: Example, v2compat: boolean } {
  const slash = key.indexOf('/')
  const collection = collections.find(c => c.id === key.slice(0, slash))
  const example = collection?.demos.find(d => d.id === key.slice(slash + 1))
  if (!collection || !example) throw new Error(`unknown demo "${key}"`)
  return { example, v2compat: !!collection.v2compat }
}
