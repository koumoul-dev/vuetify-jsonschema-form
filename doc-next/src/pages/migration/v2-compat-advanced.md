---
title: Dynamic & advanced
description: V2-compat demos covering dynamic content, validation, misc json-schema features and advanced integration
nav:
  order: 13
  subsection: V2 compat
---

# Dynamic & advanced

The demos below are the "dynamic content", "validation", "misc json-schema"
and "advanced integration" examples from the VJSF v2 documentation, each
schema converted through [`v2compat()`](/migration/v2-compat). A couple of
the original "advanced integration" examples (custom Vue-2 wrapper
components for a rich-text/markdown/avatar editor) are not ported here,
since they depend on external components that were never part of this
documentation site.

## Selects of sub-schemas

An object with a `oneOf`/`anyOf` of varying properties can be represented
as a select used to switch between the sub-schemas. Each `oneOf` element
needs a `const` property to act as its unique key.

<VjsfDemo demo="demo-v2-advanced/select-subschemas" />

## Conditional content (if/then/else)

Properties can be toggled with the JSON Schema
[conditional subschemas](https://json-schema.org/understanding-json-schema/reference/conditionals.html)
`if`/`then`/`else` syntax — for example, toggling properties based on a
boolean switch. This requires a JSON schema validator (Ajv by default).

<VjsfDemo demo="demo-v2-advanced/conditionals" />

## Conditional content (expression)

The `x-if` annotation accepts an evaluated expression as a more flexible
alternative to `if`/`then`/`else` (see [expressions](/behavior/expressions)).
Because it is entirely ignored by a JSON schema validator, it is possible
to create a form that is valid while the underlying model is not — for
example combining `x-if` with a `required` property.

<VjsfDemo demo="demo-v2-advanced/_x-if" />

## Selects with dependencies

A select's items can depend on another part of the model, including values
injected into the URL of an HTTP-based select.

<VjsfDemo demo="demo-v2-advanced/select-deps" />

## Selects with context dependencies

A select's items can depend on both another part of the model and the
context at the same time.

<VjsfDemo demo="demo-v2-advanced/select-context-deps" />

## Selects with relative dependencies

A select's items can be read relatively to the current property, using
`parent.value` (and `parent.parent.value`, etc.) to reach the current item
of an array, for example.

<VjsfDemo demo="demo-v2-advanced/select-relative-deps" />

## Selects with schema dependencies

<v-alert type="warning" variant="outlined" class="mb-4">
  Using eval-expr is not supported in VJSF 3.
</v-alert>

This example reuses the `oneOf` list of another property's values while
filtering it based on that other property's current selection. It relies
on an `eval-expr`-flavored expression inside `x-fromData` that
`v2compat()` does not translate, so no interactive form is shown here.

<VjsfDemo demo="demo-v2-advanced/select-schema-deps" />

## Basic validation

Several JSON schema keywords translate directly to validation rules:
`required`, length, `pattern`, etc. The `x-rules` annotation adds custom
rules referencing functions from the `rules` option. Wrapping `vjsf` in a
`v-form` activates Vuetify's validation mechanisms.

<VjsfDemo demo="demo-v2-advanced/validation-basic" />

## Sections validation

A section's validity depends on the validity of all its children — used,
for example, to color a broken tab red.

<VjsfDemo demo="demo-v2-advanced/validation-sections" />

## External validator

In VJSF 2, the `useValidator=true` option opted into delegating to an
external JSON schema validator for cases too complex for simple rules
(format combinations with `anyOf`/`oneOf`/`allOf`, etc.). VJSF 4 has no
such toggle: it always [validates with Ajv](/behavior/validation), so
this behavior is now the default rather than something to opt into.

<VjsfDemo demo="demo-v2-advanced/validation-external" />

## Default values

The `default` keyword initializes a value when it is undefined in the
model.

<VjsfDemo demo="demo-v2-advanced/default-values" />

## Nullable properties

Basic-type properties can support an alternative "null" type: vjsf then
sets `null` when initializing an empty property or clearing an existing
one.

<VjsfDemo demo="demo-v2-advanced/nullable" />

## Read only content

Properties with `readOnly=true` render as disabled fields, propagated
downward (a read-only object disables all its children too). The whole
form can be disabled with `disableAll=true`, a single property hidden with
`x-display=hidden`, or all read-only properties hidden by default with
`hideReadOnly=true`.

<VjsfDemo demo="demo-v2-advanced/read-only" />

## Layout, classes and styles

The `x-class` annotation adds classes on a property's wrapping element,
`x-style` writes CSS rules directly on it, and `x-cols` (or the
`fieldColProps` option) customizes the responsive column layout.

<VjsfDemo demo="demo-v2-advanced/classes" />

## Vuetify props

The `x-props` annotation adds properties directly to the underlying
Vuetify component, tightly coupling the schema to Vuetify for simplicity
and power.

<VjsfDemo demo="demo-v2-advanced/vuetify-props" />

## Directives

The `x-directives` annotation instantiates Vue directives on the input
components used to render properties.

<VjsfDemo demo="demo-v2-advanced/directives" />

## Localization

Localization is managed at three levels: the `locale` option (passed to
components that use it, notably the date picker), the `messages` option
(localized UI strings), and the `formats` option (formatting functions
that receive a locale). Localizing the contents of your own schemas
(titles, descriptions) is mostly outside the scope of this library.

<VjsfDemo demo="demo-v2-advanced/localization" />
