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

It is written primarily as a "scratch my own itch" project by
[Koumoul](https://koumoul.com), and we use it extensively. But it is opened
to feedback and contributions on
[Github](https://github.com/koumoul-dev/vuetify-jsonschema-form) and it is
published under the very permissive MIT license.

It might be suited for you if:

- you are tired of coding forms
- you need declarative forms as a consequence of your software's
  architecture (generic admin UI, etc.)
- you already use Vue.js + Vuetify (or if you are prepared to pull a bunch
  of new dependencies)

## Qualities we balance

We try to strike a nice balance between these qualities:

- **simplicity** - feed VJSF a simple and valid JSON schema and you should
  get a viable form
- **completeness** - the main JSON schema semantics should be covered as
  well as the most common use-cases for forms in Web applications
- **extensibility** - more specific use cases should also be supported
  through the use of lower level tools like slots, custom styles, etc.
- **validity** - the output of the form should be valid against the
  provided schema
- **homogeneity** - the look and feel should be consistent across all form
  functionalities and inside your application as a whole

## Debatable choices

While trying to strike this balance we made some debatable choices that
you should be aware of:

- Structure and presentation are coupled. Meaning that the rendering of
  the form is derived directly from the schema (as well as some options)
  and you will need to change the schema in order to modify a label,
  create a section, etc.
- Some functionalities are explicitly coupled to Vuetify. We let you use
  parameters that are directly mapped to Vuetify underlying components
  (slots, props, layout classes, etc.)
