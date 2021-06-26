const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    copy: "./src/copy.js",
    "copy-link": "./src/copy-link.js",
    settings: "./src/settings.js",
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
                  corejs: 3,
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
          from: "src/settings.html",
        },
      ],
    }),
  ],
};
