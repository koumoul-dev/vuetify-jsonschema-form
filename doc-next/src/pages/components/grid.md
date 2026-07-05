---
title: Grid & responsive layout
description: Sizing a field inside its parent's 12-column grid with layout.cols, and the density option
nav:
  order: 22
  subsection: Structure
---

# Grid & responsive layout

Every composite component ([section](/components/sections),
[tabs/stepper/panels](/components/tabs-stepper-panels), …) lays out its
children in a 12-column grid, the same one Vuetify's own `v-row`/`v-col`
use. Each child's `layout.cols` controls how much of that grid it
occupies.

## layout.cols as a plain number

A plain integer from `0` to `12` sets the child's width from the `sm`
breakpoint up; below `sm` a field always defaults to the full 12 columns,
so narrow screens still get one field per row:

<VjsfDemo demo="demo-grid/cols-number" expanded hide-data />

## layout.cols as a per-breakpoint object

For finer control, `cols` also accepts an object with any of the
`xs`/`sm`/`md`/`lg`/`xl`/`xxl` breakpoint keys. You only need to specify
the thresholds where the value actually changes — `xs` defaults to `12`,
and any breakpoint you don't set falls through to the next smaller one
you did set:

<VjsfDemo demo="demo-grid/cols-breakpoint" expanded hide-data />

## A two-column address form

Combining both forms of `cols` on a handful of fields is the usual way
to lay out a compact form — a full-width field followed by a couple of
half-width ones on the same row:

<VjsfDemo demo="demo-grid/address" expanded hide-data />

`city` and `zip` sit side by side from the `sm` breakpoint up, and each
takes the full row on narrower screens.

## density

The `density` runtime option (`'default'` | `'compact'` | `'comfortable'`)
matches Vuetify's own Material Design density concept, tightening or
loosening the vertical spacing of every field in the form:

<VjsfDemo demo="demo-grid/density" expanded hide-data />

Like every runtime option, `density` can also be overridden at any level
of the schema with `layout.options` — see [options](/behavior/options)
for the general mechanism.

## Responsive behavior beyond cols

`layout.cols` only affects the grid columns. For anything more dynamic —
showing, hiding or otherwise adapting content to the viewport size — an
expression can read the `display` parameter (`display.mobile`,
`display.mdAndUp`, the exact viewport `width`, …). See
[expressions](/behavior/expressions#parameters) for the full `display`
reference.

## Related

- [Sections](/components/sections) — the default composite component
  whose children this grid lays out.
- [Options](/behavior/options) — the full runtime options reference,
  including `density`.
