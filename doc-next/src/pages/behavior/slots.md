---
title: Slots
description: Injecting extra content around or instead of a node's rendering with layout.slots
nav:
  order: 7
---

# Slots

Extra content can be injected in various places of a node's rendering
using `layout.slots`. A slot is defined as an object with a single
property, for example `{ "text": "a text slot" }`, `{ "markdown": "a
**markdown** slot" }`, or `{ "name": "named-code-slot" }`.

## Positioning slots

Slots shared by every node type:

- **before** / **after** - inserted right before/after the node's own
  rendering.
- **component** - replaces the node's own rendering entirely (a leaf
  field).
- **compositeComponent** - same as `component`, but for a composite
  (object/array) node.

`before` and `after` are markdown by default: `{ "before": "A **markdown**
hint" }` is equivalent to `{ "before": { "markdown": "A **markdown**
hint" } }`.

<VjsfDemo demo="demo-slots/positioning" />

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Name",
      "layout": {
        "slots": {
          "before": "Some **markdown** hint before the field.",
          "after": { "text": "A plain text note after the field." }
        }
      }
    }
  }
}
```

## Slot content types

A slot's content can take 3 forms:

- **text** - `{ "text": "..." }`, rendered as plain text.
- **markdown** - `{ "markdown": "..." }`, rendered as HTML (the default
  form for `before`/`after` when given a bare string).
- **named** - `{ "name": "...", "props": { ... } }`, a Vue slot given to
  the `vjsf` component by name (the default form for `component`/
  `compositeComponent` when given a bare string). See below.

## Named Vue slots

The `component`/`compositeComponent` slots (and any custom slot referenced
by `name`) are resolved as regular Vue slots on the `vjsf` component
itself. The slot function receives `{ node, statefulLayout, ...props }`,
where `props` is whatever `layout.slots.<slot>.props` declared in the
schema.

Because this page's live demos are driven by a shared example widget that
cannot inject page-defined Vue slots, this one is illustrated in code
only:

```json
{
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "title": "A text string",
      "layout": {
        "slots": { "component": "custom-textarea" }
      }
    }
  }
}
```

```vue
<script setup>
import Vjsf from '@koumoul/vjsf'
</script>
<template>
  <vjsf v-model="data" :schema="schema">
    <template #custom-textarea="{ node, statefulLayout }">
      <textarea
        :value="node.data"
        placeholder="A custom textarea"
        @input="event => statefulLayout.input(node, event.target.value)"
      />
    </template>
  </vjsf>
</template>
```

Using the slot system to write a custom input component is limiting (it
has to manage its own value and call `statefulLayout.input` itself); for
anything beyond a small tweak, consider writing a plugin instead.

`props` given in the schema are merged into the slot's context, alongside
`node` and `statefulLayout`:

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string", "title": "A text string" }
  },
  "layout": [
    { "key": "text" },
    { "name": "custom-message", "props": { "prop1": "A prop given to the code slot" } }
  ]
}
```

```vue
<template #custom-message="{ node, statefulLayout, prop1 }">
  This message is defined in a slot (key={{ node.key }}, data={{ node.data }}, additional prop={{ prop1 }})
</template>
```
