<script>
import { defineComponent, h, computed, toRef, watch } from 'vue'
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

    watch(localData, () => console.log('data', localData))

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      fullProps.modelValue = localData.value
      console.log('FULL PROPS', fullProps)
      return fullProps
    })

    return () => h(VNumberInput, fullProps.value, compSlots.value)
  }
})

</script>
