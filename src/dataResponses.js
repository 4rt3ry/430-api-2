/**
 * Builds a message response in json or xml format (decided by the accept header)
 * @param {string} message message
 * @param {string} id error id if applicable. Leave as "" or undefined if there is no error
 * @param {object} acceptHeader synonymous with mime-type
 * @returns
 */
const createMessage = (message, id, acceptHeader) => {
    let formattedMsg;
    let mimeType = '';
    // WARNING: Since accept headers can contain severl mime types,
    // a different method should be used to determine acceptable mime types
    switch (acceptHeader) {
    case 'text/xml':
        formattedMsg = `<response><message>${message}</message>`;
        if (id) formattedMsg += `<id>${id}</id>`;
        formattedMsg += '</response>';
        mimeType = 'text/xml';
        break;
    case 'application/json':
    default:
        formattedMsg = { message };
        if (id && id.length > 0) formattedMsg.id = id;
        formattedMsg = JSON.stringify(formattedMsg);
        mimeType = 'application/json';
        break;
    }
    return { message: formattedMsg, mimeType };
};

/**
 * Get a Success message and status 200
 * @returns
 */
const getSuccess = (request, response) => {
    const message = createMessage('This is a successful response', '', request.headers.accept);
    response.writeHead(200, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};
/**
 * Get a Bad Request message and status 400 (status 200 if the correct parameters are given)
 * @param {*} params { valid: 'true/false' }
 */
const getBadRequest = (request, response, params) => {
    let message;
    let status;
    if (params.valid === true || params.valid === 'true') {
        status = 200;
        message = createMessage('This request has the right parameters', '', request.headers.accept);
    } else {
        status = 400;
        message = createMessage('Missing valid parameter set to true', 'badRequest', request.headers.accept);
    }
    response.writeHead(status, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};
/**
 * Get an Unauthorized message and status 401 (status 200 if the correct parameters are given)
 * @param {*} params { loggedIn: 'yes/no' }
 */
const getUnauthorized = (request, response, params) => {
    let message;
    let status;
    if (params.loggedIn === 'yes') {
        status = 200;
        message = createMessage('This request has the right parameters', '', request.headers.accept);
    } else {
        status = 401;
        message = createMessage('Missing loggedIn parameter set to yes', 'unauthorized', request.headers.accept);
    }
    response.writeHead(status, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};
/**
 * Get a Forbidden message and status 403
 */
const getForbidden = (request, response) => {
    const message = createMessage('You do not have access to this content', 'forbidden', request.headers.accept);
    response.writeHead(403, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};
/**
 * Get an Internal message and status 500
 */
const getInternal = (request, response) => {
    const message = createMessage('Internal server error. Something went wrong', 'internalError', request.headers.accept);
    response.writeHead(500, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};
/**
 * Get a Not Implemented message and status 501
 */
const getNotImplemented = (request, response) => {
    const message = createMessage('A get request for this page has not been implemented yet. Check again for later content', 'notImplemented', request.headers.accept);
    response.writeHead(501, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};

/**
 * Get an Page Not Found message and status 404
 */
const get404 = (request, response) => {
    const message = createMessage('404 Page not found.', 'pageNotFound', request.headers.accept);
    response.writeHead(404, { 'Content-Type': message.mimeType });
    response.write(message.message);
    response.end();
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    get404,
};
