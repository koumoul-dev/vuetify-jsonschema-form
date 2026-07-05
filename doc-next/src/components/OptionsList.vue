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
          <template v-if="option.values">
            <!-- long catalogues of defaults (messages, icons) fold away so
            they don't dwarf the rest of the list -->
            <v-expansion-panels v-if="Object.keys(option.values).length > COLLAPSE_AFTER" density="compact" static flat rounded style="max-width: 640px">
              <v-expansion-panel :title="`${option.valuesTitle ?? 'Values'} (${Object.keys(option.values).length})`">
                <v-expansion-panel-text>
                  <OptionValuesTable :option="option" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <OptionValuesTable v-else :option="option" />
          </template>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { compileOptions, runtimeOptions } from '../doc-options'
import OptionValuesTable from './OptionValuesTable.vue'

const props = defineProps<{ type: 'compile' | 'runtime' }>()

// Enum-like values tables (2-3 rows) stay inline; anything past this is a
// catalogue of defaults and collapses.
const COLLAPSE_AFTER = 8

const options = computed(() => props.type === 'compile' ? compileOptions : runtimeOptions)

function formatDefault (value: unknown): string {
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}
</script>
