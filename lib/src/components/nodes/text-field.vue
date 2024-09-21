<script>
import { defineComponent, h, toRef } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import useNode from '../../composables/use-node.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfTextFieldNode> */
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
    useDefaults({}, 'VjsfTextField')

    const { inputProps, localData, compSlots } = useNode(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder'] }
    )

    return () => h(VTextField, { ...inputProps.value, modelValue: localData.value }, compSlots.value)
  }
})

</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
