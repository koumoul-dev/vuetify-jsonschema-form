<script setup>
import { VRow, VCol } from 'vuetify/components/VGrid'
import { VSelect } from 'vuetify/components/VSelect'
import { ref, watch, computed, toRef } from 'vue'
import { isSection } from '@json-layout/core/state'
import { isCompObject, isOneOfItemHeader, isOneOfItemChild } from '@json-layout/vocabulary'
import useNode from '../../composables/use-node.js'
import useZIndexStack from '../../composables/use-z-index-stack.js'
import Node from '../node.vue'
import { useDefaults } from 'vuetify'
import { VListSubheader, VListItem } from 'vuetify/components/VList'
import VSelectItemIcon from '../fragments/select-item-icon.vue'
import useCompDefaults from '../../composables/use-comp-defaults.js'

useDefaults({}, 'VjsfOneOfSelect')
const avatarProps = useCompDefaults('VjsfOneOfSelect-VAvatar', { rounded: false, size: 'small' })

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
const zIndex = useZIndexStack(props.modelValue.fullKey)

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
  if (!props.modelValue.options.readOnly) {
    fieldProps.menuProps = { zIndex }
  }
  const items = []
  for (const oneOfItem of props.modelValue.layout.oneOfItems) {
    if (isOneOfItemHeader(oneOfItem)) {
      items.push(oneOfItem)
    } else if (isOneOfItemChild(oneOfItem)) {
      const childTreePointer = (skeleton.value.childrenTrees || [])[oneOfItem.key]
      const childTree = props.statefulLayout.compiledLayout.skeletonTrees[childTreePointer]
      const childLayout = props.statefulLayout.compiledLayout.normalizedLayouts[childTree.root]
      if (!isCompObject(childLayout) || !childLayout.if || !!props.statefulLayout.evalNodeExpression(props.modelValue, childLayout.if, localData.value)) {
        items.push({ ...oneOfItem, value: childTree })
      }
    }
  }
  fieldProps.items = items
  fieldProps.itemValue = (/** @type {{value: import('@json-layout/core').SkeletonTree}} */item) => {
    return item.value?.root
  }
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
      >
        <template #item="context">
          <v-list-subheader v-if="context.item.raw.header">
            <v-select-item-icon
              v-if="typeof context.item.raw.icon === 'string'"
              :icon="context.item.raw.icon"
              :avatar-props="avatarProps"
            />
            {{ context.item.raw.title }}
          </v-list-subheader>
          <v-list-item
            v-else
            v-bind="context.props"
          >
            <template
              v-if="context.item.raw.icon"
              #prepend
            >
              <v-select-item-icon
                v-if="typeof context.item.raw.icon === 'string'"
                :icon="context.item.raw.icon"
                :avatar-props="avatarProps"
              />
            </template>
          </v-list-item>
        </template>
      </v-select>
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
