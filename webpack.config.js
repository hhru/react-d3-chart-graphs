const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, isDevMode ? './examples/node_modules/@hh.ru/react-d3-chart-graphs' : 'dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'react-d3-chart-graphs',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                autoprefixer: false,
                                importLoaders: 1,
                                minimize: true,
                            },
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            minimize: !isDevMode,
        }),
    ],
};
