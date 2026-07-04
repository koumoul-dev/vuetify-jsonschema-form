<template>
  <div>
    <!-- Hero -->
    <v-container class="text-center py-16 py-md-16">
      <!-- The logo image carries the page title: its alt is the h1's accessible
      name, so the heading stays in the document outline without duplicating
      the text already drawn in the logo. -->
      <h1 class="mb-6">
        <img alt="VJSF &mdash; Vuetify JSON Schema Form" height="80" :src="logoSrc" />
      </h1>
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
    <v-container class="pb-8 pb-md-16">
      <div class="text-center mb-8">
        <h2 class="text-headline-large mb-4">See it in action</h2>
        <p class="text-body-large text-medium-emphasis mx-auto tagline">
          One annotated JSON schema in, a complete Vuetify form out &mdash; validation included.
        </p>
      </div>
      <div class="demo-wrapper mx-auto">
        <VjsfDemo demo="demo-home/hero" />
      </div>
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
      <div class="d-flex flex-wrap justify-center ga-2">
        <v-btn
          v-for="link in footerLinks"
          :key="link.href"
          class="text-none text-medium-emphasis"
          :href="link.href"
          :prepend-icon="link.icon"
          rel="noopener"
          target="_blank"
          :text="link.text"
          :title="link.title"
          variant="text"
        />
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

// Base-safe logo URL, same pattern as AppBar.vue (see its comment for
// why `import.meta.env.BASE_URL` is used and why it's computed here rather
// than inlined in the template).
const logoSrc = `${import.meta.env.BASE_URL}vjsf-full-white.svg`

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
    description: 'Ships with 4 built-in locales — English, French, German and Dutch — and it is easy to add or override translations.',
  },
  {
    icon: 'mdi-rocket-launch-outline',
    title: 'Build-time compilation',
    description: 'Static schemas can be compiled into standalone Vue components at build time, keeping the form compiler and Ajv out of your bundle.',
  },
]

const footerLinks = [
  {
    text: 'GitHub',
    icon: 'mdi-github',
    href: 'https://github.com/koumoul-dev/vuetify-jsonschema-form',
    title: 'VJSF repository on GitHub',
  },
  {
    text: 'npm',
    icon: 'mdi-npm',
    href: 'https://www.npmjs.com/package/@koumoul/vjsf',
    title: '@koumoul/vjsf package on npm',
  },
  {
    text: 'JSON Layout',
    icon: 'mdi-view-dashboard-outline',
    href: 'https://json-layout.github.io',
    title: 'JSON Layout documentation',
  },
  {
    text: 'Koumoul',
    icon: 'mdi-domain',
    href: 'https://koumoul.com',
    title: 'Koumoul website',
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

.demo-wrapper {
  max-width: 860px;
}
</style>
