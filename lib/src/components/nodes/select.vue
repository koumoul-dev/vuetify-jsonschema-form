<script setup>
import { VSelect } from 'vuetify/components'
import { computed, ref, shallowRef } from 'vue'
import { getInputProps } from '../../utils/props.js'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../types.js').VjsfSelectNode> */
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
  const fieldProps = getInputProps(props.modelValue, props.statefulLayout, ['multiple'])
  if (props.modelValue.options.readOnly) fieldProps.menuProps = { modelValue: false }
  return fieldProps
})

/** @type import('vue').Ref<import('@json-layout/vocabulary').SelectItems> */
const items = shallowRef([])
/** @type import('vue').Ref<boolean> */
const loading = ref(false)

/** @type import('@json-layout/core').StateTree | null */
let lastStateTree = null
/** @type Record<string, any> | null */
let lastContext = null

const refresh = async () => {
  if (props.statefulLayout.stateTree === lastStateTree && props.statefulLayout.options.context === lastContext) return
  lastStateTree = props.statefulLayout.stateTree
  lastContext = props.statefulLayout.options.context ?? null
  loading.value = true
  items.value = await props.statefulLayout.getItems(props.modelValue)
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
    @update:menu="refresh"
  />
</template>
