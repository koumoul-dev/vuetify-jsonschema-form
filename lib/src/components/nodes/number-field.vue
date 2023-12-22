<script>
import { defineComponent, h, computed } from 'vue'
import { VTextField } from 'vuetify/components'
import { getInputProps, getCompSlots } from '../../utils/index.js'

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
    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['step', 'min', 'max', 'placeholder'])
      fieldProps.type = 'number'
      fieldProps['onUpdate:modelValue'] = (/** @type string */value) => props.statefulLayout.input(props.modelValue, value && Number(value))
      return fieldProps
    })
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    // @ts-ignore
    return () => h(VTextField, fieldProps.value, fieldSlots.value)
  }
})

</script>
