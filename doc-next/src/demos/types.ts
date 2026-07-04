import type { Example } from '../examples/types'

export interface DemoCollection {
  id: string
  route: string
  v2compat?: boolean
  demos: Example[]
}
