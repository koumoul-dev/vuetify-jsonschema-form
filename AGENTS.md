# AGENTS.md - Guidance for AI Agents

This is a monorepo using npm workspaces with packages: `lib`, `doc`, `compiler`, `plugins/markdown`, `plugins/img-cropper`.

## Project Overview

- **Main library**: `lib/` - Vuetify JSON Schema Form (Vue.js component library)
- **Documentation**: `doc/` - VitePress documentation site
- **Compiler**: `compiler/` - JSON schema compiler
- **Plugins**: `plugins/markdown`, `plugins/img-cropper`

## Development Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run lint
npm run lint

# Lint with auto-fix
npm run lint-fix

# Build all packages
npm run build

# Run dev server (opens documentation in Zellij)
npm run dev-zellij
```

- The root `prepare` script runs `npx relative-deps`: when a `../json-layout` checkout exists, `npm install` / `npm ci` silently copy its local build over the registry versions of `@json-layout/*` (`relativeDependencies` in package.json). Use `npm ci --ignore-scripts` (then `npx husky`) to get the registry versions.
- In a fresh checkout, run `npx nuxi prepare` in `doc/` before the first commit: the pre-commit hook runs `npm run lint`, which includes the doc eslint config importing `doc/.nuxt/eslint.config.mjs`.
- To test against a local json-layout without touching package.json, symlink `lib/node_modules/@json-layout/core` and `node_modules/@json-layout/vocabulary` to the json-layout checkout and run `npm -w core run build` there (the lib build, vue-tsc, reads the built core types).
- `npm install <dep> -w <ws>` rewrites the root `"name"` of package-lock.json from the folder name: reset it to `vuetify-jsonschema-form`.

## Quality Checks

- Uses **husky** for pre-commit hooks
- Uses **eslint** with neostandard for linting
- Uses **Jest** for testing
- Uses **commitlint** for conventional commit messages

## Testing

Tests are co-located with documented examples. Hidden examples (prefixed with `_`) are used for edge cases without affecting documentation. Run `npm run test-update` to update snapshots.

## Publishing

```bash
# Release and publish library
npm -w lib version minor
npm -w lib publish

# Publish documentation
npm -w doc install
npm run publish:latest
```