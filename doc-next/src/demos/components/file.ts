import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-file',
  route: '/components/file',
  demos: [
    {
      id: 'default',
      title: 'layout: file-input',
      schema: { type: 'string', title: 'Document', layout: 'file-input' },
    },
    {
      id: 'accept',
      title: 'Restricting the accepted types',
      schema: {
        type: 'string',
        title: 'Document',
        layout: {
          comp: 'file-input',
          props: { accept: '.pdf,.doc,.docx' },
        },
      },
    },
  ],
}
export default collection
