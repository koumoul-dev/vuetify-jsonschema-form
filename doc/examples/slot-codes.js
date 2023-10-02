/** @type Record<string, string> */
const codes = {
  'custom-textarea': `
  <template #custom-textarea="{node, statefulLayout}">
    <textarea
      :value="node.data"
      style="border: 1px solid red;"
      placeholder="A custom textarea"
      @input="event => statefulLayout.input(node, event.target.value)"
    />
  </template>`
}

export default codes
