const livereload = require('livereload');
const projRoot = __dirname + '/..';
const port = 35729;

const enableLiveReload = () => {
    const server = livereload.createServer({
        port: port,
        delay: 100
    }, () => {
        console.log(`LiveReload server is listening on port ${port}.`);
    });

    server.watch(projRoot + '/web_app');
};

module.exports = enableLiveReload;
