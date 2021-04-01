const getFileDataUrl = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

const getFileResult = async (file, schema, filesAsDataUrl) => {
  let data = file
  if (schema.type === 'string' || (schema.properties && schema.properties.data && schema.properties.data.type === 'string')) {
    const dataUrl = await getFileDataUrl(file)
    data = filesAsDataUrl ? dataUrl : dataUrl.split(';base64,')[1]
  }
  if (schema.type === 'string') return data
  return {
    name: file.name,
    lastModified: new Date(file.lastModified).toISOString(),
    size: file.size,
    type: file.type,
    data
  }
}

export default {
  computed: {
    isFileProp() {
      if (!this.fullSchema) return
      if (this.fullSchema.type === 'string' &&
        (this.fullSchema.contentMediaType || this.display === 'file')) return true
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.type === 'string' &&
        (this.fullSchema.items.contentMediaType || this.display === 'file' || this.fullSchema.items['x-display'] === 'file')) return true
      if (this.fullSchema.type === 'object' &&
        (this.fullSchema.contentMediaType || this.display === 'file')) return true
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.type === 'object' &&
        (this.fullSchema.items.contentMediaType || this.display === 'file' || this.fullSchema.items['x-display'] === 'file')) return true
      return false
    }
  },
  watch: {
    isFileProp() {
      if (this.isFileProp && !this.fullSchema.writeOnly) {
        console.warn('File property should always be used with writeOnly attribute. Files are uploaded but not read in existing data.')
      }
    }
  },
  methods: {
    renderFileProp(h) {
      if (!this.isFileProp) return
      const props = { ...this.commonFieldProps, ...this.fullOptions.fileInputProps }
      delete props.value
      const attrs = {}
      if (this.fullSchema.contentMediaType) attrs.accept = this.fullSchema.contentMediaType
      if (this.fullSchema.items && this.fullSchema.items.contentMediaType) attrs.accept = this.fullSchema.items.contentMediaType
      if (this.fullSchema.type === 'array') attrs.multiple = true
      const children = [...this.renderPropSlots(h)]
      const on = {
        change: async files => {
          if (this.fullSchema.type === 'array') {
            const contents = await Promise.all(files.map(file => getFileResult(file, this.fullSchema.items, this.fullOptions.filesAsDataUrl)))
            this.input(contents)
            this.change()
          } else {
            const content = await getFileResult(files, this.resolvedSchema, this.fullOptions.filesAsDataUrl)
            this.input(content)
            this.change()
          }
        }
      }
      if (this.htmlDescription) {
        children.push(this.renderTooltip(h, 'append-outer'))
      }

      return [h('v-file-input', { props, attrs, on, scopedSlots: this.$scopedSlots }, children)]
    }
  }
}
