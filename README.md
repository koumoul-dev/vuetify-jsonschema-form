# vuetify-jsonschema-form

Create beautiful and low-effort forms that output valid data.

Based on [Vue.js](https://vuejs.org/) / [Vuetify](https://vuetifyjs.com/) / [JSON Schema](https://json-schema.org/).

See [the documentation](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/).

![](doc/static/demo-video.gif)

## Development server

The documentation serves as development server too.

```
npm install
npm run doc-dev
```

## Bug reports

Bug reports are created using github issues. The examples in the documentation include codepen links, as much as possible please save a duplicate codepen with the minimal schema/config to reproduce your problem.

## Pull requests

Just a few rules :

  - run `npm run lint` to check linter rules before pushing
  - run `npm test` also. You might find that the tests fail simply because of HTML snapshots changes, check them and run `npm run test-update` if they are ok
