import { describe, it, expect, vi } from 'vitest'

// Exercise buildNav's grouping against fixture entries rather than the live
// virtual module (kept minimal/independent of the real src/pages content).
vi.mock('virtual:nav-data', () => ({
  default: [
    { path: '/src/pages/introduction/getting-started.md', frontmatter: { title: 'Getting started', nav: { order: 1 } } },
  ],
}))

const { useNav } = await import('./use-nav')

describe('useNav', () => {
  it('builds groups from page frontmatter, incl. the static home route', () => {
    const nav = useNav()
    const introduction = nav.groups.find(g => g.dir === 'introduction')
    expect(introduction?.items.map(i => i.to)).toEqual(['/', '/introduction/getting-started'])
  })

  it('exposes standalone items including the playground', () => {
    const nav = useNav()
    expect(nav.standalone.map(i => i.to)).toContain('/editor')
  })
})
