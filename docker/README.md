# Using docker to setup the example server on Ubuntu
This might be helpful if you run into problems with `npm install`. We will use `docker` and create an image which contains `vuetify-jsonschema-form` and its examples in a web server. The seb server will run inside the container and you will be able to code on your host in your familiar coding environment. Changes will be automatically applied by the container.

## Requirements
- If you have `docker` and `docker-compose` installed already, you can got to the next step. Otherwise, to install them you can do this from the offical pages or have a look at the provided scripts `install_docker.sh` and `install_docker_compose.sh` which work for Ubuntu 18.04:
  - Install docker:
    - `cd docker`
    - `./install_docker.sh`
  - Install docker-compose:
    - `cd docker`
    - `./install_docker_compose.sh`

# Build the server
- `cd docker`
- `./build.sh`
- The tests sometimes do not work. Then simply remove `&& npm test` from item `scripts.prepublish` in `package.json`. Then retry building.
- If you do not want to use the docker cache, simply call `./build.sh --no-cache`.

# Start the server
- `cd docker`
- `./start.sh`
- To view and play around with the examples, open `http://localhost:3000` in your browser. It is important that in `doc/nuxt.config.js` the entry `server.host` is set to `0.0.0.0` and NOT to `localhost`.
- To run a command `<command>` in the container:
  - `./run_command.sh "<command>"`

# Stop the server
- Press `CTRL+C` in terminal where server was started or:
  - `cd docker`
  - `./stop.sh`

# Editing examples or adding new examples
- Create a new example:
  - The easiest way is to simple copy an existing example. E.g. copy `doc/examples/basic.js` to `doc/examples/basic2.js`. Inside `basic2.js` change the variables `id` and `title`.
  - Then open `doc/examples/index.js` and add the `import` statement `import basic2 from './basic2'` and add `basic2` to variable `examples`.
- Restart the nuxt server:
  - `cd docker`
  - `./start.sh`
- Start editing `basic2.js` on your host to show a new functionality or demonstrate a bug. The server inside the container will update when you save the example on your host, since the folder is mounted in the container.
- After you created the example:
  - Run the tests to verify no other problems are introduced:
    - The container must be running, if not start the nuxt server with `start.sh`, then
    - `cd docker`
    - `./test.sh`
    - If you encounter problems with the HTML snapshots, check them and run `./run_command "npm run test-update"`. Then perform `./test.sh` again. All tests and snapshots should pass.
  - Check for lint issues:
    - The container must be running, if not start the nuxt server with `start.sh`, then
    - `cd docker`
    - `./lint.sh"`
- Then you can commit the change, push them to your fork, go to the original github repo and make a pull request.

# Helpful docker commands
- To free up disk space:
  - Remove all stopped containers: `docker container prune`
  - Remove dangling images: `docker image prune --force`
