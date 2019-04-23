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
        description: 'This is a simple array of strings',
        'items': {
          'type': 'string'
        }
      },
      'sizes': {
        'type': 'array',
        'items': {
          'type': 'string',
          enum: ['small', 'medium', 'large']
        },
        minItems: 1
      },
      'vegetables': {
        'type': 'array',
        'description': 'A list of vegetables as editable objects.',
        'items': { '$ref': '#/definitions/veggie' }
      },
      'fromAjaxObjects': {
        type: 'array',
        title: 'Tableau d\'objets depuis ajax présentés en liste',
        description: 'The values come from an HTTP request and are stored as an array of objects.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href',
        'x-display': 'list',
        items: {
          type: 'object',
          properties: {
            href: { type: 'string', 'x-display': 'hidden' },
            title: { type: 'string', 'x-display': 'hidden' },
            txtFromUser: { type: 'string', title: 'Additional field for user' }
          }
        }
      },
      coordinate: {
        type: 'array',
        title: 'Lat/lon coordinates as a tuple',
        items: [{ type: 'number', title: 'Latitude' }, { type: 'number', title: 'Longitude' }]
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
    ],
    fromAjaxObjects: [{
      'href': 'https://koumoul.com/s/data-fair/api/v1/datasets/jep-2018-france',
      'title': 'Journées européennes du patrimoine en France Métropolitaine',
      'txtFromUser': 'User already wrote stuff here'
    }, {
      'href': 'OLD KEY',
      'title': 'This one does not match anymore an item from ajax query'
    }]
  }
}
