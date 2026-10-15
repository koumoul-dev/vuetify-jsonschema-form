import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-number',
  route: '/components/number',
  demos: [
    {
      id: 'number-vs-integer',
      title: 'type: number vs type: integer',
      schema: {
        type: 'object',
        properties: {
          weight: { type: 'number', title: 'Weight (number)', description: 'Accepts decimals, e.g. 2.5' },
          quantity: { type: 'integer', title: 'Quantity (integer)', description: 'Only whole numbers are valid' },
        },
      },
    },
    {
      id: 'validation',
      title: 'minimum, maximum & multipleOf',
      schema: {
        type: 'number',
        title: 'Between 0 and 100, multiple of 5',
        minimum: 0,
        maximum: 100,
        multipleOf: 5,
      },
      data: 42,
      options: { initialValidation: 'always' },
    },
    {
      id: 'slider',
      title: 'layout: slider',
      schema: { type: 'number', title: 'Volume', layout: 'slider', minimum: 0, maximum: 10 },
    },
    {
      id: 'slider-label-before',
      title: 'layout: slider — label on its own line',
      description:
        'On a narrow layout the built-in slider label is squeezed inline to the ' +
        'left of the track and wraps awkwardly. A slider is a simple component, so ' +
        'its label is the layout.label key — setting it to an empty string drops the ' +
        'inline label, and a before slot (a plain string is rendered as Markdown) ' +
        're-renders the title on its own line above the track. thumb-label and ' +
        'show-ticks are passed straight through to the v-slider via layout.props, ' +
        'while step stays a first-class layout key.',
      schema: {
        type: 'integer',
        default: 1,
        minimum: 0,
        maximum: 6,
        layout: {
          label: '',
          comp: 'slider',
          step: 1,
          slots: { before: 'Margin between items' },
          props: { 'thumb-label': 'hover', 'show-ticks': 'always' },
        },
      },
      data: 3,
    },
  ],
}
export default collection
