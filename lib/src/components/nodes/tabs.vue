<script setup>
import { VTabs, VTab, VContainer } from 'vuetify/components'
import { ref } from 'vue'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').TabsNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const tab = ref(0)
</script>

<template>
  <section-header :node="modelValue" />
  <v-sheet border>
    <v-tabs v-model="tab">
      <v-tab
        v-for="(child, i) of modelValue.children"
        :key="child.key"
        :value="i"
      >
        {{ child.layout.title ?? child.layout.label }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="(child, i) of modelValue.children"
        :key="child.key"
        :value="i"
      >
        <v-container fluid>
          <v-row>
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="grandChild"
              :stateful-layout="statefulLayout"
            />
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
