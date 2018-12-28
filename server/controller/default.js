const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/static/vue-ssr-client-manifest.json');

/**
 * 设置缓存工作方法的相关属性
 */
const microCache = LRU({
    max: 100, // 缓存数量
    maxAge: 1000 // 缓存时间（毫秒）
});

/**
 * 判断是否需要缓存处理
 * @param  {Object}  req 请求相关数据
 * @return {Boolean}     true: 需要缓存，false: 不需要。默认返回 true
 */
const isCacheable = (req) => {
    // console.log(req);
    return true;
};

const template = fs.readFileSync(path.join(__dirname, '../../src/index.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
});

/**
 * 判断是返回缓存，默认实时编译返回
 * @param  {Object} req 请求相关数据
 * @param  {Object} res 返回相关数据
 */
const foo = (req, res) => {
    const start = Date.now();
    const cacheable = isCacheable(req);
    if (cacheable) { // 判断是否需要缓存处理，否则默认实时编译返回
        const hit = microCache.get(req.url);
        if (hit) { // 判断是否存在缓存，有则返回缓存，无则默认实时编译返回
            console.log(`--> ${req.url}  ${Date.now() - start}ms, cache`);
            return res.end(hit);
        }
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        res.end(html);
        if (cacheable) { // 判断是否需要缓存
            microCache.set(req.url, html);
        }
        console.log(`--> ${req.url}  ${Date.now() - start}ms`);
    });
};

module.exports = foo;
