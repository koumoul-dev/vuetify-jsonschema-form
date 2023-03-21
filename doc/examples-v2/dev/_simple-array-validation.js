const id = '_simple-array-validation'

const title = 'Simple array with a required prop'

const description = `Minimal case to check that validation works properly in in the case of editable arrays.`

const schema = {
  type: 'object',
  properties: {
    arrayProp: {
      type: 'array',
      title: `I'm an array of objects`,
      items: {
        type: 'object',
        required: ['stringProp'],
        properties: {
          stringProp: { type: 'string', title: `I'm a required string` }
        }
      }
    }
  }
}

const model = {
  // arrayProp: [{ stringProp: '' }]
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
