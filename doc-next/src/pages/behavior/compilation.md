---
title: Compilation
description: Runtime vs build-time compilation of a VJSF schema, and the CommonJS dependencies that come with it
nav:
  order: 1
---

# Compilation

Before a schema can be rendered, VJSF (through its core, *JSON Layout*)
compiles it into a normalized layout: validation functions, expression
functions, and a skeleton tree of the components that will be used to
render the form. This compilation can happen either at runtime, when the
form is first mounted, or ahead of time, at build time.

## Runtime compilation

This is the default and the simplest way to use VJSF. Give the `vjsf`
component a schema, and it compiles and renders the form on mount.
[Options](/behavior/options) can be added but none is required.

```vue
<template>
  <v-form>
    <vjsf v-model="data" :schema="schema" />
  </v-form>
</template>

<script setup>
  import Vjsf from '@koumoul/vjsf'
  import { VForm } from 'vuetify/components'
</script>
```

This is fine for most applications: compilation is fast and only happens
once per mounted form. It is the right choice if your schemas are dynamic
(fetched from a server, assembled at runtime, edited by users) since there
is nothing to precompute ahead of time.

## Build-time compilation

For static schemas, `@koumoul/vjsf-compiler` moves all of the
compilation work out of the browser and into your build script. It
compiles validation functions, expression functions and layout
normalization once, ahead of time, and emits a standalone `.vue`
component with no dependency on the runtime compiler.

In the build script:

```js
import { compile } from '@koumoul/vjsf-compiler'
import { writeFile } from 'node:fs/promises'

const code = await compile(schema, options)
await writeFile('./components/compiled/my-vjsf.vue', code)
```

In the page:

```vue
<template>
  <v-form>
    <my-vjsf v-model="data" :options="options" />
  </v-form>
</template>

<script setup>
  import MyVjsf from './components/compiled/my-vjsf.vue'
  import { VForm } from 'vuetify/components'
</script>
```

Benefits over runtime compilation:

- **smaller bundle**: the runtime compiler and its dependencies (Ajv,
  expression parsing, etc.) are not shipped to the browser
- **no runtime eval**: validation and expression functions are generated
  as plain JavaScript at build time instead of built with `new Function`
  in the browser, which also plays better with strict Content-Security-Policy
  setups

`compile` takes the same [options](/behavior/options) object as the
`vjsf` component, plus two entries that only make sense at build time:

- **pluginsImports** (default `[]`) - an array of plugin package names
  (e.g. `['@koumoul/vjsf-markdown']`) that the compiler resolves to
  generate the plugin imports in the emitted component. It is the
  build-time counterpart of the `plugins` runtime option, which takes the
  already-imported modules and is of no use to the compiler.
- **webmcp** (default `false`) - generates the WebMCP-enabled variant of
  the component (the equivalent of importing `@koumoul/vjsf/webmcp`
  instead of `@koumoul/vjsf` at runtime), which registers the form
  through the browser's `navigator.modelContext` as a set of tools that
  in-page AI agents can discover and use to fill it.

## CommonJS dependencies

Some of the dependencies used by VJSF (Ajv and its companions, `debug`,
`fast-deep-equal`) are published in the CommonJS format. This breaks
homogeneity with the otherwise ESM modules of this library: Vite's dev
server converts CommonJS dependencies on the fly, but only if it knows
about them ahead of time, so list them in `optimizeDeps.include` to avoid
interop errors and page reloads on first access:

```js
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'

export default defineConfig({
  optimizeDeps: {
    include: commonjsDeps,
  },
})
```

This is usually all you need. If your production build fails on one of
these modules because it mixes `import` and `require` statements, also
set `build: { commonjsOptions: { transformMixedEsModules: true } }`.

When changing these parameters, Vite's dependency cache can create
confusion; use `vite --force` or remove `node_modules/.cache/vite` if
things look stale.

## Choosing a mode

| | Runtime compilation | Build-time compilation |
| --- | --- | --- |
| Setup | none, use `vjsf` directly | build script + generated component |
| Schema | can be dynamic | must be known at build time |
| Bundle size | includes the compiler | compiler stays out of the bundle |
| Compilation cost | paid on every mount, in the browser | paid once, ahead of time |

Start with runtime compilation; switch to build-time compilation once a
form's schema is stable and you want to shave its bundle and mount cost.
