const path = require('path');

const src = path.resolve(__dirname, './src/client');
const dist = path.resolve(__dirname, './dist/web');

module.exports = {
  target: 'web',
  context: src,
  entry: {
    client: './index.js',
  },
  output: {
    path: dist,
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(jpg|png)$/,
        loaders: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.js'),
      settings: path.resolve(__dirname, 'settings.js'),
    },
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};
