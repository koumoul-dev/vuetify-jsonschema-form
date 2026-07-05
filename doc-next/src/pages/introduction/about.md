---
title: About
description: What VJSF is, who it's for, and the choices behind its design
nav:
  order: 2
---

# About

VJSF is a library to create forms for [Vue.js](https://vuejs.org/) /
[Vuetify](https://vuetifyjs.com/) applications in a declarative manner using
annotated [JSON Schemas](https://json-schema.org/). The core of VJSF is
[JSON Layout](https://github.com/json-layout/json-layout).

It was initially written by [Koumoul](https://koumoul.com) to cover our
own internal needs, and we use it extensively. It is open to feedback and
contributions on
[GitHub](https://github.com/koumoul-dev/vuetify-jsonschema-form) and it is
published under the very permissive MIT license.

It might be suited for you if:

- you are tired of coding forms
- you need declarative forms as a consequence of your software's
  architecture (generic admin UI, etc.)
- you already use Vue.js + Vuetify (or if you are prepared to pull a bunch
  of new dependencies)

## Qualities we balance

We try to strike a nice balance between these qualities:

- **Simplicity**: feed VJSF a simple and valid JSON schema and you should
  get a viable form.
- **Completeness**: the main JSON schema semantics should be covered, as
  well as the most common use-cases for forms in Web applications.
- **Extensibility**: more specific use cases should also be supported
  through the use of lower level tools like slots, custom styles, etc.
- **Validity**: the output of the form should be valid against the
  provided schema.
- **Homogeneity**: the look and feel should be consistent across all form
  functionalities and inside your application as a whole.

## Debatable choices

While trying to strike this balance we made some debatable choices that
you should be aware of:

- **Structure and presentation are coupled**: the rendering of the form
  is derived directly from the schema (as well as some options) and you
  will need to change the schema in order to modify a label, create a
  section, etc.
- **Some functionalities are explicitly coupled to Vuetify**: we let you
  use parameters that are directly mapped to the underlying Vuetify
  components (slots, props, layout classes, etc.).

## Support the project

VJSF is free and open-source, maintained by [Koumoul](https://koumoul.com)
on our own time and budget. If it saves you time, consider supporting its
development through [GitHub Sponsors](https://github.com/sponsors/koumoul-dev).

You can also help without spending anything:

- star the project on [GitHub](https://github.com/koumoul-dev/vuetify-jsonschema-form)
  to help other people discover it
- [report issues](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues)
  or open a discussion when something is missing or unclear
