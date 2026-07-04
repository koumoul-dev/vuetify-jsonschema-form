---
title: Tabs, stepper & panels
description: Rendering an object's children as tabs, vertical tabs, a stepper, or expansion panels instead of a plain section
nav:
  order: 21
  subsection: Structure
---

# Tabs, stepper & panels

Setting `layout` (or `layout.comp`) to `"tabs"`, `"vertical-tabs"`,
`"stepper"` or `"expansion-panels"` on an object renders its children in
that composite component instead of the default plain
[section](/components/sections). All four demos below reuse the exact
same schema — three nested objects, "Profile", "Address" and
"Preferences" — only the `layout` value changes; each child's own
`title` becomes its tab/step/panel label.

## tabs

<VjsfDemo demo="demo-tabs-stepper-panels/tabs" />

```json
{
  "type": "object",
  "layout": "tabs",
  "properties": {
    "profile": { "type": "object", "title": "Profile", "properties": { "...": {} } },
    "address": { "type": "object", "title": "Address", "properties": { "...": {} } },
    "preferences": { "type": "object", "title": "Preferences", "properties": { "...": {} } }
  }
}
```

## vertical-tabs

Same idea, with the tabs stacked on the side instead of across the top:

<VjsfDemo demo="demo-tabs-stepper-panels/vertical-tabs" />

```json
{ "layout": "vertical-tabs" }
```

## stepper

Turns the children into a linear wizard: try advancing with "Next" below
the form — each step is validated before moving on to the next one:

<VjsfDemo demo="demo-tabs-stepper-panels/stepper" />

```json
{ "layout": "stepper" }
```

## expansion-panels

Each child becomes a collapsible panel:

<VjsfDemo demo="demo-tabs-stepper-panels/expansion-panels" />

```json
{ "layout": "expansion-panels" }
```

## Related

- [Sections](/components/sections) — the plain default composite these
  four are alternatives to, including where a section's own title comes
  from.
- [Grid & responsive layout](/components/grid) — controlling the width
  of the fields inside each tab/step/panel.
