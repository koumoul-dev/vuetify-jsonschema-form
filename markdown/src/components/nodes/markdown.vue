<script>
import { defineComponent, h, computed, onMounted, ref, onUnmounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import { VInput, VLabel } from 'vuetify/components'
import { marked } from 'marked'
import { getInputProps, getCompSlots } from '@koumoul/vjsf/utils'
import 'easymde/dist/easymde.min.css'

export default defineComponent({
  props: {
    modelValue: {
      /** @type import('vue').PropType<import('@koumoul/vjsf/types.js').VjsfMarkdownNode> */
      type: Object,
      required: true
    },
    statefulLayout: {
      /** @type import('vue').PropType<import('@koumoul/vjsf/types.js').VjsfStatefulLayout> */
      type: Object,
      required: true
    }
  },
  setup (props, { expose }) {
    /** @type {import('vue').Ref<null | HTMLElement>} */
    const element = ref(null)

    const renderedValue = computed(() => {
      return props.modelValue.data && marked.parse(props.modelValue.data)
    })

    const fieldProps = computed(() => getInputProps(props.modelValue, props.statefulLayout))
    const fieldSlots = computed(() => {
      const fieldSlots = getCompSlots(props.modelValue, props.statefulLayout)
      fieldSlots.default = () => {
        const children = [
          h(VLabel, { text: fieldProps.value.label }),
          h('textarea', { ref: element })
        ]
        if (props.modelValue.options.summary) {
          children.push(h('div', { innerHTML: renderedValue.value }))
        }
        return h('div', { class: 'vjsf-node-markdown-content' }, children)
      }
      return fieldSlots
    })

    /** @type {ReturnType<typeof setTimeout> | null} */
    let blurTimeout = null

    /** @type {EasyMDE | null} */
    let easymde = null

    const initEasyMDE = async () => {
      if (props.modelValue.options.readOnly) return
      if (!element.value) throw new Error('component was not mounted for markdown editor')

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
        }],
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

      if (props.modelValue.autofocus) {
        easymde.codemirror.focus()
      }
    }

    onMounted(initEasyMDE)

    onUnmounted(() => {
      if (easymde) easymde.toTextArea()
    })

    // update data from outside
    watch(() => props.modelValue, () => {
      if (easymde && (easymde.value() !== props.modelValue.data ?? '')) {
        easymde.value(props.modelValue.data ?? '')
      }
    })

    // update easymde config from outside
    watch(() => [props.modelValue.options.readOnly, props.modelValue.messages, props.modelValue.options.easyMDEOptions], (newValues, oldValues) => {
      if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1] || newValues[2] !== oldValues[2]) {
        initEasyMDE()
      }
    })

    props.statefulLayout.events.on('autofocus', () => {
      console.log('focus code mirror ?')
      if (props.modelValue.autofocus && easymde) {
        easymde.codemirror.focus()
      }
    })

    const theme = useTheme()
    const darkStyle = computed(() => getDarkStyle(theme))

    return () => [
      h('style', { innerHTML: darkStyle.value }),
      h(VInput, fieldProps.value, fieldSlots.value)
    ]
  }
})

const getDarkStyle = (/** @type {import('vuetify').ThemeInstance} */theme) => {
  // Inspired by https://github.com/Ionaru/easy-markdown-editor/issues/131#issuecomment-1738202589
  return `
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror {
    color: white;
    border-color: ${theme.current.value.variables['border-color']};
    background-color: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .cm-s-easymde .CodeMirror-cursor {
    border-color: white;
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-cursor {
    border-left:1px solid white;
    border-right:none;width:0;
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .editor-toolbar > * {
    border-color: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar {
    border-top: 1px solid ${theme.current.value.variables['border-color']};
    border-left: 1px solid ${theme.current.value.variables['border-color']};
    border-right: 1px solid ${theme.current.value.variables['border-color']};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar i.separator {
    border-left: 1px solid ${theme.current.value.variables['border-color']};
    border-right: 1px solid ${theme.current.value.variables['border-color']};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment {
    background-color: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror-fullscreen {
    background: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-toolbar.fullscreen {
    background: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-preview {
    background: ${theme.current.value.colors.surface};
}
.vjsf-node-markdown.vjsf-dark .editor-preview-side {
    border-color: ${theme.current.value.variables['border-color']};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-selected {
    background: ${theme.current.value.colors.secondary};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-focused .CodeMirror-selected {
    background: ${theme.current.value.colors.secondary};
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection {
    background:${theme.current.value.colors.secondary}
}
.vjsf-node-markdown.vjsf-dark .CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection {
    background:${theme.current.value.colors.secondary}
}
.vjsf-node-markdown.vjsf-dark .EasyMDEContainer .CodeMirror-focused .CodeMirror-selected {
    background: ${theme.current.value.colors.secondary}
}
  `
}

</script>

<style>
.vjsf-node-markdown .vjsf-node-markdown-content {
  width: 100%;
}

/* adjust to density */
.vjsf-node-markdown .v-input--density-compact .editor-toolbar {
  padding: 0;
}
.vjsf-node-markdown .v-input--density-comfortable .editor-toolbar {
  padding: 4px;
}
.vjsf-node-markdown .v-input--density-compact .CodeMirror-wrap {
  padding-top: 2px;
  padding-bottom: 2px;
}
.vjsf-node-markdown .v-input--density-comfortable .CodeMirror-wrap {
  padding-top: 6px;
  padding-bottom: 6px;
}

/* adjust to readOnly/summary mode */
.vjsf-node-markdown.vjsf-readonly .EasyMDEContainer .CodeMirror  {
  border-width: 0;
  padding: 0;
}
.vjsf-node-markdown.vjsf-summary .vjsf-node-markdown-content  {
  height: 96px;
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 66%, transparent 90%);
}
.vjsf-node-markdown.vjsf-readonly .vjsf-node-markdown-content textarea {
  display: none;
}

</style>
