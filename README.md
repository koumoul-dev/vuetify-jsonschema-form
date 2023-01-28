# vjsf

*vuetify-jsonschema-form* - *@koumoul/vjsf on npm*

Create beautiful and low-effort forms that output valid data.

Based on [Vue.js](https://vuejs.org/) / [Vuetify](https://vuetifyjs.com/) / [JSON Schema](https://json-schema.org/).

See [the documentation](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/) and join us [on gitter](https://gitter.im/koumoul-dev/vjsf).

![](doc/static/vjsf.gif)

## Bug reports

Bug reports are created using github issues. The examples in the documentation include codepen links, as much as possible please save a duplicate codepen with the minimal schema/config to reproduce your problem.

## Contribute

See [CONTRIBUTE.md](./CONTRIBUTE.md).

## What comes next ?

I think a few thinks converge toward rethinking and rewriting large parts of vjsf.

  - major versions of frameworks
  - performance issues on large schemas inherent to the way reactivity is implemented
  - accumulated experience from developpers and users

Next are a few ideas about how things could look on the next major version.

### Vocabulary / expressivity

  - define a [form or display vocabulary](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/304) ?
  - use a common [data vocabulary](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/306) in replacement of x-fromUrl and x-fromData ?
  - implement [explicit layout management](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/293) as well as the current implicit layout
  - better distinction between disabled (fields are rendered but not active) and readonly (content is rendered purely for reading, does not even look like a form) ?

### Frameworks and tools

  - Vue 3
  - Vuetify 3
  - Typescript
  - Vite

Do we keep building a dist ? I suspect most people use a toolchain that can load the lib from source code and build it inside their app.

### Reactivity and performance

  - no recursivity of the root component
  - optional immutability on the root component (cloning of the root model)
  - allow for mutability of objects and arrays below root component

### Improved composition

The massive use of mixins works for now but we can do better. Explore the composition API of Vue 3.

I think the multi-root components have the potentiel of making many things simpler (for example an object rendered as a flat section can be rendered in a component without adding intermediate structure).

More generic/meta injection of custom components, slots, props, etc so that many use cases are covered without multiplying options.

### Decoupling of core and components

The following is an initial proposition. It needs more thinking and testing.

The core manages:

  - layout object construction from schema and other layout object manipulations
  - reactivity, immutability
  - form validation
  - data fetching
  - a generic meta-component that
    - maps schema+layout content to a component name and renders this component (text, text-long, number, date, date-time, tabs, etc.)
    - propagates schema validation up the component tree
    - provides validation errors to children
    - propagates model changes and other events
  - renders the meta-component once for the root object

The components lib provides:

  - components whose names match those required by the core
  - these components have a common props and events signature as simple as possible to work with the core meta-component (value, schema, layout, @input, @change) then use components from the target UI framework
  - these components can in turn use the core meta-component when they are sections

Ideally the core and the components lib would be sufficiently decoupled to allow for creating alternate component libs for other frameworks than vuetify. Maybe this project should even be separated into 'vue-json-schema-form' and 'vuetify-json-schema-form'. This is not a top priority and should not be done if it compromises maintenability.

Note: this meta-programming approach is not ideal to let the build system know what components to include.

### Schema validation

I really want to check if a very strong ajv integration could solve all our schema validation needs.

The core meta-component would apply ajv on all sub models. At an object level either a child displays an error (we can know that using inject/provide mechanism) or the error is displayed on the current level.

The validator could be used to validate also the internal vocabularies (cf section "Vocabulary / expressivity").

### Retro-compatibility

The core should manage retro-compatibility of schema annotations and at least some options. It should emit warnings for options that are no longer supported. Technical compatibility is not as much of a priority (props, slots, etc) as long as the functionality can be preserved with reasonable work from developpers.