const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

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
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  externals: {
    vue: 'Vue'
  },
  target: ['web', 'es5']
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
