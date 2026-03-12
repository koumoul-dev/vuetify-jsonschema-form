<script setup>
import { computed, shallowRef, watch } from 'vue'

import { compile, produceCompileOptions } from '@json-layout/core/compile'
import { WebMCP } from '@json-layout/core/webmcp'
import Tree from './tree.vue'
import { useVjsf, emits } from '../composables/use-vjsf.js'
import '../styles/vjsf.css'
import { nodeComponents } from './nodes/index.js'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  precompiledLayout: {
    /** @type import('vue').PropType<import('@json-layout/core').CompiledLayout> */
    type: Object,
    default: null
  },
  modelValue: {
    type: null,
    default: null
  },
  options: {
    /** @type import('vue').PropType<import('../types.js').PartialVjsfOptions | null> */
    type: Object,
    default: null
  },
  prefixName: {
    type: String,
    default: null
  },
  dataTitle: {
    type: String,
    default: null
  }
})

const emit = defineEmits(emits)

const { el, statefulLayout, stateTree } = useVjsf(
  computed(() => props.schema),
  computed(() => props.modelValue),
  computed(() => props.options),
  nodeComponents,
  emit,
  compile,
  produceCompileOptions,
  computed(() => props.precompiledLayout)
)

/** @type import('vue').ShallowRef<WebMCP | null> */
const webMCP = shallowRef(null)
watch(statefulLayout, () => {
  if (webMCP.value) webMCP.value.unregisterTools()
  if (statefulLayout.value) {
    webMCP.value = new WebMCP(
      /** @type {import('@json-layout/core').StatefulLayout} */(/** @type {unknown} */(statefulLayout.value)),
      { prefixName: props.prefixName, dataTitle: props.dataTitle }
    )
    webMCP.value.registerTools()
  }
}, { immediate: true })

</script>

<template>
  <div
    ref="el"
    class="vjsf"
  >
    <tree
      v-if="statefulLayout && stateTree"
      :model-value="stateTree"
      :stateful-layout="statefulLayout"
    />
  </div>
</template>

<style lang="css">
/* nothing here, use ../styles/vjsf.css */
</style>
