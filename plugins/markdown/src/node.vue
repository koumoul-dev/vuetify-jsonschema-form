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
      modelValue: /** @type {string} */(localData.value),
      label: /** @type {string} */(inputProps.value.label),
      readOnly: props.modelValue.options.readOnly,
      messages: /** @type {Partial<import('./i18n/types.js').VjsfMarkdownMessages>} */(props.modelValue.messages),
      locale: props.modelValue.options.locale ?? 'en',
      inputProps: inputProps.value ?? {},
      autofocus: props.modelValue.autofocus ?? false,
      easyMDEOptions: pluginOptions?.easyMDEOptions ?? {},
      icons: pluginOptions?.icons ?? {},
      cspNonce: pluginOptions?.cspNonce ?? '',
      onBlur: () => props.statefulLayout.blur(props.modelValue),
      'onUpdate:modelValue': (/** @type {string} */value) => props.statefulLayout.input(props.modelValue, value)
    })
  }
})

</script>
