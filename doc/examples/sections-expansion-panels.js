const id = 'sections-expansion-panels'

const title = 'Sections as expansion panels'

const description = `Use the \`x-display="expansion-panels"\` annotation to display sections as panels.`

const schema = {
  type: 'object',
  'x-display': 'expansion-panels',
  'x-props': { tile: true, mandatory: true },
  description: `I'm an object with sections rendered as expansions panels with the \`tile\` and \`mandatory\` options.`,
  properties: {
    objectSection1: {
      title: `I'm a section`,
      description: `I'm a description shown as a paragraph on top of section`,
      type: 'object',
      properties: {
        stringProp1: { type: 'string', title: `I'm a property in section 1` }
      }
    },
    objectSection2: {
      title: `I'm another section`,
      type: 'object',
      properties: {
        stringProp2: { type: 'string', title: `I'm a property in section 2` }
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
