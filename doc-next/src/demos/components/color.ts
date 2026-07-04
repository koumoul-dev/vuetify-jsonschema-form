import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-color',
  route: '/components/color',
  demos: [
    {
      id: 'default',
      title: 'layout: color-picker',
      schema: {
        type: 'object',
        properties: {
          brandColor: { type: 'string', title: 'Brand color', layout: 'color-picker' },
        },
      },
    },
    {
      id: 'swatches',
      title: 'Swatches',
      schema: {
        type: 'object',
        properties: {
          brandColor: {
            type: 'string',
            title: 'Brand color',
            layout: {
              comp: 'color-picker',
              props: {
                pickerProps: {
                  hideCanvas: true,
                  showSwatches: true,
                  swatches: [
                    ['#F44336', '#E91E63', '#9C27B0'],
                    ['#3F51B5', '#2196F3', '#03A9F4'],
                  ],
                },
              },
            },
          },
        },
      },
    },
  ],
}
export default collection
