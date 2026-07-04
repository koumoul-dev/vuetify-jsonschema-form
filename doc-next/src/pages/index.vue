<template>
  <div>
    <!-- Hero -->
    <v-container class="text-center py-16 py-md-16">
      <img alt="VJSF" class="mb-6" height="56" :src="logoSrc" />
      <h1 class="text-display-small mb-4">VJSF &mdash; Vuetify JSON Schema Form</h1>
      <p class="text-headline-small text-medium-emphasis mb-8 mx-auto tagline">
        Easily create beautiful forms that output valid data.
      </p>
      <div class="d-flex flex-wrap justify-center ga-4">
        <v-btn
          class="text-none"
          color="primary"
          size="large"
          text="Get started"
          to="/introduction/getting-started"
        />
        <v-btn
          class="text-none"
          size="large"
          text="Open the playground"
          to="/editor"
          variant="tonal"
        />
      </div>
    </v-container>

    <!-- Live demo -->
    <v-container class="py-8 py-md-16">
      <v-row align="center">
        <v-col cols="12" md="5">
          <h2 class="text-headline-large mb-4">See it in action</h2>
          <p class="text-body-large text-medium-emphasis">
            One annotated JSON schema in, a complete Vuetify form out &mdash; validation included.
          </p>
        </v-col>
        <v-col cols="12" md="7">
          <VjsfDemo demo="demo-home/hero" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Selling points -->
    <v-container class="py-8 py-md-16">
      <v-row>
        <v-col v-for="point in sellingPoints" :key="point.title" cols="12" md="4">
          <v-card class="h-100 pa-2" variant="tonal">
            <v-card-item>
              <template #prepend>
                <v-icon color="primary" :icon="point.icon" size="32" />
              </template>
              <v-card-title class="text-wrap">{{ point.title }}</v-card-title>
            </v-card-item>
            <v-card-text>{{ point.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer links -->
    <v-container class="py-8 py-md-16 text-center">
      <div class="d-flex flex-wrap justify-center ga-6">
        <a
          class="text-medium-emphasis text-decoration-none"
          href="https://github.com/koumoul-dev/vuetify-jsonschema-form"
          rel="noopener"
          target="_blank"
        >
          <v-icon class="mr-1" icon="mdi-github" />GitHub
        </a>
        <a
          class="text-medium-emphasis text-decoration-none"
          href="https://www.npmjs.com/package/@koumoul/vjsf"
          rel="noopener"
          target="_blank"
        >
          <v-icon class="mr-1" icon="mdi-npm" />npm
        </a>
        <a
          class="text-medium-emphasis text-decoration-none"
          href="https://json-layout.github.io"
          rel="noopener"
          target="_blank"
        >
          <v-icon class="mr-1" icon="mdi-view-dashboard-outline" />JSON Layout
        </a>
        <a
          class="text-medium-emphasis text-decoration-none"
          href="https://koumoul.com"
          rel="noopener"
          target="_blank"
        >
          <v-icon class="mr-1" icon="mdi-domain" />Koumoul
        </a>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

// Base-safe logo URL, same pattern/asset as AppBar.vue (see its comment for
// why `import.meta.env.BASE_URL` is used and why it's computed here rather
// than inlined in the template).
const logoSrc = `${import.meta.env.BASE_URL}vjsf-title-white.svg`

const sellingPoints = [
  {
    icon: 'mdi-code-json',
    title: 'Schema-driven',
    description: 'Describe your data once as a JSON schema and let VJSF generate the whole form for you.',
  },
  {
    icon: 'mdi-check-decagram-outline',
    title: 'Valid data',
    description: 'Ajv validation is built in, so the data your form produces always matches the schema.',
  },
  {
    icon: 'mdi-puzzle-outline',
    title: 'Complete',
    description: 'Supports all JSON Schema constructs, from simple types to conditionals and compositions.',
  },
  {
    icon: 'mdi-power-plug-outline',
    title: 'Extensible',
    description: 'Customize almost anything through plugins and slots without forking the library.',
  },
  {
    icon: 'mdi-translate',
    title: 'i18n',
    description: 'Ships with 4 built-in locales, and it is easy to add or override translations.',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Build-time compilation',
    description: 'Layouts can be compiled ahead of time, keeping runtime overhead to a minimum.',
  },
]

useHead(() => ({
  title: 'VJSF - Vuetify JSON Schema Form',
  meta: [
    { name: 'description', content: 'Easily create beautiful forms that output valid data.' },
  ],
}))
</script>

<style scoped>
.tagline {
  max-width: 640px;
}
</style>
