const http = require('http');
const { loadContent } = require('./htmlResponses');
const {
    getUsers,
    addUser,
    get404,
} = require('./dataResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// all entries must return a function (request, response, params)
const requestHandler = {
    '/': loadContent('text/html'),
    '/index.html': loadContent('text/html'),
    '/style.css': loadContent('text/css'),
    '/bundle.js': loadContent('text/javascript'),
    '/getUsers': getUsers,
    '/notReal': get404,
    '/addUsers': addUser,
    default: get404,
};

const onRequest = (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    const handler = requestHandler[url.pathname];
    const params = {
        pathName: url.pathname,
        method: request.method,
    };

    // add all search parameters
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });

    if (handler) handler(request, response, params);
    else requestHandler.default(request, response, params);
};

http.createServer(onRequest).listen(port, () => {

});
