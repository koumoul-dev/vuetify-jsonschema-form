module.exports = {
  title: 'Combinations',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Combinations',
    description: 'using anyOf and allOf combinations',
    'type': 'object',
    'properties': {
      'presentation': {
        'description': 'A longer text for the description.',
        'type': 'string',
        'maxLength': 2000
      }
    },
    allOf: [{$ref: '#/definitions/realWorldEntity'}, {$ref: '#/definitions/socialMediaEntity'}],
    oneOf: [{$ref: '#/definitions/physicalPerson'}, {$ref: '#/definitions/moralPerson'}],
    definitions: {
      realWorldEntity: {
        properties: {
          address: {
            type: 'string',
            maxLength: 2000
          },
          'credit_card': { 'type': 'number' }
        },
        'dependencies': {
          'credit_card': {
            'properties': {
              'billing_address': { 'type': 'string' }
            },
            'required': ['billing_address']
          }
        }
      },
      socialMediaEntity: {
        title: 'Social media',
        properties: {
          twitter: {
            type: 'string'
          },
          facebook: {
            type: 'string'
          }
        }
      },
      legal: {
        properties: {
          twitter: {
            type: 'string'
          },
          facebook: {
            type: 'string'
          }
        }
      },
      physicalPerson: {
        title: 'Physical person',
        properties: {
          type: {
            type: 'string',
            title: 'The type of person',
            const: 'physicalPerson'
          },
          'firstName': {
            'type': 'string',
            'description': "The person's first name."
          },
          'lastName': {
            'type': 'string',
            'description': "The person's last name."
          },
          'age': {
            'description': 'Age in years which must be equal to or greater than zero.',
            'type': 'integer',
            'minimum': 0
          }
        }
      },
      moralPerson: {
        title: 'Moral person',
        properties: {
          type: {
            type: 'string',
            const: 'moralPerson'
          },
          organizationType: {
            'type': 'string',
            enum: ['non-profit', 'for-profit']
          }
        }
      }
    }
  },
  data: {
    'firstName': 'John',
    'lastName': 'Doe',
    'age': 21
  }
}
