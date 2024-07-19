<script>
import { VRadio } from 'vuetify/components/VRadio'
import { VRadioGroup } from 'vuetify/components/VRadioGroup'
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { defineComponent, h, computed } from 'vue'
import { getInputProps, getCompSlots } from '../../utils/index.js'
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

    const getItems = useGetItems(props)

    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
      return fieldProps
    })

    const fieldSlots = computed(() => {
      const slots = getCompSlots(props.modelValue, props.statefulLayout)
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
