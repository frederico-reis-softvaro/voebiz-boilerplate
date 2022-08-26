const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devtool: "inline-source-map",
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../public/index.html"),
    }),
  ],
});
