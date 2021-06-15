const id = '_prefilled-array-dependency'

const title = 'An array prefilled using values from http and depending on another property'

const description = `Complicated use-case known for being bug-prone.`

const schema = {
  type: 'object',
  required: ['datasets'],
  allOf: [{
    title: 'Data',
    properties: {
      datasets: {
        type: 'array',
        items: [{
          title: 'Dataset',
          type: 'object',
          'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&q={q}&select=id,title&bbox=true&concepts=http://dbpedia.org/ontology/codeLandRegistry&owner={context.owner.type}:{context.owner.id}',
          'x-itemsProp': 'results',
          'x-itemTitle': 'title',
          'x-itemKey': 'href',
          properties: {
            href: {
              type: 'string'
            },
            title: {
              type: 'string'
            },
            id: {
              type: 'string'
            }
          }
        }]
      }
    }
  },
  {
    title: 'Render',
    properties: {
      colorField: {
        title: 'Color property',
        type: 'string',
        'x-fromUrl': '{datasets.0.href}/schema',
        'x-itemTitle': 'label',
        'x-itemKey': 'key'
      }
    },
    dependencies: {
      colorField: {
        properties: {
          colors: {
            title: 'Colors and sort',
            type: 'array',
            'x-fromUrl': '{datasets.0.href}/values_agg?field={colorField}',
            'x-display': 'list',
            'x-itemTitle': 'value',
            'x-itemKey': 'value',
            'x-itemsProp': 'aggs',
            items: {
              type: 'object',
              properties: {
                value: {
                  type: 'string',
                  'x-display': 'hidden'
                },
                color: {
                  type: 'string',
                  format: 'hexcolor',
                  default: '#828282',
                  'x-display': 'color-picker'
                }
              }
            }
          }
        }
      }
    }
  }
  ]
}

const model = {
  string1: { test: 'test' },
  string2: 'test'
}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

export default { id, title, description, schema, model, options }
