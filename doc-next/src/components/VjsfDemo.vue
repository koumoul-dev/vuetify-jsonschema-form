<template>
  <VjsfExample :example="example" :layout-key="demo" :v2compat="v2compat" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VjsfExample from './VjsfExample.vue'
import { findDemo } from '../demos'

const props = defineProps<{ demo: string }>()
const example = computed(() => findDemo(props.demo).example)
const v2compat = computed(() => findDemo(props.demo).v2compat)
</script>
