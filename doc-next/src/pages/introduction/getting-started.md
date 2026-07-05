---
title: Getting started
description: Install VJSF and start using it in your projects
nav:
  order: 1
---

# Getting started

<v-alert type="warning" variant="outlined" class="my-4">
VJSF and its core <i>JSON Layout</i> are not pre-bundled. They are
distributed as pure ESM modules written in JS code with type annotations.
The transpiling, tree-shaking, minifying, etc should be performed on your
side.
</v-alert>

Install from npm:

```bash
npm install @koumoul/vjsf
```

## Your first form

The simplest way to use VJSF is to compile the schema at runtime: pass a
JSON schema to the `vjsf` component and it renders a form.

```vue
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" />
  </v-form>
</template>

<script setup>
  import { ref } from 'vue'
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'

  const data = ref({})
  const schema = {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title' },
      description: { type: 'string', title: 'Description', layout: 'textarea' },
      dueDate: { type: 'string', title: 'Due date', format: 'date' },
    },
  }
</script>
```

<VjsfDemo demo="demo-getting-started/first-form" />

## Going further

- If you work with static schemas, [compile at build time](/behavior/compilation)
  instead for better performance and a smaller runtime footprint.
- Some of VJSF's dependencies are published as CommonJS; see
  [compilation](/behavior/compilation) for the build configuration this
  requires.
- Explore the available [options](/behavior/options) to customize
  validation, density, internationalization, and more.
- Try schemas interactively in the [editor](/editor).
