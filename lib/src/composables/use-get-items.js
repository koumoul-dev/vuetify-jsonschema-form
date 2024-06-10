import { watch, shallowRef, ref } from 'vue'

/**
 * @param {{modelValue: import('@json-layout/core').StateNode, statefulLayout: import('../types.js').VjsfStatefulLayout}} props
 */
export default function (props) {
  /** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
  const items = shallowRef([])
  /** @type import('vue').Ref<boolean> */
  const loading = ref(false)
  /** @type import('vue').Ref<string> */
  const search = ref('')

  const fetchItems = async () => {
    loading.value = true
    items.value = await props.statefulLayout.getItems(props.modelValue, search.value)
    loading.value = false
  }

  watch(() => props.modelValue.itemsCacheKey, (newValue, oldValue) => {
    if (newValue === oldValue) return
    fetchItems()
  }, { immediate: true })

  watch(search, () => {
    fetchItems()
  })

  return { items, loading, search }
}
