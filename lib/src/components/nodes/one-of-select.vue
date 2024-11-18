<script setup>
import { VRow, VCol } from 'vuetify/components/VGrid'
import { VSelect } from 'vuetify/components/VSelect'
import { ref, watch, computed, toRef } from 'vue'
import { isSection } from '@json-layout/core'
import { isCompObject } from '@json-layout/vocabulary'
import useNode from '../../composables/use-node.js'
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

const { inputProps, localData, skeleton, children } = useNode(
  toRef(props, 'modelValue'), props.statefulLayout, { bindData: false }
)

/** @type import('vue').Ref<string | undefined> */
const activeChildTree = ref(undefined)
watch(() => children.value?.[0]?.key, () => {
  if (props.modelValue.children?.length === 1) {
    if (typeof props.modelValue.children[0].key === 'number') {
      activeChildTree.value = skeleton.value.childrenTrees?.[props.modelValue.children[0].key]
    }
  } else {
    activeChildTree.value = undefined
  }
}, { immediate: true })

const onChange = (/** @type {string} */childTree) => {
  if (!skeleton.value.childrenTrees) return
  props.statefulLayout.activateItem(props.modelValue, skeleton.value.childrenTrees.indexOf(childTree))
}

const fieldProps = computed(() => {
  const fieldProps = { ...inputProps.value }
  fieldProps['onUpdate:modelValue'] = onChange
  const items = []
  for (const childTreePointer of skeleton.value.childrenTrees || []) {
    const childTree = props.statefulLayout.compiledLayout.skeletonTrees[childTreePointer]
    const childLayout = props.statefulLayout.compiledLayout.normalizedLayouts[childTree.root]
    if (!isCompObject(childLayout) || !childLayout.if || !!props.statefulLayout.evalNodeExpression(props.modelValue, childLayout.if, localData.value)) {
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
    <v-col
      v-if="modelValue.skeleton.childrenTrees"
      cols="12"
    >
      <v-select
        v-bind="fieldProps"
        :model-value="activeChildTree"
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
