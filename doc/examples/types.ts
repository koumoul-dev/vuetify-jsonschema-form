import type { JSONLayoutExample, JSONLayoutExamplesCategory } from '@json-layout/examples'

export type VJSFExample = JSONLayoutExample & {
  defaultProps?: object
}

export type VJSFExamplesCategory = JSONLayoutExamplesCategory & {
  examples: VJSFExample[]
}
