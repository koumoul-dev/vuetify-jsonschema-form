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

const props = defineProps<{
  example: Example,
  layoutKey: string,
  v2compat?: boolean,
  /** open the source pane on mount */
  expanded?: boolean,
  /** drop the Data tab when watching the live data adds nothing */
  hideData?: boolean,
}>()

// v2-compat examples ported from the old doc carry a legacy `model` field
// instead of `data`; widen locally rather than touching demos/types.ts.
type LegacyExample = Example & { model?: unknown }

// structuredClone: never mutate the shared example objects. Fallback `null`,
// not `{}`: some examples have a non-object root schema, and VJSF's own
// `defaultOn: 'empty'` synthesizes the right empty value per root type.
const data = ref(structuredClone(props.example.data ?? (props.example as LegacyExample).model ?? null))
const theme = ref<'light' | 'dark'>('light')
const tab = ref<'schema' | 'data' | 'options' | 'defaults' | 'slots'>('schema')
// Vuetify-doc-style source pane: collapsed by default unless the page asks
// for it (prop read once, the toggle button owns the state afterwards).
const expanded = ref(props.expanded ?? false)

// Only meaningful tabs: Data unless the page opted out, Options when the
// example has some, Slots when the example carries a template to display.
// With a single tab left the tabs row disappears, the pane shows the schema.
const tabs = computed(() => {
  const values: { value: typeof tab.value, title: string }[] = [{ value: 'schema', title: 'Schema' }]
  if (!props.hideData) values.push({ value: 'data', title: 'Data' })
  if (Object.keys(props.example.options as Record<string, unknown> ?? {}).length) values.push({ value: 'options', title: 'Options' })
  if (props.example.vuetifyDefaults) values.push({ value: 'defaults', title: 'Vuetify defaults' })
  if (props.example.slotsCode) values.push({ value: 'slots', title: 'Slots' })
  return values
})

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined
// Copies the active tab; same serialization as CodeBlock's display.
async function copy () {
  const text = tab.value === 'slots'
    ? (props.example.slotsCode ?? '')
    : JSON.stringify({ schema: props.example.schema, data: data.value, options: props.example.options ?? {}, defaults: props.example.vuetifyDefaults ?? {} }[tab.value], null, 2)
  await navigator.clipboard.writeText(text)
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = false }, 2000)
}

const layout = shallowRef<CompiledLayout | null>(null)
// Distinguishes "still loading" from "resolved with no compiled layout"
// (the KNOWN_INCOMPATIBLE examples of demos/examples-layouts-plugin.ts).
const layoutReady = ref(false)

// guards against a stale response clobbering a newer one
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

// The plugins' Vue node components are a render-time concern (compile() only
// needed their info.js); passed unconditionally for every example.
const renderOptions = computed(() => ({
  ...(props.example.options as Record<string, unknown> ?? {}),
  plugins: [VjsfMarkdown, VjsfImgCropper],
}))

// With validateOn: 'submit' errors only show on explicit validation — show a
// bottom-right Validate button like the old doc.
const form = ref<InstanceType<typeof VForm> | null>(null)
const showValidate = computed(() => (props.example.options as Record<string, unknown> | undefined)?.validateOn === 'submit')

// Two copies of vue-router coexist in the workspace and a bare `useRouter()`
// import can resolve to the one the app didn't install — read `$router` off
// the instance's global properties instead (see DocSearch.vue).
const instance = getCurrentInstance()

function edit () {
  // The /editor page runs its own runtime compile() with no v2compat step, so
  // store the converted v3 schema for v2-compat examples.
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
        <!-- The tabs only make sense once the source pane is open, and only
        when there is more than the schema to switch to. -->
        <v-tabs v-if="expanded && tabs.length > 1" v-model="tab" density="compact">
          <v-tab v-for="t in tabs" :key="t.value" :value="t.value">{{ t.title }}</v-tab>
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
            <v-window-item v-if="!hideData" value="data">
              <CodeBlock :value="data" />
            </v-window-item>
            <v-window-item value="options">
              <CodeBlock :value="example.options ?? {}" />
            </v-window-item>
            <v-window-item v-if="example.vuetifyDefaults" value="defaults">
              <CodeBlock :value="example.vuetifyDefaults" />
            </v-window-item>
            <v-window-item v-if="example.slotsCode" value="slots">
              <!-- Vue template code, not JSON: skip CodeBlock's tokenizer and
              reuse the shared block chrome only. -->
              <pre class="code-block">{{ example.slotsCode }}</pre>
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
          <!-- scoped equivalent of createVuetify({ defaults }) for the demos
          documenting the Vjsf* defaults aliases; renders no DOM and passes
          straight through when the example carries no vuetifyDefaults -->
          <v-defaults-provider :defaults="example.vuetifyDefaults">
            <vjsf
              v-model="data"
              :schema="example.schema"
              :precompiled-layout="layout"
              :options="renderOptions"
            >
              <!-- forward page-defined slots (named Vue slots demos) -->
              <template v-for="(_, name) in $slots" #[name]="slotProps">
                <slot :name="name" v-bind="slotProps" />
              </template>
            </vjsf>
          </v-defaults-provider>
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
because the pre lives inside the child CodeBlock component. margin: 0
cancels the `.markdown-body pre.code-block` rhythm rule (styles.css) that
would otherwise leak in here — the pane's own padding already spaces it. */
.source-window :deep(.code-block) {
  max-height: 50dvh;
  margin: 0;
}
</style>
