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
  // Optional drawer grouping label (e.g. 'Examples'). Consecutive items
  // sharing a `section` are rendered under one subheader by App.vue;
  // markdown-page items (built here) leave it unset. See use-nav.ts, which
  // appends the example-category items that do set it.
  section?: string
}

function toRoute (path: string): string {
  const rel = path.replace(/.*\/pages\//, '/').replace(/\.md$/, '').replace(/\/index$/, '')
  return rel === '' ? '/' : rel
}

function humanize (path: string): string {
  const base = path.replace(/.*\//, '').replace(/\.md$/, '')
  return base.charAt(0).toUpperCase() + base.slice(1).replace(/-/g, ' ')
}

// Shared by buildNav below and by use-nav.ts, which merges in the
// example-category items (a separately-sourced list, see getExamples())
// before doing one final combined sort.
export function sortNav (items: NavItem[]): NavItem[] {
  return [...items].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

export function buildNav (entries: NavEntry[]): NavItem[] {
  return sortNav(entries
    .filter(e => !/\/_[^/]*\.md$/.test(e.path)) // skip underscore-prefixed files
    .filter(e => !e.frontmatter.nav?.hidden)
    .map(e => ({
      title: e.frontmatter.title ?? humanize(e.path),
      to: toRoute(e.path),
      order: e.frontmatter.nav?.order ?? 100,
    })))
}
