---
title: Text field
description: The component rendered for a plain type string schema, and its textarea/password variants
nav:
  order: 10
  subsection: Fields
---

# Text field

A schema with `type: "string"` (and no more specific `format` or `enum`)
renders as a Vuetify `v-text-field`.

## Default

<VjsfDemo demo="demo-text-field/default-string" expanded />

## layout: textarea

Setting `layout` to `"textarea"` switches the component to a multi-line
`v-textarea`, keeping the same `type: "string"` schema. A string
`layout` is the shorthand for `{ "comp": "textarea" }` (see
[Vuetify integration](/behavior/vuetify-integration)):

<VjsfDemo demo="demo-text-field/textarea" expanded />

## A password input

There is no dedicated `password` component: instead, `layout.props` is
forwarded as-is to the underlying `v-text-field` (see
[Vuetify integration](/behavior/vuetify-integration)), so setting
`type: "password"` gives you a masked input:

<VjsfDemo demo="demo-text-field/password" expanded />

The demo also sets the `defaultOn: "missing"` option: by default a
cleared field counts as *empty* and its value is dropped (surfacing as
`null` on a root-level string) — with `"missing"` clearing the field
keeps emitting an empty string (see
[validation](/behavior/validation#default-values)).

## Hints and labels

Several schema annotations surface on the rendered field, controlled by
their matching `use*` runtime option (all documented on
[options](/behavior/options)):

<VjsfDemo demo="demo-text-field/annotations" expanded />

- `title` becomes the field's label (`useTitle`, default `label`); with
  no `title`, the property key is used. `layout.label` overrides both,
  and an empty string (`"label": ""`) removes the label entirely.
- `description` shows as a help tooltip next to the label (`useDescription`,
  default `['help', 'subtitle']`).
- `default` becomes the field's initial value (`useDefault`, default
  `'data'`) — it is written into the data as soon as the form renders,
  which is why the demo starts filled with `Anonymous`
  (governed by `defaultOn`, see [validation](/behavior/validation#default-values)).

## Examples as suggestions

`examples`, with the default `useExamples: 'items'`, turns the field
into a combobox offering the examples as suggestions while still
accepting any free-form value:

<VjsfDemo demo="demo-text-field/examples" expanded />

## Related

- [Vuetify integration](/behavior/vuetify-integration) — picking another
  component with `layout.comp` and passing props to the underlying
  Vuetify component with `layout.props`.
- [`useTitle`, `useDescription`, `useDefault`, `useName`, `useExamples`](/behavior/options) —
  how schema annotations surface on every component, not just text fields.
- [`validateOn`, `updateOn`, `debounceInputMs`](/behavior/validation) —
  when errors are shown and when the field emits its value.
