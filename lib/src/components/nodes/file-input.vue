<script>
import { defineComponent, h, computed } from 'vue'
import { VFileInput } from 'vuetify/components'
import { getInputProps } from '../../utils/props.js'
import { getCompSlots } from '../../utils/slots.js'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../types.js').VjsfTextFieldNode> */
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
    const fieldProps = computed(() => {
      const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['placeholder', 'accept'])
      if (props.modelValue.layout.multiple) {
        fieldProps.multiple = true
      } else {
        fieldProps.modelValue = props.modelValue.data ? [props.modelValue.data] : props.modelValue.data
        fieldProps['onUpdate:modelValue'] = (/** @type string */value) => props.statefulLayout.input(props.modelValue, Array.isArray(value) ? value[0] : value)
      }
      return fieldProps
    })
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    // @ts-ignore
    return () => h(VFileInput, fieldProps.value, fieldSlots.value)
  }
})

</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
