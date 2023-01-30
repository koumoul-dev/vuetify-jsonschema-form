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

  - major versions of frameworks and greater maturity of libraries and schema specifications
  - performance issues on large schemas inherent to the way reactivity is implemented
  - accumulated experience from developpers and users

Next are a few ideas about how things could look on the next major version. Some of these ideas are already detailed in issues, but I like having a more complete view of the future in a single document.

### Vocabulary / expressivity

  - define a [form or display or layout vocabulary](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/304) ?
  - use a common [data vocabulary](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/306) in replacement of x-fromUrl and x-fromData ?
  - implement [explicit layout management](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/293) as well as the current implicit layout
  - better distinction between disabled (fields are rendered but not active) and readonly (content is rendered purely for reading, does not even look like a form) ?
  - use standard json pointers for key, fullKey, fromData, etc

### Development frameworks and tools

  - Vue 3
  - Vuetify 3
  - Typescript
  - Vite

Do we keep building a dist ? I suspect most people use a toolchain that can load the lib from source code and build it inside their app.

Do we get back to using templates instead of render functions ? I think maybe the limitations we tried to circumvent are not so true anymore or not so important in the new architecture. If we do this we might clarify components import.

### Improved composition

The massive use of mixins works for now but we can do better. Explore the composition API of Vue 3.

I think the multi-root components have the potentiel of making many things simpler (for example an object rendered as a flat section can be rendered in a component without adding intermediate structure).

More generic/meta injection of custom components, slots, props, etc so that many use cases are covered without multiplying options.

### Reactivity and performance

  - no recursivity of the root component (but the vjsf-property property described in next section would be recurstive)
  - optional immutability on the root component (cloning of the root model)
  - allow for mutability of objects and arrays below root component

If we manage to implement a saner reactivity system and by leveraging the separation between the root component and vjef-property component I think we can solve the annoying issue of [external schema/data change](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/58#issuecomment-1408141749) and have more predictable behaviors in general.

### Decoupling of core and components

The following is an initial proposition. It needs more thinking and testing.

The core manages:

  - layout object construction from schema and other layout object manipulations
  - model reactivity, root model immutability
  - global form validation (errorMessages are then dispatched to propertis based on key)
  - data fetching
  - a generic component (vjsf-property ?) that
    - propagates schema validation up the component tree
    - provides validation errors to children
    - renders the component provided by the lib (vjsf-property-lib ? vjsf-property-vuetify ?) or a custom component or a slot, all with a homogenous signature (value, layout, errorMessages, @input, @change)
    - maybe also render some standard slots like before and after ?
    - uses the provide/inject pattern for awareness of ifs parent and children
  - renders the generic component once for the root object

The components lib provides:

  - a main component that has a common props and events signature as simple as possible to work with the core vjsf-property component (value, layout, errorMessages, @input, @change) then uses components from the target UI framework
  - a few possibilities for nested rendering:
    - the lib component can in turn use the core vjsf-property to render child properties based on their "layout" prop
    - the core component can fill slots for the lib component

Ideally the core and the components lib would be sufficiently decoupled to allow for creating alternate component libs for other frameworks than vuetify. Maybe this project should even be separated into 'vue-json-schema-form' and 'vuetify-json-schema-form'. This is not a top priority and should not be done if it compromises maintenability.

### Better responsive design

Similar logic to the usual responsive breakpoints (xs, sm, etc.), but base this on the actual size available to the form (and invidually to each of its children). This should be solved in the core vjsf-property component so that when given to the lib component it has a single value to apply.

Do we keep using a 12 columns grid system like vuetify or do we use more generic percent based values ?

Do we implement responsive layout with flexbox directly in the core vjsf-property component or do we delegate this to the lib component ?

The responsive breakpoint should be usable at the lowest level possible to define the width of each property or at the highest level possible to define a totally different layout (change order, hide an avanced section, use expansion panels instead of tabs, etc.).

Also different layouts might be provided for editable and readOnly mode.

### Schema validation

I really want to check if a very strong ajv integration could solve all our schema validation needs.

The core component vjsf-property would apply ajv on all its intermediate models. At an object level either a child already displays an error (we can know that using inject/provide mechanism) or the error is displayed on the current level.

We should look info [ajv-errors](https://www.npmjs.com/package/ajv-errors) and [ajv-i18n](https://github.com/ajv-validator/ajv-i18n).

The validator could also be used to validate also the internal vocabularies (cf section "Vocabulary / expressivity").

The validator could also be used detect the current item of a select based on oneOf/anyOf.

If we use ajv specifically then we could also use more functionality like [Modifying data during validation](https://ajv.js.org/guide/modifying-data.html).

With strong validation integration the tagline "Create beautiful and low-effort forms that output **valid data**" would become a hard reality instead of a moving target where we strive to cover more cases as we go.

### Support JTD ?

See here for [a discussion of JTD vs JSON schema](https://ajv.js.org/guide/schema-language.html). In my mind the most important case for JTD is the code generation capabilities (https://github.com/jsontypedef/json-typedef-codegen). Not only do you ensure validity at input validation, you can also ensure the safety of the code that manipulates the data afterward.

A strong integration of Ajv and the decoupling of layout vs schema might make supporting both specifications possible without too much hassle. In this case should the project be renamed (vue-json-form) ?

Warning : I am not sure yet that JTD has enough expressivity tu support a good implicit layout generation.

### Retro-compatibility

The core should manage retro-compatibility of schema annotations and at least some options. It should emit warnings for options that are no longer supported. Technical compatibility is not as much of a priority (props, slots, etc) as long as the functionality can be preserved with reasonable work from developpers.