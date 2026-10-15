---
title: Using & writing plugins
description: The VJSF plugin system — using a plugin, and writing your own
nav:
  order: 1
---

# Plugins

Components that are lightweight and only depend on Vuetify are built
directly into VJSF. Components that pull in a heavier or more specific
dependency — a markdown editor, an image cropper — are shipped instead
as separate **plugins**, so the core library stays small for
applications that don't need them.

## Using a plugin

Install it like any other package:

```bash
npm install @koumoul/vjsf-markdown
```

What you do next depends on how you [compile](/behavior/compilation)
your schema.

**Build-time compilation:** nothing else to do. Pass `pluginsImports:
['@koumoul/vjsf-markdown']` to `compile()` and it resolves and bundles
the plugin's component alongside the generated form.

**Runtime compilation:** import the plugin and give it to the `vjsf`
component through the `plugins` option. Plugin-specific settings (e.g.
the markdown editor's EasyMDE configuration) go under `pluginsOptions`,
keyed by the plugin's name:

```js
import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'

const options = {
  plugins: [VjsfMarkdown],
  pluginsOptions: {
    markdown: { /* ... */ },
  },
}
```

With that in place, any property whose schema sets `layout: 'markdown'`
(or any other registered plugin's component name) renders through the
plugin instead of a default component. See [markdown](/plugins/markdown)
and [image cropper](/plugins/img-cropper) for the two plugins maintained
alongside VJSF.

## Writing a plugin

A plugin is the recommended way to extend VJSF with a custom component —
much more capable than the [`component` slot](/behavior/slots), since it
participates in compilation, validation and the normal `layout` schema
like any built-in component. Think of a plugin as an optional standard
component added to the vocabulary, and of a slot as a one-off tweak
local to an application. A plugin is a plain object matching this contract
(`lib/src/types.ts`):

```ts
type Plugin = {
  info: ComponentInfo,
  nodeComponent: Component
}
```

- **`info`** is metadata read at *compile* time: a name plus a handful of
  capability flags that tell the compiler/normalizer how to treat the
  component. It never touches the DOM and has no dependency on Vue
  rendering.
- **`nodeComponent`** is the actual Vue component rendered for a node
  using this `layout.comp`. It receives the same two props every VJSF
  node component receives: `modelValue` (the node, with its `data`,
  `options`, `layout`, etc.) and `statefulLayout` (used to report input
  and blur events back to the form).

### The `info` flags

- **`name`** — the identifier used as `layout: '<name>'` (or
  `layout: { comp: '<name>' }`) in a schema, and as the key under
  `pluginsOptions`.
- **`focusable`** — whether the component can receive focus and
  autofocus, e.g. from `options.autofocusFirstField` or a validation
  error jumping to the first invalid field.
- **`emitsBlur`** — whether the component reports a `blur` event to
  `statefulLayout`. Needed for `options.updateOn: 'blur'`
  ([`updateOn`](/behavior/options)) to work for this component; without
  it, VJSF has no signal to know when the user is "done" editing.
- **`shouldDebounce`** — whether input events from this component should
  be debounced (`options.debounceInputMs`) before updating the form data.
  Useful for anything that emits on every keystroke, like a text editor.
- **`isFileInput`** — marks the component's data as a browser `File`
  (or array of `File`) rather than a JSON value. This changes how the
  value is serialized for validation/summary purposes instead of being
  treated as a plain string/object.
- **`schema`** — extra properties this component accepts directly inside
  `layout`, on top of the ones every component already has (`comp`,
  `props`, `cols`, etc.). Declaring them here makes them valid,
  type-checked keys of `layout` rather than requiring users to reach for
  the generic `layout.props` passthrough.

### A minimal example: a `rating` plugin

The [image cropper](/plugins/img-cropper) plugin's `node.vue` is the
simplest real plugin to model a new one on — one prop in, one event out,
no internal state. Here is a complete, from-scratch plugin wrapping
Vuetify's `v-rating`:

`info.js`:

```js
export default {
  name: 'rating',
  focusable: true,
  emitsBlur: true,
}
```

`node.vue`:

```vue
<script>
import { defineComponent, h, toRef } from 'vue'
import { VRating } from 'vuetify/components/VRating'
import useNode from '@koumoul/vjsf/composables/use-node.js'

export default defineComponent({
  props: {
    modelValue: { type: Object, required: true },
    statefulLayout: { type: Object, required: true },
  },
  setup (props) {
    const { inputProps, localData } = useNode(toRef(props, 'modelValue'), props.statefulLayout)

    // inputProps already carries label/hint/error messages plus the
    // `update:modelValue`/`blur` handlers that report back to the form —
    // only `modelValue` itself needs overriding with the local ref.
    return () => h(VRating, { ...inputProps.value, modelValue: localData.value })
  },
})
</script>
```

`index.js` (bundles the two into the `Plugin` shape and marks the
component non-reactive, matching every shipped plugin):

```js
import { markRaw } from 'vue'
import info from './info.js'
import nodeComponent from './node.vue'

markRaw(nodeComponent)

export default { info, nodeComponent }
```

Registering it is the same as any other plugin — runtime:

```js
import VjsfRating from './rating/index.js'

const options = { plugins: [VjsfRating] }
```

or build-time, via `pluginsImports: ['./rating']` — and using it
in a schema is just:

```json
{ "type": "integer", "title": "Satisfaction", "layout": "rating" }
```

`useNode`'s `inputProps`/`localData` (the same composable every built-in
field component and both shipped plugins use) already wires up
`label`/`hint`/error messages from the schema and debouncing from
`options.debounceInputMs`, so a plugin rarely needs more than this.
