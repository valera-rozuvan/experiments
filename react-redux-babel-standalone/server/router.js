const Router = {};

const projRoot = __dirname + '/..';

Router.index = (request, response) => {
    response.sendFile('index.html', { root: projRoot + '/web_app' });
};

Router.error = (request, response) => {
    throw new Error('Oops!');
};

Router.notFound = (request, response) => {
    response.sendFile('not_found.html', { root: projRoot + '/web_app' });
};

module.exports = Router;
