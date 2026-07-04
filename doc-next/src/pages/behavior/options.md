---
title: Options
description: The full catalogue of compile and runtime options accepted by VJSF
nav:
  order: 2
---

# Options

VJSF's options come in two flavors, depending on when they can be applied.

**Compile options** are only used while a schema is compiled into a
layout: whether that happens at runtime, on mount (see
[compilation](/behavior/compilation)), or ahead of time with
`@koumoul/vjsf-compiler`. Once compilation has happened, these options are
baked into the result: they cannot be changed afterwards, and they cannot
be overwritten at intermediate levels of the schema.

**Runtime options** can be used both at compile time and afterwards, and,
unlike compile options, they can be overwritten at any level of the
schema using the `layout.options` keyword. This lets you, for example,
render the whole form with `density: "compact"` but switch a single
section back to `density: "comfortable"`:

```json
{
  "type": "object",
  "properties": {
    "advanced": {
      "type": "object",
      "layout": { "options": { "density": "comfortable" } },
      "properties": { "...": {} }
    }
  }
}
```

## Compile options

These options can only be used at compile time; they cannot be
overwritten at runtime or at intermediate levels of the schema.

<OptionsList type="compile" />

## Runtime options

These options can be used both at compile time and at runtime, and they
can be overwritten at intermediate levels of the schema using
`layout.options`.

<OptionsList type="runtime" />
