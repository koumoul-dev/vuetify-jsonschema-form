// Import-only wrapper: this file touches two things vitest can't resolve
// (a vite virtual module and a deep JSON import), so the buildable logic
// lives in build-meta-schema.ts (pure, tested) and this stays one line deep.
import draft7 from 'ajv/dist/refs/json-schema-draft-07.json'
import layoutKeyword from 'virtual:layout-keyword-schema'
import { buildVjsfMetaSchema } from './build-meta-schema'

export const vjsfMetaSchema = buildVjsfMetaSchema(draft7, layoutKeyword)
