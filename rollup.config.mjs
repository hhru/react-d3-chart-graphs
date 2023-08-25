import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import analyze from 'rollup-plugin-analyzer';
import alias from '@rollup/plugin-alias';

const isDevMode = process.env.NODE_ENV === 'development';

export default {
    input: 'src/index.js',
    output: {
        dir: isDevMode
            ? './examples/node_modules/@hh.ru/react-d3-chart-graphs/'
            : './dist/',
        format: 'esm',
        sourcemap: isDevMode,
    },
    plugins: [
        alias({
            entries: [
                {
                    find: /^src\/(.*)/, replacement: path.resolve(__dirname, 'src/$1')
                }
            ]
        }),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        commonjs(),
        postcss({
            extract: 'styles.css',
            minimize: true,
            sourceMap: isDevMode,
            // config: 'postcss.config.js',
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            // presets: ['@babel/preset-react'],
        }),
        terser({
            compress: !isDevMode,
            mangle: !isDevMode,
        }),
        analyze({ summaryOnly: true }),
    ],
    // external: ['@hh.ru']
};
