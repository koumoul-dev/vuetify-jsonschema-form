const id = '_infinite_loop'

const title = 'infinite loop'

const description = 'The empty string in default values along with the nesting can create some infinite loops'

const schema = {
  type: 'object',
  properties: {
    webhooks: {
      'type': 'array',
      'title': 'Liste d\'appels extérieurs',
      'x-sortable': false,
      'x-itemTitle': 'none',
      'items': {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'events', 'target'],
        properties: {
          title: {
            type: 'string',
            title: 'Titre',
          },
          events: {
            type: 'array',
            title: 'Événements déclencheurs',
            items: {
              type: 'string',
              oneOf: [{
                const: 'dataset-dataset-created',
                title: 'Un nouveau jeu de données a été créé',
              }, {
                const: 'dataset-data-updated',
                title: 'Le fichier d\'un jeu de données a été mis à jour',
              }, {
                const: 'dataset-error',
                title: 'Un jeu de données a rencontré une erreur',
              }, {
                const: 'dataset-finalize-end',
                title: 'Un jeu de données a été finalisé et mis en ligne',
              }, {
                const: 'dataset-publication',
                title: 'Un jeu de données a été publié sur un catalogue',
              }, {
                const: 'dataset-downloaded',
                title: 'Un jeu de données a été téléchargé dans un format fichier',
              }, {
                const: 'dataset-downloaded-filter',
                title: 'Un extrait filtré d\'un jeu de données a été téléchargé dans un format fichier',
              }, {
                const: 'application-application-created',
                title: 'Une nouvelle réutilisation a été créée',
              }, {
                const: 'application-error',
                title: 'Une réutilisation a rencontré une erreur',
              }, {
                const: 'application-publication',
                title: 'Une réutilisation a été publiée sur un catalogue',
              }],
            },
          },
          target: {
            type: 'object',
            required: ['type'],
            oneOf: [{
              title: 'Appel HTTP simple (compatible avec Slack et Mattermost)',
              properties: {
                type: {
                  const: 'http',
                  title: 'Type de cible',
                },
                params: {
                  type: 'object',
                  required: ['url'],
                  properties: {
                    url: {
                      type: 'string',
                      title: 'URL du serveur HTTP cible',
                    },
                  },
                },
              },
            }, {
              title: 'Google Analytics (ancien mode Universal Analytics)',
              properties: {
                type: {
                  const: 'ga',
                },
                params: {
                  type: 'object',
                  required: ['trackingId'],
                  properties: {
                    trackingId: {
                      type: 'string',
                      title: '(GA) Identifiant du tracker',
                    },
                    appName: {
                      type: 'string',
                      default: '',
                      title: '(GA) Nom de l\'application',
                    },
                    appVersion: {
                      type: 'string',
                      default: '',
                      title: '(GA) Version de l\'application',
                    },
                  },
                },
              },
            }, {
              title: 'Google Analytics (nouveau mode Global site tag)',
              properties: {
                type: {
                  const: 'gtag',
                },
                params: {
                  type: 'object',
                  required: ['measurementId', 'apiSecret', 'eventName'],
                  properties: {
                    measurementId: {
                      type: 'string',
                      default: '',
                      title: '(GTAG) Identifiant de mesure',
                      description: 'Trouvez cet identifiant dans l\'interface de Google Analytics > Administration > Flux de données > choisissez votre flux > ID DE MESURE',
                    },
                    apiSecret: {
                      type: 'string',
                      default: '',
                      title: '(GA) Secret d\'API',
                      description: 'Trouvez cet identifiant dans l\'interface de Google Analytics > Administration > Flux de données > choisissez votre flux > Codes secrets de l\'API du protocole de mesure > Créer',
                    },
                    eventName: {
                      type: 'string',
                      default: '',
                      title: '(GTAG) Nom de l\'événement',
                      description: 'Pas plus de 40 caractères, uniquement des lettres, chiffres et tirets bas.',
                      pattern: '^[a-zA-Z0-9_]{0,40}$',
                    },
                  },
                },
              },
            }],
          },
        },
      },
    },
  },
}

const model = { webhooks: [] }

const options = { locale: 'fr', arrayItemCardProps: { outlined: true, tile: true }, editMode: 'inline' }

export default { id, title, description, schema, model, options }
