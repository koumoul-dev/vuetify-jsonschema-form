import type { DemoCollection } from '../types'

function sectionsSchema (layout: string): Record<string, any> {
  return {
    type: 'object',
    layout,
    properties: {
      profile: {
        type: 'object',
        title: 'Profile',
        properties: {
          firstName: { type: 'string', title: 'First name' },
          lastName: { type: 'string', title: 'Last name' },
        },
      },
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: { type: 'string', title: 'Street' },
          city: { type: 'string', title: 'City' },
        },
      },
      preferences: {
        type: 'object',
        title: 'Preferences',
        properties: {
          newsletter: { type: 'boolean', title: 'Subscribe to the newsletter' },
        },
      },
    },
  }
}

const collection: DemoCollection = {
  id: 'demo-tabs-stepper-panels',
  route: '/components/tabs-stepper-panels',
  demos: [
    {
      id: 'tabs',
      title: 'layout: "tabs"',
      schema: sectionsSchema('tabs'),
    },
    {
      id: 'vertical-tabs',
      title: 'layout: "vertical-tabs"',
      schema: sectionsSchema('vertical-tabs'),
    },
    {
      id: 'stepper',
      title: 'layout: "stepper"',
      schema: sectionsSchema('stepper'),
    },
    {
      id: 'expansion-panels',
      title: 'layout: "expansion-panels"',
      schema: sectionsSchema('expansion-panels'),
    },
    {
      id: 'conditional-child',
      title: 'A tab shown only when "Company account" is checked',
      schema: {
        type: 'object',
        layout: 'tabs',
        properties: {
          profile: {
            type: 'object',
            title: 'Profile',
            properties: {
              name: { type: 'string', title: 'Name' },
              isCompany: { type: 'boolean', title: 'Company account' },
            },
          },
          company: {
            type: 'object',
            title: 'Company',
            layout: { if: 'parent.data?.profile?.isCompany' },
            properties: {
              companyName: { type: 'string', title: 'Company name' },
              vatNumber: { type: 'string', title: 'VAT number' },
            },
          },
        },
      },
    },
  ],
}
export default collection
