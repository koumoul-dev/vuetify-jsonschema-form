<script>
import { defineComponent, h, computed, ref, watch, toRef } from 'vue'
import { VTextarea } from 'vuetify/components/VTextarea'
import useField from '../../composables/use-field.js'
import { useDefaults } from 'vuetify'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../../types.js').VjsfTextareaNode> */
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
    useDefaults({}, 'VjsfTextArea')

    /** @type {import('vue').Ref<null | HTMLElement>} */
    const textarea = ref(null)

    const { inputProps, localData, compSlots, options } = useField(
      toRef(props, 'modelValue'), props.statefulLayout, { layoutPropsMap: ['placeholder'] }
    )

    const fullProps = computed(() => {
      const fullProps = { ...inputProps.value }
      fullProps.ref = textarea
      if (options.value.readOnly && options.value.summary) fullProps.rows = 3
      fullProps.modelValue = localData.value
      return fullProps
    })

    watch(() => options.value.readOnly, (readOnly) => {
      if (readOnly && textarea.value) {
        textarea.value.scrollTop = 0
      }
    })

    return () => h(VTextarea, fullProps.value, compSlots.value)
  }
})

</script>

<style>
.vjsf-node-textarea.vjsf-readonly.vjsf-summary textarea {
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 66%, transparent 90%);
}
</style>
