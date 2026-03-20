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

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value }
      fieldProps['onUpdate:modelValue'] = (/** @type string */value) => {
        const newData = value && Number(value)
        localData.value = newData
        props.statefulLayout.input(props.modelValue, newData)
      }
      return fieldProps
    })

    const fullProps = computed(() => ({ ...fieldProps.value, modelValue: localData.value }))

    return () => h(VSlider, fullProps.value, compSlots.value)
  }
})
</script>

<style>
.vjsf-node-slider .v-slider {
  padding-right: 8px;
}
</style>
