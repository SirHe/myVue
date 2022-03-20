const path = require('path')

module.exports = {
  entry: {
    index: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   contentBase: './public',
  //   // inline: true,
  // },
  mode: 'development',
}
