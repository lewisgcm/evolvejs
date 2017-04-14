// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var webpackCopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: "web",
    devtool: 'source-map',
    entry: {
        'app': './src/main'
    },
    output: {
        path: __dirname + '/bin/',
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: [ '.ts','.js','.json', '.css', '.html', '.scss', '.ttf' ]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: "file-loader",
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader'],
                exclude: [ /node_modules/ ]
            }
        ]
    },
    plugins: [
        new webpackCopyPlugin([
            {
                context: "src",
                from: {
                    glob: '**//**.{html,css,png,json,ttf}',
                    dot: false
                }
            }
        ])
    ]
};