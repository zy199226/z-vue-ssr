const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    priority: -20,
                    enforce: true
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new WebpackParallelUglifyPlugin({
                uglifyJS: {
                    output: {
                        beautify: false, // 不需要格式化
                        comments: false // 不保留注释
                    },
                    compress: {
                        warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                        drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            })
        ]
    },

    plugins: [
        new CleanWebpackPlugin(
            ['dist/'],
            {
                root: path.join(__dirname, '../'),
                verbose: true,
                dry: false
            }
        ),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '../dist/index.html'),
            template: path.join(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        })
    ]
});
