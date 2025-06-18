import { describe, it, assert } from 'vitest'
import Ajv from 'ajv'
import { v2compat } from '../src/compat/v2'
import { compile as compileLayout } from '@json-layout/core'

describe('schema compatibility function', () => {
  it('should transform simple schemas', () => {
    const schema = v2compat({ type: 'string', 'x-display': 'textarea' }, new Ajv())
    assert.deepEqual(schema, { type: 'string', $id: '_jl', layout: 'textarea' })
    assert.ok(compileLayout(schema))
  })

  it('should transform a complex select', () => {
    const schema = v2compat({
      type: 'object',
      properties: {
        objectContext: {
          type: 'object',
          title: 'I\'m an object with values from the context',
          'x-fromData': 'context.objectItems',
          'x-itemKey': 'val',
          'x-itemTitle': 'label'
        }
      }
    })
    assert.equal(schema.properties.objectContext.layout.comp, 'select')
    assert.ok(schema.properties.objectContext.layout.getItems)
    assert.equal(schema.properties.objectContext.layout.getItems.expr, 'context.objectItems')
    assert.ok(compileLayout(schema))
  })

  it('should transform array with x-display to custom layout component', () => {
    const inputSchema = {
      type: 'object',
      properties: {
        customComponent: {
          type: 'array',
          'x-display': 'custom-component',
          items: {
            type: 'object',
            properties: {
              column_1: { type: 'string', title: 'Column 1' },
              column_2: { type: 'array', title: 'Column 2' },
            }
          }
        },
        defaultList: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              column_1: { type: 'string', title: 'Column 1' },
              column_2: { type: 'array', title: 'Column 2' },
            }
          }
        },
      }
    }

    const schema = v2compat(inputSchema)
    assert.equal(schema.properties.customComponent.layout, 'custom-component')
    assert.equal(schema.properties.defaultList.layout, 'list')
  })

  it('should transform a expression with number indexing', () => {
    const schema = v2compat({
      type: 'object',
      properties: {
        objectContext: {
          type: 'object',
          title: 'I\'m an object with values from the context',
          'x-fromData': 'context.array.0.objectItems'
        }
      }
    })
    assert.equal(schema.properties.objectContext.layout.comp, 'select')
    assert.ok(schema.properties.objectContext.layout.getItems)
    assert.equal(schema.properties.objectContext.layout.getItems.expr, 'context.array[0].objectItems')
    assert.ok(compileLayout(schema))
  })

  it('should transform an URL expression with number indexing', () => {
    const schema = v2compat({
      title: 'Champ de libellé',
      type: 'object',
      'x-fromUrl': '{datasets.0.href}/schema',
      'x-itemTitle': 'label',
      'x-itemKey': 'key'
    })
    assert.equal(schema.layout.getItems.url.expr, '${rootData.datasets[0].href}/schema')
  })

  it('should transform an actual example from data-fair processing', () => {
    const schema = v2compat({
      type: 'object',
      'x-display': 'tabs',
      required: ['datasetMode', 'message'],
      allOf: [{
        title: 'Jeu de données',
        oneOf: [{
          title: 'Créer un jeu de données',
          required: ['dataset'],
          properties: {
            datasetMode: { type: 'string', const: 'create', title: 'Action' },
            dataset: {
              type: 'object',
              required: ['title'],
              properties: {
                id: { type: 'string', title: 'Identifiant (laissez vide pour calculer un identifiant à partir du titre)' },
                title: { type: 'string', title: 'Titre', default: 'Hello world ' }
              }
            }
          }
        }, {
          title: 'Mettre à jour un jeu de données',
          required: ['dataset'],
          properties: {
            datasetMode: { type: 'string', const: 'update' },
            dataset: {
              type: 'object',
              'x-fromUrl': '{context.dataFairUrl}/api/v1/datasets?q={q}&select=id,title&{context.ownerFilter}',
              'x-itemsProp': 'results',
              'x-itemTitle': 'title',
              'x-itemKey': 'id',
              properties: {
                id: { type: 'string', title: 'Identifiant' },
                title: { type: 'string', title: 'Titre' }
              }
            }
          }
        }]
      }, {
        title: 'Contenu',
        properties: {
          message: { type: 'string', title: 'Message', default: 'world !' },
          delay: { type: 'integer', title: "Délai en secondes (utilisé pour tester l'interruption de tâche)", default: 1 },
          ignoreStop: { type: 'boolean', title: "Ignorer l'instruction de stop (utilisé pour tester l'interruption brutale de tâche)", default: false }
        }
      }, {
        title: 'Email',
        properties: {
          email: {
            type: 'object',
            properties: {
              from: { type: 'string' },
              to: { type: 'string' }
            }
          }
        }
      }]
    })

    assert.equal(schema.allOf?.[0]?.oneOfLayout?.label, 'Action')
    // eslint-disable-next-line no-template-curly-in-string
    assert.deepEqual(schema.allOf?.[0]?.oneOf?.[1]?.properties?.dataset?.layout?.getItems.url, { expr: '${context.dataFairUrl}/api/v1/datasets?q={q}&select=id,title&${context.ownerFilter}', type: 'js-tpl', pure: true })
  })

  it('should transform an example with recursion', () => {
    const schema = v2compat({
      type: 'object',
      'x-display': 'tabs',
      required: ['block'],

      properties: {
        block: { $ref: '#/definitions/block' },
        separator: {
          'x-if': 'parent.value.multivalued == true',
          type: 'string',
          title: 'Séparateur',
          default: ';'
        }
      },
      definitions: {
        block: {
          type: 'object',
          properties: {
            mapping: {
              type: 'array',
              title: 'Champs à récupérer',
              description: 'Les colonnes qui seront récupéré depuis ce niveau',
              'x-itemTitle': 'key',
              items: {
                type: 'object',
                required: ['key', 'path'],
                properties: {
                  key: {
                    type: 'string',
                    title: 'Identifiant de la colonne',
                    description: 'Clé de la colonne'
                  },
                  path: {
                    type: 'string',
                    title: 'Chemin de la colonne',
                    description: "Chemin d'accès dans le json à partir de cette position"
                  }
                }
              }
            },
            expand: {
              title: "Données en profondeur d'un tableau",
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  title: 'Chemin de la colonne',
                  description: "Chemin d'accès dans le json à partir de cette position"
                }
              },
              dependencies: {
                path: {
                  properties: {
                    block: { $ref: '#/definitions/block', 'x-display': 'card' }
                  }
                }
              }
            }
          }
        }
      }
    })

    // assert.equal(schema.allOf?.[0]?.oneOfLayout?.label, 'Action')
    // eslint-disable-next-line no-template-curly-in-string
    // assert.deepEqual(schema.allOf?.[0]?.oneOf?.[1]?.properties?.dataset?.layout?.getItems.url, { expr: '${context.dataFairUrl}/api/v1/datasets?q={q}&select=id,title&${context.ownerFilter}', type: 'js-tpl', pure: true })
  })
})
