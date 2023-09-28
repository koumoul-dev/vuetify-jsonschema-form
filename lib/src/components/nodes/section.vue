<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'

defineProps<{ modelValue: SectionNode, statefulLayout: StatefulLayout }>()

</script>

<template>
  <section-header :node="modelValue" />
  <v-row :dense="modelValue.options?.density === 'compact' || modelValue.options?.density === 'comfortable'">
    <node
      v-for="child of modelValue.children"
      :key="child.fullKey"
      :model-value="child"
      :stateful-layout="statefulLayout"
    />
  </v-row>
</template>
