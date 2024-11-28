import { markRaw } from 'vue'
import info from './info.js'
import nodeComponent from './node.vue'

markRaw(nodeComponent)

export default {
  info,
  nodeComponent
}
