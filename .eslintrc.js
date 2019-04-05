const hhEslintConfig = require('@hh.ru/eslint-config');

const extendedRestrictedSyntax = hhEslintConfig.rules['no-restricted-syntax'].concat({
    selector: "JSXOpeningElement[name.name='Button'] JSXAttribute[value.expression.value='a'][name.name='Element']",
    message: "Do not use 'a', use Link instead",
});

module.exports = {
    extends: ['plugin:react/recommended', '@hh.ru/eslint-config', 'prettier', 'prettier/standard'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'class-methods-use-this': 'off',
        'react/no-find-dom-node': 'off',
        'no-restricted-imports': ['error', 'lodash', 'jquery', 'underscore', 'backbone'],
        'no-restricted-syntax': extendedRestrictedSyntax,
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
