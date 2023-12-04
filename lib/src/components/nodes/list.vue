<script setup>
import { VList, VListItem, VListItemAction, VBtn, VMenu, VIcon } from 'vuetify/components'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import clone from '../../utils/clone.js'

defineProps({
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
        <node
          v-for="grandChild of isSection(child) ? child.children : [child]"
          :key="grandChild.fullKey"
          :model-value="/** @type import('../types.js').VjsfNode */(grandChild)"
          :stateful-layout="statefulLayout"
        />
      </v-row>
      <template #append>
        <v-list-item-action
          v-if="modelValue.layout.listActions.includes('edit') && modelValue.layout.listEditMode === 'inline-single'"
          class="ml-1"
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
          v-if="modelValue.layout.listActions.includes('delete') || modelValue.layout.listActions.includes('duplicate')"
          class="ml-1"
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
            </v-list>
          </v-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item v-if="!modelValue.options.readOnly && modelValue.layout.listActions.includes('add')">
      <v-btn
        color="primary"
        :density="modelValue.options.density"
        @click="statefulLayout.input(modelValue, (modelValue.data ?? []).concat([undefined]))"
      >
        {{ modelValue.messages.addItem }}
      </v-btn>
    </v-list-item>
  </v-list>
</template>
