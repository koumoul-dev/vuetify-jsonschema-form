import { describe, it, expect } from 'vitest'
import { BRAND, vuetifyTheme } from './theme'

describe('brand theme', () => {
  it('drives the dark primary from a single token', () => {
    // The whole point of D11: primary is one token, swapped in one line.
    // Site is dark-only, so there is a single theme to check.
    expect(vuetifyTheme.themes.dark.colors.primary).toBe(BRAND.primary)
  })

  it('exposes the brand blue as the documented swap target', () => {
    expect(BRAND.blue).toBe('#1e88e5')
  })
})
