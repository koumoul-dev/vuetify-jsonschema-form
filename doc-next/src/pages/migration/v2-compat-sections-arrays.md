---
title: Sections & arrays
description: V2-compat demos covering sections, tabs/stepper/expansion-panels and arrays of objects
nav:
  order: 12
  subsection: V2 compat
---

# Sections & arrays

The demos below are the "sections" and "arrays of objects" examples from
the VJSF v2 documentation, each schema converted through
[`v2compat()`](/migration/v2-compat).

## Sections

Children objects are rendered as sections as soon as they have a title.
Sections can also be created without extra nesting using `allOf`. The
`sectionsClass` and `sectionsTitlesClasses` options customize the
rendering (margins, indenting, title sizes per depth).

<VjsfDemo demo="demo-v2-sections-arrays/sections" />

## Sections as expansion panels

<v-alert type="warning" variant="outlined" class="mb-4">
  The "rootDisplay" option is not supported in vjsf v3.
</v-alert>

The `x-display=expansion-panels` annotation displays sections as panels.
`x-props` configures a specific set of panels, `expansionPanelsProps`
configures the default rendering of any set of panels.

<VjsfDemo demo="demo-v2-sections-arrays/sections-expansion-panels" />

## Sections as tabs

<v-alert type="warning" variant="outlined" class="mb-4">
  The "rootDisplay" option is not supported in vjsf v3.
</v-alert>

The `x-display=tabs` annotation displays sections as tabs, configurable
per-set with `x-props` or by default with the `tabsProps` option.

<VjsfDemo demo="demo-v2-sections-arrays/sections-tabs" />

## Sections as stepper

<v-alert type="warning" variant="outlined" class="mb-4">
  The "rootDisplay" option is not supported in vjsf v3.
</v-alert>

<v-alert type="warning" variant="outlined" class="mb-4">
  The "vertical-stepper" display has no v4 equivalent; that property falls back to a default component below.
</v-alert>

The `x-display=stepper` (or `vertical-stepper`) annotation displays
sections as a stepper, configurable with `x-props`, `stepperProps` or
`verticalStepperProps`.

<VjsfDemo demo="demo-v2-sections-arrays/sections-stepper" />

## Editable array

Arrays of objects are presented as an editable list of cards. Each item is
validated separately and saving a card is blocked while it is invalid. The
list is sortable by dragging cards. `arrayItemColProps`,
`arrayItemCardProps` and `disableSorting` are the most relevant
customization options.

<VjsfDemo demo="demo-v2-sections-arrays/editable-array" />

## Editable array inline

The `editMode=inline` option renders an editable array with far fewer
dialogs, which helps with nested editable arrays where overlapping dialogs
would otherwise become a mess.

<VjsfDemo demo="demo-v2-sections-arrays/editable-array-inline" />

## Prefilled arrays

<v-alert type="warning" variant="outlined" class="mb-4">
  Prefilled arrays based on HTTP requests are not supported yet in v3.
</v-alert>

Arrays can be initialized from a list of values: items can then be edited
and sorted, but not added or removed. The initializing objects are fetched
the same way as select fields (`fromData`, `fromUrl`).

<VjsfDemo demo="demo-v2-sections-arrays/prefilled-arrays" />

## Tuples

Arrays can be defined with a distinct schema per item instead of a single
`items` schema: the array then has a fixed size and each item renders as
its own property. This suits fixed-shape data such as lat/lon pairs. Using
`minItems` makes items required progressively, from the start of the
tuple.

<VjsfDemo demo="demo-v2-sections-arrays/tuples" />

## Share items across arrays

The `x-arrayGroup` annotation marks arrays that share a common scope, so
items can be dragged, dropped, copied and pasted across them.

<VjsfDemo demo="demo-v2-sections-arrays/array-group" />
