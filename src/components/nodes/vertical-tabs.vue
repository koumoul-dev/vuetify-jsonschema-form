<script setup lang="ts">
import { VerticalTabsNode, StatefulLayout, isSection } from '@json-layout/core'
import Node from '../node.vue'
import { VTabs, VTab, VContainer } from 'vuetify/components'
import { ref } from 'vue'

defineProps<{ modelValue: VerticalTabsNode, statefulLayout: StatefulLayout }>()

const tab = ref<number | null>(0)
</script>

<template>
  <v-sheet border>
    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        direction="vertical"
      >
        <v-tab
          v-for="(child, i) of modelValue.children"
          :key="child.key"
          :value="i"
        >
          {{ child.layout.title ?? child.layout.label }}
        </v-tab>
      </v-tabs>
      <v-window
        v-model="tab"
        class="flex-fill"
      >
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
    </div>
  </v-sheet>
</template>
