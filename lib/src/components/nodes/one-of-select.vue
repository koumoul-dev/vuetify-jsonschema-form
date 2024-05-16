<script setup>
import { VSelect, VRow } from 'vuetify/components'
import { shallowRef, watch, computed, h } from 'vue'
import { isSection } from '@json-layout/core'
import { getInputProps, getCompSlots } from '../../utils/index.js'
import Node from '../node.vue'

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfOneOfSelectNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

/** @type import('vue').ShallowRef<import('@json-layout/core').SkeletonTree | undefined> */
const activeChildTree = shallowRef(undefined)
watch(() => props.modelValue, () => {
  // we set the active oneOf child as the one whose schema validates on the current data
  if (props.modelValue.fullKey in props.statefulLayout.activeItems) {
    activeChildTree.value = props.modelValue.skeleton.childrenTrees?.[props.statefulLayout.activeItems[props.modelValue.fullKey]]
  } else {
    activeChildTree.value = undefined
  }
}, { immediate: true })

const onChange = (/** @type import('@json-layout/core').SkeletonTree */childTree) => {
  if (!props.modelValue.skeleton.childrenTrees) return
  props.statefulLayout.activateItem(props.modelValue, props.modelValue.skeleton.childrenTrees.indexOf(childTree))
}

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
  fieldProps.modelValue = activeChildTree.value
  fieldProps['onUpdate:modelValue'] = onChange
  fieldProps.returnObject = true
  fieldProps.items = props.modelValue.skeleton.childrenTrees
  fieldProps.itemTitle = 'title'
  return fieldProps
})
</script>

<template>
  <v-select
    v-if="modelValue.skeleton.childrenTrees"
    v-bind="fieldProps"
  />
  <v-row v-if="modelValue.children?.[0]">
    <node
      v-for="grandChild of isSection(modelValue.children?.[0]) ? modelValue.children?.[0].children : modelValue.children"
      :key="grandChild.fullKey"
      :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
      :stateful-layout="statefulLayout"
    />
  </v-row>
</template>
