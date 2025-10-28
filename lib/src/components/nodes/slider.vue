<script>
import { VSlider } from 'vuetify/components/VSlider'
import { defineComponent, computed, toRef, h } from 'vue'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfSliderNode> */
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
    useDefaults({}, 'VjsfSlider')

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['step', 'min', 'max'] }
    )

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      fullProps.modelValue = localData.value
      fullProps['onUpdate:modelValue'] = (/** @type string */value) => {
        const newData = value && Number(value)
        localData.value = newData
        props.statefulLayout.input(props.modelValue, newData)
      }
      return fullProps
    })

    return () => h(VSlider, fullProps.value, compSlots.value)
  }
})
</script>
