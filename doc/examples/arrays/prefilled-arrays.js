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

const model = {
  filledArray: [
    {
      href: 'https://koumoul.com/s/data-fair/api/v1/datasets/etablissements-finess-france',
      title: 'Liste des établissements du domaine sanitaire et social',
      icon: {
        name: 'map-marker',
        svg: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-map-marker" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" /></svg>'
      }
    },
    {
      href: 'https://koumoul.com/s/data-fair/api/v1/datasets/jep-2018-france',
      title: 'Journées européennes du patrimoine en France Métropolitaine',
      icon: {
        name: 'map-marker',
        svg: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-map-marker" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" /></svg>'
      },
      additionalProp: 'journées européennes'
    }
  ]
}

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
    }]
  },
  'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-latest/lines?q=': {
    total: 4495,
    results: [{
      path: 'ab-testing/ab-testing.svg',
      '_file.content_type': 'image/svg+xml',
      '_file.content': '',
      '_file.content_length': 3,
      _rand: 132845,
      svg: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-ab-testing" width="24" height="24" viewBox="0 0 24 24"><path d="M4 2A2 2 0 0 0 2 4V12H4V8H6V12H8V4A2 2 0 0 0 6 2H4M4 4H6V6H4M22 15.5V14A2 2 0 0 0 20 12H16V22H20A2 2 0 0 0 22 20V18.5A1.54 1.54 0 0 0 20.5 17A1.54 1.54 0 0 0 22 15.5M20 20H18V18H20V20M20 16H18V14H20M5.79 21.61L4.21 20.39L18.21 2.39L19.79 3.61Z" /></svg>',
      author: 'Michael Richins',
      name: 'ab-testing',
      _i: 1569936485740,
      packVersion: '4.4.95',
      _attachment_url: 'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-4.4.95/attachments/ab-testing/ab-testing.svg',
      version: '4.0.96',
      pack: 'mdi',
      tags: 'Developer / Languages',
      _score: null,
      _id: 'ab-testing'
    }]
  }
}

export default { id, title, description, schema, model, options, httpMocks }
