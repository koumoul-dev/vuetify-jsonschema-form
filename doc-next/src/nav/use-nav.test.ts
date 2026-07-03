import { describe, it, expect } from 'vitest'
import { useNav } from './use-nav'

describe('useNav', () => {
  it('builds a non-empty nav from real page frontmatter, incl. the home route', () => {
    const nav = useNav()
    expect(nav.length).toBeGreaterThan(0)
    expect(nav.some(i => i.to === '/')).toBe(true)
    // underscore-prefixed probe page must NOT appear in nav
    expect(nav.some(i => i.to === '/_routing-probe')).toBe(false)
  })
})
