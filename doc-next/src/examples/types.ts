export interface Example {
  id: string
  title: string
  description?: string
  schema: unknown
  data?: unknown
  options?: unknown
  warning?: string
  codeSlots?: string[]
  defaultProps?: object
}

export interface Category {
  id: string
  title: string
  description?: string
  examples: Example[]
}
