module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ].map(require.resolve),
  rules: {
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-multiple-empty-lines': 'off',
  },
};
