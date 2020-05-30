const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  node: {
    global: false,
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
                  useESModules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "manifest.json",
        },
        {
          from: "../core/dist/",
        },
        {
          from: "icons/*.svg"
        }
      ],
    }),
  ],
};
