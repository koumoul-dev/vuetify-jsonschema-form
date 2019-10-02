module.exports = {
  title: 'Icons',
  schema: {
    type: 'object',
    properties: {
      fromEnum: {
        title: 'From enum',
        type: 'string',
        description: 'The values are icon codes coming from an enum.',
        'x-display': 'icon',
        enum: ['mdi-alarm', 'mdi-alarm-plus', 'mdi-alarm-off']
      },
      fromEnumArray: {
        title: 'From enum in array',
        type: 'array',
        description: 'The values are icon codes coming from an enum and are put into an array',
        'x-display': 'icon',
        items: {
          type: 'string',
          enum: ['mdi-alarm', 'mdi-alarm-plus', 'mdi-alarm-off']
        }
      },
      fromOneOf: {
        title: 'From oneOf',
        type: 'string',
        description: "The values are icon codes coming from a oneOf choice with 'const' and 'title' attributes.",
        'x-display': 'icon',
        oneOf: [{ const: 'mdi-alarm', title: 'Alarm', icon: 'mdi-alarm' }, { const: 'mdi-alarm-plus', title: 'Alarm plus', icon: 'mdi-alarm-plus' }]
      },
      fromAjaxImages: {
        title: 'From Ajax Images',
        type: 'object',
        description: 'The values are URLs to SVG icons fetched from an API.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-latest/lines?q={q}',
        'x-itemKey': 'name',
        'x-itemTitle': 'name',
        'x-itemIcon': '_attachment_url',
        'x-itemsProp': 'results',
        properties: {
          name: {
            type: 'string'
          },
          _attachment_url: {
            type: 'string'
          }
        }
      },
      fromAjaxSVG: {
        title: 'From Ajax SVG',
        type: 'object',
        description: 'The values are raw SVG icons fetched from an API.',
        'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-latest/lines?q={q}',
        'x-itemKey': 'name',
        'x-itemTitle': 'name',
        'x-itemIcon': 'svg',
        'x-itemsProp': 'results',
        properties: {
          name: {
            type: 'string'
          },
          svg: {
            type: 'string'
          }
        }
      }
    }
  },
  data: {
    fromEnumArray: ['mdi-alarm', 'mdi-alarm-plus'],
    fromOneOf: 'mdi-alarm'
  }
}
