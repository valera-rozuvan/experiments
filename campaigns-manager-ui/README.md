# Campaigns Manager UI

A demo UI application for a potential Campaigns Manager service.

## Run locally

Make sure you have [node](https://github.com/nodejs/node), [npm](https://github.com/npm/npm), and
[nodemon](https://github.com/remy/nodemon) installed globally.

1. Clone this repository.
2. Switch to repository root folder.
3. Run command `npm install`.
4. Run command `npm run build`.
5. Run command `npm run start`.
6. Navigate your browser to `http://localhost:3000/`.

## Local development

For convenience of local development, Nodemon is used for watching server JS files, and restarting the server upon
changes. [LiveReload](https://github.com/napcs/node-livereload) is integrated into the front-end part to refresh the
browser when the web application source files change.

Also, when developing locally, you want to enable auto building of the app by Webpack.
To do so, run the command `npm run build-watch` in a separate terminal.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
