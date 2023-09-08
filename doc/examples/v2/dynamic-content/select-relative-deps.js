const id = 'select-relative-deps'

const title = 'Selects with relative dependencies'

const description = `It is possible to create a select based on values that are read relatively to the current property. Meaning that you can get the current item in an array for example.

Use the special key \`parent.value\` to access the value of the parent property. You can also use \`parent.parent.value\`, etc.`

const schema = {
  type: 'array',
  title: 'I\'m an array of objects',
  items: {
    type: 'object',
    properties: {
      selectAjaxObject: {
        type: 'object',
        title: 'I\'m an object from HTTP request used as source for next select',
        'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
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
            title: 'I\'m an object selected from a child array of the previous property',
            'x-fromData': 'parent.value.selectAjaxObject.schema',
            'x-itemTitle': 'x-originalName',
            'x-itemKey': 'key'
          },
          selectAjaxDep: {
            type: 'object',
            title: 'I\'m an object selected from HTTP request based on the first property',
            'x-fromUrl': '{parent.value.selectAjaxObject.href}/schema',
            'x-itemTitle': 'label',
            'x-itemKey': 'key'
          }
        }
      }
    }
  }
}

const model = []

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

const httpMocks = {
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] }
}

export default { id, title, description, schema, model, options, httpMocks }
