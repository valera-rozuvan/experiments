const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, 'web_app/dist'),
  JS: path.resolve(__dirname, 'web_app/js'),
};

module.exports = {
  entry: path.join(paths.JS, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }  
};
