export default {
  computed: {
    isMarkdownProp() {
      if (!this.fullSchema) return
      return this.fullSchema['x-display'] === 'markdown'
    }
  },
  methods: {
    renderMarkdownProp(h) {
      if (!this.isMarkdownProp) return

      const children = [this.renderTooltip(h, 'append')]

      if (this.disabled) {
        children.push(h('v-card', { props: { flat: true }, class: 'px-0' }, [
          h('v-card-text', { domProps: { innerHTML: this.fullOptions.markdown(this.value) }, class: 'px-0 py-1' })
        ]))
      } else {
        children.push(h('v-card', { props: { outlined: true } }, [
          h('textarea', { attrs: { id: `${this.fullOptions.idPrefix}${this.dashKey}--easymde` } })
        ]))
        this.$nextTick(() => this.initEasyMDE())
      }

      return [h('v-input', {
        props: {
          value: this.value,
          name: this.fullKey,
          label: this.label,
          required: this.required,
          rules: this.rules,
          disabled: this.disabled,
          ...this.fullOptions.fieldProps
        },
        class: 'vjsf-markdown-input'
      }, children)]
    },
    initEasyMDE() {
      if (this.easymde) return
      if (!global.EasyMDE) {
        console.error('VJSF requires EasyMDE to be available to handle the markdown format.')
        return
      }
      const EasyMDE = global.EasyMDE

      const config = {
        element: this.$el.querySelector('textarea'),
        initialValue: this.value,
        autoRefresh: { delay: 300 },
        renderingConfig: {},
        status: false,
        autoDownloadFontAwesome: false,
        spellChecker: false,
        minHeight: '300px',
        insertTexts: {
          link: [this.fullOptions.messages.mdeLink1, this.fullOptions.messages.mdeLink2],
          image: [this.fullOptions.messages.mdeImg1, this.fullOptions.messages.mdeImg2],
          table: [this.fullOptions.messages.mdeTable1, this.fullOptions.messages.mdeTable2],
          horizontalRule: ['', '\n\n-----\n\n']
        },
        // cf https://github.com/Ionaru/easy-markdown-editor/blob/master/src/js/easymde.js#L1380
        toolbar: [{
          name: 'bold',
          action: EasyMDE.toggleBold,
          className: 'mdi mdi-format-bold',
          title: this.fullOptions.messages.bold
        }, {
          name: 'italic',
          action: EasyMDE.toggleItalic,
          className: 'mdi mdi-format-italic',
          title: this.fullOptions.messages.italic
        }, {
          name: 'heading',
          action: EasyMDE.toggleHeadingSmaller,
          className: 'mdi mdi-format-title',
          title: this.fullOptions.messages.heading
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
          title: this.fullOptions.messages.quote
        },
        {
          name: 'unordered-list',
          action: EasyMDE.toggleUnorderedList,
          className: 'mdi mdi-format-list-bulleted',
          title: this.fullOptions.messages.unorderedList
        },
        {
          name: 'ordered-list',
          action: EasyMDE.toggleOrderedList,
          className: 'mdi mdi-format-list-numbered',
          title: this.fullOptions.messages.orderedList
        },
        '|',
        {
          name: 'link',
          action: EasyMDE.drawLink,
          className: 'mdi mdi-link',
          title: this.fullOptions.messages.createLink
        },
        {
          name: 'image',
          action: EasyMDE.drawImage,
          className: 'mdi mdi-image',
          title: this.fullOptions.messages.insertImage
        },
        {
          name: 'table',
          action: EasyMDE.drawTable,
          className: 'mdi mdi-table',
          title: this.fullOptions.messages.createTable
        },
        '|',
        {
          name: 'preview',
          action: EasyMDE.togglePreview,
          className: 'mdi mdi-eye accent--text',
          title: this.fullOptions.messages.preview,
          noDisable: true
        },
        '|',
        {
          name: 'undo',
          action: EasyMDE.undo,
          className: 'mdi mdi-undo',
          title: this.fullOptions.messages.undo,
          noDisable: true
        },
        {
          name: 'redo',
          action: EasyMDE.redo,
          className: 'mdi mdi-redo',
          title: this.fullOptions.messages.redo,
          noDisable: true
        },
        '|',
        {
          name: 'guide',
          action: 'https://simplemde.com/markdown-guide',
          className: 'mdi mdi-help-circle success--text',
          title: this.fullOptions.messages.mdeGuide,
          noDisable: true
        }
        ],
        ...this.fullOptions.easyMDEOptions
      }
      this.easymde = new EasyMDE(config)

      let changed = false
      this.easymde.codemirror.on('change', () => {
        changed = true
        this.input(this.easymde.value())
      })
      this.easymde.codemirror.on('blur', () => {
        // timeout to prevent triggering save when clicking on a menu button
        this.blurTimeout = setTimeout(() => {
          if (changed) this.change()
          changed = false
        }, 500)
      })
      this.easymde.codemirror.on('focus', () => {
        clearTimeout(this.blurTimeout)
      })
    }
  }
}
