<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
// `ClientOnly` is auto-registered globally by ViteSSG (see src/main.ts) — do
// not import it here.
import CodeEditor from '../components/CodeEditor.vue'
import EditorSandbox from '../components/EditorSandbox.vue'

// Reused verbatim by the examples' "edit in playground" link, which seeds
// this same localStorage key before navigating to /editor.
const state = useStorage('vjsf-editor-state', {
  schema: { type: 'object', properties: { name: { type: 'string', title: 'Name' } } } as unknown,
  options: {} as Record<string, unknown>,
  data: {} as unknown,
  theme: 'light' as 'light' | 'dark',
}, undefined, { mergeDefaults: true })

const schema = ref(state.value.schema)
const options = ref(state.value.options)
const data = ref(state.value.data)
// Light unless the user explicitly stored dark. Any missing/invalid stored
// value (e.g. a partial object seeded by an example's "edit" link) falls
// back to 'light' instead of becoming `undefined`, which would make every
// render message fail the `isRenderMessage` guard in the sandbox and
// silently blank the preview.
const theme = ref<'light' | 'dark'>(state.value.theme === 'dark' ? 'dark' : 'light')
const parseErrors = ref<Record<string, string | null>>({})
const validationErrors = ref<Record<string, string[]>>({})

watch([schema, options, data, theme], () => {
  state.value = { schema: schema.value, options: options.value, data: data.value, theme: theme.value }
}, { deep: true })

const tab = ref<'schema' | 'options' | 'data'>('schema')

const errorLines = computed(() => [
  ...Object.entries(parseErrors.value).filter(([, e]) => e).map(([k, e]) => `${k}: ${e}`),
  ...Object.entries(validationErrors.value).map(([k, msgs]) => `${k || 'form'}: ${msgs.join(', ')}`),
])
</script>

<template>
  <ClientOnly>
    <div class="editor-page pa-2">
      <v-row no-gutters class="flex-grow-1" style="min-height: 0">
        <v-col cols="12" md="6" class="pb-2 pb-md-0 pr-md-1 editor-col">
          <v-sheet border rounded class="pane-frame d-flex flex-column">
            <v-toolbar density="compact" color="surface" class="flex-grow-0 rounded-t">
              <v-tabs v-model="tab" density="compact">
                <v-tab value="schema">Schema</v-tab>
                <v-tab value="options">Options</v-tab>
                <v-tab value="data">Data</v-tab>
              </v-tabs>
              <v-spacer />
              <!-- Task 2 adds the JSON/YAML toggle + Format button here.
              A future iteration will also host a locale switch. -->
              <v-btn
                size="small"
                variant="text"
                :icon="theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
                :title="theme === 'dark' ? 'Switch to light preview' : 'Switch to dark preview'"
                @click="theme = theme === 'dark' ? 'light' : 'dark'"
              />
            </v-toolbar>
            <v-divider />
            <v-window v-model="tab" class="editor-window flex-grow-1 overflow-y-auto">
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
            <!-- `flex-grow-0`: v-alert defaults to a flex item that grows to
            fill leftover vertical space in this flex column, which would
            stretch it to a huge empty block instead of its natural height. -->
            <v-alert
              v-if="errorLines.length"
              type="warning"
              density="compact"
              class="ma-2 flex-grow-0"
            >
              <div v-for="line in errorLines" :key="line">{{ line }}</div>
            </v-alert>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6" class="pl-md-1 editor-col">
          <v-sheet border rounded class="pane-frame overflow-hidden">
            <EditorSandbox
              class="d-block"
              :schema="schema"
              :options="options"
              :data="data"
              :theme="theme"
              @update="d => data = d"
              @validation="errs => validationErrors = errs"
              @error="msg => validationErrors = { form: [msg] }"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* Fill the viewport below the app-bar. `--v-layout-top` is maintained by the
Vuetify layout system (real app-bar height, whatever its density) — no magic
number. The page itself never scrolls on desktop; each pane scrolls
internally. */
.editor-page {
  height: calc(100dvh - var(--v-layout-top, 64px));
  display: flex;
  flex-direction: column;
}
.editor-col {
  min-height: 0;
  height: 100%;
}
.pane-frame {
  height: 100%;
}
/* v-window inserts a container + item wrappers between the flex column and
the editor: give the whole chain the pane's height so the active editor can
size and scroll itself. */
.editor-window :deep(.v-window__container),
.editor-window :deep(.v-window-item) {
  height: 100%;
}
/* Stacked mobile layout: fixed-height panes, the page scrolls normally. */
@media (max-width: 959.98px) {
  .editor-page {
    height: auto;
  }
  .editor-col {
    height: 50dvh;
  }
}
</style>
