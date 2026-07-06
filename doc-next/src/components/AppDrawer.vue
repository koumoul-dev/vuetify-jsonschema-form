<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="lgAndUp"
    :temporary="!lgAndUp"
  >
    <v-list v-model:opened="opened" color="primary" nav>
      <v-list-group
        v-for="group in nav.groups"
        :key="group.dir"
        :value="group.dir"
      >
        <template #activator="{ props: activatorProps }">
          <v-list-item v-bind="activatorProps" :prepend-icon="group.icon">{{ group.title }}</v-list-item>
        </template>
        <template v-for="(item, i) in group.items" :key="item.to">
          <v-list-subheader
            v-if="item.subsection && item.subsection !== group.items[i - 1]?.subsection"
            class="text-uppercase"
          >
            {{ item.subsection }}
          </v-list-subheader>
          <v-list-item :title="item.title" :to="item.to" density="compact" />
        </template>
      </v-list-group>
    </v-list>

    <!-- Footer: version + build commit as slim text buttons, mirroring the
    Vuetify docs drawer append (mdi-tag-outline / mdi-source-commit). -->
    <template #append>
      <v-divider />
      <div class="d-flex align-center overflow-hidden pa-2 text-medium-emphasis">
        <div class="d-flex ms-auto ga-1">
          <v-btn
            v-if="commitHash"
            class="text-body-small"
            :href="commitUrl"
            prepend-icon="mdi-source-commit"
            rel="noopener noreferrer"
            size="small"
            target="_blank"
            :text="commitHash"
            title="Build commit"
            variant="text"
            slim
          />

          <v-btn
            class="text-body-small"
            href="https://github.com/koumoul-dev/vuetify-jsonschema-form/releases"
            prepend-icon="mdi-tag-outline"
            rel="noopener noreferrer"
            size="small"
            target="_blank"
            :text="appVersion"
            title="VJSF version — release notes"
            variant="text"
            slim
          />
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { useDisplay } from 'vuetify'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useNav } from '../utils/nav/use-nav'
import { appVersion, commitHash, commitUrl } from '../build-info'

const drawer = defineModel<boolean>({ default: false })

const nav = useNav()
const { lgAndUp } = useDisplay()

// Route is read off global properties (not `useRoute()`) — same reason as
// App.vue: this workspace has two coexisting vue-router copies, and a bare
// `import { useRoute } from 'vue-router'` here resolves to the nested one,
// whose injection key doesn't match the router vite-ssg actually installed.
const instance = getCurrentInstance()
const route = computed(() => (
  instance?.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded | undefined
))
const routePath = computed(() => route.value?.path ?? '/')

// Auto-open the group owning the current route.
const opened = ref<string[]>([])
watch(routePath, (path) => {
  const current = nav.groups.find(g => g.items.some(item => item.to === path))
  if (current && !opened.value.includes(current.dir)) opened.value = [...opened.value, current.dir]
}, { immediate: true })
</script>
