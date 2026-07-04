import navData from 'virtual:nav-data'
import { buildNav, type Nav } from './build-nav'
import { getExamples } from '../examples'

export function useNav (): Nav {
  const nav = buildNav(navData)
  // TEMPORARY during the redesign: legacy auto-generated example categories,
  // removed in the final cleanup task once all component pages exist.
  nav.groups.push({
    dir: '_legacy-examples',
    title: 'Examples (legacy)',
    icon: 'mdi-flask-outline',
    items: getExamples().map((category, i) => ({ title: category.title, to: '/' + category.id, order: i })),
  })
  return nav
}
