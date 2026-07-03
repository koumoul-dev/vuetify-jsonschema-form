import { describe, it, expect } from 'vitest'
import { getExamples } from './index'

describe('getExamples', () => {
  it('aggregates 15 categories with a v2-compat and a vuetify category', () => {
    const cats = getExamples()
    expect(cats.length).toBe(15)
    const ids = cats.map(c => c.id)
    expect(ids).toContain('v2-compat')
    expect(ids).toContain('vuetify')
    expect(ids).toContain('simple-properties')
  })
  it('every example has an id/title/schema; total is 118', () => {
    const cats = getExamples()
    const total = cats.reduce((n, c) => n + c.examples.length, 0)
    expect(total).toBe(118)
    for (const c of cats) {
      for (const e of c.examples) {
        expect(typeof e.id).toBe('string')
        expect(typeof e.title).toBe('string')
        expect(e.schema).toBeTruthy()
      }
    }
  })
  it('flattens v2 groups with "Group - Example" titles', () => {
    const v2 = getExamples().find(c => c.id === 'v2-compat')!
    expect(v2.examples.length).toBe(58)
    expect(v2.examples[0].title).toMatch(/ - /)
  })
})
