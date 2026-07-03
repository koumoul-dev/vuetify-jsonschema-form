import navData from 'virtual:nav-data'
import { buildNav, sortNav, type NavItem } from './build-nav'
import { getExamples } from '../examples'

// Guide (markdown) pages currently use orders 0-2 (see src/pages/*.md
// frontmatter); starting the examples section at 10 keeps it below those
// but well below the default order (100) any future orderless markdown page
// would fall back to, so "Examples" reliably sits right under the guides.
const EXAMPLES_BASE_ORDER = 10

export function useNav (): NavItem[] {
  const exampleItems: NavItem[] = getExamples().map((category, i) => ({
    title: category.title,
    to: '/' + category.id,
    order: EXAMPLES_BASE_ORDER + i,
    section: 'Examples',
  }))
  return sortNav([...buildNav(navData), ...exampleItems])
}
