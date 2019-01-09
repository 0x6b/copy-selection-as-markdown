module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
    copy: "./src/copy.js",
    options: "./src/options.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  node: {
    global: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 2,
                  helpers: false,
                  regenerator: true,
                  useESModules: false
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
