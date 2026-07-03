<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
// `ClientOnly` is auto-registered globally by ViteSSG (see src/main.ts) — do
// not import it here.
import CodeEditor from '../components/CodeEditor.vue'
import EditorSandbox from '../components/EditorSandbox.vue'

// Reused verbatim by Plan 05's example "edit in playground" link, which
// seeds this same localStorage key before navigating to /editor.
const state = useStorage('vjsf-editor-state', {
  schema: { type: 'object', properties: { name: { type: 'string', title: 'Name' } } } as unknown,
  options: {} as Record<string, unknown>,
  data: {} as unknown,
  theme: 'dark' as 'light' | 'dark',
}, undefined, { mergeDefaults: true })

const schema = ref(state.value.schema)
const options = ref(state.value.options)
const data = ref(state.value.data)
// Falls back to 'dark' for any missing/invalid stored value (e.g. a partial
// object seeded by Plan 05's "edit example" link) instead of becoming
// `undefined`, which would make every render message fail the
// `isRenderMessage` guard in the sandbox and silently blank the preview.
const theme = ref<'light' | 'dark'>(state.value.theme === 'light' ? 'light' : 'dark')
const parseErrors = ref<Record<string, string | null>>({})
const validationErrors = ref<Record<string, string[]>>({})

watch([schema, options, data, theme], () => {
  state.value = { schema: schema.value, options: options.value, data: data.value, theme: theme.value }
}, { deep: true })

const tab = ref('schema')

const errorLines = computed(() => [
  ...Object.entries(parseErrors.value).filter(([, e]) => e).map(([k, e]) => `${k}: ${e}`),
  ...Object.entries(validationErrors.value).map(([k, msgs]) => `${k || 'form'}: ${msgs.join(', ')}`),
])
</script>

<template>
  <ClientOnly>
    <v-row no-gutters style="height: calc(100vh - 112px)">
      <v-col cols="12" md="6" class="d-flex flex-column pa-2 h-100">
        <v-tabs v-model="tab" density="compact">
          <v-tab value="schema">Schema</v-tab>
          <v-tab value="options">Options</v-tab>
          <v-tab value="data">Data</v-tab>
        </v-tabs>
        <v-window v-model="tab" class="flex-grow-1 overflow-y-auto">
          <v-window-item value="schema">
            <CodeEditor v-model="schema" language="yaml" @update:parse-error="e => parseErrors.schema = e" />
          </v-window-item>
          <v-window-item value="options">
            <CodeEditor v-model="options" language="yaml" @update:parse-error="e => parseErrors.options = e" />
          </v-window-item>
          <v-window-item value="data">
            <CodeEditor v-model="data" language="json" @update:parse-error="e => parseErrors.data = e" />
          </v-window-item>
        </v-window>
        <!-- `style="flex: none"`: v-alert defaults to a flex item that grows
        to fill leftover vertical space in this flex-column column, which
        stretches it to a huge empty block instead of its natural (short)
        content height. -->
        <v-alert
          v-if="errorLines.length"
          type="warning"
          density="compact"
          class="mt-2"
          style="flex: none"
        >
          <div v-for="line in errorLines" :key="line">{{ line }}</div>
        </v-alert>
      </v-col>
      <v-col cols="12" md="6" class="pa-2 h-100 d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn
            size="small"
            variant="text"
            :icon="theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
            :title="theme === 'dark' ? 'Switch to light preview' : 'Switch to dark preview'"
            @click="theme = theme === 'dark' ? 'light' : 'dark'"
          />
        </div>
        <EditorSandbox
          class="flex-grow-1"
          :schema="schema"
          :options="options"
          :data="data"
          :theme="theme"
          @update="d => data = d"
          @validation="errs => validationErrors = errs"
          @error="msg => validationErrors = { form: [msg] }"
        />
      </v-col>
    </v-row>
  </ClientOnly>
</template>
