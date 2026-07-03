import { describe, it, expect } from 'vitest'
import { buildNav } from './build-nav'

describe('buildNav', () => {
  it('derives title/route from frontmatter+path and sorts by order then title', () => {
    const nav = buildNav([
      { path: '/src/pages/getting-started.md', frontmatter: { title: 'Getting started', nav: { order: 2 } } },
      { path: '/src/pages/index.md', frontmatter: { title: 'Home', nav: { order: 0 } } },
      { path: '/src/pages/about.md', frontmatter: { title: 'About', nav: { order: 1 } } },
    ])
    expect(nav.map(n => n.to)).toEqual(['/', '/about', '/getting-started'])
    expect(nav[0].title).toBe('Home')
  })

  it('excludes pages with nav.hidden and underscore-prefixed files', () => {
    const nav = buildNav([
      { path: '/src/pages/index.md', frontmatter: { title: 'Home' } },
      { path: '/src/pages/_draft.md', frontmatter: { title: 'Draft' } },
      { path: '/src/pages/secret.md', frontmatter: { title: 'Secret', nav: { hidden: true } } },
    ])
    expect(nav.map(n => n.to)).toEqual(['/'])
  })

  it('falls back to a humanized filename when title is missing, order defaults to 100', () => {
    const nav = buildNav([
      { path: '/src/pages/data-types.md', frontmatter: {} },
      { path: '/src/pages/index.md', frontmatter: { title: 'Home', nav: { order: 0 } } },
    ])
    expect(nav.map(n => n.title)).toEqual(['Home', 'Data types'])
  })
})
