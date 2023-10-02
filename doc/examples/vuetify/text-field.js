/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Text field',
  id: 'text-field',
  description: 'It is possible to spefify [VTextField props](https://vuetifyjs.com/en/api/v-text-field/) using `layout.props`.',
  schema: {
    type: 'string',
    title: 'A text field with custom props',
    layout: {
      props: {
        appendIcon: 'mdi-heart'
      }
    }
  }
}

export default example
