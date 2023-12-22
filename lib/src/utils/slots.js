import { h } from 'vue'
import NodeSlot from '../components/fragments/node-slot.vue'

// calculate the slots of components
/**
 * @param {import('../types.js').VjsfNode} node
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @returns {Record<string, any>}
 */
export function getCompSlots (node, statefulLayout) {
  if (!node.layout.slots) return {}
  /** @type {Record<string, any>} */
  const slots = {}
  for (const [key, layoutSlot] of Object.entries(node.layout.slots)) {
    slots[key] = () => h(NodeSlot, { layoutSlot, node, statefulLayout })
  }
  return slots
}
