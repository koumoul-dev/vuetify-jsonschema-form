---
title: Expressions
description: The JS expressions embedded in a schema's layout, their types, and the parameters they receive
nav:
  order: 4
---

# Expressions

> Expressions are pieces of imperative code dispersed in a declarative JSON
> schema. You must consider schemas interpreted by VJSF as part of the code
> source of your application: you cannot safely use schemas provided by an
> untrusted source.

Expressions are used throughout VJSF to provide dynamic functionalities
like conditional rendering (`layout.if`), computing default data
(`layout.getDefaultData`), fetching items for a select component
(`layout.getItems`), and more.

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

Content of the `display` parameter:

```
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

## Pure and impure expressions

Expressions are considered pure by default: they should only use their
input parameters, no global variable. This allows for caching
optimizations. You can declare that an expression is not pure like this:

```json
{
  "expr": "!!window.myVar",
  "pure": false
}
```

Impure expressions have access to two extra parameters:

- **rootData** - the root data of this VJSF instance.
- **parent** - a wrapper to access data from the parent node (use
  `parent.data`, or go higher up the tree with `parent.parent`).

This is also how you reach a *sibling* property from inside a property's
own expression: `data` there is that property's own value, not the parent
object's. To condition a field on a sibling, use `parent.data` in an
impure expression:

<VjsfDemo demo="demo-expressions/if-visibility" />

The schema behind this demo:

```json
{
  "type": "object",
  "properties": {
    "needsInvoice": { "type": "boolean", "title": "I need an invoice" },
    "companyName": {
      "type": "string",
      "title": "Company name",
      "layout": {
        "if": { "expr": "parent.data?.needsInvoice", "pure": false }
      }
    }
  }
}
```

`layout.getDefaultData` works the same way: it computes a value for a
node while that node's own data is still empty (see `defaultOn` on the
[options](/behavior/options) page). Once the node's data stops being
empty, whether because the user typed something or because the
expression itself produced a non-empty result, it is left alone until it
becomes empty again:

<VjsfDemo demo="demo-expressions/get-default-data" />
