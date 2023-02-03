const path = require("path")
const os = require("os")
const { merge } = require("webpack-merge")
const common = require("./webpack.config.common.js")

const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = merge(common, {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  output: {
    filename: "static/js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../../dist"),
    publicPath: "./",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "../env/.prod.env"),
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-report.html",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-stats.json",
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
})
