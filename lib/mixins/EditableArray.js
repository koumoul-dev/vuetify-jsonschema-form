export default {
  data() {
    return {
      editabledArrayProp: {
        currentDialog: null,
        editItem: null,
        editedItems: {}
      }
    }
  },
  computed: {
    isEditableArray() {
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.type === 'object') return true
    },
    readonlyItemSchema() {
      if (!this.fullSchema.items) return

      const schema = JSON.parse(JSON.stringify(this.fullSchema.items))
      schema.readOnly = true
      if (this.itemTitle) {
        if (schema.properties && schema.properties[this.itemTitle]) {
          schema.properties[this.itemTitle]['x-display'] = 'hidden'
        }
        if (schema.oneOf) {
          schema.oneOf.forEach((value) => {
            if (value.properties[this.itemTitle]) value.properties[this.itemTitle]['x-display'] = 'hidden'
          })
        }
        if (this.fullSchema.items.allOf) {
          schema.allOf.forEach((value) => {
            if (value.properties[this.itemTitle]) value.properties[this.itemTitle]['x-display'] = 'hidden'
          })
        }
      }
      return schema
    }
  },
  watch: {},
  methods: {
    renderArrayItemModal(h, item, i) {
      const isNew = i === -1
      let itemProperty
      if (this.editabledArrayProp.currentDialog === i) {
        itemProperty = this.renderArrayItemEdit(h, i)
      }

      const scopedSlots = { activator: () => this.renderArrayItemEditButton(h, item, i) }
      const close = () => {
        itemProperty.componentInstance.resetValidation()
        this.editabledArrayProp.currentDialog = null
      }
      return h('v-dialog', { props: { ...this.fullOptions.dialogProps, value: this.editabledArrayProp.currentDialog === i, closeOnContentClick: false }, scopedSlots, on: { 'click:outside': close } }, [
        h('v-card', { props: this.fullOptions.dialogCardProps }, [
          h('v-card-title', this.itemTitle && item[this.itemTitle]),
          h('v-card-text', [itemProperty]),
          h('v-card-actions', [
            h('v-spacer'),
            h('v-btn', { props: { text: true },
              on: { click: close },
              attrs: { id: this.fullOptions.idPrefix + this.dashKey + '--dialog-cancel-button' },
              class: { 'vjsf-array-dialog-cancel-button': true }
            }, 'cancel'),
            h('v-btn', { props: { color: 'primary' },
              on: { click: () => {
                if (!itemProperty.componentInstance.validate(true)) return
                if (isNew) {
                  this.editabledArrayProp.editedItems[this.value.length] = true
                  this.value.push(this.editabledArrayProp.editItem)
                } else {
                  this.editabledArrayProp.editedItems[i] = true
                  this.$set(this.value, i, this.editabledArrayProp.editItem)
                  // reprocess schema / model in RO item, in case oneOf change for example
                  // this would not be necessary of everything was properly reactive
                  // TODO: rethink parts of reactivity
                  this.$nextTick(() => this.$refs['roItem-' + i].initFromSchema())
                }
                this.input(this.value)
                this.$emit('change', this.value)
                this.shouldValidate = true
                this.editabledArrayProp.currentDialog = null
              } },
              attrs: { id: this.fullOptions.idPrefix + this.dashKey + '--dialog-ok-button' },
              class: { 'vjsf-array-dialog-ok-button': true }
            }, 'ok')
          ])
        ])
      ])
    },
    renderArrayItemRO(h, item, i) {
      return h('v-jsf', {
        props: {
          schema: this.readonlyItemSchema,
          value: JSON.parse(JSON.stringify(item)),
          modelRoot: this.modelRoot || this.value,
          modelKey: i,
          parentKey: `${this.fullKey}.`,
          options: { ...this.fullOptions, hideReadOnly: false, fieldProps: { ...this.fullOptions.fieldProps, dense: true } },
          sectionDepth: this.sectionDepth + 1,
          separateValidation: false,
          initialValidation: this.validated
        },
        ref: 'roItem-' + i,
        on: {
          input: (value) => {
            // even if it readOnly we listen to changes in order to fill default values in prefilled arrays
            if (!this.editabledArrayProp.editedItems[i]) this.$set(this.value, i, value)
          }
        }
      })
    },
    renderArrayItemEditButton(h, item, i, isCurrentInlineEdit) {
      const isNew = i === -1
      const fabIcon = isCurrentInlineEdit || isNew
      return h('v-btn', {
        on: { click: () => {
          if (isNew && this.fullOptions.editMode === 'inline') {
            this.editabledArrayProp.editItem = JSON.parse(JSON.stringify(item))
            this.value.push(this.editabledArrayProp.editItem)
            this.editabledArrayProp.currentDialog = this.value.length - 1
            this.input(this.value)
            this.$emit('change', this.value)
          } else if (this.editabledArrayProp.currentDialog === null) {
            this.editabledArrayProp.editItem = JSON.parse(JSON.stringify(item))
            this.editabledArrayProp.currentDialog = i
          } else {
            this.editabledArrayProp.editItem = null
            this.editabledArrayProp.currentDialog = null
          }
        } },
        attrs: { id: this.fullOptions.idPrefix + this.dashKey + '-' + (isNew ? '-add' : i + '--edit') + '-button' },
        class: { 'vjsf-array-add-button': true, 'ml-3': isNew },
        props: { icon: !fabIcon, fab: fabIcon, small: isNew, 'x-small': isCurrentInlineEdit, color: 'primary', depressed: isCurrentInlineEdit } }, [
        h('v-icon', isNew ? this.fullOptions.icons.add : this.fullOptions.icons.edit)
      ])
    },
    renderArrayItemEdit(h, i) {
      const options = { ...this.fullOptions }
      if (!this.fullOptions.idPrefix.endsWith('--dialog--')) {
        options.idPrefix = this.fullOptions.idPrefix + '--dialog--'
      }

      return h('v-jsf', {
        props: {
          schema: this.fullSchema.items,
          value: this.editabledArrayProp.editItem,
          modelRoot: this.modelRoot || this.value,
          modelKey: i,
          parentKey: `${this.fullKey}.`,
          options,
          sectionDepth: this.sectionDepth + 1,
          separateValidation: this.fullOptions.editMode !== 'inline',
          initialValidation: true
        },
        scopedSlots: this.childScopedSlots(this.fullSchema.key),
        on: {
          error: e => this.$emit('error', e),
          input: value => {
            this.editabledArrayProp.editItem = value
            setTimeout(() => {
              console.log(this.childrenInputs[i + 1].hasValidatedChildError)
              if (this.fullOptions.editMode === 'inline' && !this.childrenInputs[i + 1].hasValidatedChildError) {
                console.log('INPUT', JSON.stringify(this.value))
                this.$set(this.value, i, this.editabledArrayProp.editItem)
                this.input(this.value)
              }
            }, 100)
          }
        }
      }, this.childSlots(h, this.fullSchema.key))
    },
    renderEditableArray(h) {
      if (!this.isEditableArray) return
      const headerChildren = []
      if (!this.disabled && !this.fromUrl && !this.fullSchema.fromData) {
        const item = this.fullSchema.items.default || this.defaultValue(this.fullSchema.items)
        if (this.fullOptions.editMode === 'inline') {
          headerChildren.push(this.renderArrayItemEditButton(h, item, -1))
        } else {
          headerChildren.push(this.renderArrayItemModal(h, item, -1))
        }
      }
      const header = h('v-input', {
        class: 'mt-2 pr-1',
        props: { label: this.label, rules: this.rules, value: this.value, validateOnBlur: !this.shouldValidate, hideDetails: !this.hasError }
      }, headerChildren)

      let list
      if (this.value && this.value.length) {
        const listItems = this.value.filter(item => !!item).map((item, i) => {
          let editAction
          const isCurrentInlineEdit = this.fullOptions.editMode === 'inline' && this.editabledArrayProp.currentDialog === i
          if (!this.disabled) {
            if (this.fullOptions.editMode === 'inline') {
              editAction = this.renderArrayItemEditButton(h, item, i, isCurrentInlineEdit)
            } else {
              editAction = this.renderArrayItemModal(h, item, i)
            }
          }
          const actions = h('v-card-actions', { class: 'pa-0' }, [
            h('v-spacer'),
            editAction,
            (!this.disabled && !this.fromUrl && !this.fullSchema.fromData) && h('v-btn', { props: { icon: true, color: 'warning', disabled: isCurrentInlineEdit },
              attrs: { id: this.fullOptions.idPrefix + this.dashKey + '-' + i + '--delete-button' },
              class: { 'vjsf-array-delete-button': true },
              on: { click: () => {
                const value = this.value.filter(i => i !== item)
                this.input(value)
                this.$emit('change', value)
                this.shouldValidate = true
                header.componentInstance.validate()
              } } }, [h('v-icon', this.fullOptions.icons.delete)])
          ])

          let itemChild
          if (isCurrentInlineEdit) {
            itemChild = this.renderArrayItemEdit(h, i)
          } else {
            itemChild = this.renderArrayItemRO(h, item, i)
          }

          const titleClass = this.fullOptions.arrayItemsTitlesClasses[this.sectionDepth] || this.fullOptions.arrayItemsTitlesClasses[this.fullOptions.arrayItemsTitlesClasses.length - 1]
          let cardChildren = [
            h('v-card-title', { props: { primaryTitle: true }, class: titleClass }, [this.itemTitle && item[this.itemTitle], h('v-spacer'), actions]),
            h('v-card-text', {}, [itemChild])
          ]

          const hasError = this.childrenInputs[i + 1] && this.childrenInputs[i + 1].hasValidatedChildError
          if (isCurrentInlineEdit) {
            cardChildren = [h('v-alert', { props: { color: hasError ? 'error' : 'primary', 'colored-border': true, border: 'left' }, class: 'pa-0 pl-2 ma-0' }, cardChildren)]
          } else if (hasError) {
            cardChildren = [h('v-alert', { props: { color: 'error', outlined: true }, class: 'pa-0 ma-0' }, cardChildren)]
          }
          const directives = []
          if (isCurrentInlineEdit) {
            directives.push({
              name: 'click-outside',
              value: {
                handler: () => {
                  if (this.fullOptions.editMode === 'inline') this.editabledArrayProp.currentDialog = null
                }
              }
            })
          }
          return h('v-col', { props: this.fullOptions.arrayItemColProps, class: 'pa-2' }, [
            h('v-card', {
              props: { ...this.fullOptions.arrayItemCardProps },
              directives
            }, cardChildren)
          ])
        })
        list = h('v-row', { props: { gridListMd: true }, class: 'pt-0 px-2 ' + this.fullOptions.objectContainerClass }, this.fullOptions.disableSorting ? listItems : [
          h('draggable', {
            props: { value: this.value },
            class: 'row',
            style: 'cursor: move;',
            on: { input: (value) => {
              this.input(value)
              this.$emit('change', value)
              this.shouldValidate = true
              this.$nextTick(() => {
                for (let i = 0; i < value.length; i++) {
                  // reprocess schema / model in RO item, in case oneOf change for example
                  // this would not be necessary of everything was properly reactive
                  // TODO: rethink parts of reactivity
                  this.$refs['roItem-' + i].initFromSchema()
                }
              })
            } } }, listItems)
        ])
      }

      return [header, list]
    }
  }
}
