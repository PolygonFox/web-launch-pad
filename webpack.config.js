var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    client: './client',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
