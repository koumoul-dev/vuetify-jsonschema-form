import { describe, it, expect } from 'vitest'
import { useNav } from './use-nav'
import { getExamples } from '../examples'

describe('useNav', () => {
  it('builds a non-empty nav from real page frontmatter, incl. the home route', () => {
    const nav = useNav()
    expect(nav.length).toBeGreaterThan(0)
    expect(nav.some(i => i.to === '/')).toBe(true)
    // underscore-prefixed probe page must NOT appear in nav
    expect(nav.some(i => i.to === '/_routing-probe')).toBe(false)
  })

  it('appends every example category, grouped under an "Examples" section, after the guide pages', () => {
    const nav = useNav()
    const categories = getExamples()
    const exampleItems = nav.filter(i => i.section === 'Examples')
    expect(exampleItems.length).toBe(categories.length)
    expect(exampleItems.map(i => i.to)).toEqual(categories.map(c => '/' + c.id))
    // no filtering by id prefix (parity with the old doc site's sidebar):
    // the '_dev' category still gets a nav link, only the page itself is
    // marked noindex (see src/pages/[category].vue).
    expect(exampleItems.some(i => i.to === '/_dev')).toBe(true)
    expect(exampleItems.some(i => i.to === '/v2-compat')).toBe(true)

    const guidePageOrders = nav.filter(i => !i.section).map(i => i.order)
    const examplesOrders = exampleItems.map(i => i.order)
    expect(Math.max(...guidePageOrders)).toBeLessThan(Math.min(...examplesOrders))
  })
})
