<script setup>
import { VCard } from 'vuetify/components/VCard'
import { VContainer, VRow } from 'vuetify/components/VGrid'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfCard')

defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfCardNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

</script>

<template>
  <v-card :title="modelValue.layout.title || undefined">
    <v-container fluid>
      <section-header
        :node="modelValue"
        hide-title
      />
      <v-row :dense="modelValue.options?.density === 'compact' || modelValue.options?.density === 'comfortable'">
        <node
          v-for="child of modelValue.children"
          :key="child.fullKey"
          :model-value="/** @type import('../../types.js').VjsfNode */(child)"
          :stateful-layout="statefulLayout"
        />
      </v-row>
    </v-container>
  </v-card>
</template>
