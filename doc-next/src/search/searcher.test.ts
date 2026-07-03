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

  it('surfaces v2-compat docs when the query mentions v2/compat', () => {
    const results = createSearcher(docs).search('v2 date')
    expect(results.some(r => r.category === 'v2-compat')).toBe(true)
  })

  it('returns [] for an empty query', () => {
    expect(createSearcher(docs).search('   ')).toEqual([])
  })
})
