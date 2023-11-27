<script>
import { defineComponent, h, computed, onMounted, ref, onUnmounted, watch } from 'vue'
import { VInput, VLabel } from 'vuetify/components'
import { getInputProps } from '../../utils/props.js'
import { getCompSlots } from '../../utils/slots.js'
// import 'easymde/dist/easymde.min.css'
// import EasyMDE from 'easymde'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('../types.js').VjsfTextareaNode> */
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
    /** @type {import('vue').Ref<null | HTMLElement>} */
    const element = ref(null)

    const fieldProps = computed(() => getInputProps(props.modelValue, props.statefulLayout))
    const fieldSlots = computed(() => {
      const fieldSlots = getCompSlots(props.modelValue, props.statefulLayout)
      fieldSlots.default = () => [
        h('div', { style: 'width:100%' }, [
          h(VLabel, { text: fieldProps.value.label }),
          h('textarea', { ref: element })
        ])
      ]
      return fieldSlots
    })

    /** @type {EasyMDE | null} */
    let easymde = null

    const initEasyMDE = async () => {
      if (!element.value) throw new Error('component was not mounted for markdown editor')

      // @ts-ignore
      await import('easymde/dist/easymde.min.css')
      const EasyMDE = (await import('easymde')).default

      const messages = props.modelValue.messages

      const config = {
        element: element.value,
        initialValue: props.modelValue.data ?? '',
        renderingConfig: {},
        status: false,
        autoDownloadFontAwesome: false,
        spellChecker: false,
        minHeight: '300px',
        insertTexts: {
          link: [messages.mdeLink1, messages.mdeLink2],
          image: [messages.mdeImg1, messages.mdeImg2],
          table: [messages.mdeTable1, messages.mdeTable2],
          horizontalRule: ['', '\n\n-----\n\n']
        },
        // cf https://github.com/Ionaru/easy-markdown-editor/blob/master/src/js/easymde.js#L1380
        toolbar: [{
          name: 'bold',
          action: EasyMDE.toggleBold,
          className: 'mdi mdi-format-bold',
          title: messages.bold
        }, {
          name: 'italic',
          action: EasyMDE.toggleItalic,
          className: 'mdi mdi-format-italic',
          title: messages.italic
        }, {
          name: 'heading',
          action: EasyMDE.toggleHeadingSmaller,
          className: 'mdi mdi-format-title',
          title: messages.heading
        }, /* {
    name: 'heading-1',
    action: EasyMDE.toggleHeading1,
    className: 'mdi mdi-format-title',
    title: 'Titre 1'
  }, {
    name: 'heading-2',
    action: EasyMDE.toggleHeading2,
    className: 'mdi mdi-format-title',
    title: 'Titre 2'
  }, {
    name: 'heading-3',
    action: EasyMDE.toggleHeading3,
    className: 'mdi mdi-format-title',
    title: 'Titre 3'
  }, */
        '|',
        {
          name: 'quote',
          action: EasyMDE.toggleBlockquote,
          className: 'mdi mdi-format-quote-open',
          title: messages.quote
        },
        {
          name: 'unordered-list',
          action: EasyMDE.toggleUnorderedList,
          className: 'mdi mdi-format-list-bulleted',
          title: messages.unorderedList
        },
        {
          name: 'ordered-list',
          action: EasyMDE.toggleOrderedList,
          className: 'mdi mdi-format-list-numbered',
          title: messages.orderedList
        },
        '|',
        {
          name: 'link',
          action: EasyMDE.drawLink,
          className: 'mdi mdi-link',
          title: messages.createLink
        },
        {
          name: 'image',
          action: EasyMDE.drawImage,
          className: 'mdi mdi-image',
          title: messages.insertImage
        },
        {
          name: 'table',
          action: EasyMDE.drawTable,
          className: 'mdi mdi-table',
          title: messages.createTable
        },
        '|',
        {
          name: 'preview',
          action: EasyMDE.togglePreview,
          className: 'mdi mdi-eye text-accent',
          title: messages.preview,
          noDisable: true
        },
        '|',
        {
          name: 'undo',
          action: EasyMDE.undo,
          className: 'mdi mdi-undo',
          title: messages.undo,
          noDisable: true
        },
        {
          name: 'redo',
          action: EasyMDE.redo,
          className: 'mdi mdi-redo',
          title: messages.redo,
          noDisable: true
        },
        '|',
        {
          name: 'guide',
          action: 'https://simplemde.com/markdown-guide',
          className: 'mdi mdi-help-circle text-success',
          title: messages.mdeGuide,
          noDisable: true
        }
        ],
        ...props.modelValue.options.easyMDEOptions
      }

      if (easymde) easymde.toTextArea()
      // @ts-ignore
      easymde = new EasyMDE(config)

      let changed = false
      easymde.codemirror.on('change', () => {
        changed = true
        if (easymde) props.statefulLayout.input(props.modelValue, easymde.value())
      })
      /** @type {ReturnType<typeof setTimeout> | null} */
      let blurTimeout = null
      easymde.codemirror.on('blur', () => {
        // timeout to prevent triggering save when clicking on a menu button
        blurTimeout = setTimeout(() => {
          if (changed) props.statefulLayout.blur(props.modelValue)
          changed = false
        }, 500)
      })
      easymde.codemirror.on('focus', () => {
        if (blurTimeout) clearTimeout(blurTimeout)
      })
    }

    onMounted(initEasyMDE)

    onUnmounted(() => {
      if (easymde) easymde.toTextArea()
    })

    watch(() => props.modelValue, () => {
      if (easymde && (easymde.value() !== props.modelValue.data ?? '')) {
        easymde.value(props.modelValue.data ?? '')
      }
    })

    return () => h(VInput, fieldProps.value, fieldSlots.value)
  }
})

</script>
