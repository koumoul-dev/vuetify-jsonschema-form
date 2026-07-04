<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="lgAndUp"
    :temporary="!lgAndUp"
  >
    <v-list nav>
      <template v-for="(item, i) in items" :key="item.to">
        <v-list-subheader v-if="item.subsection && item.subsection !== items[i - 1]?.subsection">
          {{ item.subsection }}
        </v-list-subheader>
        <v-list-item :title="item.title" :to="item.to" />
      </template>
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
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useNav } from '../nav/use-nav'
import { appVersion, commitHash, commitUrl } from '../build-info'

const drawer = defineModel<boolean>({ default: false })

const nav = useNav()
// TEMPORARY: flattens the grouped Nav back into the old flat list so this
// component keeps compiling/working during the redesign. Task 2 replaces
// this whole component with a proper collapsible-group rendering.
const items = computed(() => [...nav.standalone, ...nav.groups.flatMap(g => g.items)])
const { lgAndUp } = useDisplay()
</script>
