<template>
  <v-app>
    <v-app-bar border="b" flat>
      <router-link class="d-flex align-center px-2" to="/">
        <img alt="VJSF" height="28" :src="logoSrc" />
      </router-link>
      <!-- Hamburger only on small screens (hidden lg+ via CSS, not v-if, to
      keep SSR/hydration markup stable), placed to the right of the logo. -->
      <v-app-bar-nav-icon class="d-lg-none" @click="drawer = !drawer" />
      <ClientOnly>
        <DocSearch />
      </ClientOnly>
      <v-spacer />

      <v-btn
        prepend-icon="mdi-pencil"
        label="Playground"
        to="/editor"
      />
      <v-divider class="mx-2" inset vertical />
      <v-btn
        class="d-none d-md-inline-flex mr-2"
        color="primary"
        href="https://github.com/sponsors/koumoul-dev"
        rel="noopener"
        target="_blank"
        variant="outlined"
        rounded
      >
        <template #prepend>
          <v-icon color="pink-accent-3" icon="mdi-heart" />
        </template>
        Sponsor
      </v-btn>
      <v-btn
        href="https://github.com/koumoul-dev/vuetify-jsonschema-form"
        icon="mdi-github"
        rel="noopener"
        target="_blank"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="lgAndUp"
      :temporary="!lgAndUp"
    >
      <v-list nav>
        <template v-for="(item, i) in nav" :key="item.to">
          <v-list-subheader v-if="item.section && item.section !== nav[i - 1]?.section">
            {{ item.section }}
          </v-list-subheader>
          <v-list-item :title="item.title" :to="item.to" />
        </template>
      </v-list>

      <template #append>
        <div class="d-flex align-center justify-center ga-4 pa-3 text-caption text-medium-emphasis">
          <a
            v-if="commitHash"
            class="d-inline-flex align-center text-decoration-none text-medium-emphasis"
            rel="noopener"
            target="_blank"
            title="Source commit"
            :href="commitUrl"
          >
            <v-icon class="mr-1" icon="mdi-source-commit" size="small" />{{ commitHash }}
          </a>
          <span class="d-inline-flex align-center" title="VJSF version">
            <v-icon class="mr-1" icon="mdi-tag-outline" size="small" />{{ appVersion }}
          </span>
        </div>
      </template>
    </v-navigation-drawer>

    <ClientOnly>
      <PageToc :page-key="routePath" />
    </ClientOnly>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useDisplay } from 'vuetify'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useNav } from './nav/use-nav'
import DocSearch from './components/DocSearch.vue'
import PageToc from './components/PageToc.vue'
import { appVersion, commitHash, commitUrl } from './build-info'

const nav = useNav()

// Left nav is permanent on large screens (same lg breakpoint as the right-hand
// TOC) and collapses to a temporary overlay toggled by the app-bar hamburger
// below it, matching the Vuetify docs. Open by default on large, closed on
// small; the watch keeps that in sync across resizes.
const { lgAndUp } = useDisplay()
const drawer = ref(true)
watch(lgAndUp, v => { drawer.value = v }, { immediate: true })

// Base-safe logo URL: `import.meta.env.BASE_URL` carries the configured base
// (with trailing slash) so this also resolves under the versioned subpath
// base used at deploy time. Computed here (not inline in the template)
// because the Vue template expression parser rejects `import.meta` — it
// parses expressions with sourceType "script", not "module".
const logoSrc = `${import.meta.env.BASE_URL}vjsf-title-white.svg`

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
