---
title: Select
description: Select, autocomplete and combobox components — where their items come from, single vs multi-select, and returnObjects
nav:
  order: 16
  subsection: Fields
---

# Select

A `type: "string"` (or `integer`/`number`) schema renders as a Vuetify
`v-select` as soon as it has a closed list of possible values — from
`enum`, from `oneOf`, or from `layout.getItems`/`layout.items` (see
[dynamic data](/behavior/dynamic-data)). Past 20 items the same schema
automatically switches to `v-autocomplete` instead, since typing to
search stops being optional at that size.

## Items from enum

<VjsfDemo demo="demo-select/enum" expanded />

Without a `title`, each item's label falls back to the raw enum value.

## Items from oneOf (const + title)

`oneOf` works too, as long as every branch is a plain `const` (optionally
with its own `title` for the label) — this is the idiomatic way to give
enum-like values a human-readable label without a side lookup table:

<VjsfDemo demo="demo-select/one-of" expanded />

The stored value is still the `const` (`"draft"`/`"published"`), never
the `title`.

## examples + useExamples (combobox)

As covered on the [text field](/components/text-field#hints-and-labels)
page, `examples` with the default `useExamples: 'items'` switches the
component to a `v-combobox`: a free-form text field that also suggests
the listed examples, rather than restricting input to them:

<VjsfDemo demo="demo-select/combobox" expanded />

## Autocomplete with getItems

`layout.getItems` computes items dynamically instead of reading them
from the schema — from an expression, or by fetching them over HTTP. A
fetch-based `getItems` with a `qSearchParam` (or a `{q}` placeholder in
its `url`) switches the component to `autocomplete` automatically, so
typing re-queries the server as the user searches. The example below
forces `comp: "autocomplete"` explicitly to show the same search-as-you-
type UI over a plain in-memory list — try typing a couple of letters:

<VjsfDemo demo="demo-select/autocomplete" expanded />

See [dynamic data](/behavior/dynamic-data) for the full `getItems`
reference, including fetching items from a real API.

## Multi-select: type array + items.enum

Wrapping the same `enum`/`oneOf`/`getItems` pattern inside a `type:
"array"` property turns the select into a multi-select, storing an array
of the chosen values:

<VjsfDemo demo="demo-select/multi-select" expanded />

## returnObjects

When `getItems` returns a list of objects, the value stored in the form
data is normally extracted from each item via `itemValue` (or, absent an
explicit key/value shape, `item.value`/`item.key`). Setting
`getItems.returnObjects: true` keeps the **entire raw item** as the
value instead — useful when the rest of the item (not just an id) is
needed downstream. Note that `returnObjects` only takes effect when
`itemValue` is left unset; if both are present, `itemValue` wins:

<VjsfDemo demo="demo-select/return-objects" expanded />

Picking "Alan" here stores `{ "id": 2, "label": "Alan" }` as the
field's whole value (hence the schema's `type: "object"`).

## Related

- [`useTitle`, `useDescription`, `useDefault`, `useExamples`](/behavior/options) —
  the annotation surfacing that governs the combobox/examples behavior
  above.
- [dynamic data](/behavior/dynamic-data) — the full `layout.getItems`
  reference: expressions, item transforms, and fetching from an HTTP API.
- [selection groups](/components/selection-groups) — `radio-group` and
  `checkbox-group`, the always-visible alternative to `select` for a
  small number of options.
