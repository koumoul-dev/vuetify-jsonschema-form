export default {
  data() {
    return {
      currentDialog: null
    }
  },
  computed: {
    isEditableArray() {
      if (this.fullSchema.type === 'array' && this.fullSchema.items && this.fullSchema.items.type === 'object') return true
    }
  },
  watch: {},
  methods: {
    renderArrayItemModal(h, item, i) {
      const isNew = i === -1
      let itemProperty, editItem
      if (this.currentDialog === i) {
        editItem = JSON.parse(JSON.stringify(item))
        itemProperty = h('property', {
          props: {
            schema: this.fullSchema.items,
            value: editItem,
            modelRoot: this.modelRoot,
            modelKey: i,
            parentKey: `${this.fullKey}.`,
            options: this.options,
            sectionDepth: this.sectionDepth + 1,
            separateValidation: true
          },
          scopedSlots: this.childScopedSlots(this.fullSchema.key),
          on: {
            error: e => this.$emit('error', e)
          }
        }, this.childSlots(h, this.fullSchema.key))
      }

      const scopedSlots = { activator: () => h('v-btn', {
        on: { click: () => {
          this.currentDialog = i
        } },
        props: { icon: !isNew, fab: isNew, small: isNew, color: 'primary' } }, [
        h('v-icon', isNew ? this.options.icons.add : this.options.icons.edit)
      ]) }
      const close = () => {
        itemProperty.componentInstance.resetValidation()
        this.currentDialog = null
      }
      return h('v-dialog', { props: { value: this.currentDialog === i, closeOnContentClick: false, left: true }, scopedSlots, on: { 'click:outside': close } }, [
        h('v-card', [
          h('v-card-title', this.itemTitle && item[this.itemTitle]),
          h('v-card-text', [itemProperty]),
          h('v-card-actions', [
            h('v-spacer'),
            h('v-btn', { props: { text: true },
              on: { click: close } }, 'cancel'),
            h('v-btn', { props: { color: 'primary' },
              on: { click: () => {
                if (!itemProperty.componentInstance.validate(true)) return
                if (isNew) {
                  this.value.push(editItem)
                } else {
                  this.value[i] = editItem
                }
                this.$emit('input', this.value)
                this.$emit('change', this.value)
                this.currentDialog = null
              } } }, 'ok')
          ])
        ])
      ])
    },
    renderEditableArray(h) {
      if (!this.isEditableArray) return
      const headerChildren = [h('v-subheader', this.label)]
      if (!this.disabled && !(this.fromUrl || this.fullSchema.fromData)) {
        headerChildren.push(this.renderArrayItemModal(h, this.fullSchema.items.default || this.defaultValue(this.fullSchema.items), -1))
        /* headerChildren.push(h('v-btn', { props: { fab: true, small: true, color: 'primary' },
          on: {
            click: () => {
              this.value.push()
              this.$emit('input', this.value)
              this.$emit('change', this.value)
            }
          } }, [h('v-icon', this.options.icons.add)])) */
      }
      const header = h('v-layout', { props: { row: true }, class: 'mt-2 mb-1 pr-1' }, headerChildren)

      let list
      if (this.value && this.value.length) {
        const listItems = this.value.filter(item => !!item).map((item, i) => h('v-flex', { props: { xs12: true } }, [
          h('v-card', { class: 'my-2' }, [
            h('v-card-title', { props: { primaryTitle: true } }, this.itemTitle && item[this.itemTitle]),
            h('v-card-text', JSON.stringify(item)),
            h('v-card-actions', [
              h('v-spacer'),
              this.renderArrayItemModal(h, item, i),
              h('v-btn', { props: { icon: true, color: 'warning' },
                on: { click: () => {
                  const value = this.value.filter(i => i !== item)
                  this.$emit('input', value)
                  this.$emit('change', value)
                } } }, [h('v-icon', this.options.icons.delete)])
            ])
          ])
        ]))
        list = h('v-container', { props: { gridListMd: true }, class: 'pt-0 px-2' }, [
          h('draggable', { props: { value: this.value },
            style: 'width: 100%;cursor: move;',
            on: { input: (value) => {
              this.$emit('input', value)
              this.$emit('change', value)
            } } }, listItems)
        ])
      }
      /*
      <v-container v-if="modelWrapper[modelKey] && modelWrapper[modelKey].length" grid-list-md class="pt-0 px-2">
        <v-layout row wrap class="ma-0">
          <draggable v-model="modelWrapper[modelKey]" handle=".handle" style="width: 100%;">
            <v-flex v-for="(itemModel, i) in modelWrapper[modelKey]" :key="i" xs12>
              <v-card class="array-card">
                <v-card-title primary-title class="pa-0">
                  <v-btn v-if="!disabled && fullSchema['x-sortable'] !== false" icon class="handle">
                    <v-icon>{{ options.icons.reorder }}</v-icon>
                  </v-btn>
                  <span v-if="itemTitle && modelWrapper[modelKey][i]">{{ modelWrapper[modelKey][i][itemTitle] }}</span>
                  <v-spacer />
                  <v-btn v-if="!disabled && !(fromUrl || fullSchema.fromData)" icon color="warning" @click="modelWrapper[modelKey].splice(i, 1); change(); input()">
                    <v-icon>{{ options.icons.delete }}</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <property :schema="fullSchema.items"
                            :model-wrapper="modelWrapper[modelKey]"
                            :model-root="modelRoot"
                            :model-key="i"
                            :parent-key="`${fullKey}.`"
                            :options="options"
                            @error="e => $emit('error', e)"
                            @change="e => $emit('change', e)"
                            @input="e => $emit('input', e)"
                  >
                    <!-- propagate slots to children, see https://gist.github.com/Loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
                    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
                    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                      <slot :name="name" v-bind="slotData" />
                    </template>
                  </property>
                </v-card-text>
              </v-card>
            </v-flex>
          </draggable>
        </v-layout>
      </v-container>
      */

      return [header, list]
    }
  }
}
