import navData from 'virtual:nav-data'
import { buildNav, type Nav } from './build-nav'

export function useNav (): Nav {
  return buildNav(navData)
}
