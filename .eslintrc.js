module.exports = {
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:import/typescript',
    ],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'babel', '@typescript-eslint', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 2,
            },
        },
    ],
    rules: {
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'no-const-assign': 'warn',
        'no-this-before-super': 'warn',
        'no-undef': 'warn',
        'no-unreachable': 'warn',
        'no-unused-vars': 'warn',
        'constructor-super': 'warn',
        'valid-typeof': 'warn',
        'linebreak-style': 'off',
        semi: ['error', 'never'],
        indent: ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'import/no-unresolved': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent': ['warn', 4],
        'react/destructuring-assignment': 'off',
        'react/no-deprecated': 'off',
        'react/no-access-state-in-setstate': 'off',
        'max-len': ['error', {
            code: 140, tabWidth: 4, ignoreComments: true, ignoreTrailingComments: true,
        }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-bitwise': [
            'error',
            {
                allow: [
                    '~',
                ],
            },
        ],
        'no-nested-ternary': 'off',
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
            },
        ],
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: true,
            },
        ],
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-is-valid': ['error', {
            components: ['Link'],
            specialLink: ['to', 'hrefLeft', 'hrefRight'],
            aspects: ['noHref', 'invalidHref', 'preferButton'],
        }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-one-expression-per-line': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        'react/jsx-filename-extension': 0,
        'react/state-in-constructor': 0,
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
        'react/sort-comp': 0,
        'react/display-name': 0,
        'react/static-property-placement': 0,
        'react/no-find-dom-node': 0,
        'react/no-unused-prop-types': 0,
        'react/default-props-match-prop-types': 0,

        'import/extensions': 0,
        'import/no-cycle': 0,
        'jsx-a11y/anchor-has-content': 0,
        // label-has-for has been deprecated
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': 0,

        'comma-dangle': ['error', 'always-multiline'],
        'no-underscore-dangle': 0,
        // for (let i = 0; i < len; i++)
        'no-plusplus': 0,
        // https://eslint.org/docs/rules/no-continue
        // labeledLoop is conflicted with `eslint . --fix`
        'no-continue': 0,
        // ban this for Number.isNaN needs polyfill
        'no-restricted-globals': 0,
        'max-classes-per-file': 0,

        'jest/no-test-callback': 0,
        'jest/expect-expect': 0,
        'jest/no-done-callback': 0,
        'jest/valid-title': 0,
        'jest/no-conditional-expect': 0,

        // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
    },
    globals: {
        React: false,
        utils: false,
        describe: false,
        it: false,
        jest: false,
        expect: false,
    },
}
