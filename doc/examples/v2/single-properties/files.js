const id = 'files'

const title = 'Files'

const description = `A string property can be rendered as a file upload form if it has the \`contentMediaType\` attribute or the \`x-display=file\` annotation.

An object property can also be rendered as a file upload. In this case the name, type, size and lastModified subproperties will be filled with metadatas from the uploaded file. By default the data subproperty will contain a reference to a File/Blob object, except if you define its type as string.`

const schema = {
  type: 'object',
  properties: {
    pngProp: { type: 'string', title: 'I\'m a PNG image stored as a base64 string', contentMediaType: 'image/png', writeOnly: true },
    imageProp: { type: 'string', title: 'I\'m an image stored as a data url', contentMediaType: 'image/*', 'x-options': { filesAsDataUrl: true }, writeOnly: true },
    imageArrayProp: { type: 'array', title: 'I\'m an array of images', items: { type: 'string', contentMediaType: 'image/*' }, 'x-options': { filesAsDataUrl: true }, writeOnly: true },
    objectFileProp: {
      type: 'object',
      title: 'I\'m a file as an object with base64 data',
      contentMediaType: 'image/*',
      writeOnly: true,
      properties: {
        name: { type: 'string' },
        size: { type: 'number' },
        type: { type: 'string' },
        lastModified: { type: 'string', format: 'date-time' },
        data: { type: 'string' }
      }
    },
    objectFileBlobProp: {
      type: 'object',
      title: 'I\'m a file as an object with Blob data',
      contentMediaType: 'image/*',
      writeOnly: true,
      properties: {
        name: { type: 'string' },
        size: { type: 'number' },
        type: { type: 'string' },
        lastModified: { type: 'string', format: 'date-time' }
      }
    },
    arrayFileBlobProp: {
      type: 'array',
      title: 'I\'m an array of files as objects with Blob data',
      items: {
        type: 'object',
        contentMediaType: 'image/*',
        writeOnly: true
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
