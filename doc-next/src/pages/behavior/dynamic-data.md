---
title: Dynamic data
description: Populating a select's items from an expression or from an HTTP API with layout.getItems
nav:
  order: 5
---

# Dynamic data

By default, a `select`-like component's items come from the schema's
`enum`/`oneOf`, or from `layout.items`. `layout.getItems` lets you compute
those items dynamically instead, either from an [expression](/behavior/expressions)
or by fetching them from an HTTP API.

## getItems as an expression

The simplest form of `getItems` is a plain expression, evaluated with
access to the usual [expression parameters](/behavior/expressions#parameters)
(`context` is the most commonly used one here). It must return an array:

<VjsfDemo demo="demo-dynamic-data/get-items-expression" />

```json
{
  "type": "object",
  "properties": {
    "fruit": {
      "type": "string",
      "title": "Favorite fruit",
      "layout": { "getItems": "context.fruits" }
    }
  }
}
```

## Transforming items

For more complex cases `getItems` can be an object instead of a bare
expression. Its `expr` property is the same kind of expression as above,
and a few extra keys let you transform whatever it returns into usable
items:

- **itemsResults** - extracts the array of items from the expression's
  result (useful when the raw result is `{ results: [...] }` rather than
  a plain array).
- **itemHeader** - marks/labels group headers among the items.
- **itemTitle** - the text shown for each item.
- **itemKey** - a unique key for each item (required when items are
  objects, see [components/select](/components/select)).
- **itemValue** - the value stored in the form data for each item
  (defaults to the item itself).
- **itemIcon** - an icon shown next to each item.
- **returnObjects** - keep the full item object as the stored value
  instead of extracting `itemValue`.
- **immutable** - hint that the source data never changes, so items can
  be cached more aggressively.

<VjsfDemo demo="demo-dynamic-data/transform-items" />

```json
{
  "type": "object",
  "properties": {
    "person": {
      "type": "string",
      "title": "Pick a person",
      "layout": {
        "getItems": {
          "expr": "context.people",
          "itemsResults": "data.results",
          "itemTitle": "item.label",
          "itemValue": "item.id",
          "itemIcon": "\"mdi-\" + item.icon"
        }
      }
    }
  }
}
```

## Fetching items from an API

Instead of `expr`, `getItems` can define a `url` (a `js-tpl` expression by
default, see [expressions](/behavior/expressions#type-js-tpl)) to fetch
items over HTTP. This is the most common way to back a `select` or
`autocomplete` component with a real API, but it depends on a live
endpoint, so it isn't demoed interactively on this page — the shape below
is illustrative only.

```json
{
  "type": "object",
  "properties": {
    "dataset": {
      "type": "string",
      "title": "A select from a URL",
      "layout": {
        "getItems": {
          "url": "https://example.com/api/datasets?q={q}",
          "qSearchParam": "q",
          "searchParams": { "status": "\"finalized\"" },
          "headers": { "Authorization": "`Bearer ${context.token}`" },
          "itemsResults": "data.results",
          "itemTitle": "item.title",
          "itemValue": "item.id"
        }
      }
    }
  }
}
```

The extra fetch-specific keys:

- **url** - the endpoint to call, as a `js-tpl` expression.
- **qSearchParam** - the name of the query-string parameter carrying the
  user's search text, when the component is an autocomplete (VJSF
  substitutes `{q}` in the URL, or appends this parameter if `{q}` isn't
  present).
- **searchParams** - additional query-string parameters, each a `js-eval`
  expression.
- **headers** - HTTP headers, each a `js-eval` expression.

`itemsResults`, `itemTitle`, `itemValue`, `itemKey`, `itemIcon`,
`itemHeader`, `returnObjects` and `immutable` behave exactly as described
above for the expression form.

## Fetch configuration

Two runtime options control every `getItems` fetch, wherever it happens
in the schema:

- **fetchBaseURL** (default `'/'`) - a base URL resolved against every
  relative `getItems.url`.
- **fetchOptions** (default `{}`) - options forwarded to the underlying
  [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)
  call (headers, credentials, etc.); can also be a function of the
  resolved `URL` returning those options.

See [components/select](/components/select) for the rest of the
`select`/`autocomplete` component's own options (multiple selection,
chips, groups, etc.).
