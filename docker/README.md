# Using docker to setup the example server
This might be helpful if you run into problems with `npm install`. We will use `docker` and create an image which contains `vuetify-jsonschema-form` and its examples in a web server.

## Requirements
- If you have `docker` and `docker-compose` installed already, you can skip this. Otherwise, to install them you can do this from the offical pages or have a look at the provided scripts `install_docker.sh` and `install_docker_compose.sh` which worked for Ubuntu 18.04:
  - Install docker:
    - `cd docker`
    - `./install_docker.sh`
  - Install docker-compose:
    - `cd docker`
    - `./install_docker_compose.sh`

# Build the server
- `cd docker`
- `./build.sh`
- Troubleshooting:
  - If you run into the problem of not running tests, simply remove `&& npm test` from item `scripts.prepublish` in `package.json`. Then retry building.

# Start the server
- `cd docker`
- `./start.sh`

# Access to the examples via browser
- Open `http://localhost:3000` in your browser. It is important that in `doc/nuxt.config.js` the entry `server.host` is set to `0.0.0.0` and NOT to `localhost`.

# Editing examples or adding new examples
- Create a new example:
  - The easiest way is to simple copy an existing example. E.g. copy `doc/examples/basic.js` to `doc/examples/basic2.js`. Inside `basic2.js` change the variables `id` and `title`.
  - Then open `doc/examples/index.js` and add the `import` statement `import basic2 from './basic2'` and add `basic2` to variable `examples`.
- Restart the nuxt server:
  - `cd docker`
  - `./start.sh`
- Start editing `basic2.js` to show a new functionality or demonstrate a bug. The server will update when you save the example.
