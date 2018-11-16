const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const os = require('os');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    target: 'node',

    entry: {
        app: path.join(__dirname, './entry-server.js')
    },

    output: {
        path: path.resolve(__dirname, '../dist/server/'),
        libraryTarget: 'commonjs2'
    },

    externals: nodeExternals({
        whitelist: [/\.css$/i]
    }),

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'happypack/loader?id=happyBabel'
                },
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: 'images',
                        publicPath: '/static/images/'
                    }
                }
            },
            {
                test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        outputPath: 'fonts',
                        publicPath: '../static/fonts/'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },

    stats: {
        children: false,
        modules: false,
        warnings: false
    },

    plugins: [
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new ProgressBarPlugin({
            format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false
        }),
        new VueLoaderPlugin(),
        new VueSSRServerPlugin()
    ]
};
