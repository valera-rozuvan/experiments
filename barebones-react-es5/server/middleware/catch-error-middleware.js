const CatchErrorMiddleware = (err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broke! Please contact support.');
};

module.exports = CatchErrorMiddleware;
