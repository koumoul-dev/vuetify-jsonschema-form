---
title: Sections
description: How nested objects turn into sections, where their titles/subtitles come from, and the indent/titleDepth options
nav:
  order: 20
  subsection: Structure
---

# Sections

A `type: "object"` schema with no more specific `layout` renders as a
`section`: a plain wrapper around a 12-column grid holding its children
(see [grid](/components/grid) for how each child's width in that grid is
controlled). This is the default component for every object, whether it
is the root of the form or a nested property.

## Nested object as a section

<VjsfDemo demo="demo-sections/basic" />

```json
{
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "title": "Address",
      "description": "Where the order should be shipped",
      "properties": {
        "street": { "type": "string", "title": "Street" },
        "city": { "type": "string", "title": "City" }
      }
    }
  }
}
```

The section's title comes from the schema's own `title`, and by default
its `description` is shown as a subtitle right below it — this is the
`useDescription: ['help', 'subtitle']` default (see
[options](/behavior/options)), where the `'subtitle'` entry is what
applies to a composite component such as a section.

## No title, no fallback

Unlike a simple field's label — which falls back to the property key
when the schema has no `title` — a section with no `title` renders with
**no header at all**, not even the property key:

<VjsfDemo demo="demo-sections/untitled" />

```json
{
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string", "title": "Street" },
        "city": { "type": "string", "title": "City" }
      }
    }
  }
}
```

Note that the `useTitle` option itself (`label`/`hint`/`false`, see
[options](/behavior/options)) has no effect here either — it only governs
how a *simple field*'s title becomes a label/hint. A section's title is
purely `schema.title` (or nothing).

## useDescription without "subtitle"

If `useDescription` doesn't include `'subtitle'`, a section's
`description` is simply not displayed — a section has no hint/tooltip to
fall back to the way a simple field does:

<VjsfDemo demo="demo-sections/no-subtitle" />

```json
{ "options": { "useDescription": ["help"] } }
```

## titleDepth

`titleDepth` (a runtime option, default `2`) sets the heading level
(`h2`, `h3`, …) used by the first level of titled sections. Each further
level of *titled* nesting increases that depth by one (an untitled
section in between doesn't consume a level), up to `h6`:

<VjsfDemo demo="demo-sections/title-depth" />

```json
{ "options": { "titleDepth": 3 } }
```

Here "Address" renders as an `h3` and the nested "Coordinates" section as
an `h4` — one level deeper than the page's default (`h2`/`h3`).

## indent

`indent` (default `false`) adds a left margin to nested sections so their
hierarchy is visually obvious:

<VjsfDemo demo="demo-sections/indent" />

```json
{ "options": { "indent": true } }
```

`indent` only affects a plain `section` component that has a `title` —
it has no effect on the root of the form, on an untitled section, or on
a `tabs`/`stepper`/`expansion-panels` composite (see
[tabs, stepper & panels](/components/tabs-stepper-panels)). Besides
`true`/`false`, `indent` also accepts a number to set the exact
indentation.

## Related

- [Tabs, stepper & expansion panels](/components/tabs-stepper-panels) —
  alternative composite components for an object's children.
- [Grid & responsive layout](/components/grid) — how each child's width
  inside a section's grid is controlled with `layout.cols`.
- [Options](/behavior/options) — the full `useDescription`, `titleDepth`
  and `indent` reference.
