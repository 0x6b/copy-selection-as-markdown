module.exports = {
  entry : {
    index: './src/index.js',
    copy : './src/copy.js'
  },
  output: {
    path    : __dirname + '/dist',
    filename: '[name].js'
  }
}

