import { describe, it, expect } from 'vitest'
import { getDemoCollections, findDemo } from './index'

describe('demo registry', () => {
  it('every collection id is demo- prefixed and unique, every demo id unique within it', () => {
    const ids = getDemoCollections().map(c => c.id)
    expect(ids.every(id => id.startsWith('demo-'))).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of getDemoCollections()) {
      const demoIds = c.demos.map(d => d.id)
      expect(new Set(demoIds).size).toBe(demoIds.length)
    }
  })
  it('findDemo resolves a key and throws on unknown keys', () => {
    const first = getDemoCollections()[0]
    expect(findDemo(`${first.id}/${first.demos[0].id}`).example).toBe(first.demos[0])
    expect(() => findDemo('demo-nope/nothing')).toThrow()
  })
})
