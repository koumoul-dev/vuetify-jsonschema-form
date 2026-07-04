import type { Example } from '../../examples/types'
import type { DemoCollection } from '../types'
import singleProperties from '../../examples/v2/single-properties/index.js'
import sections from '../../examples/v2/sections/index.js'
import arrays from '../../examples/v2/arrays/index.js'
import dynamicContent from '../../examples/v2/dynamic-content/index.js'
import validation from '../../examples/v2/validation/index.js'
import miscJsonSchema from '../../examples/v2/misc-json-schema/index.js'
import advanced from '../../examples/v2/advanced/index.js'

// Same shape as examples/index.ts's local `V2ExampleGroup` -- the group
// modules under examples/v2/*/index.js are plain (untyped, checkJs: false)
// .js files exporting `{ title, examples }`.
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

// Maps the v2 example groups (src/examples/v2/index.js) onto the three
// themed "V2 compat" pages -- see doc-next/src/pages/migration/v2-compat-*.md.
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
  demos: withoutSkipped([
    ...(dynamicContent as V2ExampleGroup).examples,
    ...(validation as V2ExampleGroup).examples,
    ...(miscJsonSchema as V2ExampleGroup).examples,
    ...(advanced as V2ExampleGroup).examples,
  ]),
}
