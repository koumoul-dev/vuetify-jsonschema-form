const id = 'select-deps'

const title = 'Selects with dependencies'

const description = `It is possible to create a select based on values from another part of the model.

It is also possible to inject properties from the model inside the URL for an HTTP based select.`

const schema = {
  type: 'object',
  properties: {
    selectAjaxObject: {
      type: 'object',
      title: `I'm an object from HTTP request used as source for next select`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' },
        schema: { type: 'array' }
      }
    }
  },
  dependencies: {
    selectAjaxObject: {
      properties: {
        selectFromData: {
          type: 'object',
          title: `I'm an object selected from a child array of the previous property`,
          'x-fromData': 'selectAjaxObject.schema',
          'x-itemTitle': 'x-originalName',
          'x-itemKey': 'key'
        },
        selectAjaxDep: {
          type: 'object',
          title: `I'm an object selected from HTTP request based on the first property`,
          'x-fromUrl': '{selectAjaxObject.href}/schema',
          'x-itemTitle': 'label',
          'x-itemKey': 'key'
        }
      }
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

export default { id, title, description, schema, model, options }
