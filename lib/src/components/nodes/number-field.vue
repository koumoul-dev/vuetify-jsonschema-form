<script>
import { defineComponent, h, computed, toRef } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfNumberFieldNode> */
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
    useDefaults({}, 'VjsfNumberField')

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['step', 'min', 'max', 'placeholder'], bindData: false }
    )

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      fullProps.type = 'number'
      fullProps['onUpdate:modelValue'] = (/** @type string */value) => props.statefulLayout.input(props.modelValue, value ? Number(value) : undefined)
      fullProps.modelValue = localData.value
      return fullProps
    })

    return () => h(VTextField, fullProps.value, compSlots.value)
  }
})

</script>
