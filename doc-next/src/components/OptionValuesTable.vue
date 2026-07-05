<template>
  <v-table density="compact" class="option-values border rounded">
    <thead>
      <tr>
        <th>{{ headers[0] }}</th>
        <th>{{ headers[1] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(meaning, value) in option.values" :key="value">
        <td class="font-weight-medium text-no-wrap">{{ value }}</td>
        <td>{{ meaning }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DocOption } from '../doc-options'

const props = defineProps<{ option: DocOption }>()

// Most values tables map an accepted value to its meaning; catalogues of
// defaults (messages, icons) override the headers from doc-options.ts.
const headers = computed(() => props.option.valuesHeaders ?? ['Value', 'Description'])
</script>

<style scoped>
.option-values {
  max-width: 640px;
}
</style>
