---
title: Layout keyword
description: The full reference of the layout annotation — its accepted shapes, the properties shared by all components, and every standard component with its specific options
nav:
  order: 9
---

# Layout keyword

Everything VJSF renders is driven by the schema, and the `layout`
keyword is the annotation that customizes this rendering, on any node of
the schema. The rest of the documentation introduces its properties
where they matter; this page is the exhaustive reference — generated
from [`@json-layout/vocabulary`](https://github.com/json-layout/json-layout),
the same data that powers the autocompletion in the
[playground](/editor)'s Schema tab, so it always reflects the vocabulary
version this documentation was built with.

## Accepted shapes

`layout` accepts four forms:

```json
{
  "layout": "textarea"
}
```

A plain string is the shorthand for `{ "comp": "textarea" }`: it only
picks the [component](#standard-components) (see
[Vuetify integration](/behavior/vuetify-integration)).

```json
{
  "layout": { "comp": "textarea", "cols": 6, "if": "parent.data.other" }
}
```

The object form combines any of the [properties below](#common-properties).
All of them are optional, including `comp` — a default component is
picked from the schema anyway.

```json
{
  "layout": ["title", ["firstName", "lastName"]]
}
```

On an object, an array is the shorthand for `{ "children": [...] }`:
it reorders and regroups the children (see
[sections](/components/sections)).

```json
{
  "layout": {
    "switch": [
      { "if": "display.mobile", "comp": "select" },
      { "comp": "radio-group" }
    ]
  }
}
```

`switch` holds alternative layouts: each case is tried in order and the
first one whose `if` [expression](/behavior/expressions) matches wins (a
case without `if` is the fallback).

## Common properties

These properties are accepted by the object form for every component,
or for every component sharing a characteristic (the same
characteristics tagged on each entry of the
[components catalogue](#standard-components) below). Properties marked
**computed** are not written in `layout`: they are derived from the
schema during compilation, and listed here because you will encounter
them when reading a normalized layout (in the playground's State tab
for example).

### Every component

<LayoutPropsTable group-key="base" />

### Simple components

Every component that is not [composite](#composite-components).

<LayoutPropsTable group-key="simple" />

### Composite components

Components rendering children nodes.

<LayoutPropsTable group-key="composite" />

### Focusable components

<LayoutPropsTable group-key="focusable" />

### Items-based components

The selection controls — their selectable items come from the schema's
`enum`/`oneOf`, from `layout.items` or from `layout.getItems` (see
[dynamic data](/behavior/dynamic-data)).

<LayoutPropsTable group-key="items-based" />

### Array-compatible components

Selection controls that can also hold several values when bound to an
array (or separator-joined string) schema.

<LayoutPropsTable group-key="multiple-compat" />

## Help and warnings

Two of the properties above deserve a quick demo since they are not
covered elsewhere: `help` displays a tooltip behind a small info button
next to the field (the schema's `description` lands there by default,
per the `useDescription` [option](/behavior/options)), and a schema
marked `deprecated: true` turns that tooltip into a warning when the
`useDeprecated` option is active:

<VjsfDemo demo="demo-layout-keyword/help-warning" expanded />

## Standard components

The components picked by `layout.comp` (or by a string `layout`). Each
entry lists the component's characteristics — which
[common property groups](#common-properties) apply to it — and its
specific properties. Two characteristics relate to
[validation](/behavior/validation) rather than to a property group:
**emits blur** marks the components compatible with `updateOn: "blur"`,
and **debounced input** those affected by `debounceInputMs`.

<LayoutCompCatalogue />

## Plugin components

Plugins register additional components with their own options, under
the same `layout.comp` mechanism: see the
[plugins introduction](/plugins/introduction), the
[markdown plugin](/plugins/markdown) (a `markdown` text editor
component) and the [image cropper plugin](/plugins/img-cropper).
