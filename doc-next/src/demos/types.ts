export interface Example {
  id: string
  title: string
  description?: string
  schema: Record<string, any>
  data?: unknown
  options?: unknown
  warning?: string
  /** Vuetify defaults applied around the demo's form (VjsfExample wraps the
   * vjsf in a v-defaults-provider) — the scoped equivalent of passing them to
   * createVuetify({ defaults }), shown in a "Vuetify defaults" source tab. */
  vuetifyDefaults?: Record<string, any>
  /** Vue template code shown in a "Slots" tab of the source pane. The live
   * slot itself is defined in the page, inside the <VjsfDemo> tag (VjsfDemo
   * forwards its slots to the inner vjsf) — keep both in sync. */
  slotsCode?: string
}

export interface DemoCollection {
  id: string
  route: string
  v2compat?: boolean
  demos: Example[]
}
