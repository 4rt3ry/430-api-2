const users = {};

/**
 * Builds a message response in json or xml format (decided by the accept header)
 * @param {string} message message
 * @param {string} id error id if applicable. Leave as "" or undefined if there is no error
 * @param {object} acceptHeader synonymous with mime-type
 * @returns
 */
const createMessage = (message, id = '') => {
    let resultMessage = { message };
    if (id && id.length > 0) resultMessage.id = id;
    resultMessage = JSON.stringify(resultMessage);
    return resultMessage;
};

const getMethodNotAllowed = (request, response, params) => {
    response.writeHead(405, { 'Content-Type': 'application/json' });

    if (request.method !== 'HEAD') { response.write(createMessage(params.message || 'The request method is not allowed', 'methodNotAllowed')); }
    response.end();
};

/**
 * Get an Page Not Found message and status 404
 */
const get404 = (request, response, params) => {
    const message = createMessage('404 Page not found.', 'pageNotFound');
    response.writeHead(404, { 'Content-Type': 'application/json' });

    if (params.method !== 'HEAD') { response.write(message); }
    response.end();
};

const getUsers = (request, response, params) => {
    const message = JSON.stringify(users);
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if (params.method !== 'HEAD') { response.write(message); }
    response.end();
};

const processNewUser = (request, response, user) => {
    let status = 201;
    let message;

    if (!user.name || !user.age) {
        status = 400;
        message = createMessage('Name and age must be valid entries', 'addUserMissingParams');
    } else if (users[user.name]) {
        status = 204;
        message = createMessage('');
        users[user.name] = user;
    } else {
        message = createMessage('Created successfully');
        users[user.name] = user;
    }
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(message);
    response.end();
};

const addUser = (request, response) => {
    if (request.method !== 'POST') {
        getMethodNotAllowed(request, response, { message: 'Request /addUser can only be made with a valid POST request' });
    } else {
        let body = '';
        request.on('data', (data) => {
            body += data;
        });

        request.on('end', () => processNewUser(request, response, JSON.parse(body)));
    }
};

module.exports = {
    getUsers,
    addUser,
    get404,
};
