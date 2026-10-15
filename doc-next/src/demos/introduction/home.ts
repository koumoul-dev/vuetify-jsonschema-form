import type { DemoCollection } from '../types'

// Hero demo for the homepage: small but showing several component types at once.
const collection: DemoCollection = {
  id: 'demo-home',
  route: '/',
  demos: [{
    id: 'hero',
    title: 'Hero demo',
    schema: {
      type: 'object',
      required: ['email'],
      properties: {
        name: { type: 'string', title: 'Full name' },
        email: { type: 'string', title: 'Email', format: 'email' },
        plan: { type: 'string', title: 'Plan', enum: ['free', 'team', 'enterprise'], default: 'free' },
        newsletter: { type: 'boolean', title: 'Subscribe to the newsletter' },
      },
    },
  }],
}
export default collection
