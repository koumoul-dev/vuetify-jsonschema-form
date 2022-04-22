const id = 'dnd-across-arrays'

const title = 'Drag and drop across arrays'

const description = `It is possible to define any parameters for [Sortable](https://github.com/SortableJS/Sortable) using the \`sortableOptions\` option.

In particular you can enable drag and drop across multiple arrays by using \`group\`.`

const schema = {
  type: 'object',
  properties: {
    arrayProp1: {
      type: 'array',
      title: 'Array 1',
      'x-cols': 6,
      'x-class': 'px-1',
      'x-itemTitle': 'stringProp',
      'x-options': { sortableOptions: { group: 'drag-group1' } },
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
      'x-options': { sortableOptions: { group: 'drag-group1' } },
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

const options = {}

export default { id, title, description, schema, model, options }
