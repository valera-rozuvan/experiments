const RouteLogMiddleware = (request, response, next) => {
    console.log(`request.url -> "${request.url}"`);
    next();
};

module.exports = RouteLogMiddleware;
