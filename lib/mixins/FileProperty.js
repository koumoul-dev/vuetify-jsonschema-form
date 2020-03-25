export default {
  computed: {
    isFileProp() {
      if (this.fullSchema.type === 'string' &&
        (this.fullSchema.contentMediaType || this.fullSchema['x-display'] === 'file')) return true
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.type === 'string' &&
        (this.fullSchema.items.contentMediaType || this.fullSchema['x-display'] === 'file' || this.fullSchema.items['x-display'] === 'file')) return true
    }
  },
  created() {
    if (this.isFileProp && !this.fullSchema.writeOnly) {
      console.warn('File property should always be used with writeOnly attribute. Files are uploaded but not read in existing data.')
    }
  },
  methods: {
    fileContentPromise(file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result
          const value = this.fullOptions.filesAsDataUrl ? dataUrl : dataUrl.split(';base64,')[1]
          resolve(value)
        }
        reader.readAsDataURL(file)
      })
    },
    renderFileProp(h) {
      if (!this.isFileProp) return
      const props = { ...this.commonFieldProps }
      delete props.value
      const attrs = {}
      if (this.fullSchema.contentMediaType) attrs.accept = this.fullSchema.contentMediaType
      if (this.fullSchema.items && this.fullSchema.items.contentMediaType) attrs.accept = this.fullSchema.items.contentMediaType
      if (this.fullSchema.type === 'array') attrs.multiple = true
      const children = [...this.renderPropSlots(h)]
      const on = {
        change: async files => {
          if (this.fullSchema.type === 'array') {
            const contents = await Promise.all(files.map(file => this.fileContentPromise(file)))
            this.input(contents)
            this.change(contents)
          } else {
            const content = await this.fileContentPromise(files)
            this.input(content)
            this.change(content)
          }
        }
      }
      const scopedSlots = { ...this.commonFieldSlots }
      if (this.htmlDescription) {
        children.push(this.renderTooltip(h, 'append-outer'))
      }

      return [h('v-file-input', { props, attrs, on, scopedSlots }, children)]
    }
  }
}
