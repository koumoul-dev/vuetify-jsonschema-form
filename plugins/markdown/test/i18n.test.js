import { describe, it, expect } from 'vitest'
import i18n from '../src/i18n/index.js'

describe('i18n', () => {
  it('covers the locales of json-layout', () => {
    expect(Object.keys(i18n).sort()).toEqual(['de', 'en', 'es', 'fr', 'it', 'nl', 'pt'])
  })

  it('gives every locale all the messages', () => {
    for (const [locale, messages] of Object.entries(i18n)) {
      expect(Object.keys(messages).sort(), locale).toEqual(Object.keys(i18n.en).sort())
    }
  })
})
