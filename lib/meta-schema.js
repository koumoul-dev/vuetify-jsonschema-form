export default {
  $id: 'https://koumoul-dev.github.io/vuetify-jsonschema-form/vocab-draft/meta-schema',
  $schema: 'https://koumoul-dev.github.io/vuetify-jsonschema-form/vocab-draft/meta-schema',
  $vocabulary: {
    'https://json-schema.org/draft/2020-12/vocab/core': true,
    'https://json-schema.org/draft/2020-12/vocab/applicator': true,
    'https://json-schema.org/draft/2020-12/vocab/validation': true,
    'https://json-schema.org/draft/2020-12/vocab/meta-data': true,
    'https://json-schema.org/draft/2020-12/vocab/format-annotation': true,
    'https://koumoul-dev.github.io/vuetify-jsonschema-form/vocab-draft/vocab': true
  },
  $dynamicAnchor: 'meta',
  title: '@koumoul/vjsf meta-schema - extra keywords for form rendering',
  allOf: [
    { $ref: 'https://json-schema.org/draft/2020-12/schema' }
  ],
  properties: {
    visible: {
      type: 'boolean',
      title: 'Visibility status of a property. The implementation can calculate the actual visibility based on this information and other criteria (readOnly, layout, condition, etc).'
    },
    formOptions: {
      type: 'object'
    },
    separator: {
      type: 'string'
    }
  }
}
