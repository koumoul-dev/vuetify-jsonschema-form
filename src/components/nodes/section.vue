<script setup lang="ts">
import { SectionNode, StatefulLayout } from '@json-layout/core'
import Node from '../node.vue'

defineProps<{ modelValue: SectionNode, statefulLayout: StatefulLayout }>()

</script>

<template>
  <component
    :is="`h${modelValue.options.sectionDepth}`"
    v-if="modelValue.layout.title"
    :class="`text-h${modelValue.options.sectionDepth}`"
  >
    {{ modelValue.layout.title }}
  </component>
  <v-row>
    <node
      v-for="child of modelValue.children"
      :key="child.fullKey"
      :model-value="child"
      :stateful-layout="statefulLayout"
    />
  </v-row>
</template>
