<script setup>
import { VList, VListItem, VBtn } from 'vuetify/components'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import clone from '../../utils/clone.js'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').ListNode> */
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
  <v-list
    :density="/** @type import('../types.js').VjsfOptions */(modelValue.options).density"
  >
    <v-list-subheader v-if="modelValue.layout.title">
      {{ modelValue.layout.title }}
    </v-list-subheader>
    <v-list-item
      v-for="child of modelValue.children"
      :key="child.key"
    >
      <v-row>
        <node
          v-for="grandChild of isSection(child) ? child.children : [child]"
          :key="grandChild.fullKey"
          :model-value="grandChild"
          :stateful-layout="statefulLayout"
        />
      </v-row>
      <template #append>
        <v-btn
          icon="mdi-dots-vertical"
          variant="text"
        />
      </template>
    </v-list-item>
    <v-list-item v-if="!modelValue.options.readOnly && modelValue.layout.listActions.includes('add')">
      <v-btn
        color="primary"
        icon="mdi-plus"
        @click="statefulLayout.input(modelValue, (modelValue.data || []).concat([clone(modelValue.skeleton.childrenTrees?.[0]?.root.defaultData)]))"
      />
    </v-list-item>
  </v-list>
</template>
