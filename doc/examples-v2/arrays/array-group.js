const id = 'array-group'

const title = 'Share items across arrays'

const description = 'You can use the annotation `x-arrayGroup` to signify that some arrays share some common scope. In this case it should be possible to drag and drop or copy and paste items across these arrays.'

const schema = {
  type: 'object',
  properties: {
    arrayProp1: {
      type: 'array',
      title: 'Array 1',
      'x-cols': 6,
      'x-class': 'px-1',
      'x-itemTitle': 'stringProp',
      'x-arrayGroup': 'array-group1',
      items: {
        type: 'object',
        properties: {
          stringProp: {
            type: 'string',
            title: 'String prop'
          }
        }
      }
    },
    arrayProp2: {
      type: 'array',
      title: 'Array 2',
      'x-cols': 6,
      'x-class': 'px-1',
      'x-itemTitle': 'stringProp',
      'x-arrayGroup': 'array-group1',
      items: {
        type: 'object',
        properties: {
          stringProp: {
            type: 'string',
            title: 'String prop'
          }
        }
      }
    }
  }
}

const model = {
  arrayProp1: [{ stringProp: 'hello' }, { stringProp: 'hello again' }],
  arrayProp2: [{ stringProp: 'hello array 2' }]
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
