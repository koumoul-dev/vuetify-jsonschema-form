import colors from 'vuetify/lib/util/colors.mjs'

export const vuetifyTheme = {
  defaultTheme: 'dark',
  themes: {
    dark: {
      dark: true,
      colors: { background: '#212121', primary: colors.cyan.accent2 },
      variables: { 'border-opacity': 0.5 },
    },
  },
}
