---
title: Expressions
description: The JS expressions embedded in a schema's layout, their types, and the parameters they receive
nav:
  order: 5
---

# Expressions

<v-alert type="warning" variant="outlined" class="mb-4">
  Expressions are pieces of imperative code dispersed in a declarative JSON
  schema. You must consider schemas interpreted by VJSF as part of the code
  source of your application: you cannot safely use schemas provided by an
  untrusted source.
</v-alert>

Expressions are used throughout VJSF to provide dynamic functionalities
like conditional rendering (`layout.if`), computing default data
(`layout.getDefaultData`, see [dynamic data](/behavior/dynamic-data)),
fetching items for a select component (`layout.getItems`), and more.

An expression is usually written as a plain string:

```json
{ "layout": { "if": "parent.data?.needsInvoice" } }
```

The object form `{ "expr": "...", "type": "...", "pure": ... }` exists to
override the defaults described in the rest of this page, but most
schemas never need it.

There are 3 types of expressions: `js-eval`, `js-tpl` and `js-fn`. All of
them are compiled to JavaScript functions that accept the same parameters.

## Type `js-eval`

This type of expression lets you write a single JS statement that will be
evaluated and returned. It is compiled like this:

```js
new Function(...params, 'return (' + expression + ')')
```

This is the default type when the expected result of the expression is a
boolean or a complex object (like the `if` property).

## Type `js-tpl`

This type of expression lets you write a [JS template
literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
that will be evaluated and returned. It is compiled like this:

```js
new Function(...params, 'return `' + expression + '`')
```

This is the default type when the expected result of the expression is a
string (like the `url` property in a `getItems` fetch instruction, see
[dynamic data](/behavior/dynamic-data)).

## Type `js-fn`

This type of expression lets you write the full body of a JS function,
including its `return` statement. It is compiled like this:

```js
new Function(...params, expression)
```

## Parameters

Every expression, whatever its type, receives the same set of parameters:

- **data** - it varies depending on the expression you are using: it can
  be the data of the current node, an item in a select component, etc.
- second positional parameter - the same value as `data`, but exposed
  under a context-dependent alias name. It is `value` by default, `item`
  for the per-item `getItems` expressions (`itemTitle`, `itemSubtitle`,
  `itemKey`, `itemValue`, `itemIcon`, `itemHeader`), and `body` for
  `getItems.itemsResults`. This is the `item` used in the [dynamic
  data](/behavior/dynamic-data) page's `item.label` examples.
- **options** - the options object passed to VJSF, merged with contextual
  options from all parent nodes.
- **context** - shortcut for `options.context`.
- **display** - the display object used to manage responsive layouts (see
  below).
- **layout** - normalized layout information of the current component.
- **readOnly** - shortcut for `options.readOnly`.
- **summary** - shortcut for `options.summary`.
- **validates** - whether the compiled layout's validation functions are
  available.

Impure expressions additionally receive `rootData` and `parent`, described
[below](#reaching-the-rest-of-the-form-with-parent-and-rootdata).

Content of the `display` parameter:

```ts
{
  width: number, // the width of the parent container
  xs: boolean,
  sm: boolean,
  smAndDown: boolean,
  smAndUp: boolean,
  md: boolean,
  mdAndDown: boolean,
  mobile: boolean, // alias for mdAndDown
  mdAndUp: boolean,
  lg: boolean,
  lgAndDown: boolean,
  lgAndUp: boolean,
  xl: boolean,
  xlAndDown: boolean,
  xlAndUp: boolean,
  xxl: boolean,
}
```

## Reaching the rest of the form with parent and rootData

Inside a property's own expression, `data` is that property's *own*
value, not the object that contains it. To make a field depend on another
part of the form, two extra parameters are available:

- **parent** - a wrapper around the parent node: `parent.data` is the
  parent's data (so `parent.data.someSibling` reads a sibling property),
  and you can climb higher up the tree with `parent.parent`.
- **rootData** - the root data of the whole form.

In the demo below, `parent.data` reaches the sibling `needsInvoice`
property to toggle the company name field:

<VjsfDemo demo="demo-expressions/if-visibility" expanded />

## Pure expressions and caching

An expression that only uses its input parameters is *pure*, which allows
VJSF to cache its results. Purity is detected automatically: expressions
whose text references `parent.data`, `parent.parent` or `rootData` are
treated as impure, everything else as pure. You never have to declare
anything in the common cases.

The explicit `"pure": false` form is only needed when the impurity is not
visible in the expression's text, typically a global variable:

```json
{
  "expr": "!!window.myVar",
  "pure": false
}
```
