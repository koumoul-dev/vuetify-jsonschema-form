---
title: Getting started
description: Install VJSF and start using it in your projects
nav:
  order: 2
---

# Getting started

> VJSF and its core *JSON Layout* are not pre-bundled. They are distributed
> as pure ESM modules written in JS code with type annotations. The
> transpiling, tree-shaking, minifying, etc should be performed on your
> side.

Install from npm:

```bash
npm install @koumoul/vjsf
```

## Compile at runtime

This is the simplest way to use VJSF. If you work with static schemas you
might want to look into compiling at build time instead.

```vue
<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
</script>
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" :options="options" />
  </v-form>
</template>
```

## Compile at build time

This is a more advanced way of using VJSF. All pre-processing that can be
done prior to execution is done at build time, this includes compiling
validation functions, compiling expression functions, normalizing the
layout keywords and building a skeleton tree of the components that will
be used to render the form.

In the build script:

```js
import compile from '@koumoul/vjsf-compiler'
const code = compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)
```

In the page:

```vue
<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
</script>
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>
```

## CommonJS dependencies

Unfortunately some of the dependencies used by vjsf are published in the
CommonJS format. This breaks homogeneity with the otherwise ESM modules of
this library. You might need to inform your build system, for example with
Vite:

```js
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'
// ...
  optimizeDeps: {
    include: commonjsDeps,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
// ...
```

When changing these parameters in Vite some caching can create confusion,
in this case you can use `vite --force` or remove `node_modules/.cache/vite`.
