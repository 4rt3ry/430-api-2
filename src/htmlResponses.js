const fs = require('fs');

const readFile = (filepath) => fs.readFileSync(`${__dirname}/${filepath}`);

const content = {
    '/client.html': readFile('../client/client.html'),
    default: readFile('../client/client.html'),
};

const styles = {
    '/style.css': readFile('../client/style.css'),
    default: '',
};

/**
 * Retrieve an HTML page
 * @param {*} params { pathName: '/client.html' }
 */
const loadPage = (request, response, params) => {
    const page = content[params.pathName] || content.default;
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
};

/**
 * Retrieve a css stylesheet
 * @param {*} params { pathName: '/style.css' }
 */
const loadStyle = (request, response, params) => {
    const style = styles[params.pathName] || styles.default;
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(style);
    response.end();
};

module.exports = {
    loadPage,
    loadStyle,
};
