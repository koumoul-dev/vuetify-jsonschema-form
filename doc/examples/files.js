const id = 'files'

const title = 'Files'

const description = `A string property can be rendered as a file upload form if it has the \`contentMediaType\` attribute or the \`x-display=file\` annotation.`

const schema = {
  type: 'object',
  properties: {
    pngProp: { type: 'string', title: `I'm a PNG image stored as a base64 string`, contentMediaType: 'image/png', writeOnly: true },
    imageProp: { type: 'string', title: `I'm an image stored as a data url`, contentMediaType: 'image/png', 'x-options': { filesAsDataUrl: true }, writeOnly: true },
    imageArrayProp: { type: 'array', title: `I'm an array of images`, items: { type: 'string', contentMediaType: 'image/png' }, 'x-options': { filesAsDataUrl: true }, writeOnly: true }
  }
}

const model = {}

export default { id, title, description, schema, model }
