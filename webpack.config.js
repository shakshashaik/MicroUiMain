const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3000, historyApiFallback: true, hot: true },
  output: { publicPath: "http://localhost:3000/", path: path.resolve(__dirname, "build"), clean: true },
  module: {
    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }]
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        cart: "cart@http://localhost:3001/remoteEntry.js",
        wishlist: "wishlist@http://localhost:3002/remoteEntry.js"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-router-dom": { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ]
};
