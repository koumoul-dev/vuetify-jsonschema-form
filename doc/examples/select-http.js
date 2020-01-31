const id = 'select-http'

const title = 'Selects from HTTP'

const description = `It is possible to fill selects using the results from HTTP requests.

Inject values coming from the context in the URL and transform the select in an autocomplete by including {q}.`

const schema = {
  type: 'object',
  properties: {
    selectAjaxString: {
      type: 'string',
      title: `I'm a string selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href'
    },
    selectAjaxStringArray: {
      type: 'array',
      items: { type: 'string' },
      title: `I'm an array of strings selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'id',
      'x-itemKey': 'href'
    },
    selectAjaxObject: {
      type: 'object',
      title: `I'm an object selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' }
      }
    },
    selectAjaxArrayOfObjects: {
      type: 'array',
      title: `I'm an array of objects selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      items: {
        type: 'object',
        properties: {
          href: { type: 'string' },
          title: { type: 'string' }
        }
      }
    },
    selectAjaxLarge: {
      type: 'object',
      title: `I'm an object from a large HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&size=100&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' }
      }
    },
    selectAjaxWithQuery: {
      type: 'object',
      title: `I'm an object from a HTTP request with query`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&q={q}&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      properties: {
        href: { type: 'string' },
        title: { type: 'string' }
      }
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

export default { id, title, description, schema, model, options }
