import copy from 'fast-copy'
import selectUtils from '../utils/select'

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
      if (this.resolvedSchema.type === 'array' && this.resolvedSchema.items && this.resolvedSchema.items.type === 'object') return true
    },
    readonlyItemSchema() {
      if (!this.fullSchema || !this.fullSchema.items) return

      const schema = copy(this.fullSchema.items)
      // hide titles that are displayed in headers and do not need a text field
      // but do not remove them, we need them for validation
      if (this.itemTitle) {
        if (schema.properties && schema.properties[this.itemTitle] && typeof schema.properties[this.itemTitle] === 'object') {
          schema.properties[this.itemTitle]['x-style'] = 'display: none;'
        }
        if (schema.oneOf) {
          schema.oneOf.forEach((value) => {
            if (value.properties[this.itemTitle]) {
              value.properties[this.itemTitle]['x-style'] = 'display: none;'
            }
          })
        }
        if (this.fullSchema.items.allOf) {
          schema.allOf.forEach((value) => {
            if (value.properties[this.itemTitle]) {
              value.properties[this.itemTitle]['x-style'] = 'display: none;'
            }
          })
        }
      }
      return schema
    }
  },
  methods: {
    renderArrayItemModal(h, item, i) {
      const isNew = i === -1
      let itemProperty
      if (this.editabledArrayProp.currentDialog === i) {
        itemProperty = this.renderArrayItemEdit(h, i, true)
      }

      const scopedSlots = { activator: () => this.renderArrayItemEditButton(h, item, i) }
      const close = () => {
        itemProperty.componentInstance.resetValidation()
        this.editabledArrayProp.currentDialog = null
      }
      const on = {}
      if (!this.fullOptions.dialogProps.persistent) on['click:outside'] = close
      return h('v-dialog', { props: { ...this.fullOptions.dialogProps, value: this.editabledArrayProp.currentDialog === i, closeOnContentClick: false }, scopedSlots, on }, [
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
                const value = [...this.value]
                if (isNew) {
                  this.editabledArrayProp.editedItems[this.value.length] = true
                  value.push(this.editabledArrayProp.editItem)
                } else {
                  this.editabledArrayProp.editedItems[i] = true
                  this.$set(value, i, { ...this.editabledArrayProp.editItem })
                }
                this.input(value)
                this.change()
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
      const modelKey = `item-${i}`
      const renderOptions = {
        props: {
          schema: this.readonlyItemSchema,
          value: item,
          modelRoot: this.modelRoot || this.value,
          modelKey,
          parentKey: `${this.fullKey}.`,
          options: { ...this.fullOptions, disableAll: true, readOnlyArrayItem: true },
          optionsRoot: this.initialOptions,
          sectionDepth: this.sectionDepth + 1,
          separateValidation: false,
          sharedData: this.sharedData
        },
        ref: modelKey,
        scopedSlots: this.childScopedSlots(this.fullSchema.key)
      }
      if (this.options.autoFixArrayItems) {
        renderOptions.on = {
          input: (itemValue) => {
            // even if it is readOnly we listen to changes in order to fill default values in array
            // already present in the model
            if (!this.editabledArrayProp.editedItems[i]) {
              const value = [...this.value]
              value[i] = itemValue
              this.input(value)
            }
          }
        }
      }
      return h('v-jsf', renderOptions, this.childSlots(h, this.fullSchema.key))
    },
    renderArrayItemEditButton(h, item, i, isCurrentInlineEdit) {
      const isNew = i === -1
      const fabIcon = isCurrentInlineEdit || isNew
      return h('v-btn', {
        on: { click: () => {
          if (isNew && this.fullOptions.editMode === 'inline') {
            const editItem = copy(item)
            const value = [...this.value]
            value.push(editItem)
            this.editabledArrayProp.currentDialog = value.length - 1
            this.editabledArrayProp.editItem = editItem
            this.input(value)
            this.change()
          } else if (this.editabledArrayProp.currentDialog === i) {
            this.editabledArrayProp.editItem = null
            this.editabledArrayProp.currentDialog = null
            this.change()
          } else {
            this.editabledArrayProp.editItem = copy(item)
            this.editabledArrayProp.currentDialog = i
            // show validation errors right away when editing an item
            if (this.fullOptions.editMode === 'inline') {
              this.$nextTick(() => this.childrenInputs[`item-${i}`].validate(true))
            }
          }
        } },
        attrs: { id: this.fullOptions.idPrefix + this.dashKey + '-' + (isNew ? '-add' : i + '--edit') + '-button' },
        class: { 'vjsf-array-add-button': true, 'ml-3': isNew },
        props: { icon: !fabIcon, fab: fabIcon, small: isNew, 'x-small': isCurrentInlineEdit, color: 'primary', depressed: isCurrentInlineEdit } }, [
        h('v-icon', isNew ? this.fullOptions.icons.add : this.fullOptions.icons.edit)
      ])
    },
    renderArrayItemEdit(h, i, autofocus) {
      const options = { ...this.fullOptions, autofocus }
      if (!this.fullOptions.idPrefix.endsWith('--dialog--')) {
        options.idPrefix = this.fullOptions.idPrefix + '--dialog--'
      }

      return h('v-jsf', {
        props: {
          schema: this.fullSchema.items,
          value: this.editabledArrayProp.editItem,
          modelRoot: this.modelRoot || this.value,
          modelKey: `item-${i}`,
          parentKey: `${this.fullKey}.`,
          options,
          optionsRoot: this.initialOptions,
          sectionDepth: this.sectionDepth + 1,
          separateValidation: this.fullOptions.editMode !== 'inline',
          sharedData: this.sharedData
        },
        scopedSlots: this.childScopedSlots(this.fullSchema.key),
        ref: 'item-' + i,
        on: {
          error: e => this.$emit('error', e),
          input: itemValue => {
            this.editabledArrayProp.editItem = itemValue
            if (this.fullOptions.editMode === 'inline') {
              const value = [...this.value]
              this.$set(value, i, itemValue)
              this.input(value)
            }
          },
          change: () => {
            if (this.fullOptions.editMode === 'inline') {
              this.change()
            }
          }
        }
      }, this.childSlots(h, this.fullSchema.key))
    },
    renderArrayItemMenu(h, item, header, isCurrentInlineEdit) {
      if (this.disabled || this.fromUrl || this.fullSchema.fromData) return
      const menuItems = []

      for (const operation of this.fullOptions.arrayOperations) {
        if (operation === 'duplicate') {
          menuItems.push({
            title: this.fullOptions.messages.duplicate,
            color: 'default',
            icon: this.fullOptions.icons.duplicate,
            disabled: false,
            on: { click: () => {
              const index = this.value.findIndex(i => i === item)
              const value = [...this.value]
              value.splice(index, 0, { ...item })
              this.input(value)
              this.change()
              this.shouldValidate = true
              header.componentInstance.validate()
            } }
          })
        }

        if (operation === 'delete') {
          menuItems.push({
            title: this.fullOptions.messages.delete,
            color: 'warning',
            icon: this.fullOptions.icons.delete,
            disabled: isCurrentInlineEdit,
            on: { click: () => {
              const value = this.value.filter(i => i !== item)
              this.input(value)
              this.change()
              this.shouldValidate = true
              header.componentInstance.validate()
            } }
          })
        }

        if (operation === 'copy' && this.fullSchema['x-arrayGroup']) {
          menuItems.push({
            title: this.fullOptions.messages.copy,
            color: 'default',
            icon: this.fullOptions.icons.copy,
            disabled: false,
            on: { click: () => {
              this.$set(this.sharedData, 'clipboard_' + this.fullSchema['x-arrayGroup'], item)
            } }
          })
        }

        if (operation === 'paste' && this.fullSchema['x-arrayGroup']) {
          menuItems.push({
            title: this.fullOptions.messages.paste,
            color: 'primary',
            icon: this.fullOptions.icons.paste,
            disabled: !(this.sharedData['clipboard_' + this.fullSchema['x-arrayGroup']]),
            on: { click: () => {
              if (this.fullOptions.editMode === 'inline') {
                this.editabledArrayProp.editItem = null
                this.editabledArrayProp.currentDialog = null
              }
              const index = this.value.findIndex(i => i === item)
              const value = [...this.value]
              value[index] = this.sharedData['clipboard_' + this.fullSchema['x-arrayGroup']]
              this.input(value)
              this.change()
              this.shouldValidate = true
              header.componentInstance.validate()
            } }
          })
        }
      }

      if (!menuItems.length) return

      // if there is only one item, do not create a menu but instead a single button
      if (menuItems.length === 1) {
        return h('v-btn', {
          props: { icon: true, disabled: menuItems[0].disabled },
          on: menuItems[0].on,
          attrs: { title: menuItems[0].title },
          class: 'ml-1'
        }, [h('v-icon', { props: { color: menuItems[0].color } }, [menuItems[0].icon])])
      }
      return h('v-menu', {
        props: { offsetY: true, left: true },
        scopedSlots: {
          activator: ({ on }) => h('v-btn', {
            props: { icon: true },
            attrs: { title: this.fullOptions.messages.openMenu },
            class: 'ml-1',
            on
          }, [h('v-icon', this.fullOptions.icons.arrayMenu)]),
          default: () => h('v-list', { class: 'pa-0', props: { dense: true } }, menuItems.map(menuItem => h('v-list-item', {
            on: menuItem.on,
            props: { disabled: menuItem.disabled }
          }, [
            h('v-list-item-icon', { class: 'mr-2' }, [h('v-icon', { props: { color: menuItem.color, small: true } }, [menuItem.icon])]),
            h('v-list-item-content', {}, [h('v-list-item-title', {}, [menuItem.title])])
          ])))
        }
      })
    },
    renderEditableArray(h) {
      if (!this.isEditableArray) return
      const headerChildren = []
      if (!this.disabled && !this.fromUrl && !this.fullSchema.fromData && this.fullOptions.arrayOperations.includes('create')) {
        const item = this.fullSchema.items.default || this.defaultValue(this.fullSchema.items)
        if (this.fullOptions.editMode === 'inline') {
          headerChildren.push(this.renderArrayItemEditButton(h, item, -1))
        } else {
          headerChildren.push(this.renderArrayItemModal(h, item, -1))
        }
      }
      const header = h('v-input', {
        class: 'mt-2 mb-3 pr-1 vjsf-array-header',
        props: { label: this.label, rules: this.rules, value: this.value, validateOnBlur: !this.shouldValidate, hideDetails: 'auto' }
      }, headerChildren)

      const sortable = !this.fullOptions.disableSorting && !this.disabled

      let listItems
      if (this.value && this.value.length) {
        listItems = this.value.filter(item => !!item).map((item, i) => {
          let editAction
          const isCurrentInlineEdit = this.fullOptions.editMode === 'inline' && this.editabledArrayProp.currentDialog === i
          if (!this.disabled && this.fullOptions.arrayOperations.includes('update')) {
            if (this.fullOptions.editMode === 'inline') {
              editAction = this.renderArrayItemEditButton(h, item, i, isCurrentInlineEdit)
            } else {
              editAction = this.renderArrayItemModal(h, item, i)
            }
          }

          const actions = h('v-card-actions', { class: 'pa-0' }, [h('v-spacer'), editAction, this.renderArrayItemMenu(h, item, header, isCurrentInlineEdit)])

          let itemChild, cardStyle, itemKey
          if (isCurrentInlineEdit) {
            itemChild = this.renderArrayItemEdit(h, i, false)
            itemKey = 'item-edit-' + i
          } else {
            itemChild = this.renderArrayItemRO(h, item, i)
            itemKey = this.cached(`item-key-${i}`, { item }, () => `${i}-${new Date().getTime()}`)
            if (sortable) cardStyle = 'cursor: move;'
          }

          const titleClass = 'py-2 pr-2 ' + this.fullOptions.arrayItemsTitlesClasses[this.sectionDepth] || this.fullOptions.arrayItemsTitlesClasses[this.fullOptions.arrayItemsTitlesClasses.length - 1]

          let cardChildren = [
            h('v-card-title', { props: { primaryTitle: true }, class: titleClass }, [selectUtils.getObjectTitle(item, this.itemTitle, this.fullSchema), h('v-spacer'), actions]),
            h('v-card-text', [itemChild])
          ]

          const hasError = this.dedupChildrenWithValidatedErrors.includes(`item-${i}`)
          if (isCurrentInlineEdit) {
            cardChildren = [h('v-alert', { props: { color: hasError ? 'error' : 'primary', 'colored-border': true, border: 'left' }, class: 'pa-0 pl-2 ma-0' }, cardChildren)]
          } else if (hasError) {
            cardChildren = [h('v-alert', { props: { color: 'error', outlined: true }, class: 'pa-0 ma-0' }, cardChildren)]
          } else {
            // this alert is not necessary at first sight, but without it the inside components are not reused
            // when hasError changes and we can enter infinite loop where validation oscillates between ok/ko
            cardChildren = [h('v-alert', { props: { color: 'default', outlined: true }, class: 'pa-0 ma-0 vjsf-invisible-alert' }, cardChildren)]
          }
          const directives = []
          if (isCurrentInlineEdit) {
            directives.push({
              name: 'click-outside',
              value: {
                handler: () => {
                  // exclude the case where the outside click triggered edition of another item
                  if (this.editabledArrayProp.currentDialog === i) {
                    if (this.fullOptions.editMode === 'inline') {
                      this.editabledArrayProp.editItem = null
                      this.editabledArrayProp.currentDialog = null
                      this.change()
                    }
                  }
                },
                // cf https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VDialog/VDialog.ts#L290
                include: this.getOpenDependentElements
              }
            })
          }

          let itemClass = 'py-1 vjsf-array-item'
          if (isCurrentInlineEdit) itemClass += ' vjsf-array-item-active'
          return h('v-col', { props: this.fullOptions.arrayItemColProps, class: itemClass, key: itemKey }, [
            h('v-card', {
              props: { ...this.fullOptions.arrayItemCardProps },
              style: cardStyle,
              directives
            }, cardChildren)
          ])
        })
      }

      let newValue
      const list = !sortable ? h('v-row', { class: 'vjsf-array' }, listItems) : h('draggable', {
        props: { value: this.value },
        attrs: { group: this.fullSchema['x-arrayGroup'] || this.fullKey, ...this.fullOptions.sortableOptions },
        class: 'row draggable vjsf-array',
        on: {
          change: async (evt) => {
            if (evt.added) await this.$nextTick()
            this.editabledArrayProp.editItem = null
            this.editabledArrayProp.currentDialog = null
            this.input(newValue)
            this.change()
            this.shouldValidate = true
          },
          input: async (value) => {
            newValue = value
          }
        } }, listItems)

      return [header, list]
    }
  }
}
