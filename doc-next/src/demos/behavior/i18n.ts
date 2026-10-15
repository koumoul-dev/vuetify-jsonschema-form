import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-i18n',
  route: '/behavior/i18n',
  demos: [
    {
      id: 'locale-fr',
      title: 'Same list schema, locale: fr',
      schema: {
        type: 'array',
        title: 'Contacts',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', title: 'Name' },
          },
        },
      },
      data: [{ name: 'Ada Lovelace' }, { name: 'Alan Turing' }],
      options: { locale: 'fr' },
    },
    {
      id: 'x-i18n',
      title: 'x-i18n-* annotations',
      schema: {
        type: 'object',
        required: ['str1'],
        properties: {
          str1: {
            type: 'string',
            title: 'String 1',
            'x-i18n-title': { fr: 'Texte 1' },
          },
        },
      },
      options: { locale: 'fr', xI18n: true },
    },
  ],
}
export default collection
