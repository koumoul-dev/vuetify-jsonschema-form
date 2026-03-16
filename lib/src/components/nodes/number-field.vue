<script>
import { defineComponent, h, computed, toRef } from 'vue'
import { VNumberInput } from 'vuetify/components/VNumberInput'
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
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['step', 'min', 'max', 'precision', 'placeholder'] }
    )

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value }
      if (fieldProps.precision === undefined) fieldProps.precision = null
      return fieldProps
    })

    const fullProps = computed(() => ({ ...fieldProps.value, modelValue: localData.value }))

    return () => h(VNumberInput, fullProps.value, compSlots.value)
  }
})

</script>
