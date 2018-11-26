module.exports = {
  title: 'Nested',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Person',
    description: 'A few metadata about some person in a nested object structure.',
    'type': 'object',
    required: ['name'],
    'properties': {
      type: {
        type: 'string',
        const: 'person'
      },
      name: {
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
          'firstName': {
            'type': 'string',
            'description': "The person's first name."
          },
          'lastName': {
            'type': 'string',
            'description': "The person's last name."
          }
        }
      },
      others: {
        type: 'object',
        title: 'Other optional data',
        properties: {
          alive: {
            type: 'boolean',
            default: true
          },
          'age': {
            'description': 'Age in years which must be equal to or greater than zero.',
            'type': 'integer',
            'minimum': 0
          },
          'description': {
            'description': 'A longer text for the description.',
            'type': 'string',
            'maxLength': 2000
          },
          'homepage': {
            'description': 'A long string also, but display is forced on single line',
            'type': 'string',
            'maxLength': 2000,
            'x-display': 'single-line'
          }
        }
      },
      parents: {
        type: 'array',
        title: 'Optional data about parents',
        items: [{
          type: 'string',
          title: 'Parent 1'
        }, {
          type: 'string',
          title: 'Parent 2'
        }]
      }
    }
  },
  data: {}
}
