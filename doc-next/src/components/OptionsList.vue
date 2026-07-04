<template>
  <v-card variant="flat">
    <v-list :lines="false">
      <v-divider />
      <template v-for="option in options" :key="option.key">
        <v-list-item class="my-2 px-2">
          <v-list-item-title class="d-flex align-center flex-wrap ga-2">
            <code class="font-weight-bold">{{ option.key }}</code>
            <v-chip v-if="option.default !== undefined" size="small" variant="tonal">
              default: {{ formatDefault(option.default) }}
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle class="my-2">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="option.description" />
          </v-list-item-subtitle>
          <v-table v-if="option.values" density="compact" class="option-values">
            <tbody>
              <tr v-for="(meaning, value) in option.values" :key="value">
                <td class="font-weight-medium text-no-wrap">{{ value }}</td>
                <td>{{ meaning }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { compileOptions, runtimeOptions } from '../doc-options'

const props = defineProps<{ type: 'compile' | 'runtime' }>()

const options = computed(() => props.type === 'compile' ? compileOptions : runtimeOptions)

function formatDefault (value: unknown): string {
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}
</script>

<style scoped>
.option-values {
  max-width: 640px;
}
</style>
