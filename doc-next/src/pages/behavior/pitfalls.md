---
title: Pitfalls
description: Schema mistakes that VJSF ignores without an error, and how to write them instead
nav:
  order: 10
---

# Pitfalls

Most schema mistakes do not raise an error: VJSF ignores what it does not
know and falls back to a default component. Invalid `layout` values are
reported only in the browser console ("JSON layout encountered some
validation errors"), so keep it open while writing a schema. This page
lists the cases that are hard to spot from the rendered form.

## Keywords from other libraries

- **vjsf 2 `x-*` keywords** (`x-display`, `x-fromUrl`, `x-if`,
  `x-itemTitle`, `x-props`...) are not read by vjsf 3 and later. The field
  renders with its default component and no error. Rewrite them with
  [`layout`](/behavior/layout-keyword), or compile with the
  [`v2compat`](/migration/v2-compat) option while migrating.
- **`enumNames` / `enumTitles`** are not VJSF keywords: the select shows the
  raw `enum` values. Label the values with a `oneOf` of `const` + `title`
  (in `items` for a multiple choice), see [select](/components/select).
- **Invented formats** such as `"format": "hexcolor"` only produce an
  `unknown format ignored` warning. Pick the component with
  `layout: "color-picker"` instead (see [color](/components/color)).
- **`$comment`** is read by neither VJSF nor its WebMCP tools: put text
  meant for users or agents in `description` or `layout.help`.

## Expressions written as v2 paths

`layout` values that reference data are [expressions](/behavior/expressions),
not paths:

| vjsf 2 habit | vjsf 3+ |
|---|---|
| `"if": "parent.value.mode"` | `"if": "parent.data.mode"` |
| `"url": "{context.apiUrl}/items"` | `"url": "${context.apiUrl}/items"` (a `js-tpl` template) |
| `"itemTitle": "title"` | `"itemTitle": "item.title"` |

## Items of a select

- **A schema list replaces `getItems`.** An `enum`, `examples` or an
  all-`const` `oneOf` on a property that also has `layout.getItems` wins
  over it, without an error. With a `getItems.url` the layout even fails
  validation and falls back to the default select. Drop the schema keyword;
  only `layout.items` takes precedence over the schema list.
- **`select` or `autocomplete`.** A static list (`enum`, `oneOf`,
  `layout.items`) becomes an `autocomplete` past 20 items. A
  `getItems.expr`, or a `getItems.url` without `qSearchParam`, always
  renders a `select` whatever the size of the list: set
  `layout: "autocomplete"` when users will need to search it. An
  autocomplete without `qSearchParam` filters the loaded items on their
  title in the browser; with `qSearchParam` each keystroke sends a request.
- **An array of objects with `getItems` is a multi-select.** Without an
  explicit component, the items become chips and their sub-fields never
  show. Set `"comp": "list"` to edit one object per item.
- **The raw item's `icon` is copied** into the option even without
  `itemIcon`. When the source objects have an `icon` property that is not
  an icon (a font name, a URL), map it explicitly or set
  `"itemIcon": "null"`.

## Layout

- **`comp: "none"` drops the other layout keys.** In
  `{ "comp": "none", "defaultData": "x" }` the `defaultData` (like `if`,
  `cols`, `transformData`...) is ignored. Use the schema's `const` or
  `default` with the `layout: "none"` shorthand. In a `switch`, a
  `{ "if": X, "comp": "none" }` case loses its `if` and always wins: put the
  `if` on the visible case instead.
- **A `switch` case inherits the top-level layout.** Each case is merged as
  `{ ...topLevel, ...case }`: a case's own `if` replaces the top-level one,
  cases without `if` keep it.
- **`if` on a slot child is ignored** (`{ "markdown": "...", "if": "..." }`
  in `children`). Wrap it in a composite child:
  `{ "children": [...], "if": "..." }`.
- **`layout.if` hides a field, it does not make it optional.** A hidden
  required field still fails validation; model the condition with
  [`if`/`then` or `oneOf`](/components/combined-schemas) when it changes
  what is required.
- **`props` / `getProps` are ignored on a `list`.** Style lists through
  their [Vuetify defaults](/behavior/vuetify-integration#styling-globally-with-vuetify-defaults)
  (`VjsfList-*`).
- **Breakpoints follow the form's width, not the window's.** `cols` and
  `display` are computed from the width of the `<vjsf>` element and of each
  parent section, see [grid](/components/grid).
- **A long `inline-single` list renders every item.** Items that are not
  being edited show their whole form read-only, with `summary` true: hide
  heavy fields with `"if": "!summary"` and set `itemTitle`.
- **`sort` does nothing on an indexed object** (`patternProperties`): the
  object key order is kept. Use an array when the order matters.

## oneOf with variants

- **Put the discriminant in each branch's `required`.** Otherwise empty data
  validates the first branch, which is selected (and its `const` written)
  before the user chooses. A `required` on the parent object does not
  prevent it.
- **Label the variant selector with `oneOfLayout.label`**, not with a
  `title` on the container (that renders a section heading). Add
  `oneOfLayout.autocomplete: true` for long lists of variants.
- **Add a `discriminator` to a large `oneOf`.** Without it every branch is
  tried on each change and a form with dozens of variants takes seconds to
  open. Ajv applies it only with the `ajvOptions: { discriminator: true }`
  compile option, and then enforces it strictly: the discriminant must be
  required and declared as a `const` in each branch's `properties`, and a
  violation makes the whole schema fail to compile without naming the
  branch. Ajv's discriminator does not work with `unevaluatedProperties`:
  close each branch with `additionalProperties: false` instead.

## Schemas and component props

- **Do not dereference a schema before giving it to VJSF.** json-layout
  resolves internal `$ref`s and compiles a shared definition once. A
  dereferenced copy (every `$ref` replaced by its target) gives it as many
  subschemas as references: on a large schema this multiplied the
  compilation time by more than ten, and it runs on every mount of the
  form. Keep `$ref`s, under `$defs` (the draft 2019-09 name used by Ajv in
  json-layout).
- **Keep `schema` and `options` stable.** A new object identity for either
  prop builds a new form state: a `computed` that reads the edited data, or
  an inline function in the options, can reset fields while the user types.
  Derive them from values that do not change during the edit, and remount
  the component with a `:key` when the schema really changes.
