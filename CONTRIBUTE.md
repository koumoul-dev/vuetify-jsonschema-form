# Contribute

Local development server:

    npm run dev

Publish version:

    npm version patch|minor|major
    npm publish

Push demo of published version:

    npm run build
    cp index.html dist/
    ./node_modules/.bin/gh-pages-multi deploy -s dist -t vX.X.X
