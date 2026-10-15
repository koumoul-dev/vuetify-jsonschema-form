// Shapes shared by the node-side extraction (layout-vocabulary.ts, consumed
// by the vite plugin and the search index) and the client-side rendering
// components (via the `virtual:layout-vocabulary` module).

export interface LayoutPropDoc {
  name: string
  /** Human-oriented type label derived from the vocabulary schema ("string",
   * "expression", "number | object"...). */
  type: string
  /** HTML description from the local descriptions catalogue; absent when the
   * vocabulary introduced a property not documented here yet. */
  description?: string
  /** Internal route of the page demoing the property. */
  see?: { to: string, label: string }
  /** Produced by schema normalization rather than written in `layout`. */
  computed?: boolean
}

export interface LayoutGroupDoc {
  key: string
  title: string
  /** Component names the group applies to, derived from the standard
   * components' characteristics flags (empty = every component). */
  appliesTo: string[]
  props: LayoutPropDoc[]
}

export interface LayoutComponentDoc {
  name: string
  description?: string
  /** Characteristic labels ("composite", "items based", ...). */
  characteristics: string[]
  /** Internal route of the page documenting the component. */
  page?: { to: string, label: string }
  props: LayoutPropDoc[]
}

export interface LayoutVocabularyDoc {
  groups: LayoutGroupDoc[]
  components: LayoutComponentDoc[]
}
