import { describe, it, expect } from 'vitest'
import { buildNav } from './build-nav'

describe('buildNav', () => {
  it('groups pages by directory following nav-config order, sorts items by order then title', () => {
    const nav = buildNav([
      { path: '/src/pages/behavior/options.md', frontmatter: { title: 'Options', nav: { order: 2 } } },
      { path: '/src/pages/introduction/about.md', frontmatter: { title: 'About', nav: { order: 2 } } },
      { path: '/src/pages/introduction/getting-started.md', frontmatter: { title: 'Getting started', nav: { order: 1 } } },
    ])
    expect(nav.groups.map(g => g.title)).toEqual(['Introduction', 'Behavior'])
    expect(nav.groups[0].icon).toBe('mdi-script-text-outline')
    // static Home entry sorts first in Introduction
    expect(nav.groups[0].items.map(i => i.to)).toEqual(['/', '/introduction/getting-started', '/introduction/about'])
  })

  it('carries nav.subsection through', () => {
    const nav = buildNav([
      { path: '/src/pages/components/text-field.md', frontmatter: { title: 'Text field', nav: { order: 10, subsection: 'Fields' } } },
    ])
    expect(nav.groups[0].items[0].subsection).toBe('Fields')
  })

  it('still excludes hidden pages and underscore-prefixed files', () => {
    const nav = buildNav([
      { path: '/src/pages/behavior/_draft.md', frontmatter: { title: 'Draft' } },
      { path: '/src/pages/behavior/secret.md', frontmatter: { title: 'Secret', nav: { hidden: true } } },
      { path: '/src/pages/behavior/options.md', frontmatter: { title: 'Options' } },
    ])
    expect(nav.groups.flatMap(g => g.items).map(i => i.to)).toEqual(['/behavior/options'])
  })

  it('ignores pages whose directory is not a configured group', () => {
    const nav = buildNav([
      { path: '/src/pages/stray.md', frontmatter: { title: 'Stray' } },
    ])
    expect(nav.groups.every(g => !g.items.some(i => i.title === 'Stray'))).toBe(true)
  })
})
