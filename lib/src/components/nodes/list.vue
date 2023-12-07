<script setup>
import { watch, computed, ref } from 'vue'
import { VList, VListItem, VListItemAction, VBtn, VMenu, VIcon, VSheet, VSpacer, VDivider, VRow, VListSubheader } from 'vuetify/components'
import { isSection, clone } from '@json-layout/core'
import Node from '../node.vue'
import { moveArrayItem } from '../../utils/arrays.js'
import useDnd from '../../composables/use-dnd.js'

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

/* use composable for drag and drop */
const { activeDnd, sortableArray, draggable, itemBind, handleBind } = useDnd(props.modelValue.children, () => {
  props.statefulLayout.input(props.modelValue, sortableArray.value.map((child) => child.data))
})
watch(() => props.modelValue.children, (array) => { sortableArray.value = array })

/* manage hovered and edited items */
const editedItem = computed(() => {
  return props.statefulLayout.activeItems[props.modelValue.fullKey]
})
const hoveredItem = ref(1)
const activeItem = computed(() => {
  if (
    props.modelValue.layout.listActions.includes('edit') &&
    props.modelValue.layout.listEditMode === 'inline-single' &&
    editedItem.value !== undefined
  ) {
    return editedItem.value
  }
  return hoveredItem.value
})

const buttonDensity = computed(() => {
  if (props.modelValue.options.density === 'default') return 'comfortable'
  return props.modelValue.options.density
})

</script>

<template>
  <v-sheet :elevation="1">
    <v-list :density="modelValue.options.density">
      <v-list-subheader v-if="modelValue.layout.title">
        {{ modelValue.layout.title }}
      </v-list-subheader>
      <template
        v-for="(child, childIndex) of sortableArray"
        :key="props.modelValue.children.findIndex(c => c === child)"
      >
        <v-list-item
          v-bind="itemBind(childIndex)"
          :density="modelValue.options.density"
          :draggable="draggable === childIndex"
          :variant="editedItem === childIndex ? 'outlined' : 'flat'"
          class="pa-1 vjsf-list-item"
          @mouseenter="hoveredItem = childIndex"
          @mouseleave="hoveredItem = -1"
        >
          <v-row class="ma-0">
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
          <template
            v-if="activeItem === childIndex"
            #append
          >
            <div>
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
                  :title="modelValue.messages.edit"
                  icon="mdi-pencil"
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
                <v-menu location="bottom end">
                  <template #activator="{props: activatorProps}">
                    <v-btn
                      v-bind="activatorProps"
                      icon="mdi-dots-vertical"
                      variant="plain"
                      slim
                      :density="buttonDensity"
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

<style>
.vjsf-list-item .v-list-item__append {
  height: 100%;
  align-items: start;
}
</style>
