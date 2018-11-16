const fs = require('fs');
const zlib = require('zlib');

const resFile = (req, res, filepath) => fs.stat(filepath, (err) => {
    if (err) {
        res.status(404).send();
    } else {
        const raw = fs.createReadStream(filepath);
        let acceptEncoding = req.headers['accept-encoding'];
        if (!acceptEncoding) {
            acceptEncoding = '';
        }

        if (/\bdeflate\b/.test(acceptEncoding)) {
            res.writeHead(200, { 'Content-Encoding': 'deflate' });
            raw.pipe(zlib.createDeflate()).pipe(res);
        } else if (/\bgzip\b/.test(acceptEncoding)) {
            res.writeHead(200, { 'Content-Encoding': 'gzip' });
            raw.pipe(zlib.createGzip()).pipe(res);
        } else {
            raw.pipe(res);
        }
    }
});

module.exports = resFile;
