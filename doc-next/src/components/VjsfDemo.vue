<template>
  <VjsfExample :example="example" :layout-key="demo" :v2compat="v2compat" :expanded="expanded" :hide-data="hideData">
    <!-- forward page-defined slots down to the vjsf component -->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </VjsfExample>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VjsfExample from './VjsfExample.vue'
import { findDemo } from '../demos'

const props = defineProps<{ demo: string, expanded?: boolean, hideData?: boolean }>()
const example = computed(() => findDemo(props.demo).example)
const v2compat = computed(() => findDemo(props.demo).v2compat)
</script>
