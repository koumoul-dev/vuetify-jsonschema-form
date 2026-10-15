<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch, type ComponentPublicInstance } from 'vue'
import { createReusableTemplate, useElementSize, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'
// `ClientOnly` is auto-registered globally by ViteSSG (see src/main.ts)
import EditorSandbox from '../components/EditorSandbox.vue'
import type CodeEditorType from '../components/CodeEditor.vue'
import type { CodeLanguage } from '../utils/editor/code'
import { vjsfMetaSchema } from '../utils/editor/vjsf-meta-schema'
import { runtimeOptions } from '../utils/doc-options'

// Lazy: CodeEditor.vue pulls in `codemirror-json-schema`, whose published
// build breaks Node ESM resolution (vite-ssg's prerender step) — a
// defineAsyncComponent loader is never invoked server-side.
const CodeEditor = defineAsyncComponent(() => import('../components/CodeEditor.vue'))

type TabKey = 'schema' | 'options' | 'data'

// Seed the buffer with VJSF's documented scalar defaults so the tweakable
// knobs are discoverable from the Options tab.
const vjsfDefaultOptions: Record<string, unknown> = {
  ...Object.fromEntries(runtimeOptions
    .filter(o => ['boolean', 'number', 'string'].includes(typeof o.default))
    .map(o => [o.key, o.default])),
  locale: 'en',
}
// The editor's own layer on top of VJSF's defaults: a fresh playground starts
// quiet (no errors before any interaction) and with x-i18n-* active.
const editorOptionsOverrides: Record<string, unknown> = {
  initialValidation: 'never',
  xI18n: true,
}

// The examples' "edit in playground" link seeds this same localStorage key.
// mergeDefaults is shallow per top-level key, so stored values win wholesale;
// the defaults only ever fill a fresh editor.
const state = useStorage('vjsf-editor-state', {
  schema: { type: 'object', properties: { name: { type: 'string', title: 'Name' } } } as unknown,
  options: { ...vjsfDefaultOptions, ...editorOptionsOverrides },
  data: {} as unknown,
  theme: 'light' as 'light' | 'dark',
  languages: { schema: 'yaml', options: 'yaml', data: 'json' } as Record<TabKey, CodeLanguage>,
}, undefined, { mergeDefaults: true })

const schema = ref(state.value.schema)
const options = ref(state.value.options)
const data = ref(state.value.data)
// Stored values may be missing or partial (e.g. seeded by an example's "edit"
// link): anything unrecognized falls back to a valid default — an undefined
// theme would fail the sandbox's isRenderMessage guard and blank the preview.
const theme = ref<'light' | 'dark'>(state.value.theme === 'dark' ? 'dark' : 'light')
const asLanguage = (v: unknown, fallback: CodeLanguage): CodeLanguage =>
  (v === 'json' || v === 'js' || v === 'yaml') ? v : fallback
const languages = ref<Record<TabKey, CodeLanguage>>({
  schema: asLanguage(state.value.languages?.schema, 'yaml'),
  options: asLanguage(state.value.languages?.options, 'yaml'),
  data: asLanguage(state.value.languages?.data, 'json'),
})
const validationErrors = ref<Record<string, string[]>>({})

// The Data tab is completed/validated by the edited schema — only when it's
// a plain object (mid-edit it can transiently be an array/scalar).
const dataSchema = computed(() => (
  schema.value && typeof schema.value === 'object' && !Array.isArray(schema.value)
    ? schema.value as Record<string, unknown>
    : undefined
))

watch([schema, options, data, theme, languages], () => {
  state.value = { schema: schema.value, options: options.value, data: data.value, theme: theme.value, languages: languages.value }
}, { deep: true })

const tab = ref<TabKey>('schema')

// `mdAndUp` (840px) is exactly where the `md="6"` cols go side by side —
// driving the fill-the-viewport layout from it keeps the height behaviour
// locked to the column layout. Safe because this page is `<ClientOnly>`.
const { mdAndUp } = useDisplay()

// Author the tabs and the controls once, place them on one or two toolbar
// rows — see `controlsStacked` below.
const [DefineControls, Controls] = createReusableTemplate()
const [DefineTabs, Tabs] = createReusableTemplate()

// The controls fit inline next to the tabs only when the pane itself is wide
// enough (~600px) — with the permanent nav drawer no viewport breakpoint can
// decide this, so measure the pane's own width.
const editorPane = ref<ComponentPublicInstance | null>(null)
const { width: paneWidth } = useElementSize(editorPane)
const controlsStacked = computed(() => paneWidth.value > 0 && paneWidth.value < 600)

// VJSF's built-in locales. The switch reads and writes `options.locale`, so
// the Options tab, the stored state and the preview always agree.
const formLocales = { en: 'English', fr: 'Français', de: 'Deutsch', nl: 'Nederlands' }
const formLocale = computed(() => {
  const locale = options.value.locale
  return typeof locale === 'string' ? locale : 'en'
})
// Assign a fresh object: CodeEditor watches its modelValue by reference, an
// in-place mutation would leave the Options tab's buffer stale.
function setFormLocale (locale: string) {
  options.value = { ...options.value, locale }
}

// With validateOn: 'submit' errors only show on explicit validation — the
// Validate button asks the sandboxed form to do so via the iframe protocol.
const sandbox = ref<InstanceType<typeof EditorSandbox> | null>(null)
const submitMode = computed(() => options.value.validateOn === 'submit')

const schemaEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const optionsEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const dataEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const activeEditor = computed(() => ({ schema: schemaEditor, options: optionsEditor, data: dataEditor })[tab.value].value)

// Iframe-reported errors (compile/runtime/validation); parse and
// schema-validation errors are inline in the editor.
const errorLines = computed(() =>
  Object.entries(validationErrors.value).map(([k, msgs]) => `${k || 'form'}: ${msgs.join(', ')}`),
)
</script>

<template>
  <ClientOnly>
    <div class="editor-page pa-2" :class="{ 'editor-page--fill': mdAndUp }">
      <v-row no-gutters class="flex-grow-1" style="min-height: 0">
        <v-col cols="12" md="6" class="pb-2 pb-md-0 pr-md-1 editor-col">
          <v-sheet ref="editorPane" border rounded class="pane-frame d-flex flex-column">
            <DefineControls>
              <v-spacer />
              <v-btn-toggle
                v-model="languages[tab]"
                density="compact"
                variant="outlined"
                mandatory
                class="mr-2"
              >
                <v-btn value="json" size="small" class="text-none">JSON</v-btn>
                <v-btn value="js" size="small" class="text-none">JS</v-btn>
                <v-btn value="yaml" size="small" class="text-none">YAML</v-btn>
              </v-btn-toggle>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-format-align-left"
                title="Format"
                @click="activeEditor?.format()"
              />
              <v-menu>
                <template #activator="{ props: menuProps }">
                  <v-btn
                    v-bind="menuProps"
                    size="small"
                    variant="text"
                    icon="mdi-translate"
                    :title="`Form locale (options.locale): ${formLocales[formLocale as keyof typeof formLocales] ?? formLocale}`"
                  />
                </template>
                <v-list density="compact">
                  <v-list-item
                    v-for="(name, code) in formLocales"
                    :key="code"
                    :active="code === formLocale"
                    :title="name"
                    @click="setFormLocale(code)"
                  />
                </v-list>
              </v-menu>
              <v-btn
                size="small"
                variant="text"
                :icon="theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
                :title="theme === 'dark' ? 'Switch to light preview' : 'Switch to dark preview'"
                @click="theme = theme === 'dark' ? 'light' : 'dark'"
              />
            </DefineControls>
            <DefineTabs>
              <v-tabs v-model="tab" density="compact">
                <v-tab value="schema">Schema</v-tab>
                <v-tab value="options">Options</v-tab>
                <v-tab value="data">Data</v-tab>
              </v-tabs>
            </DefineTabs>
            <!-- Narrow pane: the controls take the main toolbar row and the
            tabs drop to the extension row below. -->
            <v-toolbar
              density="compact"
              color="surface"
              class="flex-grow-0 rounded-t"
              :extended="controlsStacked"
              extension-height="48"
            >
              <Tabs v-if="!controlsStacked" />
              <Controls />
              <template v-if="controlsStacked" #extension>
                <Tabs />
              </template>
            </v-toolbar>
            <v-divider />
            <v-window v-model="tab" class="editor-window flex-grow-1">
              <v-window-item value="schema">
                <CodeEditor ref="schemaEditor" v-model="schema" v-model:language="languages.schema" :schema="vjsfMetaSchema" />
              </v-window-item>
              <v-window-item value="options">
                <CodeEditor ref="optionsEditor" v-model="options" v-model:language="languages.options" />
              </v-window-item>
              <v-window-item value="data">
                <CodeEditor ref="dataEditor" v-model="data" v-model:language="languages.data" :schema="dataSchema" />
              </v-window-item>
            </v-window>
            <v-alert
              v-if="errorLines.length"
              type="warning"
              density="compact"
              class="ma-2 editor-errors"
            >
              <div v-for="line in errorLines" :key="line">{{ line }}</div>
            </v-alert>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6" class="pl-md-1 editor-col">
          <v-sheet border rounded class="pane-frame overflow-hidden d-flex flex-column">
            <EditorSandbox
              ref="sandbox"
              class="d-block preview-frame"
              :schema="schema"
              :options="options"
              :data="data"
              :theme="theme"
              @update="d => data = d"
              @validation="errs => validationErrors = errs"
              @error="msg => validationErrors = { form: [msg] }"
            />
            <!-- Same theme as the previewed form so the bar reads as an
            extension of the iframe; padding (not margin) keeps the themed
            background edge to edge. -->
            <v-theme-provider
              v-if="submitMode"
              :theme="theme"
              with-background
              class="d-flex justify-end flex-grow-0 pa-2"
            >
              <v-btn color="success" density="compact" text="Validate" variant="flat" @click="sandbox?.validate()" />
            </v-theme-provider>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </ClientOnly>
</template>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
}
/* Side-by-side layout (md+): fill the viewport below the app-bar, each pane
scrolls internally. `--v-layout-top` is maintained by Vuetify's layout system. */
.editor-page--fill {
  height: calc(100dvh - var(--v-layout-top, 64px));
}
.editor-col {
  min-height: 0;
}
.editor-page--fill .editor-col {
  height: 100%;
}
/* Stacked layout (below md): fixed-height panes, the page scrolls normally. */
.editor-page:not(.editor-page--fill) .editor-col {
  height: 50dvh;
}
.pane-frame {
  height: 100%;
}
/* Pin to content height (v-alert defaults to `flex: 1 1 0%`); a long error
list scrolls instead of pushing the editor out of the pane. */
.editor-errors {
  flex: 0 0 auto;
  max-height: 35%;
  overflow-y: auto;
}
/* The iframe fills whatever the Validate bar (when present) leaves free. */
.preview-frame {
  flex: 1 1 0;
  min-height: 0;
}
/* v-window inserts wrappers between the flex column and the editor: give the
whole chain the pane's height so the active editor can size and scroll itself. */
.editor-window :deep(.v-window__container),
.editor-window :deep(.v-window-item) {
  height: 100%;
}
</style>
