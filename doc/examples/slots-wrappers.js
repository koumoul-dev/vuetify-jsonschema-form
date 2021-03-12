const id = 'slots-wrappers'

const title = 'Slots and components'

const description = `The slots can be used to extend vjsf capabilities by integrating third-party elements.

It is recommended to write wrapper components that create the bridge between vjsf and the integrated components.

This example uses the wrapper components available [here](https://github.com/koumoul-dev/vuetify-jsonschema-form/tree/master/doc/components/wrappers). Note that these are only examples that you can duplicate and adapt to your needs, they might be completed and extracted in separate modules for direct reuse later on.`

const schema = {
  type: 'object',
  properties: {
    arrayProp: {
      type: 'array',
      title: `I'm an array of objects rendered using custom components`,
      items: {
        type: 'object',
        required: ['htmlProp', 'markdownProp'],
        properties: {
          htmlProp: {
            type: 'string',
            title: `I'm a HTML string`,
            description: 'This custom component uses [tiptap](https://tiptap.dev/) through [tiptap-vuetify](https://github.com/iliyaZelenko/tiptap-vuetify).',
            'x-display': 'custom-tiptap'
          },
          markdownProp: {
            type: 'string',
            title: `I'm a markdown string`,
            description: 'This custom component uses [Toast UI editor](https://github.com/nhn/tui.editor).',
            'x-display': 'custom-toast-ui-editor'
          },
          avatarProp: {
            type: 'string',
            title: `I'm a base64 png image string`,
            description: 'This custom component uses [cropperjs](https://github.com/fengyuanchen/cropperjs)/[vue-cropperjs](https://www.npmjs.com/package/vue-cropperjs).',
            'x-display': 'custom-avatar'
          }
        }
      }
    }
  }
}

const model = {
  arrayProp: [{
    htmlProp: '<b>initial content</b>',
    markdownProp: '**initial content**'
  }]
}

const template = `<v-jsf v-model="model" :schema="schema" :options="options">
  <template slot="custom-tiptap" slot-scope="context">
    <v-jsf-tiptap v-bind="context" />
  </template>
  <template slot="custom-toast-ui-editor" slot-scope="context">
    <v-jsf-toast-ui-editor v-bind="context" />
  </template>
  <template slot="custom-avatar" slot-scope="context">
    <v-jsf-crop-img v-bind="context" />
  </template>
</v-jsf>`

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, template, options, skip: true }
