const id = '_large-form'

const title = 'Large form'

const description = `Check that everything works smoothly on a quite large form.`

const schema = {
  type: 'object',
  properties: {
    objectArrayProp: {
      type: 'array',
      title: `I'm an array of objects`,
      'x-itemTitle': 'titleProp',
      items: {
        type: 'object',
        required: ['titleProp'],
        properties: {
          titleProp: { type: 'string', title: `I'm a required string used as title` },
          numberProp: { type: 'number', title: `I'm a number` },
          booleanProp: { type: 'boolean', title: `I'm a boolean` },
          selectProp: { type: 'string', enum: ['Value 1', 'Value 2'], title: `I'm a select` }
        },
        oneOf: [
          {
            title: 'Object1',
            properties: {
              objectType: { type: 'string', const: 'object1', title: 'Sub object type' },
              dateProp: { type: 'string', format: 'date', title: `I'm a date` },
              childArrayProp: {
                type: 'array',
                title: 'A child array',
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
          },
          {
            title: 'Object2',
            properties: {
              objectType: { type: 'string', const: 'object2' },
              colorProp: { type: 'string', format: 'hexcolor', title: `I'm a color` }
            }
          }
        ]
      }
    }
  }
}

const model = {
  objectArrayProp: []
}
for (let i = 0; i < 10; i++) {
  const item = {
    titleProp: 'title ' + i,
    numberProp: i,
    booleanProp: !!(i % 2),
    selectProp: 'Value ' + (1 + (i % 2))
  }
  if (i % 2 === 0) {
    item.objectType = 'object1'
    item.dateProp = new Date().toISOString().slice(0, 10)
    item.childArrayProp = [{ titleProp: 'child title 1 ' + i }, { titleProp: 'child title 2 ' + i }]
  } else {
    item.objectType = 'object2'
    item.colorProp = '#FF0000'
  }
  model.objectArrayProp.push(item)
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
