const id = 'conditionals'

const title = 'Conditional content (if/then/else)'

const description = `It is possible to toggle some properties by using the [conditional subschemas](https://json-schema.org/understanding-json-schema/reference/conditionals.html) if/then/else syntax. The simpler use-case is toggling some properties based on a boolean switch.

This functionality requires a JSON schema validator.
If you load third-party.js [Ajv](https://github.com/ajv-validator/ajv) will be used along with ajv-formats and ajv-i18n.
Otherwise you can provide \`Ajv\`, \`ajvAddFormats\` and \`ajvLocalize\` as global variables or as options.`

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

const options = {}

export default { id, title, description, schema, model, options }
