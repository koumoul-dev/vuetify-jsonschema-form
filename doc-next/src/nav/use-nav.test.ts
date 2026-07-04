import { describe, it, expect, vi } from 'vitest'

// Real src/pages has no group subdirectories yet (Tasks 5-14 migrate the
// content), so exercise buildNav's grouping against fixture entries rather
// than the live virtual module.
vi.mock('virtual:nav-data', () => ({
  default: [
    { path: '/src/pages/introduction/getting-started.md', frontmatter: { title: 'Getting started', nav: { order: 1 } } },
  ],
}))

vi.mock('../examples', () => ({
  getExamples: () => [
    { id: 'foo', title: 'Foo' },
    { id: 'bar', title: 'Bar' },
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

  it('appends the legacy example categories as a trailing group', () => {
    const nav = useNav()
    const last = nav.groups[nav.groups.length - 1]
    expect(last.dir).toBe('_legacy-examples')
    expect(last.items.map(i => i.to)).toEqual(['/foo', '/bar'])
  })
})
