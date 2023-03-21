const id = '_select-filled-http'

const title = 'Selects prefilled with http results'

const description = `This can be buggy and we can lose the pre-selected values.

Inject values coming from the context in the URL and transform the select in an autocomplete by including {q}.`

const schema = {
  type: 'object',
  properties: {
    selectAjaxString: {
      type: 'string',
      title: `I'm a string selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'id'
    },
    selectAjaxStringUnknown: {
      type: 'string',
      title: `I'm a string selected from results of an HTTP request with prefilled unknown value`,
      'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}&q={q}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'id'
    },
    selectAjaxObject: {
      type: 'object',
      title: `I'm an object selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner={context.owner.type}:{context.owner.id}',
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

const model = {
  selectAjaxString: 'jep-2018-france',
  selectAjaxStringUnknown: 'unknown value',
  selectAjaxObject: {
    href: 'https://koumoul.com/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417',
    title: "Présidentielles 2017 - Votes des français à l'étranger - 1er tour"
  }
}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

const httpMocks = {
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&q=&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&size=100&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner=organization:5a5dc47163ebd4a6f438589b&q=': { results: [] },
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title&owner=organization:5a5dc47163ebd4a6f438589b&q=unknown%20value': { results: [] }

}

export default { id, title, description, schema, model, options, httpMocks }
