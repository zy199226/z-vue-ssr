const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/static/vue-ssr-client-manifest.json');

const microCache = LRU({
    max: 2,
    maxAge: 1000
});

const isCacheable = (req) => {
    // console.log(req);
    return true;
};

const template = fs.readFileSync(path.join(__dirname, '../../src/index.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
});

const foo = (req, res) => {
    const start = Date.now();
    const cacheable = isCacheable(req);
    if (cacheable) {
        const hit = microCache.get(req.url);
        if (hit) {
            console.log(`--> ${req.url}  ${Date.now() - start}ms, cache`);
            return res.end(hit);
        }
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        res.end(html);
        if (cacheable) {
            microCache.set(req.url, html);
        }
        console.log(`--> ${req.url}  ${Date.now() - start}ms`);
    });
};

module.exports = foo;
