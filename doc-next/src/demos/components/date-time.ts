import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-date-time',
  route: '/components/date-time',
  demos: [
    {
      id: 'date',
      title: 'format: date',
      schema: {
        type: 'object',
        properties: {
          dueDate: { type: 'string', format: 'date', title: 'Due date' },
        },
      },
    },
    {
      id: 'date-time',
      title: 'format: date-time',
      schema: {
        type: 'object',
        properties: {
          appointment: { type: 'string', format: 'date-time', title: 'Appointment' },
        },
      },
    },
    {
      id: 'time',
      title: 'format: time',
      schema: {
        type: 'object',
        properties: {
          openingTime: { type: 'string', format: 'time', title: 'Opening time' },
        },
      },
    },
    {
      id: 'min-max',
      title: 'Restricting the range with min/max',
      schema: {
        type: 'object',
        properties: {
          slot: {
            type: 'string',
            format: 'date',
            title: 'Book a slot (1 to 10 July 2026)',
            layout: {
              comp: 'date-picker',
              props: { min: '2026-07-01', max: '2026-07-10' },
            },
          },
        },
      },
    },
  ],
}
export default collection
