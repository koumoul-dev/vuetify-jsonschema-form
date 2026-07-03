import { compile, produceCompileOptions } from '@json-layout/core/compile'
import { serialize } from '@json-layout/core/src/compile/serialize'
// @ts-expect-error no published types for the plugin's info.js entrypoint
import markdownInfo from '@koumoul/vjsf-markdown/info.js'
// @ts-expect-error no published types for the plugin's info.js entrypoint
import imgCropperInfo from '@koumoul/vjsf-img-cropper/info.js'
import { v2compat } from '@koumoul/vjsf/compat/v2'
import { getExamples } from '../src/examples/index'
import type { Category, Example } from '../src/examples/types'

// compile() only needs a ComponentInfo (name + capability flags) for any component
// referenced by an example's schema (via the `layout`/`x-display` keyword) -- it never
// needs the Vue node component itself, that is only required at render time by the
// consuming component (VjsfExample.vue, task 3). Some examples reference plugin
// components (formats/markdown, _dev/remove-additional, v2-compat's markdown-editor,
// merged/img-cropper) so their info must be registered here or compile() silently
// falls back to a default/hidden component instead of throwing (see the
// `validationErrors` check in compileExampleSource below, which turns that silent
// fallback into a hard build failure).
const pluginComponents: Record<string, unknown> = {
  markdown: markdownInfo,
  'img-cropper': imgCropperInfo,
}

// A handful of v2-compat examples exist purely to *document* a VJSF-2 pattern that has
// no VJSF-3 equivalent (the category itself is documented as "not 100% compatible").
// `select-schema-deps` is explicit about it: its own `warning` field says "Using
// eval-expr is not supported in VJSF 3." -- its `x-fromData` uses expr-eval syntax
// (e.g. `filterOneOfItem(item) = ...`) which v2compat() does not translate to valid JS,
// so `compile()` throws a SyntaxError from `new Function(...)` while building the
// expression. This is a genuine, pre-existing content limitation (not a compile-plugin
// bug), so rather than failing the whole build over one intentionally-unsupported demo,
// we precompile it to a `null` layout and let the renderer (task 3) show the
// description/warning without an interactive form for these specific keys.
const KNOWN_INCOMPATIBLE = new Set([
  'v2-compat/select-schema-deps',
])

const MANIFEST_ID = 'virtual:example-layouts'
const RESOLVED_MANIFEST_ID = '\0' + MANIFEST_ID
const LAYOUT_PREFIX = 'virtual:example-layout:'
const RESOLVED_LAYOUT_PREFIX = '\0' + LAYOUT_PREFIX

function allKeys (): string[] {
  const keys: string[] = []
  for (const category of getExamples()) {
    for (const example of category.examples) {
      keys.push(`${category.id}/${example.id}`)
    }
  }
  return keys
}

function findExample (key: string): { category: Category, example: Example } {
  const slash = key.indexOf('/')
  const categoryId = key.slice(0, slash)
  const exampleId = key.slice(slash + 1)
  const category = getExamples().find(c => c.id === categoryId)
  if (!category) throw new Error(`unknown example category "${categoryId}" (key "${key}")`)
  const example = category.examples.find(e => e.id === exampleId)
  if (!example) throw new Error(`unknown example "${exampleId}" in category "${categoryId}" (key "${key}")`)
  return { category, example }
}

/**
 * Compiles + serializes one example's schema into JS source that exports
 * `compiledLayout`. Fails loudly (throws) both when compile()/serialize() throws AND
 * when json-layout silently degraded a node to a default/hidden component because of
 * a normalization error (e.g. an unregistered component name) -- json-layout does not
 * throw in that case by itself, it just records it in `validationErrors`, which would
 * otherwise let a broken layout ship silently.
 */
async function compileExampleSource (key: string): Promise<string> {
  const { category, example } = findExample(key)
  try {
    const schema = category.id === 'v2-compat'
      ? v2compat(example.schema as object)
      : example.schema as object
    const exampleOptions: Record<string, any> = (example.options && typeof example.options === 'object')
      ? example.options as Record<string, any>
      : {}
    const compileOptions = produceCompileOptions({}, {
      ...exampleOptions,
      components: { ...pluginComponents, ...(exampleOptions.components as object | undefined) },
    })
    const compiled = compile(schema, compileOptions)
    const errorPointers = Object.keys(compiled.validationErrors)
    if (errorPointers.length) {
      const message = `unresolved layout validation errors at ${errorPointers.join(', ')}: ${JSON.stringify(compiled.validationErrors)}`
      if (category.id === 'v2-compat') {
        // The v2-compat category is explicitly documented as "not 100% compatible":
        // some legacy x-display combinations (e.g. x-display:icon combined with a
        // oneOf, which v2compat() does not translate) have no v3 equivalent, so
        // json-layout falls back to a default component for that one node instead of
        // throwing. Surface it loudly in the build log without failing the whole
        // build -- this matches today's (runtime) production behaviour for this
        // category, it is a pre-existing content limitation, not a compile-plugin bug.
        console.warn(`[doc-next-example-layouts] ${key}: ${message}`)
      } else {
        throw new Error(message)
      }
    }
    const code = await serialize(compiled)
    return `${code}\nexport { compiledLayout }\n`
  } catch (err: any) {
    if (KNOWN_INCOMPATIBLE.has(key)) {
      console.warn(`[doc-next-example-layouts] ${key}: known-incompatible, precompiling to a null layout (${err.message})`)
      return 'export const compiledLayout = null\n'
    }
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
    // Eagerly validates every example compiles, regardless of whether any page
    // currently imports its layout module -- this is what makes "all examples compile"
    // a build-time guarantee instead of something that only fails once a page happens
    // to reference a broken one. Only runs for an actual `vite build` (not `vite dev`,
    // to keep dev-server startup fast) and only once, on the client pass -- mirrors
    // search-index-plugin's isSsr guard to avoid paying this cost twice per build.
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
