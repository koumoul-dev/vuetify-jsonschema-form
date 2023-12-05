<script setup>
import { ref, watch, computed } from 'vue'
import { VList, VListItem, VListItemAction, VBtn, VMenu, VIcon } from 'vuetify/components'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import clone from '../../utils/clone.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfListNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const supportDragAndDrop = computed(() => {
  // cf https://ultimatecourses.com/blog/feature-detect-javascript-drag-drop-api
  if (!('draggable' in document.createElement('div'))) return false
  // cf https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
})

/**
 * @template T
 * @param {T[]} array
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {T[]}
 */
function moveArrayItem (array, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return array
  const newArray = [...array]
  const element = newArray[fromIndex]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}

const sortableChildren = ref(props.modelValue.children)
watch(() => props.modelValue.children, (children) => { sortableChildren.value = children })

const draggable = ref(-1)
const dragging = ref(-1)
const dragOver = (/** @type {any} */event, /** @type {number} */childIndex) => {
  sortableChildren.value = moveArrayItem(sortableChildren.value, dragging.value, childIndex)
  dragging.value = childIndex
}
const dragEnd = () => {
  props.statefulLayout.input(props.modelValue, sortableChildren.value.map((child) => child.data))
  dragging.value = -1
}

</script>

<template>
  <v-sheet :elevation="1">
    <v-list :density="modelValue.options.density">
      <v-list-subheader v-if="modelValue.layout.title">
        {{ modelValue.layout.title }}
      </v-list-subheader>
      <template
        v-for="(child, childIndex) of sortableChildren"
        :key="child.key"
      >
        <v-list-item
          :density="modelValue.options.density"
          :draggable="draggable === childIndex"
          @dragstart="dragging = childIndex"
          @dragend="dragEnd"
          @dragover="dragOver($event, childIndex)"
        >
          <v-row class="ma-0">
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
          <template #append>
            <div :style="`display:flex; flex-direction: ${isSection(child) ? 'column' : 'row'};`">
              <v-list-item-action
                v-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode === 'inline-single'"
                class="ma-1"
              >
                <v-btn
                  v-if="child.options.readOnly"
                  :title="modelValue.messages.edit"
                  icon="mdi-pencil"
                  variant="text"
                  color="primary"
                  :density="modelValue.options.density"
                  @click="statefulLayout.activateItem(modelValue, childIndex)"
                />
                <v-btn
                  v-else
                  :title="modelValue.messages.edit"
                  icon="mdi-pencil"
                  variant="flat"
                  color="primary"
                  :density="modelValue.options.density"
                  @click="statefulLayout.deactivateItem(modelValue)"
                />
              </v-list-item-action>
              <v-list-item-action
                v-if="modelValue.layout.listActions.includes('sort') && supportDragAndDrop"
                class="ma-1"
              >
                <v-btn
                  :title="modelValue.messages.sort"
                  icon="mdi-arrow-up-down"
                  variant="plain"
                  :density="modelValue.options.density"
                  @clickdown="draggable = childIndex"
                  @mouseover="draggable = childIndex"
                  @mouseout="draggable = -1"
                />
              </v-list-item-action>
              <v-list-item-action
                v-if="modelValue.layout.listActions.includes('delete') || modelValue.layout.listActions.includes('duplicate') || modelValue.layout.listActions.includes('sort')"
                class="ma-1"
              >
                <v-menu location="bottom end">
                  <template #activator="{props: activatorProps}">
                    <v-btn
                      v-bind="activatorProps"
                      icon="mdi-dots-vertical"
                      variant="plain"
                      :density="modelValue.options.density"
                    />
                  </template>
                  <v-list :density="modelValue.options.density">
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('delete')"
                      base-color="warning"
                      @click="statefulLayout.input(modelValue, [...modelValue.data.slice(0, childIndex), ...modelValue.data.slice(childIndex + 1)])"
                    >
                      <template #prepend>
                        <v-icon icon="mdi-delete" />
                      </template>
                      {{ modelValue.messages.delete }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('duplicate')"
                      @click="statefulLayout.input(modelValue, [...modelValue.data.slice(0, childIndex), clone(child.data), ...modelValue.data.slice(childIndex)])"
                    >
                      <template #prepend>
                        <v-icon icon="mdi-content-duplicate" />
                      </template>
                      {{ modelValue.messages.duplicate }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort')"
                      @click="statefulLayout.input(modelValue, moveArrayItem(modelValue.data, childIndex, childIndex - 1))"
                    >
                      <template #prepend>
                        <v-icon icon="mdi-arrow-up" />
                      </template>
                      {{ modelValue.messages.up }}
                    </v-list-item>
                    <v-list-item
                      v-if="modelValue.layout.listActions.includes('sort')"
                      @click="statefulLayout.input(modelValue, moveArrayItem(modelValue.data, childIndex, childIndex + 1))"
                    >
                      <template #prepend>
                        <v-icon icon="mdi-arrow-down" />
                      </template>
                      {{ modelValue.messages.down }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </div>
          </template>
        </v-list-item>
        <v-divider v-if="childIndex < modelValue.children.length - 1" />
      </template>
      <v-list-item v-if="!modelValue.options.readOnly && modelValue.layout.listActions.includes('add')">
        <v-spacer />
        <v-btn
          color="primary"
          :density="modelValue.options.density"
          @click="statefulLayout.input(modelValue, (modelValue.data ?? []).concat([undefined]))"
        >
          {{ modelValue.messages.addItem }}
        </v-btn>
        <v-spacer />
      </v-list-item>
    </v-list>
  </v-sheet>
</template>
