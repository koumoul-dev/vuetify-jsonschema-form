// Node-side builder of the layout-keyword reference data: the structure
// (groups, properties, components) is extracted from @json-layout/vocabulary,
// the prose comes from layout-keyword-descriptions.ts. Consumed by the
// `virtual:layout-vocabulary` vite plugin (client rendering) and by the
// search-index plugin — never imported client-side.
import { standardComponents } from '@json-layout/vocabulary'
import { normalizedLayoutSchema } from '@json-layout/vocabulary/normalize'
import { groupDescriptions, componentDescriptions, type LayoutPropDescription } from './layout-keyword-descriptions'
import type { LayoutVocabularyDoc, LayoutPropDoc, LayoutGroupDoc, LayoutComponentDoc } from './types'

// The normalized schema groups common properties by component characteristic;
// the matching flag on ComponentInfo tells which components each group
// applies to (base/simple have no flag: every / every non-composite one).
const GROUP_DEFS: { key: string, def: string, flag?: keyof ComponentFlags }[] = [
  { key: 'base', def: 'base-comp-object' },
  { key: 'simple', def: 'simple-comp-object' },
  { key: 'composite', def: 'composite-comp-object', flag: 'composite' },
  { key: 'focusable', def: 'focusable-comp-object', flag: 'focusable' },
  { key: 'items-based', def: 'items-based-comp-object', flag: 'itemsBased' },
  { key: 'multiple-compat', def: 'multiple-compat-comp-object', flag: 'multipleCompat' },
]

interface ComponentFlags {
  composite?: boolean
  itemsBased?: boolean
  multipleCompat?: boolean
  focusable?: boolean
  emitsBlur?: boolean
  shouldDebounce?: boolean
}

const CHARACTERISTICS: { flag: keyof ComponentFlags, label: string }[] = [
  { flag: 'composite', label: 'composite' },
  { flag: 'itemsBased', label: 'items based' },
  { flag: 'multipleCompat', label: 'array compatible' },
  { flag: 'focusable', label: 'focusable' },
  { flag: 'emitsBlur', label: 'emits blur' },
  { flag: 'shouldDebounce', label: 'debounced input' },
]

// Readable labels for the $refs used by common properties (same spirit as the
// old doc's comp-schema.vue replacements, but rendered as type labels).
const REF_LABELS: Record<string, string> = {
  expression: 'expression',
  'state-node-options-base': 'object',
  'state-node-props-lib': 'object',
  slots: 'object',
  'cols-obj': 'number | object',
  children: 'array',
  'select-items': 'array',
  'get-items': 'string | object',
}

function typeLabel (schema: Record<string, any>): string {
  if (schema.$ref) {
    const refName = String(schema.$ref).split('/').pop() as string
    return REF_LABELS[refName] ?? refName
  }
  if (schema.enum) return schema.enum.map((v: unknown) => JSON.stringify(v)).join(' | ')
  if (Array.isArray(schema.type)) return schema.type.join(' | ')
  if (schema.type === 'array' && schema.items?.enum) {
    return `array of ${schema.items.enum.map((v: unknown) => JSON.stringify(v)).join(' | ')}`
  }
  if (schema.type) return schema.type
  return 'any'
}

function propDoc (name: string, schema: Record<string, any>, description: LayoutPropDescription | undefined, undocumented: string[], path: string): LayoutPropDoc {
  if (!description) undocumented.push(path)
  return {
    name,
    type: typeLabel(schema),
    description: description?.description,
    see: description?.see,
    computed: description?.computed,
  }
}

/**
 * Builds the reference data and reports documentation drift. Throws when the
 * descriptions catalogue references vocabulary entries that no longer exist
 * (stale docs must be cleaned up); merely *missing* descriptions are returned
 * in `undocumented` so new vocabulary entries surface without breaking the
 * build.
 */
export function buildLayoutVocabulary (): { doc: LayoutVocabularyDoc, undocumented: string[] } {
  const defs = (normalizedLayoutSchema as Record<string, any>).$defs
  const undocumented: string[] = []
  const stale: string[] = []

  const groups: LayoutGroupDoc[] = GROUP_DEFS.map(({ key, def, flag }) => {
    const defSchema = defs[def]
    if (!defSchema) throw new Error(`layout vocabulary: unknown normalized schema def "${def}"`)
    const properties: Record<string, any> = defSchema.properties ?? defSchema.allOf?.[1]?.properties ?? {}
    const groupDesc = groupDescriptions[key]
    for (const staleProp of Object.keys(groupDesc?.props ?? {}).filter(p => !(p in properties))) {
      stale.push(`${key}.${staleProp}`)
    }
    return {
      key,
      title: groupDesc?.title ?? key,
      appliesTo: flag ? standardComponents.filter(c => (c as ComponentFlags)[flag]).map(c => c.name) : [],
      props: Object.entries(properties)
        .filter(([name]) => name !== 'comp')
        .map(([name, schema]) => propDoc(name, schema, groupDesc?.props[name], undocumented, `${key}.${name}`)),
    }
  })

  for (const staleGroup of Object.keys(groupDescriptions).filter(key => !GROUP_DEFS.some(g => g.key === key))) {
    stale.push(staleGroup)
  }

  const components: LayoutComponentDoc[] = standardComponents.map(comp => {
    const compDesc = componentDescriptions[comp.name]
    if (!compDesc) undocumented.push(comp.name)
    const properties: Record<string, any> = comp.schema?.properties ?? {}
    for (const staleProp of Object.keys(compDesc?.props ?? {}).filter(p => !(p in properties))) {
      stale.push(`${comp.name}.${staleProp}`)
    }
    return {
      name: comp.name,
      description: compDesc?.description,
      characteristics: CHARACTERISTICS.filter(c => (comp as ComponentFlags)[c.flag]).map(c => c.label),
      page: compDesc?.page,
      props: Object.entries(properties)
        .map(([name, schema]) => propDoc(name, schema, compDesc?.props?.[name], undocumented, `${comp.name}.${name}`)),
    }
  })

  for (const staleComp of Object.keys(componentDescriptions).filter(name => !standardComponents.some(c => c.name === name))) {
    stale.push(staleComp)
  }

  if (stale.length) {
    throw new Error(`layout-keyword-descriptions.ts documents entries unknown to @json-layout/vocabulary (stale docs?): ${stale.join(', ')}`)
  }

  return { doc: { groups, components }, undocumented }
}
