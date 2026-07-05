<template>
  <v-card variant="flat">
    <v-table density="compact" class="i18n-messages-table border rounded">
      <thead>
        <tr>
          <th>Key</th>
          <th v-for="locale in locales" :key="locale">{{ locale }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in keys" :key="key">
          <td><code>{{ key }}</code></td>
          <td v-for="locale in locales" :key="locale">{{ i18n[locale][key] }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
// The key x locale table is generated straight from `@json-layout/core`'s own
// locale modules (src/i18n/{en,fr,nl,de}.js), re-exported as `i18n` from the
// package's main entry (`export { default as i18n } from './i18n/index.js'`
// in @json-layout/core/src/index.js) -- there is no `./i18n` subpath in the
// package's `exports` map, so this named import from the root specifier is
// the only supported way to reach it. Single source of truth: no hand-copied
// table to keep in sync.
import { i18n } from '@json-layout/core'

const locales = Object.keys(i18n) as (keyof typeof i18n)[]
const keys = Object.keys(i18n.en) as (keyof typeof i18n.en)[]
</script>

<style scoped>
.i18n-messages-table :deep(code) {
  white-space: nowrap;
}
</style>
