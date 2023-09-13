<script setup lang="ts">
import { VTabs, VTab, VContainer } from 'vuetify/components'
import { ref } from 'vue'
import { TabsNode, StatefulLayout, isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionTitle from '../fragments/section-title.vue'

defineProps<{ modelValue: TabsNode, statefulLayout: StatefulLayout }>()

const tab = ref<number | null>(0)
</script>

<template>
  <section-title :node="modelValue" />
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
