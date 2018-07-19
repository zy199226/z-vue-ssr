const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const os = require('os');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

let ip = 'localhost';
const filterIP = (i) => {
    const v = i.findIndex(a => a.family === 'IPv4');
    return i[v].address;
};
if (os.networkInterfaces().en4) {
    ip = filterIP(os.networkInterfaces().en4);
} else if (os.networkInterfaces().en0) {
    ip = filterIP(os.networkInterfaces().en0);
}

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        host: ip,
        port: 9999,
        hot: true,
        inline: true,
        open: true,
        clientLogLevel: 'warning'
        // proxy: {
        //     '/api': {
        //         target: '',
        //         pathRewrite: { '^/api': '' }
        //     }
        // }
    },

    plugins: [
        new CleanWebpackPlugin(
            ['dist/css', 'dist/js'],
            {
                root: path.join(__dirname, '../'),
                verbose: true,
                dry: false
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.join(__dirname, '../src/index.html'),
            inject: true,
            minify: true,
            hash: true,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
});
