const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const src = path.resolve(__dirname, './src/server');
const dist = path.resolve(__dirname, './dist/server');

module.exports = {
  target: 'node',
  context: src,
  entry: './index.js',
  output: {
    path: dist,
    filename: 'server.js',
  },
  resolve: {
    alias: {
      settings: path.resolve(__dirname, 'settings.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  externals: nodeExternals(),
  devtool: 'source-map',
};
