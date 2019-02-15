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
                    chunks: 'initial', // initial、async和all(默认是async)
                    minChunks: 2, // 超过引用次数的会被分割（默认是1）
                    maxInitialRequests: 5, // 最大初始化请求书，默认3
                    minSize: 0 // 形成一个新代码块最小的体积(默认是30000)
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
                    chunks: 'all',
                    name: 'vendor', // 打包的chunks的名字(字符串或者函数，函数可以根据条件自定义名字)
                    priority: -20, // 缓存组打包的先后优先级
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
            favicon: path.join(__dirname, '../src/favicon.ico'),
            filename: path.join(__dirname, '../dist/index.html'),
            template: path.join(__dirname, '../src/index.html'),
            inject: true
        })
    ]
});
