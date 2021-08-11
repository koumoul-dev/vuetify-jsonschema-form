const id = 'prefilled-array-wrong-type'

const title = 'Prefilled array with wrong type in key property'

const description = ``

const schema = {
  type: 'object',
  properties: {
    colors: {
      title: 'Couleurs et ordre',
      type: 'array',
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets/sitadel-logements/values_agg?field=RES_PRINCIP_OU_SECOND',
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

const model = {}

const options = {}

const httpMocks = {
  'https://koumoul.com/s/data-fair/api/v1/datasets/sitadel-logements/values_agg?field=RES_PRINCIP_OU_SECOND': {
    total: 659857,
    took: 103,
    timed_out: false,
    total_values: 3,
    total_other: 0,
    aggs: [
      {
        total: 576903,
        value: 1,
        results: []
      },
      {
        total: 59692,
        value: 3,
        results: []
      },
      {
        total: 23262,
        value: 2,
        results: []
      }
    ]
  }
}

const test = async (wrapper, modelWrapper, events) => {
  expect(modelWrapper.model.colors).toHaveLength(0)
  await new Promise(resolve => setTimeout(resolve, 200))
  expect(modelWrapper.model.colors).toHaveLength(3)
  expect(modelWrapper.model.colors[1].value).toBe('3')
}

export default { id, title, description, schema, model, options, httpMocks, test }
