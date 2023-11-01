# Contribute

Pull requests are welcome, just make sure that you discuss important changes in an issue beforehand, then follow the coding style and run the tests before submitting.

Run all prepublishing checks at once:

    npm run prepublishOnly

## Quality checks

This project uses [husky](https://typicode.github.io/husky/) to ensure quality of contributions in a pre-commit hook.

  - code source is linted using [eslint](https://eslint.org/), you can run the linter manually with `npm run lint`
  - code source is tested, you can run the tests manually with `npm test`
  - commit messages are checked against [conventional rules](https://www.conventionalcommits.org/en/v1.0.0/)

## Development server

Run a local development server:

    npm install
    cd doc
    npm install
    cd -
    npm run dev-zellij

This simply opens the documentation site in a local web server that will watch your edits to the source code both of the library and of the documentation and its examples.

An additionnal "Development" group of examples is visible, please add in this group examples that do not need to be presented to the users but has some value for maintainers.

## Working on json-layout locally

We use [relative-deps]():

```
npx -w lib relative-deps add ../../json-layout/core/
npx -w lib relative-deps add ../../json-layout/vocabulary/
npx -w doc relative-deps add ../../json-layout/examples/
```


## Tests

the test suite is written with [Jest](https://jestjs.io/).

Run the test suite:

    npm run test

To increase efficiency test cases and documented examples are the same thing in this project. You can complete the existing examples to cover new functionalities, or you can create new hidden examples (prefixed with "\_") to cover edge cases without increasing the verbosity of the documentation.

When running tests each example is rendered and a HTML snapshot is extracted and compared to a previous one. When the tests fail because of a snapshot diff, you should check that it is a valid change, then run `npm run test-update`.

You can also write additionnal test assertions in the examples themselves, see [_resolved-schema.js](./doc/examples/_resolved-schema.js) for example.

## Publishing

Release and publish usin npm:

```
npm -w lib version minor
npm -w lib publish
git push
```

To publish a beta version, use prerelease versioning with a npm tag:

```
npm -w lib version preminor --preid=beta # use prerelease instead of preminor to increment
npm -w lib publish --tag=next
git push
```