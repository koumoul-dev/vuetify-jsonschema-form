/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Image cropper',
  id: 'img-cropper',
  description: 'This component combines a file upload input and a simple image cropper.',
  schema: {
    type: 'object',
    properties: {
      img1: {
        title: 'Load an image',
        type: 'object',
        layout: 'img-cropper'
      }
    }
  },
  warning: 'This component requires the @koumoul/vjsf-img-cropper plugin.'
}

export default example
