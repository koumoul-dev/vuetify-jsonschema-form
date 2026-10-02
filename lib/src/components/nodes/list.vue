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
const vListProps = useCompDefaults('VjsfList-VList', { class: 'py-0' })
const vListItemProps = useCompDefaults('VjsfList-VListItem', { variant: 'flat', class: 'pa-1' })
const vEditDialogProps = useCompDefaults('VjsfList-Edit-VDialog', { persistent: true })
const vEditDialogVSheetProps = useCompDefaults('VjsfList-Edit-VDialog-VSheet', {})
const vEditMenuProps = useCompDefaults('VjsfList-Edit-VMenu', {})
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
// activatedItems holds either the index of the item or its key (indexed lists are activated by key)
const editedItemIndex = computed(() => {
  if (editedItem.value === undefined) return undefined
  if (typeof editedItem.value === 'number') return editedItem.value
  const index = sortableArray.value.findIndex((child) => child.key === editedItem.value)
  return index === -1 ? undefined : index
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
    return editedItemIndex.value ?? -1
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

const menuActions = computed(() => {
  return layout.value.listActions.filter(a => {
    if (a === 'add' || a === 'paste') return false
    if (a === 'edit' && layout.value.listEditMode === 'inline') return false
    return true
  })
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

/*
 * the header line of an item carries its title and its close button
 * the remaining actions are overlaid in the top-right corner and reserve no width,
 * so the header is rendered as soon as there is anything to put in it, to give
 * those overlaid actions a line of their own instead of letting them sit on the content
 */
const showOverlaidActions = computed(() => {
  return !options.value.readOnly && menuActions.value.length > 0
})
const itemHeaderTitles = computed(() => {
  return sortableArray.value.map((child, childIndex) => {
    if (itemTitles.value?.[childIndex]) return itemTitles.value[childIndex]
    if (layout.value.indexed) return child.key
    return null
  })
})
const showItemCloseButton = (/** @type {number} */childIndex) => {
  return !options.value.readOnly &&
    layout.value.listActions.includes('edit') &&
    layout.value.listEditMode === 'inline-single' &&
    editedItemIndex.value === childIndex
}
const showItemHeader = (/** @type {number} */childIndex) => {
  if (itemHeaderTitles.value[childIndex] || itemSubtitles.value?.[childIndex]) return true
  if (showItemCloseButton(childIndex)) return true
  return showOverlaidActions.value
}

/** the nodes rendered in the body of each item, empty when a summary is configured to display nothing */
const itemsChildren = computed(() => {
  return sortableArray.value.map((child) => {
    const nodes = isSection(child) ? child.children : [child]
    return nodes.filter((node) => node.layout.comp !== 'none')
  })
})

/**
 * the single action displayed in the overlaid actions column of an item, if any
 * the menu button is rendered even when the item is idle, so that it can be reached with the keyboard,
 * and only made invisible through the vjsf-list-item-action--idle class
 * the menu overlay itself is only mounted for the active item, one per idle item would weigh on large lists
 */
const itemAppendAction = (/** @type {number} */childIndex) => {
  // while a drag is in progress the list reorders under the pointer but dragPrepared
  // keeps pointing at the original index, so all actions are hidden until the drop
  if (dragging.value !== -1) return null
  // the close button lives in the header line, not here
  if (showItemCloseButton(childIndex)) return null
  if (dragPrepared.value === childIndex) return 'sort'
  if (editedItem.value === undefined || layout.value.listEditMode === 'menu') return 'menu'
  return null
}

/** buttons of the item menus, kept as anchors for the lazily mounted menu overlays */
const menuButtonRefs = ref(/** @type {any[]} */([]))

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
 * follow the item to its new position instead of closing the menu, so that successive moves don't require re-opening it
 * @param {number} childIndex
 * @param {number} targetIndex
 */
const moveItem = (childIndex, targetIndex) => {
  props.statefulLayout.input(props.modelValue, moveDataItem(props.modelValue.data, childIndex, targetIndex))
  menuOpened.value = targetIndex
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

/**
 * @param {number} childIndex
 */
const insertAfterItem = (childIndex) => {
  const newData = [...props.modelValue.data.slice(0, childIndex + 1), undefined, ...props.modelValue.data.slice(childIndex + 1)]
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
  if (editedItemIndex.value === childIndex) return theme.current.value.colors.primary
  if (child.validated && (child.error || child.childError)) return theme.current.value.colors.error
  if (options.value.readOnly) return 'transparent'
  if (activeItem.value === childIndex) return theme.current.value.colors.primary
  if (dragPrepared.value === childIndex) return theme.current.value.colors.primary
  return 'transparent'
})

const indexedListRules = computed(() => {
  return [(/** @type {string} */v) => !props.modelValue.children.some(c => c.key === v), (/** @type {string} */v) => !v || !!props.modelValue.layout.indexed?.some(pattern => v.match(getRegexp(pattern)))]
})

const toggleDialog = (/** @type {boolean} */value) => {
  if (!value) props.statefulLayout.deactivateItem(props.modelValue)
}
</script>

<template>
  <v-card
    v-bind="vCardProps"
    :loading="modelValue.loading"
  >
    <v-list v-bind="vListProps">
      <v-list-subheader v-if="modelValue.layout.title">
        {{ modelValue.layout.title }}
      </v-list-subheader>
      <template
        v-for="(child, childIndex) of sortableArray"
        :key="child.fullKey"
      >
        <v-list-item
          v-bind="itemBind(childIndex, vListItemProps)"
          :draggable="draggable === childIndex"
          :style="`border: 1px solid ${itemBorderColor(child, childIndex)}`"
          class="vjsf-list-item"
        >
          <div
            v-if="showItemHeader(childIndex)"
            class="vjsf-list-item__header"
            :class="{
              'vjsf-list-item__header--with-actions': showOverlaidActions && !showItemCloseButton(childIndex),
              'vjsf-list-item__header--with-close': showItemCloseButton(childIndex),
              'vjsf-list-item__header--alone': !itemsChildren[childIndex].length
            }"
          >
            <div class="vjsf-list-item__header-text">
              <v-list-item-title v-if="itemHeaderTitles[childIndex]">
                {{ itemHeaderTitles[childIndex] }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="itemSubtitles?.[childIndex]">
                {{ itemSubtitles?.[childIndex] }}
              </v-list-item-subtitle>
            </div>
            <v-spacer />
            <v-btn
              v-if="showItemCloseButton(childIndex)"
              :title="modelValue.messages.close"
              :icon="options.icons.edit"
              variant="flat"
              color="primary"
              :density="buttonDensity"
              :disabled="modelValue.loading"
              @click="statefulLayout.deactivateItem(modelValue)"
            />
          </div>
          <v-row
            v-if="itemsChildren[childIndex].length"
            class="pa-3"
          >
            <node
              v-for="grandChild of itemsChildren[childIndex]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
          <template
            v-if="showOverlaidActions"
            #append
          >
            <div class="vjsf-list-item-actions-wrapper">
              <v-list-item-action
                v-if="itemAppendAction(childIndex) === 'sort'"
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
                v-else-if="itemAppendAction(childIndex) === 'menu'"
                :class="{ 'vjsf-list-item-action--idle': activeItem !== childIndex }"
              >
                <v-btn
                  :ref="(menuButton) => { menuButtonRefs[childIndex] = menuButton }"
                  :icon="options.icons.menu"
                  variant="plain"
                  slim
                  :disabled="modelValue.loading"
                  :density="buttonDensity"
                  aria-haspopup="menu"
                  :aria-expanded="menuOpened === childIndex ? 'true' : 'false'"
                  @click="toggleMenu(childIndex, menuOpened !== childIndex)"
                />
                <v-menu
                  v-if="menuOpened === childIndex || activeItem === childIndex"
                  location="bottom end"
                  :z-index="zIndex"
                  :density="modelValue.options.density"
                  :close-on-content-click="false"
                  :open-on-click="false"
                  :activator="menuButtonRefs[childIndex]"
                  :model-value="menuOpened === childIndex"
                  @update:model-value="value => toggleMenu(childIndex, value)"
                >
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
                        :width="modelValue.options.listMenuWidth"
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
                          <v-row class="pa-3">
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
                      v-if="modelValue.layout.listActions.includes('insertAfter')"
                      @click="insertAfterItem(childIndex)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.insertAfter" />
                      </template>
                      {{ modelValue.messages.insertAfter }}
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
                      @click="moveItem(childIndex, childIndex - 1)"
                    >
                      <template #prepend>
                        <v-icon :icon="options.icons.sortUp" />
                      </template>
                      {{ modelValue.messages.up }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort')"
                      :disabled="childIndex === modelValue.data.length - 1"
                      @click="moveItem(childIndex, childIndex + 1)"
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
        class="py-2 vjsf-list-add-item"
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
        :width="options.listDialogWidth"
        :z-index="zIndex"
        class="vjsf-list-dialog"
        @update:model-value="toggleDialog"
      >
        <template #default="{ isActive }">
          <v-sheet v-bind="vEditDialogVSheetProps">
            <v-toolbar
              density="compact"
              color="surface"
              class="vjsf-list-dialog-toolbar"
            >
              <v-spacer />
              <v-btn
                :title="modelValue.messages.close"
                :icon="options.icons.close"
                variant="flat"
                density="comfortable"
                :disabled="modelValue.loading"
                @click="isActive.value = false"
              />
            </v-toolbar>
            <v-row class="pa-3">
              <node
                v-for="grandChild of isSection(children[children.length - 1]) ? children[children.length - 1].children : [children[children.length - 1]]"
                :key="grandChild.fullKey"
                :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
                :stateful-layout="statefulLayout"
              />
            </v-row>
          </v-sheet>
        </template>
      </v-dialog>
    </v-list>
  </v-card>
</template>

<style>
/*
 * the actions column is overlaid in the top-right corner of the item instead of
 * being a column of its own, so that it reserves no width ; nested lists used to
 * lose 36px of content width per level to it
 */
.vjsf-list-item {
  position: relative;
}
/* child combinator so that a v-list-item rendered by a custom component in the item body is left alone */
.vjsf-list-item > .v-list-item__append {
  position: absolute;
  top: 0;
  /* logical property so that the column stays on the end side in rtl, as it was when in flow */
  inset-inline-end: 0;
  height: auto;
  align-items: start;
}
.vjsf-list-item-actions-wrapper .v-list-item-action--end {
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.vjsf-list-item__header {
  display: flex;
  align-items: start;
  gap: 4px;
  /* the start padding matches the pa-3 of the row below, so that the title aligns with the fields */
  padding-block: 8px 0;
  padding-inline: 12px;
}
/*
 * only when actions are overlaid in the corner: the end padding keeps the title clear of them,
 * and the min-height gives them a line of their own instead of letting them cover the content below
 */
.vjsf-list-item__header--with-actions {
  padding-inline-end: 40px;
  min-height: var(--vjsf-list-item-header-min-height, 36px);
}
/*
 * the density wrappers carry a variable instead of styling the header through descendant selectors,
 * so that the closest wrapper wins in nested forms of mixed densities
 */
.vjsf-density-default {
  --vjsf-list-item-header-min-height: 40px;
}
.vjsf-density-comfortable {
  --vjsf-list-item-header-min-height: 36px;
}
.vjsf-density-compact {
  --vjsf-list-item-header-min-height: 32px;
}
/* the close button occupies the corner itself, nothing to reserve */
.vjsf-list-item__header--with-close {
  padding-inline-end: 4px;
}
/* when the header is the whole item it fills its content box, so that its text is vertically centered */
.vjsf-list-item__header--alone {
  align-items: center;
  padding-block: 0;
}
.vjsf-list-item__header-text {
  flex: 1 1 auto;
  min-width: 0;
}
/* a long item title wraps instead of being truncated by the vuetify defaults */
.vjsf-list-item__header-text .v-list-item-title,
.vjsf-list-item__header-text .v-list-item-subtitle {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

/*
 * an idle item keeps its menu button rendered, so that it stays reachable with the keyboard,
 * but invisible and not clickable until the item is hovered, focused or otherwise active
 */
.vjsf-list-item-action--idle {
  opacity: 0;
  pointer-events: none;
}
.vjsf-list-item:focus-within .vjsf-list-item-action--idle {
  opacity: 1;
  pointer-events: auto;
}

/* v-list-item__content clips its overflow and the add button sits flush against it, cutting off its elevation shadow */
.vjsf-list-add-item > .v-list-item__content {
  overflow: visible;
}
</style>
