const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: 'babel-loader'
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.(svg|eot|woff|ttf|woff2)$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
}

module.exports = [{
  ...base,
  entry: {
    main: './lib/VJsfNoDeps.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'VJsf',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
}, {
  ...base,
  entry: {
    'third-party': './lib/deps/third-party.js'
  },
  externals: {
    vue: 'Vue'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}]
