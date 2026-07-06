import type { DemoCollection } from '../types'

// The same 2-field schema (a required "name" and a "format: email" field)
// is reused across the validateOn demos so the only difference readers see
// between them is the option itself.
const contactSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', title: 'Email', format: 'email' },
  },
}

const collection: DemoCollection = {
  id: 'demo-validation',
  route: '/behavior/validation',
  demos: [
    {
      id: 'validate-on-input',
      title: 'validateOn: input (default)',
      schema: contactSchema,
      options: { validateOn: 'input' },
    },
    {
      id: 'validate-on-blur',
      title: 'validateOn: blur',
      schema: contactSchema,
      options: { validateOn: 'blur' },
    },
    {
      id: 'validate-on-submit',
      title: 'validateOn: submit',
      schema: contactSchema,
      options: { validateOn: 'submit' },
    },
    {
      id: 'initial-validation',
      title: 'initialValidation: always',
      schema: contactSchema,
      data: { email: 'not-an-email' },
      options: { initialValidation: 'always' },
    },
    {
      id: 'remove-additional',
      title: 'removeAdditional: true',
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: { type: 'string', title: 'Title' },
        },
      },
      // Seeded with an extra "legacy" property not declared in the schema:
      // with removeAdditional: true it is stripped from the model on load,
      // visible in the Data tab.
      data: { title: 'Catalog title', legacy: 'stale-value' },
      options: { removeAdditional: true },
    },
    {
      id: 'nullable',
      title: 'Nullable property storing null when emptied',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name (plain string)' },
          nickname: { type: ['string', 'null'], title: 'Nickname (nullable)' },
        },
      },
      data: { name: 'Ada Lovelace', nickname: 'ada' },
    },
    {
      id: 'read-only-modes',
      title: 'readOnlyPropertiesMode: hide',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string', title: 'Id', readOnly: true },
          name: { type: 'string', title: 'Name' },
        },
      },
      data: { id: 'usr_38271', name: 'Ada Lovelace' },
      options: { readOnlyPropertiesMode: 'hide' },
    },
  ],
}
export default collection
