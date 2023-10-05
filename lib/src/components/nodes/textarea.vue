<script>
import { defineComponent, h, computed } from 'vue'
import { VTextarea } from 'vuetify/components'
import { getInputProps } from '../../utils/props.js'
import { getCompSlots } from '../../utils/slots.js'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('@json-layout/core').TextFieldNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props) {
    const fieldProps = computed(() => getInputProps(props.modelValue, props.statefulLayout))
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    // @ts-ignore
    return () => h(VTextarea, fieldProps.value, fieldSlots.value)
  }
})

</script>
