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

// Left nav: permanent on large screens, temporary overlay toggled by the
// app-bar hamburger below that — matching the Vuetify docs.
const { lgAndUp } = useDisplay()
const drawer = ref(true)
watch(lgAndUp, v => { drawer.value = v }, { immediate: true })

// Route read off global properties, not `useRoute()`: two coexisting
// vue-router copies in the workspace (see DocSearch.vue). `$route` is reactive.
const instance = getCurrentInstance()
const route = computed(() => (
  instance?.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded | undefined
))
const routePath = computed(() => route.value?.path ?? '/')

// Routes that fill the whole main area — just the playground for now.
const isFullBleed = computed(() => routePath.value === '/editor')

// The homepage scrolls normally but manages its own section widths, so it
// also skips the global centered v-container.
const isFullWidth = computed(() => routePath.value === '/')

// Matches `scroll-margin-top` on headings in styles.css.
const SCROLL_OFFSET = 80

// Deep-link support: scroll to the `#hash` section once its content has
// rendered, and re-scroll until the anchor holds its target position — async
// example widgets and the search dialog's focus restore both move the page
// after the first frame. Stops after a few stable checks or a ~2s cap.
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
