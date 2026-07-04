export interface Example {
  id: string
  title: string
  description?: string
  schema: Record<string, any>
  data?: unknown
  options?: unknown
  warning?: string
  codeSlots?: string[]
  defaultProps?: object
}

export interface DemoCollection {
  id: string
  route: string
  v2compat?: boolean
  demos: Example[]
}
