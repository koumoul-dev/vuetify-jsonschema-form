<script>
import { defineComponent, h, computed, ref, watch } from 'vue'
import { VTextarea } from 'vuetify/components/VTextarea'
import { getInputProps, getCompSlots } from '../../utils/index.js'
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

    const fieldProps = computed(() => {
      const inputProps = getInputProps(props.modelValue, props.statefulLayout, ['placeholder'])
      inputProps.ref = textarea
      if (props.modelValue.options.readOnly && props.modelValue.options.summary) inputProps.rows = 3
      return inputProps
    })
    const fieldSlots = computed(() => getCompSlots(props.modelValue, props.statefulLayout))

    watch(() => props.modelValue.options.readOnly, (readOnly) => {
      if (readOnly && textarea.value) {
        textarea.value.scrollTop = 0
      }
    })

    // @ts-ignore
    return () => h(VTextarea, fieldProps.value, fieldSlots.value)
  }
})

</script>

<style>
.vjsf-node-textarea.vjsf-readonly.vjsf-summary textarea {
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 66%, transparent 90%);
}
</style>
