---
title: Boolean
description: The checkbox and switch components rendered for a boolean schema
nav:
  order: 12
  subsection: Fields
---

# Boolean

A schema with `type: "boolean"` renders as a Vuetify `v-checkbox`.

## Default

<VjsfDemo demo="demo-boolean/checkbox" />

```json
{ "type": "boolean", "title": "Subscribe to the newsletter" }
```

## layout: switch

Setting `layout` to `"switch"` renders a Vuetify `v-switch` instead, with
the same underlying `true`/`false` data:

<VjsfDemo demo="demo-boolean/switch" />

```json
{ "type": "boolean", "title": "Dark mode", "layout": "switch" }
```

## Related

- [`useTitle`, `useDescription`, `useDefault`](/behavior/options) — the
  same annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  checkboxes and switches too.
