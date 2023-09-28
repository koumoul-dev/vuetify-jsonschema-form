<script setup lang="ts">
import { VList, VListItem, VBtn } from 'vuetify/components'
import { ListNode, StatefulLayout, isSection } from '@json-layout/core'
import Node from '../node.vue'
import { VjsfOptions } from '../options.js'
import clone from '../../utils/clone.js'

defineProps<{ modelValue: ListNode, statefulLayout: StatefulLayout }>()
</script>

<template>
  <v-list
    :density="(modelValue.options as VjsfOptions).density"
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
