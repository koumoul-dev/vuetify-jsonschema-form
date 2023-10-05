<script setup>
import { VSelect } from 'vuetify/components'
import { computed, ref } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').SelectNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
  if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
  return fieldProps
})

/** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
const items = ref(props.modelValue.layout.items ?? [])
/** @type import('vue').Ref<boolean> */
const loading = ref(false)

/** @type import('@json-layout/core').StateTree | null */
let lastStateTree = null
/** @type Record<string, any> | null */
let lastContext = null

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
