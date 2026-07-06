import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-vuetify-integration',
  route: '/behavior/vuetify-integration',
  demos: [
    {
      id: 'comp',
      title: 'layout.comp switching a number to a slider',
      schema: {
        type: 'number',
        title: 'Volume',
        minimum: 0,
        maximum: 10,
        layout: { comp: 'slider' },
      },
    },
    {
      id: 'props',
      title: 'layout.props forwarded to the Vuetify component',
      schema: {
        type: 'string',
        title: 'Username',
        layout: {
          props: {
            variant: 'solo-filled',
            clearable: true,
            counter: 20,
            'prepend-inner-icon': 'mdi-account',
          },
        },
      },
    },
    {
      id: 'defaults',
      title: 'Vuetify defaults targeting the Vjsf* aliases',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
          age: { type: 'integer', title: 'Age' },
        },
      },
      vuetifyDefaults: {
        VjsfTextField: { VTextField: { variant: 'outlined' } },
        VjsfNumberField: { VNumberInput: { variant: 'solo-filled' } },
      },
    },
  ],
}
export default collection
