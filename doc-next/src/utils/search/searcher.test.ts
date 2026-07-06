import { describe, it, expect } from 'vitest'
import { createSearcher } from './searcher'

const docs = [
  { id: '1', title: 'Date picker', category: 'demo-date-time', path: '/components/date-time', headings: [], content: 'pick a date value' },
  { id: '2', title: 'Date picker (v2)', category: 'demo-v2-properties', path: '/migration/v2-compat-properties', headings: [], content: 'legacy date field' },
]

describe('createSearcher', () => {
  it('ranks a normal match above a v2-compat match (down-weight)', () => {
    const results = createSearcher(docs).search('date')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].category).not.toBe('demo-v2-properties')
  })

  it('lifts the v2-compat score when the query mentions v2/compat', () => {
    const s = createSearcher(docs)
    const base = s.search('date').find(r => r.category === 'demo-v2-properties')
    const lifted = s.search('compat date').find(r => r.category === 'demo-v2-properties')
    expect(base).toBeDefined()
    expect(lifted).toBeDefined()
    // Same 'date' match, but 'compat' in the query triggers the up-weight
    // (0.2 -> 1.5), so the v2-compat doc must score strictly higher. This fails
    // if boostDocument is deleted (constant 1) or inverted.
    expect(lifted!.score).toBeGreaterThan(base!.score)
  })

  it('returns [] for an empty query', () => {
    expect(createSearcher(docs).search('   ')).toEqual([])
  })
})
