<script setup lang="ts">
import { computed, getCurrentInstance, ref, shallowRef, watch } from 'vue'
import type { Router } from 'vue-router'
import type { VForm } from 'vuetify/components/VForm'
import type { CompiledLayout } from '@json-layout/core'
import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'
import VjsfImgCropper from '@koumoul/vjsf-img-cropper'
import { v2compat } from '@koumoul/vjsf/compat/v2'
import { loadLayout } from 'virtual:example-layouts'
import CodeBlock from './CodeBlock.vue'
import type { Example } from '../demos/types'

const props = defineProps<{ example: Example, layoutKey: string, v2compat?: boolean }>()

// v2-compat examples carry a legacy `model` field (ported verbatim from the old
// VJSF-2 doc source, e.g. demos/migration/v2/arrays/editable-array.js: `export
// default { id, title, description, schema, model, options }`) instead of `data`.
// `Example` (demos/types.ts) only types `data` -- widen locally rather than
// touching that file.
type LegacyExample = Example & { model?: unknown }

// `structuredClone` both seeds a plain working copy for the form and guarantees we
// never mutate the example objects the demo collections hand back by reference
// (getDemoCollections()/findDemo() return their arrays as shared, non-cloned data).
//
// The final fallback is `null`, not `{}`: a handful of examples (e.g. the
// plugins/markdown demos) have a root schema that isn't `type: object` (there it's a bare
// `type: string`), so forcing an object default feeds the wrong JS type into that
// node's own state and its plugin/node component (confirmed via browser check --
// @koumoul/vjsf-markdown's editor.vue warns "Expected String ... got Object" when
// seeded with `{}`). `null`/`undefined` is universally safe: VJSF's own
// `defaultOn: 'empty'` (the library default, see @json-layout/core/src/state/options.js)
// already synthesizes the right empty value per the schema's actual root type.
const data = ref(structuredClone(props.example.data ?? (props.example as LegacyExample).model ?? null))
const theme = ref<'light' | 'dark'>('light')
const tab = ref<'schema' | 'data' | 'options'>('schema')
// Vuetify-doc-style source pane: collapsed by default, the toolbar's last
// button expands it.
const expanded = ref(false)

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined
// Copies the active tab (works collapsed too, where the active tab is the
// default one, schema). Same serialization as CodeBlock's display.
async function copy () {
  const values = { schema: props.example.schema, data: data.value, options: props.example.options ?? {} }
  await navigator.clipboard.writeText(JSON.stringify(values[tab.value], null, 2))
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = false }, 2000)
}

const layout = shallowRef<CompiledLayout | null>(null)
// Distinguishes "still loading" (layoutReady false) from "resolved, and this example
// genuinely has no compiled layout" (layoutReady true, layout still null) -- see
// build/examples-layouts-plugin.ts's KNOWN_INCOMPATIBLE for the current cases.
const layoutReady = ref(false)

// Guards against a stale response clobbering a newer one if this component instance
// is ever reused across examples (e.g. a future non-keyed v-for) -- `key` from the watch
// source is captured per in-flight request and compared once the promise resolves.
let latestKey = ''
watch(() => props.layoutKey, async (key) => {
  latestKey = key
  layoutReady.value = false
  layout.value = null
  const loaded = await loadLayout(key)
  if (latestKey !== key) return
  layout.value = loaded
  layoutReady.value = true
}, { immediate: true })

// Some examples' schemas reference a plugin's node component to actually render (e.g.
// the plugins/markdown demos need @koumoul/vjsf-markdown's editor). compile() only ever needed
// each plugin's info.js (see build/examples-layouts-plugin.ts) -- the Vue node
// component is purely a render-time concern, passed unconditionally for every example
// exactly like the old doc/components/vjsf-example.vue did.
const renderOptions = computed(() => ({
  ...(props.example.options as Record<string, unknown> ?? {}),
  plugins: [VjsfMarkdown, VjsfImgCropper],
}))

// With validateOn: 'submit' errors only ever show when the form is
// explicitly validated -- without a button to do that the mode couldn't be
// exercised at all, so show a bottom-right Validate button like the old doc.
const form = ref<InstanceType<typeof VForm> | null>(null)
const showValidate = computed(() => (props.example.options as Record<string, unknown> | undefined)?.validateOn === 'submit')

// `useRouter()` off a bare `import ... from 'vue-router'` would resolve to a
// *different* installed copy of vue-router than the one vite-ssg actually installs
// for this app -- this workspace currently has two vue-router majors coexisting (root
// vs. doc-next's own nested copy), see DocSearch.vue's comment for the full story.
// Reading `$router` off this component instance's global properties (populated by
// whichever router the app actually installed, regardless of which package copy this
// file's own imports would resolve to) sidesteps that mismatch entirely -- it is the
// Composition-API equivalent of the Options-API original's `this.$router`.
const instance = getCurrentInstance()

function edit () {
  // The /editor page runs its OWN runtime compile() with no v2compat step, so for the
  // v2-compat category we must store the *converted* v3 schema -- storing the raw
  // VJSF-2 schema (x-display/x-fromData/etc.) would make the editor render a degraded
  // form, unlike the widget above which renders from the build-precompiled layout that
  // already applied v2compat(). Gated on the same `collection.v2compat` flag that
  // build/examples-layouts-plugin.ts uses (passed down here as the `v2compat` prop),
  // converted via the same
  // `@koumoul/vjsf/compat/v2` specifier; matches the old doc/components/vjsf-example.vue,
  // which stored `this.schema` (the v2compat-converted schema) in editExample().
  const schema = props.v2compat
    ? v2compat(props.example.schema as object)
    : props.example.schema
  const options = { ...(props.example.options ?? {}) }
  delete (options as Record<string, unknown>).plugins
  localStorage.setItem('vjsf-editor-state', JSON.stringify({
    schema, options, data: data.value, theme: theme.value,
  }))
  const router = instance?.appContext.config.globalProperties.$router as Router | undefined
  router?.push('/editor')
}
</script>

<template>
  <ClientOnly>
    <v-sheet class="my-4" border rounded color="transparent">
      <v-toolbar density="compact" color="surface" rounded>
        <!-- The tabs only make sense once the source pane is open. -->
        <v-tabs v-if="expanded" v-model="tab" density="compact">
          <v-tab value="schema">Schema</v-tab>
          <v-tab value="data">Data</v-tab>
          <v-tab value="options">Options</v-tab>
        </v-tabs>
        <v-spacer />
        <v-btn
          icon
          variant="text"
          :title="theme === 'dark' ? 'Switch to light preview' : 'Switch to dark preview'"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        >
          <v-icon :icon="theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'" />
        </v-btn>
        <v-btn icon variant="text" :title="`Copy ${tab}`" @click="copy">
          <v-icon :icon="copied ? 'mdi-check' : 'mdi-content-copy'" />
        </v-btn>
        <v-btn icon="mdi-play" variant="text" title="Open in playground" @click="edit" />
        <v-btn
          icon
          variant="text"
          :title="expanded ? 'Hide source' : 'View source'"
          @click="expanded = !expanded"
        >
          <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-code-tags'" />
        </v-btn>
      </v-toolbar>

      <v-expand-transition>
        <div v-show="expanded">
          <v-divider />
          <v-window v-model="tab" class="pa-3 source-window">
            <v-window-item value="schema">
              <CodeBlock :value="example.schema" />
            </v-window-item>
            <v-window-item value="data">
              <CodeBlock :value="data" />
            </v-window-item>
            <v-window-item value="options">
              <CodeBlock :value="example.options ?? {}" />
            </v-window-item>
          </v-window>
        </div>
      </v-expand-transition>

      <v-divider />

      <v-theme-provider :theme="theme" with-background class="pa-4 rounded-b">
        <v-progress-linear v-if="!layoutReady" indeterminate />
        <v-alert v-else-if="!layout" type="warning" variant="tonal">
          <template v-if="example.warning">{{ example.warning }}</template>
          <template v-else>This example is not supported in VJSF 3.</template>
        </v-alert>
        <v-form v-else ref="form">
          <vjsf
            v-model="data"
            :schema="example.schema"
            :precompiled-layout="layout"
            :options="renderOptions"
          />
          <div v-if="showValidate" class="d-flex justify-end pt-2">
            <v-btn color="success" density="compact" text="Validate" variant="flat" @click="form?.validate()" />
          </div>
        </v-form>
      </v-theme-provider>
    </v-sheet>
  </ClientOnly>
</template>

<style scoped>
/* The source pane never grows past half the viewport; past that the code
block scrolls internally (CodeBlock's own `overflow: auto`). :deep()
because the pre lives inside the child CodeBlock component. */
.source-window :deep(.code-block) {
  max-height: 50dvh;
}
</style>
