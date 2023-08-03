<script setup lang="ts">
import { compile, StatefulLayout } from '@json-layout/core'
import Tree from './tree.vue'
import { watch } from 'vue'

const props = defineProps<{ schema: object, modelValue: unknown, mode?: 'read' | 'write' }>()
const emit = defineEmits(['update:modelValue', 'update:state'])

const compiledLayout = compile(props.schema)
const statefulLayout = new StatefulLayout(compiledLayout, compiledLayout.tree, props.mode ?? 'write', 1000, props.modelValue)

statefulLayout.events.on('update', (newValue: StatefulLayout) => {
  emit('update:modelValue', newValue.value)
  emit('update:state', newValue)
})
emit('update:state', statefulLayout)

watch(() => props.mode, (mode) => {
  statefulLayout.mode = props.mode ?? 'write'
})
</script>

<template>
  <tree
    :model-value="statefulLayout"
  />
</template>
