const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATH_TO_NODE_MODULES = path.resolve(__dirname, 'node_modules');
const PATH_TO_SRC = path.resolve(__dirname, 'src');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(
            __dirname,
            mode === 'development'
                ? 'examples/node_modules/@hh.ru/react-d3-chart-graphs'
                : 'dist'
        ),
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'react-d3-chart-graphs',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [PATH_TO_NODE_MODULES, PATH_TO_SRC],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: PATH_TO_SRC,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=true',
                ],
            },
        ],
    },
    optimization: {
        minimizer: mode !== 'development' ? [new UglifyJsPlugin()] : [],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
};
