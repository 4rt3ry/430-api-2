const http = require('http');
const { loadPage, loadStyle } = require('./htmlResponses');
const {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    get404,
} = require('./dataResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// all entries must return a function (request, response, params)
const requestHandler = {
    '/': loadPage,
    '/hosted': loadPage,
    '/style.css': loadStyle,
    '/success': getSuccess,
    '/badRequest': getBadRequest,
    '/unauthorized': getUnauthorized,
    '/forbidden': getForbidden,
    '/internal': getInternal,
    '/notImplemented': getNotImplemented,
    default: get404,
};

const onRequest = (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    const handler = requestHandler[url.pathname];
    const params = {
        pathName: url.pathname,
        valid: url.searchParams.get('valid'),
        loggedIn: url.searchParams.get('loggedIn'),
    };
    if (handler) handler(request, response, params);
    else requestHandler.default(request, response, params);
};

http.createServer(onRequest).listen(port, () => {

});
