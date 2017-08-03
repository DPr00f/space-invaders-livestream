const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcFolder = path.resolve(__dirname, 'src');
const outputFolder = path.join(__dirname, 'output');
const jsEntry = path.resolve(srcFolder, 'index.js');
const stylesEntry = path.resolve(srcFolder, 'main.scss');

const extractCSS = new ExtractTextPlugin({ filename: 'main.css' });

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
    plugins: [
        extractCSS
    ],
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
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    }
};
