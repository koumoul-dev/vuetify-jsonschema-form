import type { Example } from '../examples/types'
import type { DemoCollection } from './types'
import home from './introduction/home'
import gettingStarted from './introduction/getting-started'
import validation from './behavior/validation'
import expressions from './behavior/expressions'
import dynamicData from './behavior/dynamic-data'
import i18n from './behavior/i18n'
import slots from './behavior/slots'
import textField from './components/text-field'
import number from './components/number'
import boolean from './components/boolean'
import dateTime from './components/date-time'
import color from './components/color'
import file from './components/file'
import select from './components/select'
import selectionGroups from './components/selection-groups'

const collections: DemoCollection[] = [home, gettingStarted, validation, expressions, dynamicData, i18n, slots, textField, number, boolean, dateTime, color, file, select, selectionGroups]

export function getDemoCollections (): DemoCollection[] { return collections }

export function findDemo (key: string): { example: Example, v2compat: boolean } {
  const slash = key.indexOf('/')
  const collection = collections.find(c => c.id === key.slice(0, slash))
  const example = collection?.demos.find(d => d.id === key.slice(slash + 1))
  if (!collection || !example) throw new Error(`unknown demo "${key}"`)
  return { example, v2compat: !!collection.v2compat }
}
