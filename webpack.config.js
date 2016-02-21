var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('app.css');

module.exports = {
  entry: './public/index.js',
  output: {
    path: './public/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel?optional[]=runtime&loose=all'
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract('css')
      }
    ]
  },
  vue: {
    loaders: {
      css: process.env.NODE_ENV === 'production' ? extractCSS.extract('style', 'css') : ''
    },
    autoprefixer: {
      browsers: ['> 5%','last 2 versions']
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
} else {
  module.exports.plugins = [extractCSS];
  module.exports.devtool = '#source-map';
}
