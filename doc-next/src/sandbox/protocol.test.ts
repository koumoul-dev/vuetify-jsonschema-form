import { describe, it, expect } from 'vitest'
import { isRenderMessage, isSandboxMessage } from './protocol'

describe('isRenderMessage', () => {
  it('accepts a well-formed render message', () => {
    expect(isRenderMessage({ type: 'render', schema: {}, options: {}, data: {}, theme: 'dark' })).toBe(true)
  })
  it('rejects wrong type or missing fields or bad theme', () => {
    expect(isRenderMessage({ type: 'nope' })).toBe(false)
    expect(isRenderMessage({ type: 'render', schema: {}, options: {}, data: {}, theme: 'blue' })).toBe(false)
    expect(isRenderMessage(null)).toBe(false)
  })
})

describe('isSandboxMessage', () => {
  it('accepts each sandbox->parent message type', () => {
    expect(isSandboxMessage({ type: 'ready' })).toBe(true)
    expect(isSandboxMessage({ type: 'update', data: {} })).toBe(true)
    expect(isSandboxMessage({ type: 'validation', errors: {} })).toBe(true)
    expect(isSandboxMessage({ type: 'error', message: 'x' })).toBe(true)
  })
  it('rejects unknown/malformed messages', () => {
    expect(isSandboxMessage({ type: 'render' })).toBe(false)
    expect(isSandboxMessage('nope')).toBe(false)
  })
})
