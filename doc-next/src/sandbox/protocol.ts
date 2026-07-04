export type Theme = 'light' | 'dark'

export interface RenderMessage {
  type: 'render'
  schema: unknown
  options: Record<string, unknown>
  data: unknown
  theme: Theme
}

// Asks the sandbox to run the wrapping VForm's validate() — sent by the
// editor's Validate button, which lives in the parent page (pinned at the
// bottom of the preview column), not inside the iframe.
export interface ValidateMessage {
  type: 'validate'
}

export type ParentToSandbox = RenderMessage | ValidateMessage

export type SandboxToParent =
  | { type: 'ready' }
  | { type: 'update', data: unknown }
  | { type: 'validation', errors: Record<string, string[]> }
  | { type: 'error', message: string }

function isObj (x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

export function isRenderMessage (x: unknown): x is RenderMessage {
  return isObj(x) && x.type === 'render' &&
    'schema' in x && isObj(x.options) && 'data' in x &&
    (x.theme === 'light' || x.theme === 'dark')
}

export function isValidateMessage (x: unknown): x is ValidateMessage {
  return isObj(x) && x.type === 'validate'
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
