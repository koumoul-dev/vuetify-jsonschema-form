import type { Example, DemoCollection } from '../types'
import singleProperties from './v2/single-properties/index.js'
import sections from './v2/sections/index.js'
import arrays from './v2/arrays/index.js'
import dynamicContent from './v2/dynamic-content/index.js'
import validation from './v2/validation/index.js'
import miscJsonSchema from './v2/misc-json-schema/index.js'
import advanced from './v2/advanced/index.js'

// The group modules under ./v2/*/index.js are plain (untyped, checkJs: false)
// .js files exporting `{ title, examples }`, ported verbatim from the old
// VJSF-2 doc source.
interface V2ExampleGroup { title: string, examples: Example[] }

// Some examples carry a legacy `skip: true` from the VJSF-2 doc source: they
// rely on external wrapper components never registered here, so they're left
// out rather than shipping a badly-degraded form.
function withoutSkipped (examples: Example[]): Example[] {
  return examples.filter(e => !(e as Example & { skip?: boolean }).skip)
}

// Precompiled to a `null` layout (KNOWN_INCOMPATIBLE, upstream ucs2length
// serializer bug — see BUGS.md); the `warning` gives VjsfExample.vue's alert
// an accurate message instead of its generic fallback.
const UCS2LENGTH_WARNING = 'Temporarily disabled: a serializer bug in @json-layout/core (ucs2length interop) breaks precompiled string minLength/maxLength validation. Will be re-enabled once fixed upstream.'
const UCS2LENGTH_AFFECTED_IDS = new Set(['validation-basic', 'validation-sections'])
function withUcs2lengthWarning (examples: Example[]): Example[] {
  return examples.map(e => UCS2LENGTH_AFFECTED_IDS.has(e.id) ? { ...e, warning: UCS2LENGTH_WARNING } : e)
}

// Maps the v2 example groups onto the three "V2 compatibility" pages
// (src/pages/migration/v2-compat-*.md).
export const demoV2Properties: DemoCollection = {
  id: 'demo-v2-properties',
  route: '/migration/v2-compat-properties',
  v2compat: true,
  demos: withoutSkipped((singleProperties as V2ExampleGroup).examples),
}

export const demoV2SectionsArrays: DemoCollection = {
  id: 'demo-v2-sections-arrays',
  route: '/migration/v2-compat-sections-arrays',
  v2compat: true,
  demos: withoutSkipped([
    ...(sections as V2ExampleGroup).examples,
    ...(arrays as V2ExampleGroup).examples,
  ]),
}

export const demoV2Advanced: DemoCollection = {
  id: 'demo-v2-advanced',
  route: '/migration/v2-compat-advanced',
  v2compat: true,
  demos: withUcs2lengthWarning(withoutSkipped([
    ...(dynamicContent as V2ExampleGroup).examples,
    ...(validation as V2ExampleGroup).examples,
    ...(miscJsonSchema as V2ExampleGroup).examples,
    ...(advanced as V2ExampleGroup).examples,
  ])),
}
