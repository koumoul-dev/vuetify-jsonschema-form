# VJSF - Application examples

This directory contains examples of integrating VJSF in some typical application templates. The purpose is to check the compatibility of the library with various build systems and toolings and to provide references for developers.

# ./vite-typescript

This application setup follows these [recommendations from the Vuetify doc](https://vuetifyjs.com/en/getting-started/installation/#using-vite):

```
$ npm create vuetify

Vuetify.js - Material Component Framework for Vue

✔ Project name: … vite-typescript
✔ Which preset would you like to install? › Default (Vuetify)
✔ Use TypeScript? … No
✔ Would you like to install dependencies with yarn, npm, pnpm, or bun? › npm

```

Install VJSF:

```
cd vite-typescript
npm install @koumoul/vjsf
```

Create file [src/schemas/person.json](./vite-typescript/src/schemas/person.json).

Use vjsf in [src/App.vue](./vite-typescript/src/App.vue).

To work with compilation at runtime you can create and run a script like [scripts/compile-schemas.js](./vite-typescript/scripts/compile-schemas.js).