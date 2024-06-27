<script setup>
import { VSelect, VRow, VCol } from 'vuetify/components'
import { ref, watch, computed, h } from 'vue'
import { isSection } from '@json-layout/core'
import { isCompObject } from '@json-layout/vocabulary'
import { getInputProps } from '../../utils/index.js'
import Node from '../node.vue'
import { useDefaults } from 'vuetify'

useDefaults({}, 'VjsfOneOfSelect')

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

/** @type import('vue').Ref<string | undefined> */
const activeChildTree = ref(undefined)
watch(() => props.modelValue, () => {
  if (props.modelValue.children?.length === 1) {
    if (typeof props.modelValue.children[0].key === 'number') {
      activeChildTree.value = props.modelValue.skeleton.childrenTrees?.[props.modelValue.children[0].key]
    }
  } else {
    activeChildTree.value = undefined
  }
}, { immediate: true })

const onChange = (/** @type {string} */childTree) => {
  if (!props.modelValue.skeleton.childrenTrees) return
  props.statefulLayout.activateItem(props.modelValue, props.modelValue.skeleton.childrenTrees.indexOf(childTree))
}

const fieldProps = computed(() => {
  const fieldProps = getInputProps(props.modelValue, props.statefulLayout)
  fieldProps.modelValue = activeChildTree.value
  fieldProps['onUpdate:modelValue'] = onChange
  const items = []
  for (const childTreePointer of props.modelValue.skeleton.childrenTrees || []) {
    const childTree = props.statefulLayout.compiledLayout.skeletonTrees[childTreePointer]
    const childLayout = props.statefulLayout.compiledLayout.normalizedLayouts[childTree.root]
    if (!isCompObject(childLayout) || !childLayout.if || !!props.statefulLayout.evalNodeExpression(props.modelValue, childLayout.if, props.modelValue.data)) {
      items.push(childTree)
    }
  }
  fieldProps.items = items
  fieldProps.itemTitle = 'title'
  fieldProps.itemValue = (/** @type {import('@json-layout/core').SkeletonTree} */childTree) => childTree.root
  return fieldProps
})
</script>

<template>
  <v-row>
    <v-col v-if="modelValue.skeleton.childrenTrees">
      <v-select
        v-bind="fieldProps"
      />
    </v-col>
    <template v-if="modelValue.children?.[0]">
      <node
        v-for="grandChild of isSection(modelValue.children?.[0]) ? modelValue.children?.[0].children : modelValue.children"
        :key="grandChild.fullKey"
        :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
        :stateful-layout="statefulLayout"
      />
    </template>
  </v-row>
</template>
