import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import type { HmrContext } from 'vite'
import { buildLayoutVocabulary } from './layout-vocabulary'

// Exposes the layout-keyword reference data (vocabulary structure merged with
// the local descriptions) as `virtual:layout-vocabulary`. Building it eagerly
// on load also runs the drift check: stale description keys fail the build,
// vocabulary entries not documented yet are only warned about (they render
// with a "not documented yet" marker).
export function layoutVocabularyPlugin () {
  const virtualId = 'virtual:layout-vocabulary'
  const resolvedId = '\0' + virtualId
  const descriptionsPath = resolve(dirname(fileURLToPath(import.meta.url)), 'layout-keyword-descriptions.ts')

  return {
    name: 'doc-next-layout-vocabulary',
    resolveId (id: string) { if (id === virtualId) return resolvedId },
    load (id: string) {
      if (id !== resolvedId) return
      const { doc, undocumented } = buildLayoutVocabulary()
      if (undocumented.length) {
        console.warn(`[layout-vocabulary] ${undocumented.length} vocabulary entr${undocumented.length > 1 ? 'ies' : 'y'} not described in layout-keyword-descriptions.ts: ${undocumented.join(', ')}`)
      }
      return `export default ${JSON.stringify(doc)}`
    },
    // re-run the merge when the descriptions catalogue changes in dev
    handleHotUpdate (ctx: HmrContext) {
      if (ctx.file === descriptionsPath) {
        const mod = ctx.server.moduleGraph.getModuleById(resolvedId)
        if (mod) {
          ctx.server.moduleGraph.invalidateModule(mod)
          return [mod, ...ctx.modules]
        }
      }
    },
  }
}
