module.exports = {
  title: 'Selects',
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
        // 'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&owner={context.owner.type}:{context.owner.id}',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      'fromAjaxObject': {
        'type': 'object',
        'description': 'The values come from an HTTP request and are stored as object.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&',
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
      fromData: {
        type: 'object',
        description: 'The values come from another part of the data.',
        'x-fromData': 'fromAjaxObject.schema',
        'x-itemTitle': 'x-originalName',
        'x-itemKey': 'key'
      },
      'fromAjaxWithQuery': {
        'type': 'object',
        'description': 'The values come from an HTTP request with textual filter.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&q={q}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      'fromAjaxWithDep': {
        'type': 'object',
        'description': 'The values come from an HTTP request with a part of the url that depends on another part of the model.',
        'x-fromUrl': '{fromAjaxWithQuery.href}',
        'x-itemsProp': 'schema',
        'x-itemTitle': 'x-originalName',
        'x-itemKey': 'key'
      },
      chartDef: {
        title: 'Chose from a type',
        description: 'A conditional form will be rendered below',
        type: 'object',
        'x-itemKey': 'type',
        oneOf: [{
          title: 'Bar chart',
          properties: {
            type: {
              const: 'bar'
            },
            xLabel: {
              type: 'string'
            },
            yLabel: {
              type: 'string'
            }
          }
        }, {
          title: 'Pie chart',
          properties: {
            type: {
              const: 'pie'
            },
            diameter: {
              type: 'integer'
            }
          }
        }]
      }
    }
  },
  data: {
    'gender': 'male',
    genderWithTitles: 'm',
    chartDef: {
      type: 'pie'
    }
  }
}
