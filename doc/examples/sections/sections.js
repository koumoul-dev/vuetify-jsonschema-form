const id = 'sections'

const title = 'Sections'

const description = `Children objects are rendered as sections if they have a title.

It is also possible to create sections without nesting levels in your schema by using \`allOf\`.

The rendering of sections is customized by the \`sectionsClass\` option (margins, and indenting) and the \`sectionsTitlesClasses\` (titles sizes ate different section depth).`

const schema = {
  type: 'object',
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
      },
      allOf: [{
        title: `I'm a subsection`,
        'x-cols': 6,
        properties: {
          stringProp3: { type: 'string', title: `I'm a property in subsection 2.1` }
        }
      }, {
        title: `I'm another subsection`,
        'x-cols': 6,
        properties: {
          stringProp4: { type: 'string', title: `I'm a property in subsection 2.2` }
        }
      }]
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
