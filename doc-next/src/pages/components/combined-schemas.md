---
title: Combined schemas
description: How VJSF renders oneOf, allOf, if/then/else, and the layout.if expression-driven alternative
nav:
  order: 23
  subsection: Structure
---

# Combined schemas

Besides plain nested objects, VJSF also understands a handful of JSON
Schema's schema-combination keywords, and offers its own `layout.if`
expression as an imperative alternative to JSON Schema's declarative
`if`/`then`/`else`.

## oneOf as a subschema selector

A `oneOf` on an object schema is rendered as a select box that lets the
user choose which subschema (branch) is active; the chosen branch's own
fields then appear below it. Each branch needs a `title` for its option
label in the select:

<VjsfDemo demo="demo-combined-schemas/one-of" />

```json
{
  "type": "object",
  "title": "Payment method",
  "oneOfLayout": { "label": "Choose a payment method" },
  "oneOf": [
    {
      "title": "Credit card",
      "required": ["cardNumber"],
      "properties": {
        "method": { "const": "card" },
        "cardNumber": { "type": "string", "title": "Card number" }
      }
    },
    {
      "title": "Bank transfer",
      "required": ["iban"],
      "properties": {
        "method": { "const": "transfer" },
        "iban": { "type": "string", "title": "IBAN" }
      }
    }
  ]
}
```

A `const` property in a branch (like `method` here) never renders an
input of its own — it's a good place to keep a discriminator value in
the stored data. `oneOfLayout` (a sibling of `oneOf`, not nested inside
`layout`) is the layout keyword for the select itself; without an
explicit `oneOfLayout.label` the select gets **no label at all** — there
is no fallback to the schema's own `title` the way there would be for a
plain field.

VJSF also recognizes the OpenAPI-style `discriminator: { propertyName:
"..." }` keyword next to `oneOf`, which requires every branch to declare
that property as a `const`; it does not change what's rendered, it's an
optimization hint used while resolving which branch matches existing
data.

## allOf as merged sections

An `allOf` on an object schema renders each branch as its own section,
one below the other — a way to compose a schema (and its layout) out of
reusable fragments while still grouping their fields visually:

<VjsfDemo demo="demo-combined-schemas/all-of" />

```json
{
  "type": "object",
  "allOf": [
    {
      "title": "Identity",
      "properties": {
        "firstName": { "type": "string", "title": "First name" },
        "lastName": { "type": "string", "title": "Last name" }
      }
    },
    {
      "title": "Contact",
      "properties": {
        "email": { "type": "string", "title": "Email", "format": "email" }
      }
    }
  ]
}
```

## if/then/else

JSON Schema's own conditional keywords are interpreted too: `then`'s
properties are shown while `if`'s subschema validates against the
current data, `else`'s properties otherwise:

<VjsfDemo demo="demo-combined-schemas/if-then-else" />

```json
{
  "type": "object",
  "properties": {
    "accountType": { "type": "string", "title": "Account type", "enum": ["personal", "business"] }
  },
  "required": ["accountType"],
  "if": { "properties": { "accountType": { "const": "business" } } },
  "then": {
    "properties": { "companyName": { "type": "string", "title": "Company name" } },
    "required": ["companyName"]
  },
  "else": {
    "properties": { "firstName": { "type": "string", "title": "First name" } }
  }
}
```

Switch "Account type" between "personal" and "business" to see "First
name" swap for "Company name". Notice that "Company name" ("then") is
already what shows before any value is picked at all: `if`'s subschema
only constrains `accountType` *when that property is present* — on
empty data there's nothing to contradict, so the check passes
vacuously. Only explicitly picking "personal" makes it fail and swaps in
"else"'s "First name". `if`/`then`/`else` can also be nested inside
`dependentSchemas` to scope a condition to one property instead of the
whole object — same rendering, just triggered only once that property is
present.

## layout.if: expression-driven visibility

`layout.if` is VJSF's own keyword, evaluated as a JS expression rather
than interpreted as JSON Schema — useful for conditions that don't map
to a validation rule, or that need to reach outside the current node's
own data. Reaching a *sibling* property (rather than the node's own
value) requires an impure expression reading `parent.data`:

<VjsfDemo demo="demo-combined-schemas/layout-if" />

```json
{
  "type": "object",
  "properties": {
    "country": { "type": "string", "title": "Country", "enum": ["France", "Other"] },
    "vatNumber": {
      "type": "string",
      "title": "VAT number",
      "layout": { "if": { "expr": "parent.data?.country === \"France\"", "pure": false } }
    }
  }
}
```

Unlike `if`/`then`/`else`, a field hidden by `layout.if` is a purely
visual/layout concern: it is not a JSON Schema semantic, so nothing about
it changes what the schema considers valid data on its own (combine it
with `required`/`if`-`then` if the field should also become mandatory
when shown). See [expressions](/behavior/expressions) for the full list
of parameters (`data`, `parent`, `context`, `display`, …) available to
every expression, including another `layout.if` example.

## Related

- [Expressions](/behavior/expressions) — the expression types and
  parameters used by `layout.if` and every other expression-based
  keyword.
- [Sections](/components/sections) — how a plain nested object without
  any of these keywords is rendered.
