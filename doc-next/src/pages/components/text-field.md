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

<VjsfDemo demo="demo-text-field/default-string" />

```json
{ "type": "string", "title": "Name" }
```

## layout: textarea

Setting `layout` to `"textarea"` switches the component to a multi-line
`v-textarea`, keeping the same `type: "string"` schema:

<VjsfDemo demo="demo-text-field/textarea" />

```json
{ "type": "string", "title": "Bio", "layout": "textarea" }
```

## A password input

There is no dedicated `password` component: instead, `layout.props` is
forwarded as-is to the underlying Vuetify component, so setting `type:
"password"` on the `text-field` component gives you a masked input:

<VjsfDemo demo="demo-text-field/password" />

```json
{
  "type": "string",
  "title": "Password",
  "layout": {
    "comp": "text-field",
    "props": { "type": "password" }
  }
}
```

## Hints and labels

Several schema annotations surface on the rendered field, controlled by
their matching `use*` runtime option (all documented on
[options](/behavior/options)):

<VjsfDemo demo="demo-text-field/annotations" />

```json
{
  "type": "string",
  "title": "Nickname",
  "description": "How your name is shown to others",
  "examples": ["Ada", "Alan"],
  "default": "Anonymous"
}
```

- `title` becomes the field's label (`useTitle`, default `label`).
- `description` shows as a help tooltip next to the label (`useDescription`,
  default `['help', 'subtitle']`).
- `default` becomes the field's initial value (`useDefault`, default
  `'data'`) — governed by `defaultOn` (see [validation](/behavior/validation#default-values)).
- `examples`, with the default `useExamples: 'items'`, turns the field
  into a combobox offering the examples as suggestions while still
  accepting any free-form value — this is why the demo above no longer
  looks like a plain text field.

## Related

- [`useTitle`, `useDescription`, `useDefault`, `useName`, `useExamples`](/behavior/options) —
  how schema annotations surface on every component, not just text fields.
- [`validateOn`, `updateOn`, `debounceInputMs`](/behavior/validation) —
  when errors are shown and when the field emits its value.
