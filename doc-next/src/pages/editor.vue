<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch, type ComponentPublicInstance } from 'vue'
import { createReusableTemplate, useElementSize, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'
// `ClientOnly` is auto-registered globally by ViteSSG (see src/main.ts) — do
// not import it here.
import EditorSandbox from '../components/EditorSandbox.vue'
import type CodeEditorType from '../components/CodeEditor.vue'
import type { CodeLanguage } from '../editor/code'
import { vjsfMetaSchema } from '../editor/vjsf-meta-schema'
import { runtimeOptions } from '../doc-options'

// Lazy: CodeEditor.vue pulls in `codemirror-json-schema`, whose published
// `dist/index.js` has internal imports missing file extensions (an upstream
// packaging bug) — plain Node ESM resolution (used by vite-ssg's prerender
// step) throws `ERR_MODULE_NOT_FOUND` on it. This page is entirely wrapped
// in `<ClientOnly>` (see template), whose slot is never invoked during SSR,
// so a static top-level import would still eagerly pull the module into the
// SSR bundle and evaluation would still explode; a `defineAsyncComponent`
// loader is only invoked when Vue actually renders the component, which
// never happens server-side, so the broken module is never touched there.
const CodeEditor = defineAsyncComponent(() => import('../components/CodeEditor.vue'))

type TabKey = 'schema' | 'options' | 'data'

// VJSF's own defaults, straight from the documented options catalogue (the
// same data the Behavior > Options pages render): every scalar runtime
// default, plus the compile-side `locale`. Object defaults (context,
// messages, icons...) are skipped — empty-object placeholders would only be
// noise in the buffer. Seeding them all makes the tweakable knobs
// discoverable from the Options tab, like the old doc's editor did.
const vjsfDefaultOptions: Record<string, unknown> = {
  ...Object.fromEntries(runtimeOptions
    .filter(o => ['boolean', 'number', 'string'].includes(typeof o.default))
    .map(o => [o.key, o.default])),
  locale: 'en',
}
// The editor's own layer on top of VJSF's defaults — kept as a separate
// object so the two stay distinguishable: a fresh playground starts quiet
// (no errors before any interaction) and with x-i18n-* annotations active.
const editorOptionsOverrides: Record<string, unknown> = {
  initialValidation: 'never',
  xI18n: true,
}

// Reused verbatim by the examples' "edit in playground" link, which seeds
// this same localStorage key (without `languages` — mergeDefaults fills it).
// mergeDefaults is shallow per top-level key, so a stored `options` (an
// example's own, or a previous visit's) wins wholesale over the seed below —
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
// Light unless the user explicitly stored dark. Any missing/invalid stored
// value (e.g. a partial object seeded by an example's "edit" link) falls
// back to 'light' instead of becoming `undefined`, which would make every
// render message fail the `isRenderMessage` guard in the sandbox and
// silently blank the preview.
const theme = ref<'light' | 'dark'>(state.value.theme === 'dark' ? 'dark' : 'light')
// Same guarded-fallback idea as `theme` above: stored values may be missing
// or partial, so anything unrecognized falls back to the tab's default.
const asLanguage = (v: unknown, fallback: CodeLanguage): CodeLanguage =>
  (v === 'json' || v === 'js' || v === 'yaml') ? v : fallback
const languages = ref<Record<TabKey, CodeLanguage>>({
  schema: asLanguage(state.value.languages?.schema, 'yaml'),
  options: asLanguage(state.value.languages?.options, 'yaml'),
  data: asLanguage(state.value.languages?.data, 'json'),
})
const validationErrors = ref<Record<string, string[]>>({})

// The Data tab is completed/validated by whatever schema the user is
// currently editing — only when it's a plain object (a schema mid-edit can
// transiently be an array/scalar).
const dataSchema = computed(() => (
  schema.value && typeof schema.value === 'object' && !Array.isArray(schema.value)
    ? schema.value as Record<string, unknown>
    : undefined
))

watch([schema, options, data, theme, languages], () => {
  state.value = { schema: schema.value, options: options.value, data: data.value, theme: theme.value, languages: languages.value }
}, { deep: true })

const tab = ref<TabKey>('schema')

// `mdAndUp` is Vuetify 4's `md` breakpoint (840px) — the exact width at which
// the `md="6"` cols stop stacking and sit side by side. Driving the fill-the-
// viewport layout off it (rather than a hardcoded CSS media query) keeps the
// height behaviour locked to the column layout instead of drifting from it —
// which is what caused the half-height panes: the CSS breakpoint still used
// Vuetify 3's old 960px value. Safe because this whole page is `<ClientOnly>`,
// so `useDisplay` always has the real client width (no SSR default).
const { mdAndUp } = useDisplay()

// `createReusableTemplate` lets us author the tabs and the controls (language
// toggle + action buttons) once and place them either inline on one toolbar
// row or on two — see `controlsStacked` below.
const [DefineControls, Controls] = createReusableTemplate()
const [DefineTabs, Tabs] = createReusableTemplate()

// The controls fit inline next to the tabs only when the pane is wide enough.
// In the two-column layout each pane is ~half the viewport, and with the
// permanent nav drawer (lg+) even a wide viewport can leave a narrow pane —
// so no viewport breakpoint can decide this correctly. We measure the pane's
// own width instead; below the threshold the controls move to their own row
// above the tabs (see the toolbar template). ~600px comfortably fits the tabs
// plus the toggle and the three icon buttons without the tabs scrolling.
const editorPane = ref<ComponentPublicInstance | null>(null)
const { width: paneWidth } = useElementSize(editorPane)
const controlsStacked = computed(() => paneWidth.value > 0 && paneWidth.value < 600)

// VJSF's built-in locales (see @json-layout/core src/i18n). The switch reads
// and writes `options.locale` — the exact key a user would set by hand — so
// the Options tab, the stored state and the preview always agree.
const formLocales = { en: 'English', fr: 'Français', de: 'Deutsch', nl: 'Nederlands' }
const formLocale = computed(() => {
  const locale = options.value.locale
  return typeof locale === 'string' ? locale : 'en'
})
// Assign a fresh object rather than mutating in place: CodeEditor watches
// its modelValue by reference, so an in-place mutation would reach the
// preview (deep watch in EditorSandbox) but leave the Options tab's buffer
// showing the old locale.
function setFormLocale (locale: string) {
  options.value = { ...options.value, locale }
}

// With validateOn: 'submit' errors only ever display when the form is
// explicitly validated — without a button to do that, the mode couldn't be
// exercised in the playground at all. The button sits pinned at the bottom
// of the preview column (mirroring the errors alert on the code column) and
// asks the sandboxed form to validate through the iframe protocol.
const sandbox = ref<InstanceType<typeof EditorSandbox> | null>(null)
const submitMode = computed(() => options.value.validateOn === 'submit')

const schemaEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const optionsEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const dataEditor = ref<InstanceType<typeof CodeEditorType> | null>(null)
const activeEditor = computed(() => ({ schema: schemaEditor, options: optionsEditor, data: dataEditor })[tab.value].value)

// Iframe-reported errors (compile/runtime/validation) are the only ones left
// down here — parse and schema-validation errors are inline in the editor.
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
            <!-- Authored once, placed either inline next to the tabs or on its
            own row above them — see the `controlsStacked` note above. -->
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
            <!-- When the pane is too narrow to fit the controls inline next to
            the tabs, the controls take the main toolbar row and the tabs drop
            to the extension row below — i.e. the controls sit above the tabs. -->
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
            <!-- v-alert's own CSS makes it `flex: 1 1 0%`: in this flex
            column that either stretches it into a huge empty block or (once
            grow/shrink are zeroed) collapses it onto its 0% basis, a crushed
            orange sliver. The .editor-errors rule pins the whole flex
            shorthand to `0 0 auto` so it always takes its content height. -->
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
            <!-- with-background: the bar must look like a seamless extension
            of the iframe above it, so it takes the same theme (and thus the
            same background color — the sandbox uses the doc's theme
            definitions too) as the previewed form. Padding, not margin: the
            themed background has to run edge to edge. -->
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
/* Side-by-side layout (md+, i.e. the `md="6"` cols sit next to each other):
fill the viewport below the app-bar and never scroll the page — each pane
scrolls internally. `--v-layout-top` is maintained by the Vuetify layout
system (real app-bar height, whatever its density) — no magic number. The
`--fill` class is toggled by `mdAndUp` so it tracks the column layout exactly
(see the script note); a hardcoded media query previously drifted from it. */
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
/* Pin to content height: v-alert's own `flex: 1 1 0%` otherwise stretches
it (grow) or crushes it onto its 0% basis (see the template comment). A
long error list scrolls instead of pushing the editor out of the pane. */
.editor-errors {
  flex: 0 0 auto;
  max-height: 35%;
  overflow-y: auto;
}
/* The iframe fills whatever the Validate bar (when present) leaves free:
its own inline height:100% would otherwise overflow the flex column. */
.preview-frame {
  flex: 1 1 0;
  min-height: 0;
}
/* v-window inserts a container + item wrappers between the flex column and
the editor: give the whole chain the pane's height so the active editor can
size and scroll itself. */
.editor-window :deep(.v-window__container),
.editor-window :deep(.v-window-item) {
  height: 100%;
}
</style>
