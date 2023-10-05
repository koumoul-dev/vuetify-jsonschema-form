import { h } from 'vue'
import NodeSlot from '../components/fragments/node-slot.vue'

// calculate the slots of components
/**
 * @param {import('@json-layout/core').StateNode} node
 * @param {import('@json-layout/core').StatefulLayout} statefulLayout
 * @returns {Record<string, any>}
 */
export function getCompSlots (node, statefulLayout) {
  if (!node.layout.slots) return {}
  // const options = /** @type import('../components/types.js').VjsfOptions */(node.options)
  /** @type {Record<string, any>} */
  const slots = {}
  for (const [key, layoutSlot] of Object.entries(node.layout.slots)) {
    slots[key] = () => h(NodeSlot, { layoutSlot, node, statefulLayout })
  }
  return slots
}
