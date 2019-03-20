module.exports = {
  title: 'Selects',
  schema: {
    'title': 'Person',
    type: 'object',
    required: ['gender', 'fromAjaxObject', 'fromAjaxString'],
    'properties': {
      'fromEnum': {
        title: 'From enum',
        type: 'string',
        description: 'The values are simple strings coming from an enum.',
        enum: ['value1', 'value2', 'value3']
      },
      'fromEnumArray': {
        title: 'From enum in array',
        type: 'array',
        description: 'The values are simple strings coming from an enum and are put into an array',
        items: {
          type: 'string',
          enum: ['value1', 'value2', 'value3']
        }
      },
      'fromOneOf': {
        title: 'From oneOf',
        type: 'string',
        description: "The values are simple strings coming from a oneOf choice with 'const' and 'title' attributes.",
        oneOf: [{const: 'v1', title: 'title1'}, {const: 'v2', title: 'title2'}]
      },
      'fromOneOfArray': {
        title: 'From oneOf in array',
        type: 'array',
        description: "The values are simple strings coming from a oneOf choice with 'const' and 'title' attributes and put into an array.",
        items: {
          type: 'string',
          oneOf: [{const: 'v1', title: 'title1'}, {const: 'v2', title: 'title2'}]
        }
      },
      'fromAjaxString': {
        type: 'string',
        description: 'The values come from an HTTP request.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      'fromAjaxStringArray': {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'The values come from an HTTP request and are put into an array.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      'fromAjaxObject': {
        type: 'object',
        description: 'The values come from an HTTP request and are stored as object.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
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
        type: 'object',
        description: 'The values come from an HTTP request with textual filter.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&q={q}&owner={context.owner.type}:{context.owner.id}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href'
      },
      chartDef: {
        // Simple oneOf on object, the title of const property is used as title of the select
        type: 'object',
        'x-itemKey': 'type',
        oneOf: [{
          title: 'Bar chart',
          properties: {
            type: {
              const: 'bar',
              title: 'Chose from a type (from oneOf of objects)'
            },
            xLabel: {
              type: 'string'
            },
            yLabel: {
              type: 'string'
            },
            'fromAjaxWithDep': {
              type: 'object',
              title: 'choisir un colonne',
              description: 'The values come from an HTTP request with a part of the url that depends on another part of the model.',
              'x-fromUrl': '{fromAjaxWithQuery.href}/schema',
              'x-itemTitle': 'label',
              'x-itemKey': 'key'
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
      },
      chartDef2: {
        title: 'Chose from a type (fron oneOf of objects with a description)',
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
    /* fromEnum: 'other',
    fromEnumArray: ['other'],
    fromOneOf: 'other',
    fromOneOfArray: ['other'],
    fromAjaxString: 'other',
    fromAjaxStringArray: ['other'],
    fromAjaxObject: {href: 'other', title: 'Other'},
    fromData: {key: 'other', 'x-originalName': 'Other'},
    fromAjaxWithQuery: {href: 'other', title: 'Other'},
    */
    chartDef: {
      type: 'pie',
      diameter: '10'
    },
    chartDef2: {
      type: 'pie'
    }
  }
}
