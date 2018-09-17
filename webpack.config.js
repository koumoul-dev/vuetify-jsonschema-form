const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    main: './src/index.vue',
    demo: './demo/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'VJsonschemaForm',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
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
      loader: [ 'style-loader', 'css-loader' ]
    }, {
      test: /\.less$/,
      loader: [ 'style-loader', 'css-loader', 'less-loader' ]
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
