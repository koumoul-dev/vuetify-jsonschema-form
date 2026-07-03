<template>
  <!-- Trigger: a compact medium-emphasis text button (Vuetify docs style) — a
  magnify icon, the "Search" label, and the platform-aware shortcut in a single
  bordered chip. Collapses to a bare magnify icon on xs. -->
  <v-btn
    class="doc-search-trigger text-none"
    color="medium-emphasis"
    :icon="xs"
    :prepend-icon="xs ? undefined : 'mdi-magnify'"
    variant="text"
    @click="open"
  >
    <!-- Render the icon ourselves rather than via the string `icon` prop: with a
    default slot present, v-btn would otherwise show the (empty) slot instead. -->
    <v-icon v-if="xs" icon="mdi-magnify" />
    <span v-else class="d-inline-flex align-center">
      Search
      <span class="doc-search-trigger__kbd ms-2 px-2 py-1 border rounded text-disabled text-body-small">
        {{ shortcut }}
      </span>
    </span>
  </v-btn>

  <v-dialog
    v-model="dialog"
    class="doc-search-dialog"
    max-width="600"
    scrim="black"
  >
    <v-card class="doc-search-card" @keydown="onKeydown">
      <div class="pa-3">
        <v-text-field
          ref="fieldRef"
          v-model="query"
          density="comfortable"
          placeholder="Search the documentation"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          autofocus
          clearable
          flat
          hide-details
        />
      </div>
      <v-divider />

      <div class="doc-search-results" style="max-height: 60vh; overflow-y: auto">
        <v-list v-if="results.length" class="py-0" density="comfortable">
          <v-list-item
            v-for="(r, i) in results"
            :key="r.id"
            :active="i === activeIndex"
            :to="r.path"
            @click="dialog = false"
            @mouseenter="activeIndex = i"
          >
            <template #prepend>
              <v-icon icon="mdi-file-document-outline" size="small" />
            </template>
            <v-list-item-title>{{ r.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ r.path }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div v-else-if="failed" class="pa-8 text-center text-medium-emphasis">
          Search index unavailable
        </div>
        <div v-else-if="(query ?? '').trim().length > 1" class="pa-8 text-center text-medium-emphasis">
          No results for “{{ query }}”
        </div>
        <div v-else class="pa-8 text-center text-medium-emphasis">
          Type to search the documentation
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, getCurrentInstance } from 'vue'
import { useDisplay } from 'vuetify'
import type { Router } from 'vue-router'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { useSearch } from '../search/use-search'

// Backend is the existing local minisearch index (offline, no Algolia) — only
// the UI changes: a compact search trigger in the app bar that opens a modal
// dialog (Vuetify / VitePress local-search style), with keyboard nav.
const { query, results, run } = useSearch()

// Platform-aware shortcut label shown in the trigger chip. This component only
// renders on the client (wrapped in <ClientOnly>), so `platform` is resolved,
// not the SSR fallback.
const { xs, platform } = useDisplay()
const shortcut = computed(() => (platform.value.mac ? '⌘K' : 'Ctrl+K'))

const dialog = ref(false)
const failed = ref(false)
const activeIndex = ref(0)
const fieldRef = ref<{ focus?: () => void } | null>(null)

// Router is read off global properties (not `useRouter()`): this workspace has
// two coexisting vue-router copies, and a bare import resolves to the nested
// one, whose injection key doesn't match the router vite-ssg installed. Used
// only for keyboard (Enter) navigation; mouse clicks use `:to` on the items.
const router = getCurrentInstance()?.appContext.config.globalProperties.$router as Router | undefined

async function safeRun () {
  try {
    failed.value = false
    await run()
  } catch {
    // search-index.json fetch failed (not generated, offline) — show the
    // failure state rather than letting the rejection bubble up.
    failed.value = true
  }
  activeIndex.value = 0
}
const debouncedRun = useDebounceFn(safeRun, 150)

watch(query, () => {
  if ((query.value ?? '').trim().length > 1) debouncedRun()
  else { results.value = []; activeIndex.value = 0 }
})

function open () {
  dialog.value = true
  // Focus once the dialog content has mounted.
  nextTick(() => fieldRef.value?.focus?.())
}

// Reset when the dialog closes (Esc, backdrop, or after navigating) so it
// reopens empty.
watch(dialog, v => {
  if (!v) { query.value = ''; results.value = []; activeIndex.value = 0; failed.value = false }
})

function navigate (path: string) {
  router?.push(path)
  dialog.value = false
}

// Global shortcut: Ctrl/Cmd+K opens the dialog.
useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open() }
})

// In-dialog keyboard navigation over the results.
function onKeydown (e: KeyboardEvent) {
  const n = results.value.length
  if (!n) return
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex.value = (activeIndex.value + 1) % n }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex.value = (activeIndex.value - 1 + n) % n }
  else if (e.key === 'Enter') {
    e.preventDefault()
    const r = results.value[activeIndex.value]
    if (r) navigate(r.path)
    return
  } else { return }
  // Keep the highlighted result in view.
  nextTick(() => document
    .querySelector('.doc-search-results .v-list-item--active')
    ?.scrollIntoView({ block: 'nearest' }))
}
</script>

<style scoped>
/* Compact text-button trigger (Vuetify docs style). Left-align the label + chip
   next to the leading magnify icon; keep the font at natural weight/case. */
.doc-search-trigger {
  margin-inline-start: 4px;
  font-weight: 400;
  letter-spacing: normal;
}
/* The shortcut chip: a quiet bordered box that reads as one unit ("Ctrl+K"). */
.doc-search-trigger__kbd {
  line-height: 1;
  white-space: nowrap;
}
</style>

<style>
/* Non-scoped: v-dialog teleports its overlay to <body>, so the scoped data
   attribute never reaches it. Align the dialog near the top like a command
   palette instead of vertically centered. */
.doc-search-dialog > .v-overlay__content {
  align-self: flex-start;
  margin-top: 12vh;
}
</style>
