import { compile, produceCompileOptions } from '@json-layout/core/compile'
import { serialize } from '@json-layout/core/src/compile/serialize'
import markdownInfo from '@koumoul/vjsf-markdown/info.js'
import imgCropperInfo from '@koumoul/vjsf-img-cropper/info.js'
import { v2compat } from '@koumoul/vjsf/compat/v2'
import { getDemoCollections } from '../src/demos/index'
import type { Example } from '../src/demos/types'

// compile() only needs a ComponentInfo (name + capability flags) for plugin
// components referenced by demo schemas — never the Vue component itself.
// Without it, compile() silently falls back to a default/hidden component
// (turned into a hard build failure in compileExampleSource below).
const pluginComponents: Record<string, unknown> = {
  markdown: markdownInfo,
  'img-cropper': imgCropperInfo,
}

// Examples precompiled to a `null` layout: VjsfExample.vue renders their
// description/warning without an interactive form.
// - `select-schema-deps` documents a VJSF-2 expr-eval pattern that v2compat()
//   cannot translate — compile() throws on it.
// - `validation-basic`/`validation-sections` compile fine but their generated
//   validate function crashes at runtime (ucs2length interop bug in
//   @json-layout/core's serialize — see BUGS.md).
const KNOWN_INCOMPATIBLE = new Set([
  'demo-v2-advanced/select-schema-deps',
  'demo-v2-advanced/validation-basic',
  'demo-v2-advanced/validation-sections',
])

const MANIFEST_ID = 'virtual:example-layouts'
const RESOLVED_MANIFEST_ID = '\0' + MANIFEST_ID
const LAYOUT_PREFIX = 'virtual:example-layout:'
const RESOLVED_LAYOUT_PREFIX = '\0' + LAYOUT_PREFIX

interface Collection { id: string, v2compat: boolean, examples: Example[] }

function allCollections (): Collection[] {
  return getDemoCollections().map(c => ({ id: c.id, v2compat: !!c.v2compat, examples: c.demos }))
}

function allKeys (): string[] {
  const keys: string[] = []
  for (const collection of allCollections()) {
    for (const example of collection.examples) {
      keys.push(`${collection.id}/${example.id}`)
    }
  }
  return keys
}

function findExample (key: string): { collection: Collection, example: Example } {
  const slash = key.indexOf('/')
  const collectionId = key.slice(0, slash)
  const exampleId = key.slice(slash + 1)
  const collection = allCollections().find(c => c.id === collectionId)
  if (!collection) throw new Error(`unknown example collection "${collectionId}" (key "${key}")`)
  const example = collection.examples.find(e => e.id === exampleId)
  if (!example) throw new Error(`unknown example "${exampleId}" in collection "${collectionId}" (key "${key}")`)
  return { collection, example }
}

/**
 * Compiles + serializes one example's schema into JS source that exports
 * `compiledLayout`. Fails loudly both when compile()/serialize() throws and
 * when json-layout silently degraded a node to a default/hidden component
 * (only recorded in `validationErrors`, never thrown).
 */
async function compileExampleSource (key: string): Promise<string> {
  if (KNOWN_INCOMPATIBLE.has(key)) {
    console.warn(`[doc-next-example-layouts] ${key}: known-incompatible, precompiling to a null layout`)
    return 'export const compiledLayout = null\n'
  }
  const { collection, example } = findExample(key)
  try {
    const schema = collection.v2compat
      ? v2compat(example.schema as object)
      : example.schema as object
    const exampleOptions: Record<string, any> = (example.options && typeof example.options === 'object')
      ? example.options as Record<string, any>
      : {}
    const compileOptions = produceCompileOptions({}, {
      ...exampleOptions,
      components: { ...pluginComponents, ...(exampleOptions.components as object | undefined) } as any,
    })
    const compiled = compile(schema, compileOptions)
    const errorPointers = Object.keys(compiled.validationErrors)
    if (errorPointers.length) {
      const message = `unresolved layout validation errors at ${errorPointers.join(', ')}: ${JSON.stringify(compiled.validationErrors)}`
      if (collection.v2compat) {
        // v2-compat is documented as "not 100% compatible": some legacy
        // x-display combinations have no v3 equivalent — warn loudly in the
        // build log without failing the build.
        console.warn(`[doc-next-example-layouts] ${key}: ${message}`)
      } else {
        throw new Error(message)
      }
    }
    const code = await serialize(compiled)
    return `${code}\nexport { compiledLayout }\n`
  } catch (err: any) {
    throw new Error(`example ${key} failed to compile: ${err.message}`)
  }
}

/**
 * Vite plugin exposing every example's schema as a build-time precompiled
 * `@json-layout/core` layout (no runtime compile()/eval): a `virtual:example-layouts`
 * manifest module exports `loadLayout(key)`, dynamic-importing a per-example virtual
 * module (`virtual:example-layout:<categoryId>/<exampleId>`) so each compiled layout
 * ships as its own lazily-loaded chunk.
 */
export function examplesLayoutsPlugin () {
  let isSsr = false
  let isBuild = false

  return {
    name: 'doc-next-example-layouts',
    configResolved (c: any) {
      isSsr = !!c.build?.ssr
      isBuild = c.command === 'build'
    },
    // Eagerly compile every example so "all examples compile" is a build-time
    // guarantee — build only (keeps dev startup fast), once, on the client pass.
    async buildStart () {
      if (!isBuild || isSsr) return
      for (const key of allKeys()) {
        await compileExampleSource(key)
      }
    },
    resolveId (id: string) {
      if (id === MANIFEST_ID) return RESOLVED_MANIFEST_ID
      if (id.startsWith(LAYOUT_PREFIX)) return RESOLVED_LAYOUT_PREFIX + id.slice(LAYOUT_PREFIX.length)
    },
    async load (id: string) {
      if (id === RESOLVED_MANIFEST_ID) {
        const cases = allKeys().map(key => {
          const specifier = LAYOUT_PREFIX + key
          return `    case ${JSON.stringify(key)}: return import(${JSON.stringify(specifier)}).then(m => m.compiledLayout)`
        })
        return [
          'export function loadLayout (key) {',
          '  switch (key) {',
          ...cases,
          '    default: throw new Error(\'unknown example layout "\' + key + \'"\')',
          '  }',
          '}',
          '',
        ].join('\n')
      }
      if (id.startsWith(RESOLVED_LAYOUT_PREFIX)) {
        const key = id.slice(RESOLVED_LAYOUT_PREFIX.length)
        return compileExampleSource(key)
      }
    },
  }
}
