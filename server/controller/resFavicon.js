const url = require('url');
const path = require('path');
const resFile = require('../util/resFile');

const foo = (req, res) => {
    const { pathname } = url.parse(req.url);
    const filepath = path.join(__dirname, '..', pathname);
    resFile(req, res, filepath);
};

module.exports = foo;
