import { navGroups, staticGroupItems } from './nav-config'

export interface NavEntry {
  path: string // glob key, e.g. '/src/pages/getting-started.md'
  frontmatter: {
    title?: string
    nav?: { order?: number, hidden?: boolean, subsection?: string }
  }
}

export interface NavItem {
  title: string
  to: string
  order: number
  // Optional sub-grouping label within a group (e.g. 'Fields' under
  // Components). Consecutive items sharing a `subsection` are rendered
  // under one subheader by AppDrawer.vue.
  subsection?: string
}

export interface NavGroup {
  dir: string
  title: string
  icon: string
  items: NavItem[]
}

export interface Nav {
  groups: NavGroup[]
}

function toRoute (path: string): string {
  const rel = path.replace(/.*\/pages\//, '/').replace(/\.md$/, '').replace(/\/index$/, '')
  return rel === '' ? '/' : rel
}

function humanize (path: string): string {
  const base = path.replace(/.*\//, '').replace(/\.md$/, '')
  return base.charAt(0).toUpperCase() + base.slice(1).replace(/-/g, ' ')
}

// A page's group is the directory it lives in directly under src/pages.
function groupDir (path: string): string | undefined {
  const m = path.match(/\/pages\/([^/]+)\//)
  return m?.[1]
}

const byOrder = (a: NavItem, b: NavItem) => a.order - b.order || a.title.localeCompare(b.title)

export function buildNav (entries: NavEntry[]): Nav {
  const pages = entries
    .filter(e => !/\/_[^/]*\.md$/.test(e.path)) // skip underscore-prefixed files
    .filter(e => !e.frontmatter.nav?.hidden)
  const groups = navGroups
    .map(g => {
      const items: NavItem[] = pages
        .filter(e => groupDir(e.path) === g.dir)
        .map(e => ({
          title: e.frontmatter.title ?? humanize(e.path),
          to: toRoute(e.path),
          order: e.frontmatter.nav?.order ?? 100,
          subsection: e.frontmatter.nav?.subsection,
        }))
      return { dir: g.dir, title: g.title, icon: g.icon, items }
    })
    // Drop empty groups before merging in static items: a static entry
    // (e.g. the Home link) shouldn't by itself resurrect a group that has
    // no actual page in it.
    .filter(g => g.items.length > 0)
    .map(g => ({ ...g, items: [...g.items, ...(staticGroupItems[g.dir] ?? [])].sort(byOrder) }))
  return { groups }
}
