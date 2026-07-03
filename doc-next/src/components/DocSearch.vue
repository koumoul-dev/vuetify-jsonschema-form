<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { useSearch } from '../search/use-search'

const { query, results, run } = useSearch()
const open = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const failed = ref(false)

async function safeRun () {
  try {
    failed.value = false
    await run()
  } catch {
    // search-index.json fetch failed (e.g. not generated, offline) — show no
    // results rather than letting an unhandled rejection bubble up.
    failed.value = true
  }
}

const debouncedRun = useDebounceFn(safeRun, 150)
watch(query, () => {
  if (query.value.trim().length > 1) { debouncedRun(); open.value = true } else { open.value = false }
})

// Navigation itself is delegated to the `to` prop below (resolved through
// Vuetify's own router integration) rather than `useRouter()` here: this
// workspace currently has two `vue-router` copies installed (root vs.
// doc-next-nested, see doc-next/package.json), and a bare `import ... from
// 'vue-router'` in this file resolves to the nested one — whose injection
// key doesn't match the router instance vite-ssg actually installs. `to`
// sidesteps that because it's resolved via the global `RouterLink`
// component / `$router` global property, which are consistent regardless
// of which copy resolves a given file's import.
function go () {
  open.value = false
  query.value = ''
}

// Cmd/Ctrl+K focuses the field
useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); inputRef.value?.focus() }
})
</script>

<template>
  <v-menu v-model="open" :close-on-content-click="false" location="bottom">
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        ref="inputRef"
        v-model="query"
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search  (Ctrl+K)"
        class="mx-2"
        style="max-width: 320px"
      />
    </template>
    <v-list v-if="results.length" density="compact" data-search-results>
      <v-list-item
        v-for="r in results"
        :key="r.id"
        :to="r.path"
        :title="r.title"
        :subtitle="r.path"
        @click="go"
      />
    </v-list>
    <v-list v-else-if="failed" density="compact">
      <v-list-item title="Search unavailable" subtitle="Could not load the search index" />
    </v-list>
    <v-list v-else-if="query.trim().length > 1" density="compact">
      <v-list-item title="No results" />
    </v-list>
  </v-menu>
</template>
