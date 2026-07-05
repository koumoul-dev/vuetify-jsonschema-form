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

<VjsfDemo demo="demo-slots/positioning" expanded hide-data />

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

In this demo the string field's normal input is replaced by a custom
textarea; the Slots tab shows the template given to `vjsf`:

<VjsfDemo demo="demo-slots/custom-textarea" expanded>
<template #custom-textarea="{ node, statefulLayout }">
  <textarea
    :value="node.data"
    placeholder="A custom textarea"
    @input="event => statefulLayout.input(node, event.target.value)"
  />
</template>
</VjsfDemo>

Using the slot system to write a custom input component is limiting (it
has to manage its own value and call `statefulLayout.input` itself); for
anything beyond a small tweak, consider writing a plugin instead.

`props` given in the schema are merged into the slot's context, alongside
`node` and `statefulLayout`:

<VjsfDemo demo="demo-slots/custom-message" expanded hide-data>
<template #custom-message="{ node, prop1 }">
  This message is defined in a slot
  (key={{ node.key }}, data={{ node.data }}, additional prop={{ prop1 }})
</template>
</VjsfDemo>
