import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-markdown',
  route: '/plugins/markdown',
  demos: [
    {
      id: 'default',
      title: 'layout: markdown',
      schema: {
        type: 'object',
        properties: {
          content: { type: 'string', title: 'Content', layout: 'markdown' },
        },
      },
    },
    {
      id: 'easymde-options',
      title: 'Customizing EasyMDE (pluginsOptions.markdown)',
      schema: {
        type: 'object',
        properties: {
          content: { type: 'string', title: 'Content', layout: 'markdown' },
        },
      },
      options: {
        pluginsOptions: {
          markdown: {
            easyMDEOptions: { minHeight: '150px', maxHeight: '150px' },
          },
        },
      },
    },
  ],
}
export default collection
