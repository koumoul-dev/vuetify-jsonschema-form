<script setup>
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VContainer } from 'vuetify/components'
import { isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfExpansionPanelsNode> */
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
  <section-header :node="modelValue" />
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(child, i) of modelValue.children"
      :key="child.key"
      :value="i"
    >
      <v-expansion-panel-title>
        <v-icon
          v-if="child.validated && (child.error || child.childError)"
          color="error"
          class="mr-2"
        >
          mdi-alert
        </v-icon>
        {{ child.layout.title ?? child.layout.label }}
      </v-expansion-panel-title>
      <v-container fluid>
        <v-row>
          <node
            v-for="grandChild of isSection(child) ? child.children : [child]"
            :key="grandChild.fullKey"
            :model-value="/** @type import('../types.js').VjsfNode */(grandChild)"
            :stateful-layout="statefulLayout"
          />
        </v-row>
      </v-container>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
