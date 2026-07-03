export interface NavEntry {
  path: string // glob key, e.g. '/src/pages/getting-started.md'
  frontmatter: {
    title?: string
    nav?: { order?: number, hidden?: boolean }
  }
}

export interface NavItem {
  title: string
  to: string
  order: number
}

function toRoute (path: string): string {
  const rel = path.replace(/.*\/pages\//, '/').replace(/\.md$/, '').replace(/\/index$/, '')
  return rel === '' ? '/' : rel
}

function humanize (path: string): string {
  const base = path.replace(/.*\//, '').replace(/\.md$/, '')
  return base.charAt(0).toUpperCase() + base.slice(1).replace(/-/g, ' ')
}

export function buildNav (entries: NavEntry[]): NavItem[] {
  return entries
    .filter(e => !/\/_[^/]*\.md$/.test(e.path)) // skip underscore-prefixed files
    .filter(e => !e.frontmatter.nav?.hidden)
    .map(e => ({
      title: e.frontmatter.title ?? humanize(e.path),
      to: toRoute(e.path),
      order: e.frontmatter.nav?.order ?? 100,
    }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}
