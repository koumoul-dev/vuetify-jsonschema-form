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