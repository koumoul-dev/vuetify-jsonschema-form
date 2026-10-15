import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-sections',
  route: '/components/sections',
  demos: [
    {
      id: 'basic',
      title: 'A nested object as a titled section',
      schema: {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            title: 'Address',
            description: 'Where the order should be shipped',
            properties: {
              street: { type: 'string', title: 'Street' },
              city: { type: 'string', title: 'City' },
            },
          },
        },
      },
    },
    {
      id: 'untitled',
      title: 'A nested object without a title',
      schema: {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            properties: {
              street: { type: 'string', title: 'Street' },
              city: { type: 'string', title: 'City' },
            },
          },
        },
      },
    },
    {
      id: 'no-subtitle',
      title: 'useDescription without "subtitle"',
      schema: {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            title: 'Address',
            description: 'Where the order should be shipped',
            properties: {
              street: { type: 'string', title: 'Street' },
              city: { type: 'string', title: 'City' },
            },
          },
        },
      },
      options: { useDescription: ['help'] },
    },
    {
      id: 'title-depth',
      title: 'titleDepth',
      schema: {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            title: 'Address',
            properties: {
              street: { type: 'string', title: 'Street' },
              coordinates: {
                type: 'object',
                title: 'Coordinates',
                properties: {
                  lat: { type: 'number', title: 'Latitude' },
                  lng: { type: 'number', title: 'Longitude' },
                },
              },
            },
          },
        },
      },
      options: { titleDepth: 3 },
    },
    {
      id: 'indent',
      title: 'indent',
      schema: {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            title: 'Address',
            properties: {
              street: { type: 'string', title: 'Street' },
              coordinates: {
                type: 'object',
                title: 'Coordinates',
                properties: {
                  lat: { type: 'number', title: 'Latitude' },
                  lng: { type: 'number', title: 'Longitude' },
                },
              },
            },
          },
        },
      },
      options: { indent: true },
    },
  ],
}
export default collection
