var path = require('path');

module.exports = {
  parser: "babel-eslint",
  plugins: [
    'vue',
    'import',
    'html',
  ],
  extends: [
    'vue',
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
        webpack: {
          config: path.resolve(__dirname, 'webpack.config.client.js'),
        },
    },
  },
  rules: {
    'consistent-return': 'off',
  },
};
