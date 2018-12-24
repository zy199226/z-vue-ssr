const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./webpack.base.conf');

const ip = '0.0.0.0';

const devWebpackConfig = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, '../dist'), // 告诉服务器从哪个目录中提供内容
        publicPath: '/',
        compress: true, // 服务是否启用 gzip 压缩
        host: ip,
        port: 9090,
        hot: true, // 启用 webpack 的模块热替换特性
        inline: true, // 启用内联模式
        open: true, // 自动打开浏览器
        clientLogLevel: 'warning', // 使用内联模式时，会在开发工具(DevTools)的控制台(console)显示消息
        quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台
        historyApiFallback: true,
        // proxy: { // 本地代理
        //     '/api': {
        //         target: 'http://10.100.4.63:3000',
        //         // pathRewrite: { '^/api': '' },
        //         changeOrigin: true
        //     }
        // }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html'),
            inject: true,
            minify: true,
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    devWebpackConfig.output.publicPath = '/';
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            devWebpackConfig.devServer.port = port;

            devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`runing here http://${ip}:${port}`]
                },
                onError: '/n'
            }));

            resolve(devWebpackConfig);
        }
    });
});
