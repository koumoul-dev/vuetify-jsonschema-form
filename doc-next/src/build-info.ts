// Build-time constants injected by Vite `define` (see vite.config.ts).
// `declare const` keeps them typed here without a global .d.ts; Vite replaces
// the identifiers with literals at build time.
declare const __APP_VERSION__: string
declare const __COMMIT_HASH__: string

/** Published @koumoul/vjsf library version. */
export const appVersion = __APP_VERSION__
/** Short git commit hash of this build, or '' when built outside a checkout. */
export const commitHash = __COMMIT_HASH__
export const commitUrl = commitHash
  ? `https://github.com/koumoul-dev/vuetify-jsonschema-form/commit/${commitHash}`
  : ''
