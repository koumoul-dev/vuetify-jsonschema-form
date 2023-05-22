const id = '_select-filled-deps'

const title = 'Selects with prefilled dependencies'

const description = 'This can be buggy and we might lose the content of the dependency'

const schema = {
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
          'x-fromData': 'selectAjaxObject.schema',
          'x-itemTitle': 'x-originalName',
          'x-itemKey': 'key'
        },
        selectAjaxDep: {
          type: 'object',
          title: 'I\'m an object selected from HTTP request based on the first property',
          'x-fromUrl': '{selectAjaxObject.href}/schema',
          'x-itemTitle': 'label',
          'x-itemKey': 'key'
        }
      }
    }
  }
}

const datasetSchema = [
  {
    key: 'Pays',
    type: 'string',
    'x-originalName': 'Pays',
    'x-cardinality': 148,
    'x-refersTo': null
  },
  {
    key: 'Candidats',
    type: 'string',
    'x-originalName': 'Candidats',
    'x-cardinality': 11,
    enum: [
      'Benoît HAMON',
      'Emmanuel MACRON',
      'François ASSELINEAU',
      'François FILLON',
      'Jacques CHEMINADE',
      'Jean LASSALLE',
      'Jean-Luc MÉLENCHON',
      'Marine LE PEN',
      'Nathalie ARTHAUD',
      'Nicolas DUPONT-AIGNAN',
      'Philippe POUTOU'
    ],
    'x-refersTo': null
  },
  {
    key: 'Nombre_de_voix',
    type: 'integer',
    'x-originalName': 'Nombre de voix',
    'x-cardinality': 422,
    'x-refersTo': null
  },
  {
    'x-calculated': true,
    key: '_id',
    type: 'string',
    format: 'uri-reference',
    title: 'Identifiant',
    description: 'Identifiant unique parmi toutes les lignes du jeu de données'
  },
  {
    'x-calculated': true,
    key: '_i',
    type: 'integer',
    title: 'Numéro de ligne',
    description: "Indice de la ligne dans le fichier d'origine"
  },
  {
    'x-calculated': true,
    key: '_rand',
    type: 'integer',
    title: 'Nombre aléatoire',
    description: "Un nombre aléatoire associé à la ligne qui permet d'obtenir un tri aléatoire par exemple"
  }
]

const model = {
  selectAjaxObject: {
    href: 'https://koumoul.com/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417',
    title: "Présidentielles 2017 - Votes des français à l'étranger - 1er tour",
    schema: datasetSchema
  },
  selectAjaxDep: {
    key: 'Pays',
    type: 'string',
    'x-originalName': 'Pays',
    'x-cardinality': 148,
    'x-refersTo': null,
    label: 'Pays'
  },
  selectFromData: {
    key: 'Pays',
    type: 'string',
    'x-originalName': 'Pays',
    'x-cardinality': 148,
    'x-refersTo': null
  }
}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

/* const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(4)
  expect(wrapper.vm.valid).toBe(true)
} */

const httpMocks = {
  'https://koumoul.com/data-fair/api/v1/datasets?status=finalized&select=title,schema&owner=organization:5a5dc47163ebd4a6f438589b': {
    count: 1,
    results: [{
      title: "Présidentielles 2017 - Votes des français à l'étranger - 1er tour",
      schema: datasetSchema,
      href: 'https://koumoul.com/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417'
    }]
  },
  'https://koumoul.com/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417': { schema: datasetSchema },
  'https://koumoul.com/data-fair/api/v1/datasets/tour_1_resultats_par_pays_240417/schema': datasetSchema
}

export default { id, title, description, schema, model, options, httpMocks }
