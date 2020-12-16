const id = 'editable-array-inline'

const title = 'Editable array inline'

const description = `Editable arrays can be rendered in an inline mode using the \`editMode=inline\` option.

The form will use much less dialogs. It is better in the case of nested editable arrays, where the overlapping dialogs become a mess.`

const schema = {
  type: 'object',
  properties: {
    objectArrayProp: {
      type: 'array',
      title: `I'm an array of objects`,
      'x-itemTitle': 'titleProp',
      items: {
        type: 'object',
        // required: ['titleProp', 'stringProp'],
        required: ['titleProp'],
        properties: {
          titleProp: { type: 'string', title: `I'm a required string used as title` },
          // stringProp: { type: 'string', title: `I'm another required string` },
          nestedObjectArrayProp: {
            type: 'array',
            title: `I'm a nested array of objects`,
            'x-options': { arrayItemCardProps: { outlined: true } },
            'x-itemTitle': 'titleProp',
            items: {
              type: 'object',
              required: ['titleProp'],
              properties: {
                titleProp: { type: 'string', title: `I'm a required string used as title` }
              }
            }
          }
        }
      }
    }
  }
}

const model = {
  objectArrayProp: [{
    titleProp: `I'm an object`,
    nestedObjectArrayProp: [{
      titleProp: `I'm a nested object`
    }]
  }]
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
