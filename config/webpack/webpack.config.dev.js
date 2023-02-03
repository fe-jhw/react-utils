const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.config.common.js")

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = merge(common, {
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    port: 30009,
    hot: true,
    // noInfo: true,
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "../env/.dev.env"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
})
