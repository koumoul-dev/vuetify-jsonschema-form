<script setup lang="ts">
import { compile, StatefulLayout } from '@json-layout/core'
import Tree from './tree.vue'
import { ref, computed, getCurrentInstance } from 'vue'

import NodeSection from './nodes/section.vue'
import NodeTextField from './nodes/text-field.vue'
import NodeNumberField from './nodes/number-field.vue'
import NodeOneOfSelect from './nodes/one-of-select.vue'

const comps = {
  Section: NodeSection,
  TextField: NodeTextField,
  NumberField: NodeNumberField,
  OneOfSelect: NodeOneOfSelect
}

const instance = getCurrentInstance()
for (const [name, comp] of Object.entries(comps)) {
  if (!instance?.appContext.app.component(`VjsfNode${name}`)) {
    instance?.appContext.app.component(`VjsfNode${name}`, comp)
  }
}

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
