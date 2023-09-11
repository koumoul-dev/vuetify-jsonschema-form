<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'

defineProps<{ modelValue: SectionNode, statefulLayout: StatefulLayout }>()

</script>

<template>
  <v-row>
    <node
      v-for="child of modelValue.children"
      :key="child.fullKey"
      :model-value="child"
      :stateful-layout="statefulLayout"
    />
  </v-row>
</template>
