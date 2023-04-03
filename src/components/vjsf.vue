<script setup lang="ts">
// compile and init layout state then render vjsf-node on root node
import {compile} from '@json-layout/core'

defineProps<{ schema?: object }>()

</script>

<template>
  <vjsf-node />
</template>
