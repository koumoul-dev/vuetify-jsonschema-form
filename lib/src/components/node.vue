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
    /** @type import('../types.js').VjsfNode | null */
    let prevModelValue = null
    /** @type import('vue').VNode | null */
    let cachedVNode = null

    // this component acts as a simple wrapper that prevents re-rendering of unchanged immutable node
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
