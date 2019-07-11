const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, isDevMode ? './examples/node_modules/@hh.ru/react-d3-chart-graphs' : 'dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'react-d3-chart-graphs',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-transform-react-jsx',
                        '@babel/plugin-transform-object-assign',
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-proposal-class-properties',
                    ],
                },
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
