<script>
import { defineComponent, h, computed, onMounted, ref, onUnmounted, watch, toRef } from 'vue'
import { useTheme } from 'vuetify'
import { VInput, VLabel } from 'vuetify/components'
import { marked } from 'marked'
import useNode from '@koumoul/vjsf/composables/use-node.js'
import 'easymde/dist/easymde.min.css'

/** @typedef {{formatBold: string, formatItalic: string, formatTitle: string, formatQuoteOpen: string, formatListBulleted: string, formatListNumbered: string, link: string, image: string, table: string, eye: string, undo: string, redo: string, helpCircle: string}} VjsfMarkdownIcons */
/** @typedef {{easyMDEOptions?: Record<string, any>, icons?: Partial<VjsfMarkdownIcons>}} VjsfPluginMarkdownOptions */
/** @typedef {import('@koumoul/vjsf/types.js').VjsfNode & {data: string | undefined | null}} MarkdownNode */

const iconSvg = (/** @type {string} */svgPath) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="${svgPath}" /></svg>`
}

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
    /** @type {import('vue').Ref<null | HTMLElement>} */
    const element = ref(null)

    const { inputProps, compSlots, localData } = useNode(toRef(props.modelValue), props.statefulLayout)

    const renderedValue = computed(() => {
      return localData.value && marked.parse(localData.value)
    })

    const fieldSlots = computed(() => {
      const fieldSlots = { ...compSlots.value }
      fieldSlots.default = () => {
        const children = [
          h(VLabel, { text: inputProps.value.label }),
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

      const pluginOptions = /** @type {VjsfPluginMarkdownOptions | undefined} */(props.modelValue.options.pluginsOptions.markdown)
      /** @type {VjsfMarkdownIcons} */
      const icons = {
        ...pluginOptions?.icons,
        // codes are copied from here https://raw.githubusercontent.com/Templarian/MaterialDesign-JS/refs/heads/master/mdi.js
        formatBold: 'M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z',
        formatItalic: 'M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z',
        formatTitle: 'M5,4V7H10.5V19H13.5V7H19V4H5Z',
        formatQuoteOpen: 'M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z',
        formatListBulleted: 'M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z',
        formatListNumbered: 'M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z',
        link: 'M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z',
        image: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z',
        table: 'M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z',
        eye: 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z',
        undo: 'M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z',
        redo: 'M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z',
        helpCircle: 'M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'
      }

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
        toolbar: [{
          name: 'bold',
          action: EasyMDE.toggleBold,
          icon: iconSvg(icons.formatBold),
          title: messages.bold
        }, {
          name: 'italic',
          action: EasyMDE.toggleItalic,
          icon: iconSvg(icons.formatItalic),
          title: messages.italic
        }, {
          name: 'heading',
          action: EasyMDE.toggleHeadingSmaller,
          icon: iconSvg(icons.formatTitle),
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
          icon: iconSvg(icons.formatQuoteOpen),
          title: messages.quote
        },
        {
          name: 'unordered-list',
          action: EasyMDE.toggleUnorderedList,
          icon: iconSvg(icons.formatListBulleted),
          title: messages.unorderedList
        },
        {
          name: 'ordered-list',
          action: EasyMDE.toggleOrderedList,
          icon: iconSvg(icons.formatListNumbered),
          title: messages.orderedList
        },
        '|',
        {
          name: 'link',
          action: EasyMDE.drawLink,
          icon: iconSvg(icons.link),
          title: messages.createLink
        },
        {
          name: 'image',
          action: EasyMDE.drawImage,
          icon: iconSvg(icons.image),
          title: messages.insertImage
        },
        {
          name: 'table',
          action: EasyMDE.drawTable,
          icon: iconSvg(icons.table),
          title: messages.createTable
        },
        '|',
        {
          name: 'preview',
          action: EasyMDE.togglePreview,
          icon: iconSvg(icons.eye),
          className: 'text-accent',
          title: messages.preview,
          noDisable: true
        },
        '|',
        {
          name: 'undo',
          action: EasyMDE.undo,
          icon: iconSvg(icons.undo),
          title: messages.undo,
          noDisable: true
        },
        {
          name: 'redo',
          action: EasyMDE.redo,
          icon: iconSvg(icons.redo),
          title: messages.redo,
          noDisable: true
        },
        '|',
        {
          name: 'guide',
          action: 'https://simplemde.com/markdown-guide',
          icon: iconSvg(icons.helpCircle),
          className: 'text-success',
          title: messages.mdeGuide,
          noDisable: true
        }],
        ...pluginOptions?.easyMDEOptions
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
    watch(() => localData, () => {
      if (easymde && (easymde.value() !== (localData.value ?? ''))) {
        easymde.value(localData.value ?? '')
      }
    })

    // update easymde config from outside
    watch(() => [props.modelValue.options.readOnly, props.modelValue.messages, props.modelValue.options.easyMDEOptions], (newValues, oldValues) => {
      if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1] || newValues[2] !== oldValues[2]) {
        initEasyMDE()
      }
    })

    /* TODO: manage autofocus change ? statefulLayout.events no longer exists
    props.statefulLayout.events.on('autofocus', () => {
      if (props.modelValue.autofocus && easymde) {
        easymde.codemirror.focus()
      }
    }) */

    const theme = useTheme()
    const darkStyle = computed(() => getDarkStyle(theme))

    return () => [
      h('style', { innerHTML: darkStyle.value }),
      h(VInput, inputProps.value, fieldSlots.value)
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

/* adjust icons placements */
.vjsf-node-markdown .editor-toolbar button svg {
  padding-top: 6px;
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
