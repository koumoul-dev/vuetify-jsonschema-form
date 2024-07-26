import { h } from 'vue'
import NodeSlot from '../components/fragments/node-slot.vue'
import SelectItem from '../components/fragments/select-item.vue'
import SelectSelection from '../components/fragments/select-selection.vue'

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

/**
 * shared between select and autocomplete components
 * @param {import('../types.js').VjsfSelectNode} node
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 * @param {any} getItems
 * @returns {Record<string, any>}
 */
export function getSelectSlots (node, statefulLayout, getItems) {
  const slots = getCompSlots(node, statefulLayout)
  if (!slots.item) {
    slots.item = (/** @type {any} */ context) => h(SelectItem, {
      multiple: node.layout.multiple,
      itemProps: context.props,
      item: context.item.raw
    })
  }
  if (!slots.selection) {
    slots.selection = (/** @type {any} */ context) => h(SelectSelection, {
      multiple: node.layout.multiple,
      last: node.layout.multiple && context.index === node.data.length - 1,
      item: getItems.prepareSelectedItem(context.item.raw, context.item.value)
    })
  }
  return slots
}
