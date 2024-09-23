<script setup>
import { watch, computed, ref } from 'vue'
import { useDefaults, useTheme } from 'vuetify'
import { VList, VListItem, VListItemAction, VListItemTitle, VListSubheader } from 'vuetify/components/VList'
import { VRow } from 'vuetify/components/VGrid'
import { VTextField } from 'vuetify/components/VTextField'
import { VSheet } from 'vuetify/components/VSheet'
import { VDivider } from 'vuetify/components/VDivider'
import { VIcon } from 'vuetify/components/VIcon'
import { VBtn } from 'vuetify/components/VBtn'
import { VMenu } from 'vuetify/components/VMenu'
import { VForm } from 'vuetify/components/VForm'
import { isSection, clone, getRegexp } from '@json-layout/core'
import Node from '../node.vue'
import { moveDataItem } from '../../utils/arrays.js'
import useDnd from '../../composables/use-dnd.js'
import useCompDefaults from '../../composables/use-comp-defaults.js'

useDefaults({}, 'VjsfList')
const vSheetProps = useCompDefaults('VjsfList-VSheet', { border: true })
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

/* use composable for drag and drop */
const { activeDnd, sortableArray, draggable, hovered, dragging, itemBind, handleBind } = useDnd(props.modelValue.children, () => {
  const newData = layout.value.indexed
    ? sortableArray.value.reduce((a, child) => { a[child.key] = child.data; return a }, /** @type {Record<string, any>} */({}))
    : sortableArray.value.map((child) => child.data)
  props.statefulLayout.input(props.modelValue, newData)
})
watch(children, (array) => { sortableArray.value = array })

/* manage hovered and edited items */
// const editedItem = computed(() => activatedItems.value[fullKey.value])
const editedItem = computed(() => {
  return props.statefulLayout.activatedItems[props.modelValue.fullKey]
})

const menuOpened = ref(-1)
const activeItem = computed(() => {
  if (
    layout.value.listActions.includes('edit') &&
    layout.value.listEditMode === 'inline-single' &&
    editedItem.value !== undefined
  ) {
    return editedItem.value
  }
  if (dragging.value !== -1) return -1
  if (menuOpened.value !== -1) return menuOpened.value
  return hovered.value
})

const buttonDensity = computed(() => {
  if (options.value.density === 'default') return 'comfortable'
  return options.value.density
})

const pushEmptyItem = () => {
  const newData = (props.modelValue.data ?? []).concat([undefined])
  props.statefulLayout.input(props.modelValue, newData)
  if (layout.value.listEditMode === 'inline-single') {
    props.statefulLayout.activateItem(props.modelValue, newData.length - 1)
  }
}

const newKey = ref('')
/** @type {import('vue').Ref<InstanceType<typeof import('vuetify/components/VForm').VForm> | null>} */
const newKeyForm = ref(null)
const pushEmptyIndexedItem = () => {
  if (!newKey.value) return
  if (!newKeyForm.value) return
  if (!newKeyForm.value.isValid) return
  const newData = { ...(props.modelValue.data ?? {}), [newKey.value]: null }
  props.statefulLayout.input(props.modelValue, newData)
  if (layout.value.listEditMode === 'inline-single') {
    props.statefulLayout.activateItem(props.modelValue, Object.keys(newData).length - 1)
  }
  newKey.value = ''
  newKeyForm.value?.reset()
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

/**
 * @param {import('@json-layout/core').StateNode} child
 * @param {number} childIndex
 */
const duplicateItem = (child, childIndex) => {
  const newData = [...props.modelValue.data.slice(0, childIndex), clone(child.data), ...props.modelValue.data.slice(childIndex)]
  props.statefulLayout.input(props.modelValue, newData)
  if (layout.value.listEditMode === 'inline-single') {
    props.statefulLayout.activateItem(props.modelValue, childIndex + 1)
  }
  menuOpened.value = -1
}

const itemBorderColor = computed(() => (/** @type {import('@json-layout/core').StateNode} */child, /** @type {number} */childIndex) => {
  if (editedItem.value === childIndex) return theme.current.value.colors.primary
  if (child.validated && (child.error || child.childError)) return theme.current.value.colors.error
  if (options.value.readOnly) return 'transparent'
  if (activeItem.value === childIndex) return theme.current.value.colors.primary
  return 'transparent'
})

</script>

<template>
  <v-sheet v-bind="vSheetProps">
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
            v-if="modelValue.layout.indexed"
            class="pl-4 pt-2"
          >
            {{ child.key }}
          </v-list-item-title>
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
                  icon="mdi-pencil"
                />
              </v-list-item-action>
              <template v-else>
                <v-list-item-action
                  v-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode === 'inline-single'"
                >
                  <v-btn
                    v-if="editedItem !== childIndex"
                    :title="modelValue.messages.edit"
                    icon="mdi-pencil"
                    variant="text"
                    color="primary"
                    :density="buttonDensity"
                    @click="statefulLayout.activateItem(modelValue, childIndex)"
                  />
                  <v-btn
                    v-else
                    :title="modelValue.messages.close"
                    icon="mdi-close"
                    variant="flat"
                    color="primary"
                    :density="buttonDensity"
                    @click="statefulLayout.deactivateItem(modelValue)"
                  />
                </v-list-item-action>
                <v-list-item-action
                  v-if="editedItem === undefined && modelValue.layout.listActions.includes('sort') && activeDnd"
                >
                  <v-btn
                    :title="modelValue.messages.sort"
                    icon="mdi-arrow-up-down"
                    variant="plain"
                    :density="buttonDensity"
                    v-bind="handleBind(childIndex)"
                  />
                </v-list-item-action>
                <v-list-item-action
                  v-if="editedItem === undefined && (modelValue.layout.listActions.includes('delete') || modelValue.layout.listActions.includes('duplicate') || modelValue.layout.listActions.includes('sort'))"
                >
                  <v-menu
                    location="bottom end"
                    @update:model-value="value => {menuOpened = value ? childIndex : -1}"
                  >
                    <template #activator="{props: activatorProps}">
                      <v-btn
                        v-bind="activatorProps"
                        icon="mdi-dots-vertical"
                        variant="plain"
                        slim
                        :density="buttonDensity"
                      />
                    </template>
                    <v-list>
                      <v-list-item
                        v-if="modelValue.layout.listActions.includes('delete')"
                        base-color="warning"
                        @click="deleteItem(childIndex)"
                      >
                        <template #prepend>
                          <v-icon icon="mdi-delete" />
                        </template>
                        {{ modelValue.messages.delete }}
                      </v-list-item>
                      <v-list-item
                        v-if="modelValue.layout.listActions.includes('duplicate')"
                        @click="duplicateItem(child, childIndex)"
                      >
                        <template #prepend>
                          <v-icon icon="mdi-content-duplicate" />
                        </template>
                        {{ modelValue.messages.duplicate }}
                      </v-list-item>
                      <v-list-item
                        v-if="modelValue.layout.listActions.includes('sort')"
                        @click="statefulLayout.input(modelValue, moveDataItem(modelValue.data, childIndex, childIndex - 1))"
                      >
                        <template #prepend>
                          <v-icon icon="mdi-arrow-up" />
                        </template>
                        {{ modelValue.messages.up }}
                      </v-list-item>
                      <v-list-item
                        v-if="modelValue.layout.listActions.includes('sort')"
                        @click="statefulLayout.input(modelValue, moveDataItem(modelValue.data, childIndex, childIndex + 1))"
                      >
                        <template #prepend>
                          <v-icon icon="mdi-arrow-down" />
                        </template>
                        {{ modelValue.messages.down }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </template>
            </div>
          </template>
        </v-list-item>
        <v-divider v-if="childIndex < modelValue.children.length - 1" />
      </template>
      <v-list-item
        v-if="!modelValue.options.readOnly && modelValue.layout.listActions.includes('add')"
        class="py-2"
      >
        <template v-if="modelValue.layout.indexed">
          <v-form
            ref="newKeyForm"
            style="max-width: 250px;"
            @submit.prevent
          >
            <v-text-field
              v-model="newKey"
              variant="outlined"
              :placeholder="modelValue.messages.addItem"
              hide-details
              :rules="[(/** @type {string} */v) => !modelValue.children.some(c => c.key === v), v => !v || !!modelValue.layout.indexed?.some(pattern => v.match(getRegexp(pattern)))]"
              @keypress.enter="pushEmptyIndexedItem"
            >
              <template #append>
                <v-icon
                  color="primary"
                  size="large"
                  @click="pushEmptyIndexedItem"
                >
                  mdi-plus
                </v-icon>
              </template>
            </v-text-field>
          </v-form>
        </template>
        <template v-else>
          <v-btn
            color="primary"
            @click="pushEmptyItem"
          >
            {{ modelValue.messages.addItem }}
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-sheet>
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
