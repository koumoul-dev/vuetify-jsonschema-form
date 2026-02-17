<script>
import { defineComponent, h, toRef, watch, computed } from 'vue'
import { VColorInput } from 'vuetify/labs/VColorInput'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'
import useCompDefaults from '../../composables/use-comp-defaults.js'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfColorPickerNode> */
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
    useDefaults({}, 'VjsfColorPicker')
    const vColorInputDefaults = useCompDefaults('VColorInput', { colorPip: true, hideActions: true })

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder'] }
    )

    const colorInputProps = computed(() => ({
      ...vColorInputDefaults.value, ...inputProps.value, modelValue: localData.value
    }))
    watch(colorInputProps, () => console.log('colorInputProps', colorInputProps.value), { immediate: true })

    return () => h(VColorInput, colorInputProps.value, compSlots.value)
  }
})

</script>
