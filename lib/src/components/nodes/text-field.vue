<script>
import { defineComponent, h, computed } from 'vue'
import { VTextField } from 'vuetify/components'
import { getInputProps, getCompSlots } from '../../utils/index.js'
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

    const fieldProps = computed(() => getInputProps(props.modelValue, props.statefulLayout, ['placeholder']))
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    // @ts-ignore
    return () => h(VTextField, fieldProps.value, fieldSlots.value)
  }
})

</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
