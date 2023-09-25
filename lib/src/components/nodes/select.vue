<script setup lang="ts">
import { StatefulLayout, SelectNode, StateTree } from '@json-layout/core'
import { VSelect } from 'vuetify/components'
import { computed, ref } from 'vue'
import { getInputProps } from '../../utils/props.js'
import { SelectItems } from '@json-layout/vocabulary'

const props = defineProps<{ modelValue: SelectNode, statefulLayout: StatefulLayout }>()

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue)
  if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
  return fieldProps
})

const items = ref<SelectItems>(props.modelValue.layout.items ?? [])
const loading = ref<boolean>(false)

let lastStateTree: StateTree | null = null
let lastContext: Record<string, any> | null = null

const refresh = async () => {
  if (props.modelValue.layout.items) return
  if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext) return
  lastStateTree = props.statefulLayout.stateTree
  lastContext = props.statefulLayout.options.context ?? null
  loading.value = true
  items.value = await props.statefulLayout.getSelectItems(props.modelValue)
  loading.value = false
}

if (!props.modelValue.layout.items) {
  refresh()
}

</script>

<template>
  <v-select
    v-bind="fieldProps"
    :loading="loading"
    :items="items"
    @update:model-value="value => statefulLayout.input(modelValue, value)"
    @update:menu="refresh"
  />
</template>
