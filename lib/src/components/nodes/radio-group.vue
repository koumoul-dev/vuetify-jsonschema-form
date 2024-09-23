<script>
import { VRadio } from 'vuetify/components/VRadio'
import { VRadioGroup } from 'vuetify/components/VRadioGroup'
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { defineComponent, h, computed, toRef } from 'vue'
import useNode from '../../composables/use-node.js'
import useGetItems from '../../composables/use-get-items.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfRadioGroupNode> */
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
    useDefaults({}, 'VjsfRadioGroup')

    const nodeRef = toRef(props, 'modelValue')
    const getItems = useGetItems(nodeRef, props.statefulLayout)
    const { inputProps, compSlots, localData } = useNode(nodeRef, props.statefulLayout)

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value }
      fieldProps.modelValue = localData.value
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const slots = { ...compSlots.value }
      /** @type {import('vue').VNode[]} */
      const children = []
      if (getItems.loading.value) {
        children.push(h(VSkeletonLoader, { type: 'chip' }))
      } else {
        for (const item of getItems.items.value) {
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
