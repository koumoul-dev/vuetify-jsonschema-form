<template>
  <v-app-bar border="b" flat>
    <router-link class="d-flex align-center px-2" to="/">
      <img alt="VJSF" height="28" :src="logoSrc" />
    </router-link>

    <!-- Hamburger only on small screens (hidden lg+ via CSS, not v-if, to keep
    SSR/hydration markup stable), placed to the right of the logo. -->
    <v-app-bar-nav-icon class="d-lg-none" @click="drawer = !drawer" />

    <ClientOnly>
      <DocSearch />
    </ClientOnly>

    <v-spacer />

    <v-btn
      class="text-none"
      append-icon="mdi-play"
      text="Playground"
      to="/editor"
      variant="outlined"
    />

    <v-divider 
    class="ml-2 mr-1 mx-md-4 align-self-center" 
    length="20" 
    vertical 
    />

    <!-- Native `title` (not v-tooltip) for the hover hint, per request; the
    aria-label carries the accessible name for assistive tech. -->
    <v-btn
      aria-label="Sponsor VJSF"
      class="d-none d-md-inline-flex mr-2 text-none"
      color="primary"
      href="https://github.com/sponsors/koumoul-dev"
      rel="noopener"
      target="_blank"
      title="Sponsor VJSF's development"
      variant="outlined"
      rounded
    >
      <template #append>
        <v-icon color="pink-accent-3" icon="mdi-heart" />
      </template>
      Sponsor
    </v-btn>

    <v-btn
      aria-label="VJSF on GitHub"
      href="https://github.com/koumoul-dev/vuetify-jsonschema-form"
      icon="mdi-github"
      rel="noopener"
      target="_blank"
      title="View source on GitHub"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import DocSearch from './DocSearch.vue'

// Drawer open state is owned by App.vue (it also syncs to the lg breakpoint);
// the app-bar hamburger toggles it through this two-way binding.
const drawer = defineModel<boolean>('drawer', { default: false })

// Base-safe logo URL: `import.meta.env.BASE_URL` carries the configured base
// (with trailing slash) so this also resolves under the versioned subpath base
// used at deploy time. Computed here (not inline in the template) because the
// Vue template expression parser rejects `import.meta` — it parses expressions
// with sourceType "script", not "module".
const logoSrc = `${import.meta.env.BASE_URL}vjsf-title-white.svg`
</script>
