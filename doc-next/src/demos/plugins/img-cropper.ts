import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-img-cropper',
  route: '/plugins/img-cropper',
  demos: [
    {
      id: 'default',
      title: 'layout: img-cropper',
      schema: { type: 'string', title: 'Avatar', layout: 'img-cropper' },
    },
    {
      id: 'accept-placeholder',
      title: 'accept + placeholder',
      schema: {
        type: 'string',
        title: 'Avatar',
        layout: {
          comp: 'img-cropper',
          accept: '.png,.jpg,.jpeg',
          placeholder: 'Drop an image here',
        },
      },
    },
  ],
}
export default collection
