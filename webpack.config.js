const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const dotenv = require("dotenv");
 
module.exports = (_, argv) => {
  const isProd = argv.mode === "production";
  dotenv.config({ path: isProd ? ".env.production" : ".env.development" });
 
  const CART_URL =
    process.env.CART_URL ||
    (isProd ? process.env.REACT_APP_PRODUCTION_URL_MICROU1 : process.env.REACT_APP_DEVELOPMENT_URL_MICROU1);
 
  const WISHLIST_URL =
    process.env.WISHLIST_URL ||
    (isProd ? process.env.REACT_APP_PRODUCTION_URL_MICROU2 : process.env.REACT_APP_DEVELOPMENT_URL_MICROU2);
 
  return {
    entry: "./src/index.js",
    mode: isProd ? "production" : "development",
    devServer: { port: 3000, historyApiFallback: true, hot: true },
    output: { publicPath: "auto", path: path.resolve(__dirname, "build"), clean: true },
    module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }] },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          cart: `cart@${CART_URL}/remoteEntry.js`,
          wishlist: `wishlist@${WISHLIST_URL}/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
          "react-router-dom": { singleton: true, requiredVersion: false },
        },
      }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
  };
};
