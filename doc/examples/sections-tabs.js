const id = 'sections-tabs'

const title = 'Sections as tabs'

const description = `Use the \`x-display="tabs"\` annotation to display sections as tabs. You can also use the \`rootDisplay\` option to display root sections as tabs regardless of the content of the schema.

You can use the \`x-props\`annotation to configure the rendering of a specific set of tabs and the \`tabsProps\` option to configure default rendering of any set of tabs.`

const schema = {
  type: 'object',
  'x-display': 'tabs',
  'x-props': { grow: true },
  description: `I'm an object with sections rendered as tabs.`,
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
