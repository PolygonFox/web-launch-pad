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
        loader: 'babel-loader?presets[]=es2015',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap=true!sass-loader?sourceMap=true',
      },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
};
