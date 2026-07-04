---
title: v2 to v3
description: Instructions on how to migrate from VJSF v2 to v3
nav:
  order: 2
---

# v2 to v3

The old documentation for v2 is still available
[here](https://koumoul-dev.github.io/vuetify-jsonschema-form/2.x/).

VJSF v3 is a complete rewrite. The motivation was to:

- migrate to Vue 3 and Vuetify 3
- rethink the annotations vocabulary and the options for more power and clarity
- loosen the coupling between schema structure and presentation while preserving simplicity
- implement a saner reactivity model and hopefully see gains in performance and stability
- fully validate the data (using Ajv) and offer a stronger guarantee that a valid form means a valid output data
- extract all the core logic into a separate project ([JSON Layout](https://github.com/json-layout/json-layout)) to pave the way for implementations in other UI frameworks
- provide a compilation solution that allows the users to move as much pre-processing as possible (and the associated dependencies) to build time

Being an entirely new major version of VJSF with a new vocabulary of
annotations, breaking changes are inevitable. But a compatibility function
is provided to help facilitate the migration:

```js
import { v2compat } from '@koumoul/vjsf/compat/v2'
const v3Schema = v2compat(schema)
```

See the [V2 compat](/migration/v2-compat) pages for a full tour of what
this function covers, with live demos ported from the VJSF v2
documentation:

- [Overview](/migration/v2-compat)
- [Properties & selects](/migration/v2-compat-properties)
- [Sections & arrays](/migration/v2-compat-sections-arrays)
- [Dynamic & advanced](/migration/v2-compat-advanced)
