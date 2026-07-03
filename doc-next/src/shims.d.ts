// Global (script) declaration file — NO top-level import/export, so these
// `declare module` blocks declare/merge ambient modules rather than augment.

// Emitted by build/examples-layouts-plugin.ts.
declare module 'virtual:example-layouts' {
  import type { CompiledLayout } from '@json-layout/core'
  export function loadLayout (key: string): Promise<CompiledLayout | null>
}

// typed-router.d.ts declares RouteNamedMap for this module but not its runtime
// `routes` value export; this merges the missing export in.
declare module 'vue-router/auto-routes' {
  import type { RouteRecordRaw } from 'vue-router'
  export const routes: RouteRecordRaw[]
}
