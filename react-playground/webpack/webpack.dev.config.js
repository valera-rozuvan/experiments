let webpack = require('webpack');
let path = require('path');

let parentDir = path.join(__dirname, '../');

module.exports = {
  entry: [
    path.join(parentDir, 'index.js')
  ],

  module: {
    loaders: [{
      test: /\.(js||jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }]
  },

  output: {
    path: path.join(parentDir, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.join(parentDir, 'dist'),
    historyApiFallback: true
  }
};
