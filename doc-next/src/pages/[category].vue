<template>
  <v-container v-if="category">
    <h1 class="text-display-small mb-6">{{ category.title }}</h1>
    <MarkdownInline class="mb-6" :content="category.description" />

    <!--
      Keyed on `category.id/example.id` (not just `example.id`): one example
      id ("sections") is reused across two different categories (composite
      and v2-compat), and Vue only allows one `:key` per `<template v-for>`
      block (it applies to every root node produced by that iteration,
      including the VjsfExample below -- an extra `:key` on VjsfExample
      itself is a compiler error: "key should be placed on the <template>
      tag"). VjsfExample seeds its `data` ref once at setup() from
      `props.example.data`, so if this key collided across a client-side nav
      from one category to the other, Vue would patch the existing
      VjsfExample instance in place instead of recreating it, leaving the
      previous category's stale data/layout on screen instead of loading the
      new example's. The compound key guarantees a fresh instance per
      example, even across that collision.
    -->
    <template v-for="example in category.examples" :key="`${category.id}/${example.id}`">
      <h2 class="text-headline-large mt-8 mb-3" :id="example.id">
        <!-- Hover-reveal "#" permalink, styled by .header-anchor in styles.css
        (parity with markdown pages' markdown-it-anchor permalinks). Clicking
        sets the URL hash so the deep link is copyable from the address bar;
        scroll-margin-top keeps it clear of the app bar. -->
        <a aria-hidden="true" class="header-anchor" :href="`#${example.id}`">#</a>{{ example.title }}
      </h2>
      <v-alert
        v-if="example.warning"
        class="mb-4"
        type="warning"
        variant="outlined"
      >
        {{ example.warning }}
      </v-alert>
      <MarkdownInline class="mb-2" :content="example.description" />
      <VjsfExample
        :example="example"
        :layout-key="`${category.id}/${example.id}`"
        :v2compat="category.id === 'v2-compat'"
      />
    </template>
  </v-container>

  <v-alert
    v-else
    class="ma-4"
    type="warning"
  >
    No examples category found with id "{{ categoryId }}"
  </v-alert>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useHead } from '@unhead/vue'
import { getExamples } from '../examples'
import VjsfExample from '../components/VjsfExample.vue'
import MarkdownInline from '../components/MarkdownInline.vue'

// Same workaround as VjsfExample.vue's `edit()`: this workspace has two
// coexisting vue-router majors (root vs. doc-next's own nested copy), and a
// bare `import { useRoute } from 'vue-router'` in this file would resolve to
// the nested copy, whose injection key doesn't match the router instance
// vite-ssg actually installs. Reading `$route` off the global properties
// (populated by whichever router the app actually installed) sidesteps
// that. It's still reactive: vue-router defines it as `get: () =>
// unref(currentRoute)`, so reading it inside a computed tracks route
// changes correctly (needed so this page updates in place when the drawer
// nav is used to jump from one category directly to another).
const instance = getCurrentInstance()
const route = computed(() => (
  instance?.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded | undefined
))
const categoryId = computed(() => {
  const param = route.value?.params.category
  return Array.isArray(param) ? param[0] : param
})

const categories = getExamples()
const category = computed(() => categories.find(c => c.id === categoryId.value))

// Parity with the old doc/pages/[categoryId]/index.vue: keep the
// intentionally-incomplete `v2-compat` category and any `_`-prefixed
// "for developers" category (currently only `_dev`) out of search engines,
// while still linking them from the nav drawer (src/nav/use-nav.ts does not
// filter examples categories by id).
const noindex = computed(() => category.value?.id === 'v2-compat' || !!category.value?.id.startsWith('_'))

useHead(() => ({
  title: category.value ? `${category.value.title} - VJSF` : 'Unknown category - VJSF',
  meta: [
    ...(category.value?.description ? [{ name: 'description', content: category.value.description }] : []),
    ...(noindex.value ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ],
}))
</script>
