module.exports = {
    root: true,
    extends: ['@hh.ru/eslint-config', 'prettier', 'prettier/standard', 'plugin:react/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'class-methods-use-this': 'off',
        'react/no-find-dom-node': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js',
            },
        },
        react: {
            version: '16.8',
        },
    },
};
