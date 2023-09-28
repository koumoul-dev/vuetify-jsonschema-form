<script setup lang="ts">
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VContainer } from 'vuetify/components'
import { ExpansionPanelsNode, StatefulLayout, isSection } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'

defineProps<{ modelValue: ExpansionPanelsNode, statefulLayout: StatefulLayout }>()

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
        {{ child.layout.title ?? child.layout.label }}
      </v-expansion-panel-title>
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
    </v-expansion-panel>
  </v-expansion-panels>
</template>
