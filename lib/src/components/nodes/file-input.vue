<script>
import { defineComponent, h, computed, toRef } from 'vue'
import { VFileInput } from 'vuetify/components/VFileInput'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfFileInputNode> */
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
    useDefaults({}, 'VjsfFileInput')

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder', 'accept', 'multiple'] }
    )

    const fieldProps = computed(() => {
      const fieldProps = { ...inputProps.value }
      if (fieldProps.multiple) console.error('File input doesn\'t support multiple inputs yet')
      fieldProps['onUpdate:modelValue'] = (/** @type {File} */value) => {
        props.statefulLayout.input(props.modelValue, value)
      }
      return fieldProps
    })

    // @ts-ignore
    return () => h(VFileInput, { ...fieldProps.value, modelValue: localData.value }, compSlots.value)
  }
})

</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
