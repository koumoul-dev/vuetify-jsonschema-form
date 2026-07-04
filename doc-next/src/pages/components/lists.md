---
title: Lists
description: Arrays and patternProperties objects rendered as an editable list — the four edit modes, their defaulting rule, dialog/menu widths, and tuples
nav:
  order: 30
  subsection: Lists
---

# Lists

A `type: "array"` schema (with an `items` schema, object or primitive)
*can* render as an editable list: an add button, and per-item actions
such as edit, delete, drag-to-reorder, and more (see [list
actions](/components/list-actions) for the full catalogue). A `type:
"object"` schema using `patternProperties` instead of a fixed set of
`properties` renders as a list too, one where the user types each item's
key rather than picking it from a title/index.

## Array of objects vs array of primitives

An array of **objects** always renders as a list — there's no other
sensible component for it:

<VjsfDemo demo="demo-lists/objects" />

```json
{
  "type": "array",
  "title": "Contacts",
  "items": {
    "type": "object",
    "title": "Contact",
    "properties": {
      "name": { "type": "string", "title": "Name" },
      "email": { "type": "string", "title": "Email" }
    }
  }
}
```

An array of **primitives** (`string`/`integer`/`number`, no `enum`, no
`layout` on the item, not a date/time format) instead defaults to a
`combobox` — the free-form chip input covered on the [select
page](/components/select) — since that's the more compact widget for a
flat list of values. To get the list
rendering instead (one row per item, its own add/edit/delete/sort
actions), force it with `layout.comp: "list"`:

<VjsfDemo demo="demo-lists/primitives" />

```json
{
  "type": "array",
  "title": "Tags",
  "layout": { "comp": "list" },
  "items": { "type": "string", "title": "Tag" }
}
```

## listEditMode

`layout.listEditMode` controls how an item is edited, once it is no
longer collapsed to its summary row:

- **`inline`** — the item's fields are always visible in the row itself.
- **`inline-single`** — only one item at a time expands inline; every
  other row stays collapsed to its summary.
- **`menu`** — the item opens in a `v-menu` anchored to the row.
- **`dialog`** — the item opens in a modal `v-dialog`.

Left unset, `listEditMode` defaults to **`inline-single`** when the
array's `items` schema is an object, and to **`inline`** otherwise (the
"Array of objects" demo above, which sets no `listEditMode`, is already
relying on that `inline-single` default — it renders identically to the
explicit `inline-single` demo below).

<VjsfDemo demo="demo-lists/inline" />

<VjsfDemo demo="demo-lists/inline-single" />

<VjsfDemo demo="demo-lists/menu" />

<VjsfDemo demo="demo-lists/dialog" />

```json
{
  "type": "array",
  "title": "Contacts",
  "layout": { "listEditMode": "menu" },
  "items": { "...": "as above" }
}
```

## listMenuWidth / listDialogWidth

The `menu` and `dialog` edit modes default to a `500`px width. Both are
overridable — not through `layout` directly, but through the `options`
object, either globally or scoped to a single list via `layout.options`:

<VjsfDemo demo="demo-lists/menu-width" />

<VjsfDemo demo="demo-lists/dialog-width" />

```json
{
  "type": "array",
  "title": "Contacts",
  "layout": {
    "listEditMode": "dialog",
    "options": { "listDialogWidth": 800 }
  },
  "items": { "...": "as above" }
}
```

## Tuples

A fixed-length `items` array (`items: [schemaA, schemaB, ...]`, the
legacy JSON Schema "tuple" syntax) is **not** rendered as an editable
list at all — it renders as a plain `section`, one child per position,
with no add/delete/duplicate/sort actions:

<VjsfDemo demo="demo-lists/tuple" />

```json
{
  "type": "array",
  "title": "Coordinates",
  "items": [
    { "type": "number", "title": "Latitude" },
    { "type": "number", "title": "Longitude" }
  ]
}
```

The 2020-12 `prefixItems` keyword (the modern replacement for tuple
`items`) is not recognized by VJSF's vocabulary: an array schema that
only has `prefixItems` and no `items` has no default component at all,
so the property is silently dropped from the form. Use the `items` array
form above for a fixed-length tuple.

## Indexed objects (patternProperties)

An object schema built from `patternProperties` instead of `properties`
renders as a list whose "add" control is a text field: the user types
the new property's key themselves, validated live against the
pattern(s) declared in the schema. There is no key-generation feature —
no auto-incrementing index, no UUID — the key is always whatever the
user typed:

<VjsfDemo demo="demo-lists/indexed" />

```json
{
  "type": "object",
  "title": "Scores (lowercase player name as key)",
  "patternProperties": {
    "^[a-z]+$": { "type": "number", "title": "Score" }
  }
}
```

Typing a key that doesn't match `^[a-z]+$` (or one that's already used)
keeps the add field invalid until corrected.

`listEditMode` defaults the same way for indexed objects: `inline-single`
when the pattern's schema is an object, `inline` otherwise (as in the
demo above, since the value type is `number`). Its default `listActions`
differ from a plain array's, though — see [list
actions](/components/list-actions#context-dependent-defaults).

## Related

- [list actions](/components/list-actions) — the `listActions`
  catalogue: `add`, `edit`, `delete`, `sort`, `duplicate`, `insertAfter`,
  `copy`/`paste`, and their context-dependent defaults.
- [expressions](/behavior/expressions) — `layout.itemTitle` and
  `layout.itemSubtitle` (per-item expressions used to label a collapsed
  row) live on the same `layout` object as `listEditMode`.
- [internationalization](/behavior/i18n#overriding) — overriding the
  `addItem`, `edit`, `delete`, `duplicate`, `insertAfter` and `sort`
  messages used by a list.
