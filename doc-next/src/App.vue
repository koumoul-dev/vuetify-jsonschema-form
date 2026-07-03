<script setup lang="ts">
import { ref } from 'vue'
import { useNav } from './nav/use-nav'
const drawer = ref(true)
const nav = useNav()
// Base-safe logo URL: `import.meta.env.BASE_URL` carries the configured base
// (with trailing slash) so this also resolves under the versioned subpath
// base used at deploy time. Computed here (not inline in the template)
// because the Vue template expression parser rejects `import.meta` — it
// parses expressions with sourceType "script", not "module".
const logoSrc = `${import.meta.env.BASE_URL}vjsf-full-white.svg`
</script>

<template>
  <v-app>
    <v-app-bar flat border="b">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <router-link to="/" class="d-flex align-center px-2">
        <img :src="logoSrc" alt="VJSF" height="28" />
      </router-link>
      <v-spacer />
      <v-btn
        icon="mdi-github"
        href="https://github.com/koumoul-dev/vuetify-jsonschema-form"
        target="_blank"
        rel="noopener"
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item
          v-for="item in nav"
          :key="item.to"
          :title="item.title"
          :to="item.to"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
