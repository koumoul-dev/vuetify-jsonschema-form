// Global (script) declaration file — NO top-level import/export, so these
// `declare module` blocks declare/merge ambient modules rather than augment.

// Emitted by src/demos/examples-layouts-plugin.ts.
declare module 'virtual:example-layouts' {
  import type { CompiledLayout } from '@json-layout/core'
  export function loadLayout (key: string): Promise<CompiledLayout | null>
}

// Emitted by the `layoutKeywordSchema()` plugin in vite.config.ts.
declare module 'virtual:layout-keyword-schema' {
  const schema: Record<string, any>
  export default schema
}

// Emitted by src/reference/layout-vocabulary-plugin.ts.
declare module 'virtual:layout-vocabulary' {
  const doc: import('./reference/types').LayoutVocabularyDoc
  export default doc
}

// typed-router.d.ts declares RouteNamedMap for this module but not its runtime
// `routes` value export; this merges the missing export in.
declare module 'vue-router/auto-routes' {
  import type { RouteRecordRaw } from 'vue-router'
  export const routes: RouteRecordRaw[]
}
