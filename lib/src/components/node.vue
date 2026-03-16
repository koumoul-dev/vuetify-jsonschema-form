<script>
import { defineComponent, h } from 'vue'
import NodeContent from './node-content.vue'

export default defineComponent({
  name: 'VjsfNode',
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../types.js').VjsfNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    let prevModelValue = null
    let cachedVNode = null

    return () => {
      if (props.modelValue === prevModelValue && cachedVNode) {
        return cachedVNode
      }
      prevModelValue = props.modelValue
      cachedVNode = h(NodeContent, {
        modelValue: props.modelValue,
        statefulLayout: props.statefulLayout
      })
      return cachedVNode
    }
  }
})
</script>
