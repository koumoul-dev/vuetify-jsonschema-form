const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.less$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }, {
      test: /\.(svg|eot|woff|ttf|woff2)$/,
      loader: ['file-loader']
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}]
