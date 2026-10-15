import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-layout-keyword',
  route: '/behavior/layout-keyword',
  demos: [
    {
      id: 'help-warning',
      title: 'layout.help tooltip and deprecated warning',
      schema: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            title: 'API key',
            layout: {
              help: 'Found in your **account settings**, under *Security*.',
            },
          },
          token: {
            type: 'string',
            title: 'Legacy token',
            deprecated: true,
          },
        },
      },
      options: {
        useDeprecated: true,
      },
    },
  ],
}
export default collection
