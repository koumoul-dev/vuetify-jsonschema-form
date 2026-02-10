<script>
import { defineComponent, h, toRef } from 'vue'
import VjsfMarkdownEditor from './editor.vue'
import useNode from '@koumoul/vjsf/composables/use-node.js'
import 'easymde/dist/easymde.min.css'

/** @typedef {import('@koumoul/vjsf/types.js').VjsfNode & {data: string | undefined | null}} MarkdownNode */

export default defineComponent({
  props: {
    modelValue: {
      /** @type {import('vue').PropType<MarkdownNode>} */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type {import('vue').PropType<import('@koumoul/vjsf/types.js').VjsfStatefulLayout>} */
      type: Object,
      required: true
    }
  },
  setup (props, { expose }) {
    const { inputProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)
    const pluginOptions = /** @type {import('./types.js').VjsfPluginMarkdownOptions | undefined} */(props.modelValue.options.pluginsOptions.markdown)

    return () => h(VjsfMarkdownEditor, {
      modelValue: localData.value,
      label: inputProps.value.label,
      readOnly: props.modelValue.options.readOnly,
      messages: props.modelValue.messages,
      locale: props.modelValue.options.locale,
      inputProps: inputProps.value,
      autofocus: props.modelValue.autofocus,
      easyMDEOptions: pluginOptions?.easyMDEOptions,
      icons: pluginOptions?.icons,
      onBlur: () => props.statefulLayout.blur(props.modelValue),
      'onUpdate:modelValue': (value) => props.statefulLayout.input(props.modelValue, value)
    })
  }
})

</script>
