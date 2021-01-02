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
          additionalProp: { type: 'string', title: `I'm an additional field` },
          icon: {
            type: 'object',
            title: 'Icone',
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
            },
            default: {
              name: 'map-marker',
              svg: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-map-marker" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" /></svg>'
            }
          }
        }
      }
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

const httpMocks = {
  'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&size=4&select=href,title&owner=organization:5a5dc47163ebd4a6f438589b': { count: 2,
    results: [{
      id: 'tour_1_resultats_par_pays_240417',
      title: "Présidentielles 2017 - Votes des français à l'étranger - 1er tour",
      owner: {
        type: 'organization',
        id: '5a5dc47163ebd4a6f438589b',
        name: 'Koumoul',
        role: null
      },
      userPermissions: [
        'readDescription',
        'readLines',
        'getGeoAgg',
        'getValuesAgg',
        'getValues',
        'getMetricAgg',
        'getWordsAgg',
        'downloadOriginalData',
        'downloadFullData',
        'readApiDoc',
        'realtime-transactions',
        'readLine',
        'readLineRevisions',
        'list'
      ],
      public: true,
      visibility: 'public',
      description: '',
      previews: [],
      href: 'https://koumoul.com/s/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417',
      page: 'https://koumoul.com/s/data-fair/dataset/tour_1_resultats_par_pays_240417'
    },
    {
      id: 'jep-2018-france',
      title: 'Journées européennes du patrimoine en France Métropolitaine',
      owner: {
        type: 'organization',
        id: '5a5dc47163ebd4a6f438589b',
        name: 'Koumoul',
        role: null
      },
      userPermissions: [
        'readDescription',
        'readLines',
        'getGeoAgg',
        'getValuesAgg',
        'getValues',
        'getMetricAgg',
        'getWordsAgg',
        'downloadOriginalData',
        'downloadFullData',
        'readApiDoc',
        'realtime-transactions',
        'readLine',
        'readLineRevisions',
        'list'
      ],
      public: true,
      visibility: 'public',
      description: '',
      previews: [],
      href: 'https://koumoul.com/s/data-fair/api/v1/datasets/jep-2018-france',
      page: 'https://koumoul.com/s/data-fair/dataset/jep-2018-france'
    }] }
}

export default { id, title, description, schema, model, options, httpMocks }
