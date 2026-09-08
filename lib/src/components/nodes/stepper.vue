<script setup>
import { computed } from 'vue'
import { VStepper, VStepperHeader, VStepperItem, VStepperWindow, VStepperWindowItem, VStepperActions } from 'vuetify/components/VStepper'
import { VContainer, VRow, VSpacer } from 'vuetify/components/VGrid'
import { VBtn } from 'vuetify/components/VBtn'
import { VDivider } from 'vuetify/components/VDivider'
import { isSection } from '@json-layout/core/state'
import Node from '../node.vue'
import SectionHeader from '../fragments/section-header.vue'
import ChildSubtitle from '../fragments/child-subtitle.vue'
import { useDefaults } from 'vuetify'
import { useVisibleChildren, useActiveChildIndex } from '../../composables/use-visible-children.js'

useDefaults({}, 'VjsfStepper')

const props = defineProps({
  modelValue: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStepperNode> */
    type: Object,
    required: true
  },
  statefulLayout: {
    /** @type import('vue').PropType<import('../../types.js').VjsfStatefulLayout> */
    type: Object,
    required: true
  }
})

const nodeProps = computed(() => {
  const nodeProps = { ...props.modelValue.props }
  // the current step is managed locally, a modelValue in layout.props is only an initial value
  delete nodeProps.modelValue
  return nodeProps
})

const visibleChildren = useVisibleChildren(() => props.modelValue.children)
const step = useActiveChildIndex(visibleChildren, props.modelValue.props?.modelValue)

const previousStep = computed(() => visibleChildren.value.filter(({ index }) => index < /** @type {number} */(step.value)).pop()?.index)
const nextStep = computed(() => visibleChildren.value.find(({ index }) => index > /** @type {number} */(step.value))?.index)

const firstErrorIndex = computed(() => {
  const index = props.modelValue.children.findIndex(child => child.validated && !!(child.error || child.childError))
  return index === -1 ? props.modelValue.children.length : index
})

const goNext = () => {
  const child = props.modelValue.children[/** @type {number} */(step.value)]
  props.statefulLayout.validateNodeRecurse(child)
  if (!(child.error || child.childError)) step.value = nextStep.value
}
</script>

<template>
  <section-header :node="modelValue" />
  <v-stepper
    v-model="step"
    v-bind="nodeProps"
  >
    <v-stepper-header>
      <template
        v-for="{ child, index } of visibleChildren"
        :key="child.key"
      >
        <v-stepper-item
          :value="index"
          :title="/** @type {string | undefined} */(child.layout.title ?? child.layout.label)"
          :error="child.validated && !!(child.error || child.childError)"
          :complete="child.validated && !(child.error || child.childError)"
          :editable="index <= firstErrorIndex"
        />
        <v-divider />
      </template>
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item
        v-for="{ child, index } of visibleChildren"
        :key="child.key"
        :value="index"
      >
        <v-container
          fluid
          class="pa-0"
        >
          <child-subtitle :model-value="child" />
          <v-row>
            <node
              v-for="grandChild of isSection(child) ? child.children : [child]"
              :key="grandChild.fullKey"
              :model-value="/** @type import('../../types.js').VjsfNode */(grandChild)"
              :stateful-layout="statefulLayout"
            />
          </v-row>
        </v-container>
      </v-stepper-window-item>
    </v-stepper-window>
    <v-stepper-actions>
      <template #prev>
        <v-btn
          v-if="previousStep !== undefined"
          variant="text"
          @click="step = previousStep"
        >
          Back
        </v-btn>
      </template>
      <template #next>
        <v-spacer />
        <v-btn
          v-if="nextStep !== undefined"
          variant="flat"
          color="primary"
          @click="goNext"
        >
          Next
        </v-btn>
      </template>
    </v-stepper-actions>
  </v-stepper>
</template>
