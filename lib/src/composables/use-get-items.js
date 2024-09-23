import { watch, shallowRef, ref, computed } from 'vue'

/**
 * @param {import('vue').Ref<import('../types.js').VjsfNode>} nodeRef
 * @param {import('../types.js').VjsfStatefulLayout} statefulLayout
 */
export default function (nodeRef, statefulLayout) {
  /** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
  const items = shallowRef([])
  /** @type import('vue').Ref<boolean> */
  const loading = ref(false)
  /** @type import('vue').Ref<string> */
  const search = ref('')

  const hasItems = computed(() => {
    return !!(nodeRef.value.layout.items || nodeRef.value.layout.getItems)
  })

  const fetchItems = async () => {
    loading.value = true
    items.value = await statefulLayout.getItems(nodeRef.value, search.value)
    loading.value = false
  }

  watch(() => nodeRef.value.itemsCacheKey, (newValue, oldValue) => {
    if (newValue === oldValue) return
    fetchItems()
  }, { immediate: true })

  watch(search, () => {
    fetchItems()
  })

  /**
   * @param {any} selectedItem
   * @param {any} itemValue
   */
  const prepareSelectedItem = (selectedItem, itemValue) => {
    let item = selectedItem
    // item and value are the same when the selection is not found in items list
    if (selectedItem === itemValue) {
      try {
        item = statefulLayout.prepareSelectItem(nodeRef.value, selectedItem)
        if (item.value === undefined) item.value = itemValue
      } catch (e) {
        item = { value: itemValue }
      }
    }
    return item
  }

  return { hasItems, items, loading, search, prepareSelectedItem }
}
