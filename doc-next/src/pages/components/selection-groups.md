---
title: Selection groups
description: radio-group, checkbox-group and switch-group — always-visible alternatives to select for a handful of options
nav:
  order: 17
  subsection: Fields
---

# Selection groups

`select`/`autocomplete` (see [select](/components/select)) hide their
options behind a dropdown, which suits a list too long to show all at
once, or one worth being searchable. When there are only a handful of
options and you'd rather show all of them at a glance — no click needed
to see what's available — a selection group is the better fit. None of
these are chosen automatically from the schema; they always need an
explicit `layout`.

## layout: radio-group

Overrides the default `select` for a single-value `enum` (or `oneOf`),
rendering a Vuetify `v-radio-group` with one `v-radio` per item instead:

<VjsfDemo demo="demo-selection-groups/radio-group" />

```json
{
  "type": "string",
  "title": "Plan",
  "enum": ["free", "pro", "enterprise"],
  "layout": "radio-group"
}
```

## layout: checkbox-group

The array counterpart: overrides the default multi-select for a `type:
"array"` property with an enum `items` schema, rendering one `v-checkbox`
per item and storing the checked values as an array, same as the
multi-select would:

<VjsfDemo demo="demo-selection-groups/checkbox-group" />

```json
{
  "type": "array",
  "title": "Toppings",
  "items": { "type": "string", "enum": ["cheese", "mushroom", "olives"] },
  "layout": "checkbox-group"
}
```

## layout: switch-group

The same array-of-enum pattern, but with `v-switch` toggles instead of
checkboxes — handy for a group of independent on/off features:

<VjsfDemo demo="demo-selection-groups/switch-group" />

```json
{
  "type": "array",
  "title": "Features",
  "items": { "type": "string", "enum": ["darkMode", "notifications", "autoSave"] },
  "layout": "switch-group"
}
```

## Related

- [`useTitle`, `useDescription`](/behavior/options) — the same
  annotation surfacing described on the
  [text field](/components/text-field#hints-and-labels) page applies to
  selection groups too.
- [select](/components/select) — `select`/`autocomplete`, the
  dropdown-based alternative better suited to longer or searchable lists.
