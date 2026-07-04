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

// A couple of the `advanced` group's examples (slots, slots-wrappers) carry
// a legacy `skip: true` field ported verbatim from the VJSF-2 doc source:
// they rely on external wrapper components (tiptap-vuetify, toast-ui-editor,
// cropperjs) that were never registered as compile-time plugin info here
// (see build/examples-layouts-plugin.ts's `pluginComponents`), so they are
// left out of these curated migration demos rather than shipping a broken
// or badly-degraded form.
function withoutSkipped (examples: Example[]): Example[] {
  return examples.filter(e => !(e as Example & { skip?: boolean }).skip)
}

// `validation-basic`/`validation-sections` are precompiled to a `null` layout by
// build/examples-layouts-plugin.ts's KNOWN_INCOMPATIBLE (an upstream
// @json-layout/core serializer bug, not a v2compat() limitation -- see that file's
// comment for the full explanation). Setting `warning` here, at collection-assembly
// time, gives VjsfExample.vue's null-layout alert an accurate message instead of its
// generic "not supported in VJSF 3" fallback.
const UCS2LENGTH_WARNING = 'Temporarily disabled: a serializer bug in @json-layout/core (ucs2length interop) breaks precompiled string minLength/maxLength validation. Will be re-enabled once fixed upstream.'
const UCS2LENGTH_AFFECTED_IDS = new Set(['validation-basic', 'validation-sections'])
function withUcs2lengthWarning (examples: Example[]): Example[] {
  return examples.map(e => UCS2LENGTH_AFFECTED_IDS.has(e.id) ? { ...e, warning: UCS2LENGTH_WARNING } : e)
}

// Maps the v2 example groups (./v2/*/index.js) onto the three themed
// "V2 compatibility" pages -- see doc-next/src/pages/migration/v2-compat-*.md.
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
