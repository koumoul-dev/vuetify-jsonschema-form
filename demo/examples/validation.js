module.exports = {
  title: 'Validation',
  schema: {
    'title': 'Person',
    'type': 'object',
    required: ['firstName'],
    'properties': {
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
  data: {
    'firstName': 'John',
    'lastName': 'Doe',
    'age': 21
  }
}
