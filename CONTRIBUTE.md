# Contribute

Pull requests are welcome, just make sure that you discuss important changes in an issue beforehand, then follow the coding style and run the tests before submitting.

Run all prepublishing checks at once:

    npm run prepublish

## Coding style

It is enforced by [eslint](https://eslint.org/) and configured in [](./.eslintrc.js), you should probably use a plugin to integrate it in your editor.

Check all rules:

    npm run lint

## Development server

Run a local development server:

    npm run doc-dev

This simply opens the documentation site in a local web server that will watch your edits to the source code both of the library and of the documentation and its examples.

Please note that you can open a single example in a lighter page by replacing the # by a slash in the URL (for example http://localhost:3000/examples#basic => http://localhost:3000/examples/basic). This way you can also work on hidden examples (prefixed with "\_") that are here for developpers, not users of the lib.

## Tests

the test suite is written with [Jest](https://jestjs.io/).

Run the test suite:

    npm run test

For now to increase efficiency test cases and documented examples are the same thing in this project. You can complete the existing examples to cover new functionalities, or you can create new hidden examples (prefixed with "\_") to cover edge cases without increasing the verbosity of the documentation.

When running tests each example is opened and a HTML snapshot is extracted and compared to a previous one. When the tests fail because of a snapshot diff, you should check that it is a valid change, then run `npm run test-update`.

To be more explicit than simple snapshots you can also write additionnal test assertions in the examples themselves, see [](./doc/examples/_resolved-schema.js) for example.
