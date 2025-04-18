/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Remove additional properties',
  id: 'remove-additional',
  description: 'Check removing additional properties from the form data.',
  schema: {
    '$id': 'https://github.com/data-fair/catalogs/catalog-resolved-patch',
    'x-exports': [
      'types',
      'validate',
      'resolvedSchema',
    ],
    'type': 'object',
    'additionalProperties': false,
    'properties': {
      title: {
        'type': 'string',
        'title': 'Title',
        'x-i18n-title': {
          fr: 'Titre',
        },
        'minLength': 3,
        'maxLength': 75,
      },
      description: {
        anyOf: [
          {
            'type': 'string',
            'title': 'Description',
            'x-i18n-title': {
              fr: 'Description',
            },
            'description': 'A free text area to write comments about the catalog',
            'x-i18n-description': {
              fr: 'Une zone de texte libre pour écrire des commentaires sur le catalogue',
            },
            'layout': 'markdown',
          },
          {
            type: 'null',
          },
        ],
      },
      config: {
        'x-exports': [
          'types',
          'validate',
          'schema',
        ],
        'title': 'Configuration',
        'type': 'object',
        'additionalProperties': false,
        'required': [
          'url',
        ],
        'properties': {
          url: {
            'type': 'string',
            'title': 'URL',
            'description': 'The URL of the catalog API',
            'x-i18n-description': {
              fr: 'L\'URL de l\'API du catalogue',
            },
            'pattern': '^https?://.*',
          },
        },
      },
    },
  },
}

export default example
