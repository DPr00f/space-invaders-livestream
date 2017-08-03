const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcFolder = path.resolve(__dirname, 'src');
const outputFolder = path.join(__dirname, 'output');
const jsEntry = path.resolve(srcFolder, 'index.js');

const extractCSS = new ExtractTextPlugin({ filename: 'main.css' });

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: 'source-map',
    context: srcFolder,
    entry: {
        bundle: jsEntry
    },
    output: {
        path: outputFolder,
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        extractCSS,
        new CopyWebpackPlugin([
            {
                from: path.resolve(srcFolder, 'assets'),
                to: path.join(outputFolder, 'assets')
            }
        ])
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
                use: isProd ?
                    extractCSS.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'sass-loader'
                        ]
                    }) :
                    ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
