const webpack = require('webpack');
const path = require('path');

const srcFolder = path.resolve('./src');
const outputFolder = path.join(__dirname, 'output');
const jsEntry = path.resolve(srcFolder, 'index.js');

module.exports = {
    devtool: 'source-map',
    context: srcFolder,
    entry: {
        bundle: jsEntry
    },
    output: {
        path: outputFolder,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
        {
            test: /\.(jsx?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }
            ]
        }
        ]
    }
};
