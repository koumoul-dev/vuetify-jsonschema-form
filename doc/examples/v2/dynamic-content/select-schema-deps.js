const id = 'select-schema-deps'

const title = 'Selects with schema dependencies'

const description = `Using expressions in fromData it is possible to mix information from both other parts of the model and other parts of the schema.

This example illustrates this by reusing the oneOf list of values from a property in another while also filtering this oneOf using the current value of the first property. This creates a select based on the selected values of another select that also uses the proper titles.

Please note that this example requires the \`evalMethod=evalExpr\` or \`evalMethod=newFunction\` option. See the [Expressions documentation](configuration#expressions).`

const schema = {
  type: 'object',
  properties: {
    selectStringOneOf: {
      title: 'I\'m an array of strings from a oneOf definition',
      type: 'array',
      items: {
        type: 'string',
        oneOf: [
          { const: 'value1', title: 'Value 1' },
          { const: 'value2', title: 'Value 2' },
          { const: 'value3', title: 'Value 3' },
          { const: 'value4', title: 'Value 4' }
        ]
      }
    }
  },
  dependencies: {
    selectStringOneOf: {
      properties: {
        selectStringDep: {
          title: 'I\'m an an array of string from a dependency to other property values and schema',
          type: 'array',
          items: {
            type: 'string'
          },
          'x-fromData': 'filterOneOfItem(item) = indexOf(item.const, parent.value.selectStringOneOf) != -1; filter(filterOneOfItem, parent.schema.properties.selectStringOneOf.items.oneOf)',
          // another fromData value if evalMethod was newFunction
          // 'x-fromData': 'parent.schema.properties.selectStringOneOf.items.oneOf.filter(function(item){return parent.value.selectStringOneOf.indexOf(item.const) !== -1})',
          'x-itemTitle': 'title',
          'x-itemKey': 'const'
        }
      }
    }
  }
}

const model = {}

const options = { evalMethod: 'evalExpr' }

export default { id, title, description, schema, model, options }
