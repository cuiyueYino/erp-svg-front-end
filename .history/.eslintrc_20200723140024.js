module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        // '@vue/standard'
    ],
    globals: {},
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 0,
        //'indent': [2, 4],
        'indent': 'off',
        'semi': [2, 'always'],
        'eqeqeq': 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
