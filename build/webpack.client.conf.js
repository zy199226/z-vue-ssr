const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const baseConfig = require('./webpack.prod.conf');


module.exports = merge(baseConfig, {
    entry: {
        app: path.join(__dirname, './entry-client.js')
    },

    plugins: [
        new VueSSRClientPlugin()
    ]
});
