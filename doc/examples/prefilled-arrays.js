const id = 'prefilled-arrays'

const title = 'Prefilled arrays'

const description = `Arrays can be initialized using a list of values. In this case elements can be edited and sorted but it is not possible to add or remove them.

Objects used to initialize the array are fetched using similar methods as for select fields (fromData, fromUrl).`

const schema = {
  type: 'object',
  properties: {
    filledArray: {
      type: 'array',
      title: `I'm an array filled by HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&size=4&select=href,title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      'x-display': 'list',
      items: {
        type: 'object',
        properties: {
          href: { type: 'string', 'x-display': 'hidden' },
          title: { type: 'string', 'x-display': 'hidden' },
          additionalProp: { type: 'string', title: `I'm an additional field` }
        }
      }
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

export default { id, title, description, schema, model, options }
