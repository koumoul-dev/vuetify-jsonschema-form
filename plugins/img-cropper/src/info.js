/** @type {import('@json-layout/vocabulary').ComponentInfo} */
export default {
  name: 'img-cropper',
  focusable: true,
  isFileInput: true,
  schema: {
    properties: {
      accept: { type: 'string', default: 'image/*' },
      placeholder: { type: 'string' }
    }
  }
}
