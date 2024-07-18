<script setup>
import { VTabs, VTab, VContainer, VSheet, VWindow, VWindowItem, VRow, VIcon } from 'vuetify/components'
import { useDefaults } from 'vuetify'
import { ref } from 'vue'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import ChildSubtitle from '../fragments/child-subtitle.vue'
import useCompDefaults from '../../composables/use-comp-defaults.js'

useDefaults({}, 'VjsfTabs')
const vSheetProps = useCompDefaults('VjsfTabs-VSheet', { border: true })

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfTabsNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const tab = ref(0)
</script>

<template>
  <section-header :node="modelValue" />
  <v-sheet v-bind="vSheetProps">
    <v-tabs
      v-model="tab"
      direction="horizontal"
    >
      <v-tab
        v-for="(child, i) of modelValue.children"
        :key="child.key"
        :value="i"
        :color="child.validated && (child.error || child.childError) ? 'error' : undefined"
      >
        <v-icon
          v-if="child.validated && (child.error || child.childError)"
          color="error"
        >
          mdi-alert
        </v-icon>
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
          <child-subtitle :model-value="child" />
          <v-row :dense="modelValue.options?.density === 'compact' || modelValue.options?.density === 'comfortable'">
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>
