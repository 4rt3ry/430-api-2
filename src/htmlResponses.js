const fs = require('fs');

const readFile = (filepath) => fs.readFileSync(`${__dirname}/${filepath}`);

const content = {
    '/': readFile('../hosted/client.html'),
    '/index.html': readFile('../hosted/client.html'),
    '/style.css': readFile('../hosted/style.css'),
    '/bundle.js': readFile('../hosted/bundle.js'),
    default: '',
};

/**
 * Retrieve an HTML page
 * @param {*} params { pathName: '/hosted.html' }
 */
const loadContent = (contentType) => (request, response, params) => {
    const page = content[params.pathName] || content.default;
    response.writeHead(200, { 'Content-Type': contentType });
    response.write(page);
    response.end();
};

module.exports = {
    loadContent,
};
