import path from 'path';

export const addCssImports = {
    name: 'add-css-imports',
    generateBundle: (_, bundles) => {
        if (bundles['index.css']) {
            Object.keys(bundles)
                .filter((bundle) => bundle.includes('.js'))
                .forEach((bundle) => {
                    bundles[bundle].code = `import '${path.relative(bundle, 'index.css').slice(1)}';\n${
                        bundles[bundle].code
                    }`;
                });
        }
        console.log('bundles', Object.keys(bundles));

        return bundles;
    },
};
