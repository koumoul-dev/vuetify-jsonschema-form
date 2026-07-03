import navData from 'virtual:nav-data'
import { buildNav, type NavItem } from './build-nav'

export function useNav (): NavItem[] {
  return buildNav(navData)
}
