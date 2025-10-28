<script setup>
import { watch, computed, ref } from 'vue'
import { useDefaults, useTheme } from 'vuetify'
import { VList, VListItem, VListItemAction, VListItemTitle, VListItemSubtitle, VListSubheader } from 'vuetify/components/VList'
import { VRow, VSpacer } from 'vuetify/components/VGrid'
import { VTextField } from 'vuetify/components/VTextField'
import { VCard } from 'vuetify/components/VCard'
import { VDivider } from 'vuetify/components/VDivider'
import { VIcon } from 'vuetify/components/VIcon'
import { VBtn } from 'vuetify/components/VBtn'
import { VMenu } from 'vuetify/components/VMenu'
import { VDialog } from 'vuetify/components/VDialog'
import { VToolbar } from 'vuetify/components/VToolbar'
import { VForm } from 'vuetify/components/VForm'
import { VSheet } from 'vuetify/components/VSheet'
import ListSelectKey from '../fragments/list-select-key.vue'
import { isSection, getRegexp } from '@json-layout/core/state'
import { clone } from '@json-layout/core/utils/clone'
import Node from '../node.vue'
import { moveDataItem } from '../../utils/arrays.js'
import useDnd from '../../composables/use-dnd.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'
import useClipboard from '../../composables/use-clipboard.js'
import useZIndexStack from '../../composables/use-z-index-stack.js'

useDefaults({}, 'VjsfList')
const vCardProps = useCompDefaults('VjsfList-VCard', { border: true, flat: true, tile: true })
const vEditDialogProps = useCompDefaults('VjsfList-Edit-VDialog', { width: 500, persistent: true })
const vEditDialogVSheetProps = useCompDefaults('VjsfList-Edit-VDialog-VSheet', {})
const vEditMenuProps = useCompDefaults('VjsfList-Edit-VMenu', { width: 500 })
const theme = useTheme()

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfListNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

// we access vjsfNode properties through computeds so that the parts without mutations do not trigger reactivity
// this is to leverage the immutability provided by immer in json-layout
const options = computed(() => props.modelValue.options)
const layout = computed(() => props.modelValue.layout)
const children = computed(() => props.modelValue.children)

const getRenderChildren = () => {
  if (layout.value.listEditMode === 'dialog' || layout.value.listEditMode === 'menu') {
    return children.value.filter(c => c.options.summary)
  }
  return children.value
}

/* use composable for drag and drop */
const { activeDnd, sortableArray, draggable, hovered, dragging, itemBind, handleBind } = useDnd(getRenderChildren(), () => {
  const newData = layout.value.indexed
    ? sortableArray.value.reduce((a, child) => { a[child.key] = child.data; return a }, /** @type {Record<string, any>} */({}))
    : sortableArray.value.map((child) => child.data)
  props.statefulLayout.input(props.modelValue, newData)
  dragPrepared.value = -1
})
watch(children, () => { sortableArray.value = getRenderChildren() })
const dragPrepared = ref(-1)
const prepareDrag = (/** @type {number} */index) => {
  dragPrepared.value = index
  menuOpened.value = -1
}

const zIndex = useZIndexStack(props.modelValue.fullKey)

/* manage hovered and edited items */
// const editedItem = computed(() => activatedItems.value[fullKey.value])
const editedItem = computed(() => {
  return props.statefulLayout.activatedItems[props.modelValue.fullKey]
})

const menuOpened = ref(-1)
const toggleMenu = (/** @type {number} */childIndex, /** @type {boolean} */value) => {
  menuOpened.value = value ? childIndex : -1
  preparedDelete.value = false
}

const activeItem = computed(() => {
  if (
    layout.value.listActions.includes('edit') &&
    layout.value.listEditMode !== 'inline' &&
    editedItem.value !== undefined
  ) {
    return editedItem.value
  }
  if (dragging.value !== -1) return -1
  if (menuOpened.value !== -1) return menuOpened.value
  if (dragPrepared.value !== -1) return dragPrepared.value
  return hovered.value
})

const buttonDensity = computed(() => {
  if (options.value.density === 'default') return 'comfortable'
  return options.value.density
})

const itemTitles = computed(() => {
  const expr = props.modelValue.layout.itemTitle
  if (!expr) return null
  return sortableArray.value.map((child) => props.statefulLayout.evalNodeExpression(props.modelValue, expr, child.data))
})
const itemSubtitles = computed(() => {
  const expr = props.modelValue.layout.itemSubtitle
  if (!expr) return null
  return sortableArray.value.map((child) => props.statefulLayout.evalNodeExpression(props.modelValue, expr, child.data))
})

const activateOrFocus = (/** @type number | string */childKey) => {
  if (layout.value.listEditMode === 'inline-single' || layout.value.listEditMode === 'dialog') {
    props.statefulLayout.activateItem(props.modelValue, childKey)
  } else {
    props.statefulLayout.focusNode(props.modelValue.fullKey + '/' + childKey)
  }
}

const pushEmptyItem = () => {
  const newData = (props.modelValue.data ?? []).concat([undefined])
  props.statefulLayout.input(props.modelValue, newData)
  activateOrFocus(newData.length - 1)
}

const newKey = ref('')
/** @type {import('vue').Ref<InstanceType<typeof import('vuetify/components/VForm').VForm> | null>} */
const newKeyForm = ref(null)
const pushEmptyIndexedItem = () => {
  if (!newKey.value) return
  if (!newKeyForm.value) return
  if (!newKeyForm.value.isValid) return
  const newData = { ...(props.modelValue.data ?? {}), [newKey.value]: undefined }
  props.statefulLayout.input(props.modelValue, newData)
  activateOrFocus(newKey.value)
  newKey.value = ''
  newKeyForm.value?.reset()
}

/**
 * @param {number} childIndex
 */
const clickDeleteItem = (childIndex) => {
  if (options.value.confirmDeleteItem) {
    preparedDelete.value = true
  } else {
    deleteItem(childIndex)
  }
}

/**
 * @param {number} childIndex
 */
const deleteItem = (childIndex) => {
  if (layout.value.indexed) {
    const oldData = /** @type {Record<string, any>} */(props.modelValue.data)
    const keys = Object.keys(props.modelValue.data)
    /** @type {Record<string, any>} */
    const newData = {}
    for (let i = 0; i < keys.length; i++) {
      if (i !== childIndex) newData[keys[i]] = oldData[keys[i]]
    }
    props.statefulLayout.input(props.modelValue, newData)
  } else {
    const newData = [...props.modelValue.data.slice(0, childIndex), ...props.modelValue.data.slice(childIndex + 1)]
    props.statefulLayout.input(props.modelValue, newData)
  }

  menuOpened.value = -1
}
const preparedDelete = ref(false)

/**
 * @param {import('@json-layout/core').StateNode} child
 * @param {number} childIndex
 */
const duplicateItem = (child, childIndex) => {
  const newItem = props.modelValue.layout.itemCopy ? props.statefulLayout.evalNodeExpression(props.modelValue, props.modelValue.layout.itemCopy, clone(child.data)) : clone(child.data)
  const newData = [...props.modelValue.data.slice(0, childIndex + 1), newItem, ...props.modelValue.data.slice(childIndex + 1)]
  props.statefulLayout.input(props.modelValue, newData)
  activateOrFocus(childIndex + 1)
  menuOpened.value = -1
}

const clipboard = useClipboard(() => props.modelValue.layout.clipboardKey ?? props.modelValue.fullKey)

/**
 * @param {import('@json-layout/core').StateNode} child
 */
const copyItem = (child) => {
  clipboard.value = child.data
  menuOpened.value = -1
}

/**
 * @param {import('@json-layout/core').StateNode} child
 */
const pasteItem = (child) => {
  const copiedItem = clipboard.value
  if (copiedItem === null) throw new Error('attempt to paste but clipboard is empty')
  const newItem = props.modelValue.layout.itemCopy ? props.statefulLayout.evalNodeExpression(props.modelValue, props.modelValue.layout.itemCopy, clone(copiedItem)) : clone(copiedItem)
  const newData = [...(props.modelValue.data ?? []), newItem]
  props.statefulLayout.input(props.modelValue, newData)
  activateOrFocus(newData.length - 1)
}

const itemBorderColor = computed(() => (/** @type {import('@json-layout/core').StateNode} */child, /** @type {number} */childIndex) => {
  if (editedItem.value === childIndex) return theme.current.value.colors.primary
  if (child.validated && (child.error || child.childError)) return theme.current.value.colors.error
  if (options.value.readOnly) return 'transparent'
  if (activeItem.value === childIndex) return theme.current.value.colors.primary
  if (dragPrepared.value === childIndex) return theme.current.value.colors.primary
  return 'transparent'
})

const indexedListRules = computed(() => {
  return [(/** @type {string} */v) => !props.modelValue.children.some(c => c.key === v), (/** @type {string} */v) => !v || !!props.modelValue.layout.indexed?.some(pattern => v.match(getRegexp(pattern)))]
})

</script>

<template>
  <v-card
    v-bind="vCardProps"
    :loading="modelValue.loading"
  >
    <v-list class="py-0">
      <v-list-subheader v-if="modelValue.layout.title">
        {{ modelValue.layout.title }}
      </v-list-subheader>
      <template
        v-for="(child, childIndex) of sortableArray"
        :key="children.findIndex(c => c === child)"
      >
        <v-list-item
          v-bind="itemBind(childIndex)"
          :draggable="draggable === childIndex"
          variant="flat"
          :style="`border: 1px solid ${itemBorderColor(child, childIndex)}`"
          class="pa-1 vjsf-list-item"
        >
          <v-list-item-title
            v-if="itemTitles?.[childIndex]"
            class="pl-4 pt-2"
          >
            {{ itemTitles?.[childIndex] }}
          </v-list-item-title>
          <v-list-item-title
            v-else-if="modelValue.layout.indexed"
            class="pl-4 pt-2"
          >
            {{ child.key }}
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="itemSubtitles?.[childIndex]"
            class="pl-4 pt-2"
          >
            {{ itemSubtitles?.[childIndex] }}
          </v-list-item-subtitle>
          <v-row class="ma-0">
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
          <template
            v-if="!modelValue.options.readOnly && modelValue.layout.listActions.length"
            #append
          >
            <div class="vjsf-list-item-actions-wrapper">
              <v-list-item-action v-if="activeItem !== childIndex">
                <v-btn
                  style="visibility:hidden"
                  variant="text"
                  :density="buttonDensity"
                  :icon="options.icons.edit"
                  :disabled="modelValue.loading"
                />
              </v-list-item-action>
              <v-list-item-action
                v-else-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode === 'inline-single' && editedItem === childIndex"
              >
                <v-btn
                  :title="modelValue.messages.close"
                  :icon="options.icons.edit"
                  variant="flat"
                  color="primary"
                  :density="buttonDensity"
                  :disabled="modelValue.loading"
                  @click="statefulLayout.deactivateItem(modelValue)"
                />
              </v-list-item-action>
              <v-list-item-action
                v-else-if="dragPrepared === childIndex"
              >
                <v-btn
                  :title="modelValue.messages.sort"
                  :icon="options.icons.sort"
                  variant="flat"
                  color="primary"
                  :density="buttonDensity"
                  :disabled="modelValue.loading"
                  v-bind="handleBind(childIndex)"
                />
              </v-list-item-action>
              <v-list-item-action
                v-else-if="(editedItem === undefined || modelValue.layout.listEditMode === 'menu') && modelValue.layout.listActions.length"
              >
                <v-menu
                  location="bottom end"
                  :z-index="zIndex"
                  :density="modelValue.options.density"
                  :close-on-content-click="false"
                  :model-value="menuOpened === childIndex"
                  @update:model-value="value => toggleMenu(childIndex, value)"
                >
                  <template #activator="{props: activatorProps}">
                    <v-btn
                      v-bind="activatorProps"
                      :icon="options.icons.menu"
                      variant="plain"
                      slim
                      :disabled="modelValue.loading"
                      :density="buttonDensity"
                    />
                  </template>
                  <v-list :density="modelValue.options.density">
                    <template v-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode !== 'inline'">
                      <v-menu
                        v-if="layout.listEditMode === 'menu'"
                        location="start"
                        :z-index="zIndex"
                        :density="modelValue.options.density"
                        :model-value="editedItem !== undefined"
                        :close-on-content-click="false"
                        v-bind="vEditMenuProps"
                        @update:model-value="value => value || statefulLayout.deactivateItem(modelValue)"
                      >
                        <template #activator="{props: listItemProps}">
                          <v-list-item
                            :density="modelValue.options.density"
                            base-color="primary"
                            v-bind="listItemProps"
                            @click="statefulLayout.activateItem(modelValue, childIndex);"
                          >
                            <template #prepend>
                              <v-icon :icon="options.icons.edit" />
                            </template>
                            {{ modelValue.messages.edit }}
                          </v-list-item>
                        </template>
                        <v-sheet>
                          <v-row class="ma-0">
                            <node
                              v-for="grandChild of isSection(children[children.length - 1]) ? children[children.length - 1].children : [children[children.length - 1]]"
                              :key="grandChild.fullKey"
                              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
                              :stateful-layout="statefulLayout"
                            />
                          </v-row>
                        </v-sheet>
                      </v-menu>
                      <v-list-item
                        v-else
                        :density="modelValue.options.density"
                        base-color="primary"
                        @click="statefulLayout.activateItem(modelValue, childIndex); menuOpened = -1"
                      >
                        <template #prepend>
                          <v-icon :icon="options.icons.edit" />
                        </template>
                        {{ modelValue.messages.edit }}
                      </v-list-item>
                    </template>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('duplicate')"
                      @click="duplicateItem(child, childIndex)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.duplicate" />
                      </template>
                      {{ modelValue.messages.duplicate }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('copy')"
                      @click="copyItem(child)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.copy" />
                      </template>
                      {{ modelValue.messages.copy }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort') && activeDnd"
                      :disabled="modelValue.data.length === 1"
                      @click="prepareDrag(childIndex)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.sort" />
                      </template>
                      {{ modelValue.messages.sort }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort')"
                      :disabled="childIndex === 0"
                      @click="statefulLayout.input(modelValue, moveDataItem(modelValue.data, childIndex, childIndex - 1)); menuOpened = -1"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.sortUp" />
                      </template>
                      {{ modelValue.messages.up }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort')"
                      :disabled="childIndex === modelValue.data.length - 1"
                      @click="statefulLayout.input(modelValue, moveDataItem(modelValue.data, childIndex, childIndex + 1)); menuOpened = -1"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.sortDown" />
                      </template>
                      {{ modelValue.messages.down }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('delete')"
                      base-color="warning"
                      @click="clickDeleteItem(childIndex)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.delete" />
                      </template>
                      {{ modelValue.messages.delete }}
                    </v-list-item>
                    <v-list-item v-if="preparedDelete">
                      <v-spacer />
                      <v-btn
                        color="warning"
                        class="float-right ma-1"
                        @click="deleteItem(childIndex)"
                      >
                        {{ modelValue.messages.confirm }}
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </div>
          </template>
        </v-list-item>
        <v-divider v-if="childIndex < modelValue.children.length - 1" />
      </template>
      <v-list-item
        v-if="!modelValue.options.readOnly && (modelValue.layout.listActions.includes('add') || modelValue.layout.listActions.includes('paste'))"
        class="py-2"
      >
        <template v-if="modelValue.layout.indexed">
          <v-form
            v-if="modelValue.layout.listActions.includes('add')"
            ref="newKeyForm"
            style="max-width: 250px;"
            @submit.prevent
          >
            <list-select-key
              v-if="modelValue.layout.getItems ?? modelValue.layout.items"
              v-model="newKey"
              :list-node="modelValue"
              :stateful-layout="statefulLayout"
              :rules="indexedListRules"
              @update:model-value="pushEmptyIndexedItem"
            />
            <v-text-field
              v-else
              v-model="newKey"
              variant="outlined"
              :placeholder="modelValue.messages.addItem"
              hide-details
              :rules="indexedListRules"
              @keypress.enter="pushEmptyIndexedItem"
            >
              <template #append>
                <v-icon
                  color="primary"
                  size="large"
                  :icon="options.icons.add"
                  @click="pushEmptyIndexedItem"
                />
              </template>
            </v-text-field>
          </v-form>
        </template>
        <template v-else>
          <v-btn
            v-if="modelValue.layout.listActions.includes('add')"
            color="primary"
            :prepend-icon="options.icons.add"
            class="mr-2"
            @click="pushEmptyItem"
          >
            {{ modelValue.messages.addItem }}
          </v-btn>
          <v-btn
            v-if="modelValue.layout.listActions.includes('paste') && clipboard !== null"
            color="primary"
            :prepend-icon="options.icons.paste"
            @click="pasteItem"
          >
            {{ modelValue.messages.paste }}
          </v-btn>
        </template>
      </v-list-item>

      <v-dialog
        v-if="layout.listEditMode === 'dialog'"
        :model-value="editedItem !== undefined"
        v-bind="vEditDialogProps"
        :z-index="zIndex"
        class="vjsf-list-dialog"
      >
        <v-sheet v-bind="vEditDialogVSheetProps">
          <v-toolbar
            density="compact"
            color="surface"
          >
            <v-spacer />
            <v-btn
              :title="modelValue.messages.close"
              :icon="options.icons.close"
              variant="flat"
              density="comfortable"
              :disabled="modelValue.loading"
              @click="statefulLayout.deactivateItem(modelValue)"
            />
          </v-toolbar>
          <v-row class="ma-0">
            <node
              v-for="grandChild of isSection(children[children.length - 1]) ? children[children.length - 1].children : [children[children.length - 1]]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-list>
  </v-card>
</template>

<style>
.vjsf-list-item .v-list-item__append {
  height: 100%;
  align-items: start;
}
.vjsf-list-item .v-list-item__content {
  padding-right: 4px;
}
.vjsf-list-item-actions-wrapper {
  /*margin: -4px;*/
}
</style>
