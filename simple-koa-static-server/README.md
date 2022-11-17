# Simple Koa static server

A simple implementation of a Node.js server to host static web application. It
uses:

- [Koa](https://github.com/koajs/koa)
- [Forever](https://github.com/foreverjs/forever)

## Prerequisites

- Node.js v6.x [https://nodejs.org/en/](https://nodejs.org/en/)

## Initial setup

Run the following commands in the root of this project:

```
npm install -g forever
npm install
```

Also, make sure you have built the client side of the application. I.e. you need
to have a `dist` folder where the application static contents will be available.

## Updating when package.json changes

All JavaScript dependencies of the project are specified in the file
`package.json` in the root folder. If this file is updated (new dependency is
added, or something is removed), you have to run the command:

```
npm install
```

to make sure you have all the latest dependencies (the folder `node_modules`
will be updated by this command).

## Running the application

### Starting of server

To start the server which will be serving the static files from the `dist`
folder, run:

```
forever start forever.json
```

### Stopping of server

To stop the server which is serving the static files from the `dist`
folder, run:

```
forever stop skss_server
```

### Server configuration

Please see the file `forever.json`. It contains the `port` and the `build_dir`
options. They should be updated to your local defaults.

## License

This project is licensed under the MIT license. Please see [LICENSE](LICENSE)
file for more information.
