const id = 'combobox'

const title = 'Comboboxes'

const description = `Anything that can be represented as a select can also be represented as a combobox to allow the user to enter extra values. To do so you can:

  - replace a constraining \`enum\` by \`examples\`
  - replace a constraining \`oneOf\` by a \`anyOf\` with one open item that permits any extra value
  - add the \`x-display=combobox\` annotation to properties with \`x-fromUrl\` or \`x-fromData\` annotations
`

const schema = {
  type: 'object',
  properties: {
    examplesString: {
      type: 'string',
      title: `I'm a string with some examples`,
      default: `I'm a default value`,
      examples: [`I'm a suggested value`, `I'm another suggestion`]
    },
    examplesNumber: {
      type: 'number',
      title: `I'm a number with some examples`,
      default: 1,
      examples: [11, 22, 33, 44, 55]
    },
    examplesStringArray: {
      type: 'array',
      title: `I'm an array of strings with some examples`,
      items: {
        type: 'string',
        examples: [`I'm a suggested value`, `I'm another suggestion`]
      }
    },
    anyOfString: {
      type: 'string',
      title: `I'm a string with an open-ended anyOf`,
      anyOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }, {}]
    },
    anyOfStringArray: {
      type: 'array',
      title: `I'm an array of strings with an open-ended anyOf`,
      items: {
        type: 'string',
        anyOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }, {}]
      }
    },
    ajaxString: {
      type: 'string',
      title: `I'm a string selected from results of an HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'title',
      'x-display': 'combobox'
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

const httpMocks = {
  'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&select=title&owner=organization:5a5dc47163ebd4a6f438589b': { results: [] }
}

export default { id, title, description, schema, model, options, httpMocks }
