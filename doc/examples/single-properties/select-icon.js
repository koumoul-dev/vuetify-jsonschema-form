const id = 'select-icons'

const title = 'Selects with icons'

const description = `It is possible to select icon values in many ways.

They can be described by code, by SVG values or by URLs.

Possible values can be listed in enums, oneOfs or fetched from HTTP requests.`

const schema = {
  type: 'object',
  properties: {
    iconEnum: {
      title: `I'm a simple select with icon codes in enum`,
      type: 'string',
      'x-display': 'icon',
      enum: ['mdi-alarm', 'mdi-alarm-plus', 'mdi-alarm-off']
    },
    iconEnumArray: {
      title: `I'm a multiple select with icon codes in enum`,
      type: 'array',
      'x-display': 'icon',
      items: {
        type: 'string',
        enum: ['mdi-alarm', 'mdi-alarm-plus', 'mdi-alarm-off']
      }
    },
    iconOneOf: {
      title: `I'm a select with icon codes and titles in a oneOf`,
      type: 'string',
      'x-display': 'icon',
      'x-itemIcon': 'icon',
      oneOf: [
        { const: 'alarm', title: 'Alarm', icon: 'mdi-alarm' },
        { const: 'alarm-plus', title: 'Alarm plus', icon: 'mdi-alarm-plus' }
      ]
    },
    iconAjaxImages: {
      title: `I'm a select based on HTTP requests with links to icons`,
      type: 'object',
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
    iconAjaxSVG: {
      title: `I'm a select based on HTTP requests with SVG code in response`,
      type: 'object',
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
}

const model = {}

const httpMocks = {
  'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-latest/lines?q=': { results: [] }
}

const options = { selectAll: true }

export default { id, title, description, schema, model, options, httpMocks }
