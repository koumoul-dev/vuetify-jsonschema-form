<script setup lang="ts">
import { computed, getCurrentInstance, ref, shallowRef, watch } from 'vue'
import type { Router } from 'vue-router'
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
// The final fallback is `null`, not `{}`: a handful of examples (e.g.
// formats/markdown) have a root schema that isn't `type: object` (there it's a bare
// `type: string`), so forcing an object default feeds the wrong JS type into that
// node's own state and its plugin/node component (confirmed via browser check --
// @koumoul/vjsf-markdown's editor.vue warns "Expected String ... got Object" when
// seeded with `{}`). `null`/`undefined` is universally safe: VJSF's own
// `defaultOn: 'empty'` (the library default, see @json-layout/core/src/state/options.js)
// already synthesizes the right empty value per the schema's actual root type.
const data = ref(structuredClone(props.example.data ?? (props.example as LegacyExample).model ?? null))
const theme = ref<'light' | 'dark'>('light')
const tab = ref('schema')

const layout = shallowRef<CompiledLayout | null>(null)
// Distinguishes "still loading" (layoutReady false) from "resolved, and this example
// genuinely has no compiled layout" (layoutReady true, layout still null) -- the only
// current case is v2-compat/select-schema-deps, see
// build/examples-layouts-plugin.ts's KNOWN_INCOMPATIBLE.
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
// formats/markdown needs @koumoul/vjsf-markdown's editor). compile() only ever needed
// each plugin's info.js (see build/examples-layouts-plugin.ts) -- the Vue node
// component is purely a render-time concern, passed unconditionally for every example
// exactly like the old doc/components/vjsf-example.vue did.
const renderOptions = computed(() => ({
  ...(props.example.options as Record<string, unknown> ?? {}),
  plugins: [VjsfMarkdown, VjsfImgCropper],
}))

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
  // already applied v2compat(). Gated on the same `v2-compat` discriminator that
  // build/examples-layouts-plugin.ts uses, converted via the same
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
        <v-tabs v-model="tab" density="compact">
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
        <v-btn icon="mdi-pencil" variant="text" title="Edit in playground" @click="edit" />
      </v-toolbar>

      <v-divider />

      <v-window v-model="tab" class="pa-3">
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

      <v-divider />

      <v-theme-provider :theme="theme" with-background class="pa-4 rounded-b">
        <v-progress-linear v-if="!layoutReady" indeterminate />
        <v-alert v-else-if="!layout" type="warning" variant="tonal">
          This example is not supported in VJSF 3.
          <div v-if="example.warning">{{ example.warning }}</div>
        </v-alert>
        <v-form v-else>
          <vjsf
            v-model="data"
            :schema="example.schema"
            :precompiled-layout="layout"
            :options="renderOptions"
          />
        </v-form>
      </v-theme-provider>
    </v-sheet>
  </ClientOnly>
</template>
