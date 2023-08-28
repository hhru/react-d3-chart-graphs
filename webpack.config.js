const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, isDevMode ? './examples/node_modules/@hh.ru/react-d3-chart-graphs' : 'dist'),
        publicPath: '/dist/',
        filename: 'index.jsx',
        libraryTarget: 'umd',
        library: 'react-d3-chart-graphs',
        umdNamedDefine: true,
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            autoprefixer: false,
                            importLoaders: 1,
                            minimize: true,
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    optimization: {
        minimize: !isDevMode,
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};
