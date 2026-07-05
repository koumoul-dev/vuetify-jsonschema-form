---
title: Options
description: The full catalogue of compile and runtime options accepted by VJSF
nav:
  order: 2
---

# Options

VJSF's options come in two flavors, depending on when they can be
applied: [compile options](#compile-options) are consumed while the
schema is compiled into a layout, [runtime options](#runtime-options)
keep acting on the rendered form.

Both kinds are passed together in a single object, to the `vjsf`
component or to the compiler. The object is typed; runtime options can
additionally be overwritten at any level of the schema with the
`layout.options` keyword:

<v-row>
<v-col cols="12" md="6">

**The global options object:**

```ts
import type { Options } from '@koumoul/vjsf'

const options: Options = {
  locale: 'fr',
  density: 'compact'
}
```

</v-col>
<v-col cols="12" md="6">

**A runtime option overwritten in the schema:**

```json
{
  "type": "object",
  "properties": {
    "advanced": {
      "type": "string",
      "layout": { "options": { "density": "comfortable" } }
    }
  }
}
```

</v-col>
</v-row>

## Compile options

Compile options are only used while a schema is compiled into a layout:
whether that happens at runtime, on mount (see
[compilation](/behavior/compilation)), or ahead of time with
`@koumoul/vjsf-compiler`. Once compilation has happened, these options
are baked into the result: they cannot be changed afterwards, and they
cannot be overwritten at intermediate levels of the schema.

<OptionsList type="compile" />

## Runtime options

Runtime options can be used both at compile time and afterwards, and,
unlike compile options, they can be overwritten at any level of the
schema using the `layout.options` keyword. This lets you, for example,
render the whole form with `density: "compact"` but switch a single
section back to `density: "comfortable"`.

Options set this way apply to the node that carries them and cascade to
everything below it. One subtlety: options that control how a node
processes its child properties — `readOnlyPropertiesMode`,
`removeAdditional` — are read on the *object* that owns the properties,
so to affect a single property they must be set on the parent object,
not on the property itself.

<OptionsList type="runtime" />
