const id = '_separator'

const title = 'Multiple values in a single string'

const description = 'Use the x-separator or separator keyword.'

const schema = {
  type: 'object',
  properties: {
    sepString: {
      type: 'string',
      separator: ','
    },
    sepSelect: {
      type: 'string',
      separator: ',',
      'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'id',
      'x-itemKey': 'id'
    }
  }
}

const model = {
  sepString: 'test1,test2'
}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

const httpMocks = {
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&q=&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&size=100&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] }
}

/* const test = async (wrapper, modelWrapper, events) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(1)

  await wrapper.vm.$nextTick()
  expect(modelWrapper.model.enumConst).toBe('value')
} */

export default { id, title, description, schema, model, options, httpMocks }
