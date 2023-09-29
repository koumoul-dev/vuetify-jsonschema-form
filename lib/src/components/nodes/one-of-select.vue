<script setup>
import { StatefulLayout } from '@json-layout/core'
import { VSelect } from 'vuetify/components'
import Tree from '../tree.vue'
import { ref, watch } from 'vue'
import debug from 'debug'

const log = debug('vjsf:oneOf')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('@json-layout/core').OneOfSelectNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').StatefulLayout> */
    type: Object,
    required: true
  }
})

/** @type import('vue').Ref<StatefulLayout | null> */
const childStatefulLayout = ref(null)

const createStatefulLayout = () => {
  log('create child statefulLayout')
  if (activeChildTree.value) {
    childStatefulLayout.value = new StatefulLayout(
      props.statefulLayout.compiledLayout,
      activeChildTree.value,
      // TODO: width should come from current node not global layout
      props.modelValue.options,
      props.modelValue.data
    )
    childStatefulLayout.value.events.on('update', (newValue) => {
      if (newValue.stateTree.valid) {
        log('bubble data from active child to parent state')
        props.statefulLayout.input(props.modelValue, newValue.data)
      }
    })
  } else {
    childStatefulLayout.value = null
  }
}

const updateStatefulLayout = () => {
  if (!childStatefulLayout.value) return
  childStatefulLayout.value.options = props.modelValue.options
  childStatefulLayout.value.data = props.modelValue.data
}

/** @type import('vue').Ref<import('@json-layout/core').SkeletonTree | null> */
const activeChildTree = ref(null)
watch(() => props.modelValue, () => {
  // we set the active oneOf child as the one whose schema validates on the current data
  activeChildTree.value = props.modelValue.skeleton.childrenTrees?.find((childTree) => {
    return props.statefulLayout.compiledLayout.validates[childTree.root.pointer](props.modelValue.data)
  }) ?? null
  if (childStatefulLayout.value && activeChildTree.value === childStatefulLayout.value.skeletonTree) {
    log('update child statefulLayout')
    updateStatefulLayout()
  }
})
watch(activeChildTree, () => {
  log('active child tree changed', activeChildTree.value)
  createStatefulLayout()
})

</script>

<template>
  <v-select
    v-model="activeChildTree"
    :items="modelValue.skeleton.childrenTrees"
    item-title="title"
    return-object
  />
  <tree
    v-if="childStatefulLayout"
    :stateful-layout="childStatefulLayout"
    :model-value="childStatefulLayout.stateTree"
  />
</template>
