<template>
  <v-navigation-drawer
    v-if="lgAndUp && sections.length"
    color="transparent"
    location="right"
    floating
    permanent
  >
    <v-list bg-color="transparent" density="compact">
      <v-list-subheader>Contents</v-list-subheader>
      <v-list-item
        v-for="section in sections"
        :key="section.id"
        :active="false"
        :class="{ 'ml-4': section.level === 3 }"
        :style="itemStyle(activeId === section.id)"
        @click="select(section.id)"
      >
        <!-- text-wrap: long section titles wrap instead of being truncated -->
        <v-list-item-title class="text-wrap">{{ section.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'

// `pageKey` changes on every route (page content) change; App.vue passes the
// current route path so this component can re-scan the freshly rendered DOM.
// The component reads the rendered page rather than a build-time TOC so it always
// reflects exactly what unplugin-vue-markdown rendered for the current page.
const props = defineProps<{ pageKey: string }>()

interface Section { id: string, title: string, level: number }

const { lgAndUp } = useDisplay()
const sections = ref<Section[]>([])
const activeId = ref<string | null>(null)

// Keep in sync with `scroll-margin-top` on headings in src/styles.css.
const SCROLL_OFFSET = 80

// Clean marker (old doc/components/toc.vue style): a left border on the active
// item rather than a filled highlight. See the matching `:active="false"`.
function itemStyle (active: boolean): string {
  return `border-left: 2px solid ${active ? 'rgb(var(--v-theme-primary))' : 'transparent'};`
}

// Heading text without the leading "#" permalink (a `.header-anchor` child).
function headingTitle (el: Element): string {
  const clone = el.cloneNode(true) as HTMLElement
  clone.querySelector('.header-anchor')?.remove()
  return (clone.textContent ?? '').trim()
}

function scan () {
  const main = document.querySelector('.v-main')
  if (!main) { sections.value = []; return }
  const els = Array.from(main.querySelectorAll<HTMLElement>('h2[id], h3[id]'))
  sections.value = els.map(el => ({
    id: el.id,
    title: headingTitle(el),
    level: Number(el.tagName[1]),
  }))
  findActive()
}

// Highlight the last heading whose top has scrolled past the offset line.
function findActive () {
  const list = sections.value
  if (!list.length) { activeId.value = null; return }
  let current = list[0].id
  for (let i = list.length - 1; i >= 0; i--) {
    const el = document.getElementById(list[i].id)
    if (!el) continue
    if (el.getBoundingClientRect().top - SCROLL_OFFSET - 4 <= 0) {
      current = list[i].id
      break
    }
  }
  // At the very bottom the last heading may never cross the line: force it.
  const doc = document.documentElement
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 1) {
    current = list[list.length - 1].id
  }
  activeId.value = current
}

let timeout: ReturnType<typeof setTimeout> | undefined
function onScroll () {
  clearTimeout(timeout)
  timeout = setTimeout(findActive, 17)
}

function select (id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(history.state, '', '#' + id)
  activeId.value = id
}

// nextTick lets the new page's DOM render; the extra rAF covers pages whose
// example widgets (VjsfDemo/VjsfExample) mount a frame later (headings exist
// immediately, but this also refreshes scroll-spy offsets once bodies have laid out).
function rescan () {
  nextTick(() => requestAnimationFrame(scan))
}

watch(() => props.pageKey, rescan)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  rescan()
})
onUnmounted(() => {
  clearTimeout(timeout)
  window.removeEventListener('scroll', onScroll)
})
</script>
