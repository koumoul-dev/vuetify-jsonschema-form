const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = [{
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: 'babel-loader'
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  entry: {
    main: './lib/VJsfNoDeps.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'VJsf',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    vue: 'Vue'
  },
  target: ['web', 'es5']
}]
