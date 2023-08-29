<script setup lang="ts">
import { compile, StatefulLayout } from '@json-layout/core'
import Tree from './tree.vue'
import { ref, computed, getCurrentInstance } from 'vue'

import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeNumberField from './nodes/number-field.vue'
import OneOfSelect from './nodes/one-of-select.vue'

const instance = getCurrentInstance()
instance?.appContext.app.component('vjsf-node-section', NodeSection)
instance?.appContext.app.component('vjsf-node-text-field', NodeTextField)
instance?.appContext.app.component('vjsf-node-number-field', NodeNumberField)
instance?.appContext.app.component('vjsf-node-one-of-select', OneOfSelect)

const props = defineProps<{ schema: object, modelValue: unknown, mode?: 'read' | 'write' }>()
const emit = defineEmits(['update:modelValue', 'update:state'])

const compiledLayout = computed(() => compile(props.schema))
const statefulLayout = new StatefulLayout(compiledLayout.value, compiledLayout.value.skeletonTree, { mode: props.mode ?? 'write', width: 1000 }, props.modelValue)

const stateTree = ref(statefulLayout.stateTree)

statefulLayout.events.on('update', (newValue: StatefulLayout) => {
  stateTree.value = newValue.stateTree
  emit('update:modelValue', newValue.data)
  emit('update:state', newValue)
})
emit('update:state', statefulLayout)

</script>

<template>
  <tree
    :model-value="stateTree"
    :stateful-layout="statefulLayout"
  />
</template>
