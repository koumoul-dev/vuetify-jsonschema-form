import { markRaw } from 'vue'
import info from './info.js'
import nodeComponent from './node.vue'
export { default as MarkdownEditor } from './editor.vue'

markRaw(nodeComponent)

export default {
  info,
  nodeComponent
}
