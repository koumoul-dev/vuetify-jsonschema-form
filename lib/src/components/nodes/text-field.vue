<script>
import { defineComponent, h, toRef, computed } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import useField from '../../composables/use-field.js'
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

    const { inputProps, localData, compSlots } = useField(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder'] }
    )

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      fullProps.modelValue = localData.value
      return fullProps
    })

    return () => h(VTextField, fullProps.value, compSlots.value)
  }
})

</script>

<style>
.vjsf-node-text-field.vjsf-readonly.vjsf-summary input {
  text-overflow: ellipsis;
}
</style>
