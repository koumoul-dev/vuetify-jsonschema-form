const id = 'markdown-editor'

const title = 'Markdown editor (beta)'

const description = `You can edit markdown content using the \`x-display=markdown\` annotation.

To do this VJsf integrates [EasyMDE](https://github.com/Ionaru/easy-markdown-editor). But to prevent creating a larger distributable it is not declared as a dependency, you need to load it yourself and make it available in global.EasyMDE (or window.EasyMDE). For example:

\`\`\`
import EasyMDE from 'easymde/dist/easymde.min.js'
 import 'easymde/dist/easymde.min.css'
 global.EasyMDE = EasyMDE
\`\`\`

  `

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
          markdownProp: { type: 'string', 'x-display': 'markdown', title: `I'm a markdown string` }
        }
      }
    }
  }
}

const model = {
  objectArrayProp: [{
    titleProp: 'This object has a markdown property',
    markdownProp: 'This content is written in *Markdown* in a [dedicated editor](https://github.com/Ionaru/easy-markdown-editor).'
  }]
}

const options = {
  editMode: 'inline',
  easyMDEOptions: { minHeight: '300px', maxHeight: '300px' }
}

export default { id, title, description, schema, model, options }
