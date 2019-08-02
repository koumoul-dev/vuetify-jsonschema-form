module.exports = {
  title: 'Lists',
  schema: {
    title: 'Person',
    type: 'object',
    required: ['gender', 'fromAjaxObject', 'fromAjaxString'],
    properties: {
      fromEnumArray: {
        title: 'From enum in array displayed as a list',
        type: 'array',
        description: 'The values are simple strings coming from an enum and are put into an array',
        items: {
          type: 'string',
          enum: ['value1', 'value2', 'value3']
        },
        'x-display': 'list'
      },
      fromOneOfArray: {
        title: 'From oneOf in array displayed as a list',
        type: 'array',
        description: "The values are simple strings coming from a oneOf choice with 'const' and 'title' attributes and put into an array.",
        items: {
          type: 'string',
          oneOf: [{ const: 'v1', title: 'title1' }, { const: 'v2', title: 'title2' }]
        },
        'x-display': 'list'
      },
      fromAjaxStringArray: {
        title: 'From ajax in array displayed as a list',
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'The values come from an HTTP request and are put into an array.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
        'x-itemsProp': 'results',
        'x-itemTitle': 'title',
        'x-itemKey': 'href',
        'x-display': 'list'
      },
      fromAjaxObjectArray: {
        type: 'array',
        title: 'From ajax object in array displayed as a list',
        description: 'The values come from an HTTP request and are stored as objects in an array.',
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
            otherField: {
              title: 'This field is added to the item by user',
              type: 'string'
            }
          }
        }
      }
    }
  },
  data: {}
}
