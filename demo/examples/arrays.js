module.exports = {
  title: 'Arrays',
  schema: {
    'id': 'https://example.com/arrays.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'description': 'A representation of a person, company, organization, or place',
    'type': 'object',
    'properties': {
      'fruits': {
        'type': 'array',
        'items': {
          'type': 'string'
        }
      },
      'vegetables': {
        'type': 'array',
        'items': { '$ref': '#/definitions/veggie' }
      },
      coordinate: {
        type: 'array',
        title: 'Lat/lon coordinates as a tuple',
        items: [{type: 'number', title: 'Latitude'}, {type: 'number', title: 'Longitude'}]
      }
    },
    'definitions': {
      'veggie': {
        'type': 'object',
        'required': [ 'veggieName', 'veggieLike' ],
        'properties': {
          'veggieName': {
            'type': 'string',
            'description': 'The name of the vegetable.'
          },
          'veggieLike': {
            'type': 'boolean',
            'description': 'Do I like this vegetable?'
          }
        }
      }
    }
  },
  data: {
    'fruits': [ 'apple', 'orange', 'pear' ],
    'vegetables': [
      {
        'veggieName': 'potato',
        'veggieLike': true
      },
      {
        'veggieName': 'broccoli',
        'veggieLike': false
      }
    ]
  }
}
