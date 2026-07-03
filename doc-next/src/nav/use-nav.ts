import { buildNav, type NavEntry, type NavItem } from './build-nav'

// unplugin-vue-markdown (exportFrontmatter) emits each frontmatter key as its
// own named export — there is no single `frontmatter` export. Import only the
// keys nav needs (title, nav) so page bodies stay out of the nav bundle.
const titles = import.meta.glob('../pages/**/*.md', {
  eager: true, import: 'title',
}) as Record<string, string | undefined>

const navs = import.meta.glob('../pages/**/*.md', {
  eager: true, import: 'nav',
}) as Record<string, NavEntry['frontmatter']['nav']>

export function useNav (): NavItem[] {
  const entries: NavEntry[] = Object.keys(titles).map(path => ({
    path,
    frontmatter: { title: titles[path], nav: navs[path] },
  }))
  return buildNav(entries)
}
