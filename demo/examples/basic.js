module.exports = {
  title: 'Basic',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Person',
    description: 'A few metadata about some person.',
    'type': 'object',
    required: ['firstName', 'lastName'],
    'properties': {
      type: {
        type: 'string',
        const: 'person'
      },
      'firstName': {
        'type': 'string',
        'description': `
The person's first name.

This description can be a long text with markdown content.

  - a list item
  - another one
  `
      },
      'lastName': {
        'type': 'string',
        'description': "The person's last name."
      },
      'age': {
        'description': 'Age in years which must be equal to or greater than zero.',
        'type': 'integer',
        'minimum': 0
      },
      citizen: {
        description: 'Is this person a citizen of this country.',
        type: 'boolean'
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
  data: {
    'firstName': 'John',
    'lastName': 'Doe',
    'age': 21
  }
}
