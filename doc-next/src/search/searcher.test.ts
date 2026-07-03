import { describe, it, expect } from 'vitest'
import { createSearcher } from './searcher'

const docs = [
  { id: '1', title: 'Date picker', category: 'formats', path: '/formats/date', headings: [], content: 'pick a date value' },
  { id: '2', title: 'Date picker (v2)', category: 'v2-compat', path: '/v2/date', headings: [], content: 'legacy date field' },
]

describe('createSearcher', () => {
  it('ranks a normal match above a v2-compat match (D14 down-weight)', () => {
    const results = createSearcher(docs).search('date')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].category).not.toBe('v2-compat')
  })

  it('lifts the v2-compat score when the query mentions v2/compat (D14)', () => {
    const s = createSearcher(docs)
    const base = s.search('date').find(r => r.category === 'v2-compat')
    const lifted = s.search('compat date').find(r => r.category === 'v2-compat')
    expect(base).toBeDefined()
    expect(lifted).toBeDefined()
    // Same 'date' match, but 'compat' in the query triggers the D14 up-weight
    // (0.2 -> 1.5), so the v2-compat doc must score strictly higher. This fails
    // if boostDocument is deleted (constant 1) or inverted.
    expect(lifted!.score).toBeGreaterThan(base!.score)
  })

  it('returns [] for an empty query', () => {
    expect(createSearcher(docs).search('   ')).toEqual([])
  })
})
