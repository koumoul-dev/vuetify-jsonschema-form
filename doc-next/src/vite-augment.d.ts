// Module file (the top-level `import` makes `declare module 'vite'` augment the
// real module rather than shadow it). vite-ssg reads `ssgOptions` off the Vite
// user config but doesn't augment the config type itself.
import type {} from 'vite'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: import('vite-ssg').ViteSSGOptions
  }
}
