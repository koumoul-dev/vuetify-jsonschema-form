import colors from 'vuetify/lib/util/colors.mjs'

// D11 — brand palette extracted from the logo. `blue` is the recommended
// brand target; flip `primary` to `BRAND.blue` to rebrand in one line.
export const BRAND = {
  blue: '#1e88e5',
  blueLight: '#64b5f6',
  grey: '#424242',
  darkBg: '#22303a',
  // Current primary: keep the existing cyan for now (D11).
  primary: colors.cyan.accent2,
  accent: colors.cyan.accent3,
}

export const vuetifyTheme = {
  defaultTheme: 'dark',
  themes: {
    dark: {
      dark: true,
      colors: { background: '#212121', primary: BRAND.primary },
      variables: { 'border-opacity': 0.5 },
    },
  },
}
