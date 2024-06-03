<script>
import { VRadioGroup, VRadio, VSkeletonLoader } from 'vuetify/components'
import { defineComponent, h, computed, ref, shallowRef } from 'vue'
import { getInputProps, getCompSlots } from '../../utils/index.js'

export default defineComponent({
  props: {
    modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfSelectNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    /** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
    const items = shallowRef([])
    /** @type import('vue').Ref<boolean> */
    const loading = ref(false)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
      return fieldProps
    })

    /** @type import('@json-layout/core').StateTree | null */
    let lastStateTree = null
    /** @type Record<string, any> | null */
    let lastContext = null

    const refresh = async () => {
      if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext) return
      lastStateTree = props.statefulLayout.stateTree
      lastContext = props.statefulLayout.options.context ?? null
      loading.value = true
      items.value = await props.statefulLayout.getItems(props.modelValue)
      loading.value = false
    }

    if (!props.modelValue.layout.items) {
      refresh()
    }

    const fieldSlots = computed(() => {
      const slots = getCompSlots(props.modelValue, props.statefulLayout)
      /** @type {import('vue').VNode[]} */
      const children = []
      if (loading.value) {
        children.push(h(VSkeletonLoader, { type: 'chip' }))
      } else {
        for (const item of items.value) {
          children.push(h(VRadio, { label: item.title, value: item.value }))
        }
      }
      slots.default = () => children
      return slots
    })

    // @ts-ignore
    return () => {
      return h(VRadioGroup, fieldProps.value, fieldSlots.value)
    }
  }
})

</script>
