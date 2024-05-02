import { markRaw } from 'vue'
import info from './info.js'
import nodeComponent from './node.vue'

markRaw(nodeComponent)

/** @type {import('../../lib/src/types.js').Plugin} */
export default {
  info,
  nodeComponent
}
