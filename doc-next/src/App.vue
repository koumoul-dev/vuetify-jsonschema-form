<template>
  <v-app>
    <AppBar v-model:drawer="drawer" />

    <AppDrawer v-model="drawer" />

    <ClientOnly>
      <PageToc :page-key="routePath" />
    </ClientOnly>

    <v-main>
      <!-- Full-bleed routes (the playground) manage their own width/height
      and scroll internally; the homepage scrolls normally but lays out its
      own full-width sections; everything else gets the centered container. -->
      <router-view v-if="isFullBleed || isFullWidth" />
      <v-container v-else>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useDisplay } from 'vuetify'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import AppBar from './components/AppBar.vue'
import AppDrawer from './components/AppDrawer.vue'
import PageToc from './components/PageToc.vue'

// Left nav is permanent on large screens (same lg breakpoint as the right-hand
// TOC) and collapses to a temporary overlay toggled by the app-bar hamburger
// below it, matching the Vuetify docs. Open by default on large, closed on
// small; the watch keeps that in sync across resizes.
const { lgAndUp } = useDisplay()
const drawer = ref(true)
watch(lgAndUp, v => { drawer.value = v }, { immediate: true })

// Route is read off global properties (not `useRoute()`) for the same reason
// as [category].vue / DocSearch.vue: this workspace has two coexisting
// vue-router copies, and a bare `import { useRoute } from 'vue-router'` here
// resolves to the nested one, whose injection key doesn't match the router
// vite-ssg actually installed. `$route` is reactive (get: () => unref(currentRoute)).
const instance = getCurrentInstance()
const route = computed(() => (
  instance?.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded | undefined
))
const routePath = computed(() => route.value?.path ?? '/')

// Routes that fill the whole main area (no centered container, no page
// scroll) — just the playground for now.
const isFullBleed = computed(() => routePath.value === '/editor')

// The homepage still scrolls normally (unlike full-bleed routes) but manages
// its own section widths/containers, so it also skips the global centered
// v-container.
const isFullWidth = computed(() => routePath.value === '/')

// Matches `scroll-margin-top` on headings in styles.css.
const SCROLL_OFFSET = 80

// Deep-link support: scroll to the `#hash` section once its content has
// rendered. vue-router isn't configured with a scrollBehavior, and native
// in-page "#" clicks are handled by the browser directly (they don't route
// through here). Re-scroll until the anchor actually sits at the target
// viewport position and stays there — this must be position-based (not
// absolute-offset based) because two things move the anchor after the first
// frame and each must be undone: category pages mount async example widgets
// that shift content above the anchor, and closing the search dialog restores
// focus to the app-bar trigger, which scrolls the page back to the top. Stop
// once the anchor has held its target for a few consecutive checks, or after a
// ~2s safety cap.
function scrollToHash () {
  const hash = route.value?.hash
  if (!hash) return
  const id = decodeURIComponent(hash.slice(1))
  let tries = 0
  let okStreak = 0
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      const doc = document.documentElement
      const top = el.getBoundingClientRect().top
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2
      // "Good" = at the offset line, or as close as a short page allows.
      if (Math.abs(top - SCROLL_OFFSET) <= 2 || (atBottom && top <= SCROLL_OFFSET + 2)) {
        if (++okStreak >= 3) return
      } else {
        okStreak = 0
        el.scrollIntoView()
      }
    }
    if (tries++ < 34) setTimeout(attempt, 60)
  }
  nextTick(() => requestAnimationFrame(attempt))
}
onMounted(scrollToHash)
watch(() => route.value?.fullPath, scrollToHash)
</script>
