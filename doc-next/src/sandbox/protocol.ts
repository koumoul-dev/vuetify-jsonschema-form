export type Theme = 'light' | 'dark'

export interface RenderMessage {
  type: 'render'
  schema: unknown
  options: Record<string, unknown>
  data: unknown
  theme: Theme
}

export type SandboxToParent =
  | { type: 'ready' }
  | { type: 'update', data: unknown }
  | { type: 'validation', errors: Record<string, string[]> }
  | { type: 'error', message: string }

function isObj (x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null
}

export function isRenderMessage (x: unknown): x is RenderMessage {
  return isObj(x) && x.type === 'render' &&
    'schema' in x && isObj(x.options) && 'data' in x &&
    (x.theme === 'light' || x.theme === 'dark')
}

export function isSandboxMessage (x: unknown): x is SandboxToParent {
  if (!isObj(x)) return false
  switch (x.type) {
    case 'ready': return true
    case 'update': return 'data' in x
    case 'validation': return isObj(x.errors)
    case 'error': return typeof x.message === 'string'
    default: return false
  }
}
