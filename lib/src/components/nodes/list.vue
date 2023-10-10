<script setup>
import { shallowRef, watch } from 'vue'
import { VList, VListItem, VListItemAction, VBtn, VMenu, VIcon } from 'vuetify/components'
import { isSection, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'
import clone from '../../utils/clone.js'
import debug from 'debug'

const log = debug('vjsf:list')

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

/** @type import('vue').Ref<StatefulLayout | null> */
const childStatefulLayout = shallowRef(null)

const createStatefulLayout = () => {
  log('create child statefulLayout')
  if (childTree.value) {
    childStatefulLayout.value = new StatefulLayout(
      props.statefulLayout.compiledLayout,
      childTree.value,
      // TODO: width should come from current node not global layout
      props.modelValue.options,
      activeChildIndex.value === -1 ? props.modelValue.data[activeChildIndex.value] : null
    )
    childStatefulLayout.value.events.on('update', (newValue) => {
      if (newValue.stateTree.valid) {
        log('bubble data from active child to parent state')
        props.statefulLayout.input(props.modelValue.children[activeChildIndex.value], newValue.data)
      }
    })
  } else {
    childStatefulLayout.value = null
  }
}

const updateStatefulLayout = () => {
  if (!childStatefulLayout.value) return
  childStatefulLayout.value.options = props.modelValue.options
  childStatefulLayout.value.data = activeChildIndex.value === -1 ? props.modelValue.data[activeChildIndex.value] : null
}

/** @type import('vue').Ref<number> */
const activeChildIndex = shallowRef(-1)

/** @type import('vue').Ref<import('@json-layout/core').SkeletonTree | null> */
const childTree = shallowRef(null)

watch(() => props.modelValue, () => {
  // we set the active oneOf child as the one whose schema validates on the current data
  childTree.value = props.modelValue.skeleton.childrenTrees?.[0] ?? null
  if (childStatefulLayout.value && childTree.value === childStatefulLayout.value.skeletonTree) {
    log('update child statefulLayout')
    updateStatefulLayout()
  }
})

watch(childTree, () => {
  log('active child tree changed', childTree.value)
  createStatefulLayout()
})

</script>

<template>
  <v-list :density="modelValue.options.density">
    <v-list-subheader v-if="modelValue.layout.title">
      {{ modelValue.layout.title }}
    </v-list-subheader>
    <v-list-item
      v-for="(child, childIndex) of modelValue.children"
      :key="child.key"
    >
      <v-row>
        <tree
          v-if="childStatefulLayout && activeChildIndex === childIndex && modelValue.layout.listEditMode === 'inline'"
          :stateful-layout="childStatefulLayout"
          :model-value="childStatefulLayout.stateTree"
        />
        <node
          v-for="grandChild of isSection(child) ? child.children : [child]"
          v-else
          :key="grandChild.fullKey"
          :model-value="/** @type import('../types.js').VjsfNode */(grandChild)"
          :stateful-layout="statefulLayout"
        />
      </v-row>
      <template #append>
        <v-list-item-action
          v-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode !== 'inline'"
          class="ml-1"
        >
          <v-btn
            :title="modelValue.messages.edit"
            icon="mdi-pencil"
            variant="text"
            color="primary"
            :density="modelValue.options.density"
            @click="activeChildIndex = childIndex"
          />
        </v-list-item-action>
        <v-list-item-action
          v-if="modelValue.layout.listActions.includes('delete') || modelValue.layout.listActions.includes('duplicate')"
          class="ml-1"
        >
          <v-menu location="bottom end">
            <template #activator="{props: activatorProps}">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-dots-vertical"
                variant="text"
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
            </v-list>
          </v-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item v-if="!modelValue.options.readOnly && modelValue.layout.listActions.includes('add')">
      <v-btn
        color="primary"
        :density="modelValue.options.density"
        @click="statefulLayout.input(modelValue, (modelValue.data || []).concat([clone(modelValue.skeleton.childrenTrees?.[0]?.root.defaultData)]))"
      >
        {{ modelValue.messages.addItem }}
      </v-btn>
    </v-list-item>
  </v-list>
</template>
