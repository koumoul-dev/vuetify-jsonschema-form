const id = 'conditionals'

const title = 'Conditional content (beta)'

const description = `It is possible to toggle some properties by using the [conditional subschemas](https://json-schema.org/understanding-json-schema/reference/conditionals.html) if/then/else syntax. The simpler use-case is toggling some properties based on a boolean switch.

This functionality requires a JSON schema validator. If [Ajv](https://github.com/ajv-validator/ajv) is available as a global variable it will be used, otherwise you can pass an ajv instance in \`options.ajv\` or a validator function in \`options.validator\`. If you chose the latter you must define a function that accepts a schema as parameter and returns another function that will accept the model as parameter and return null for a valid schema or an error for an invalid schema.`

const schema = {
  type: 'object',
  allOf: [
    {
      properties: {
        booleanConditionProp: {
          type: 'boolean',
          'x-display': 'switch',
          title: `I'm a boolean used to toggle the content below`
        }
      },
      if: {
        required: ['booleanConditionProp'],
        properties: {
          booleanConditionProp: { const: true }
        }
      },
      then: {
        properties: {
          stringProp1: {
            type: 'string',
            title: `I'm a string available if the boolean switch is true`
          }
        }
      },
      else: {
        properties: {
          stringProp2: {
            type: 'string',
            title: `I'm another string available if the boolean switch is false`
          }
        }
      }
    },
    {
      properties: {
        numberCondition: {
          type: 'integer',
          minimum: 0,
          maximum: 120,
          title: `I'm a number whose value is used to toggle content below`
        }
      },
      if: {
        required: ['numberCondition'],
        properties: {
          numberCondition: { minimum: 0, maximum: 18 }
        }
      },
      then: {
        properties: {
          stringProp3: {
            type: 'string',
            title: `I'm a string available if the number condition is less than 18`
          }
        }
      }
    }
  ]
}

const model = {
  booleanConditionProp: true,
  numberCondition: 10
}

const options = {
  validator(schema) {
    return (model) => null
  }
}

export default { id, title, description, schema, model, options }
