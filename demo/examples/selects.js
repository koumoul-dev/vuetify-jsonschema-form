module.exports = {
  title: 'Basic',
  schema: {
    'title': 'Person',
    'type': 'object',
    'properties': {
      'gender': {
        'type': 'string',
        'description': "The person's gender.",
        enum: ['male', 'female']
      },
      'genderWithTitles': {
        'type': 'string',
        'description': "The person's gender with separate value and title.",
        oneOf: [{const: 'm', title: 'male'}, {const: 'f', title: 'female'}]
      },
      'fromAjaxString': {
        'type': 'string',
        'description': 'The values come from an HTTP request.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      'fromAjaxObject': {
        'type': 'object',
        'description': 'The values come from an HTTP request and are stored as object.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href',
        properties: {
          href: {type: 'string'},
          title: {type: 'string'},
          page: {type: 'string'},
          schema: {type: 'array'}
        }
      },
      'fromAjaxWithQuery': {
        'type': 'string',
        'description': 'The values come from an HTTP request with textual filter.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?q={q}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      fromData: {
        type: 'object',
        description: 'The values come from another part of the data.',
        'x-fromData': 'fromAjaxObject.schema',
        'x-itemTitle': 'x-originalName',
        'x-itemKey': 'key'
      }
    }
  },
  data: {
    'gender': 'male',
    genderWithTitles: 'm'
  }
}
