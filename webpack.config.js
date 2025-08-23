// webpack.config.js (HOST)
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (_, argv) => {
  const isProd = argv.mode === "production";

  // In Netlify, you’ll set CART_URL and WISHLIST_URL env vars on the HOST only.
  const CART_URL = process.env.CART_URL || (isProd ? "https://your-cart.netlify.app" : "http://localhost:3001");
  const WISHLIST_URL = process.env.WISHLIST_URL || (isProd ? "https://your-wishlist.netlify.app" : "http://localhost:3002");

  return {
    entry: "./src/index.js",
    mode: isProd ? "production" : "development",
    devServer: { port: 3000, historyApiFallback: true, hot: true },
    output: {
      publicPath: "auto",                 // ✅ key change
      path: path.resolve(__dirname, "build"),
      clean: true
    },
    module: {
      rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }]
    },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          cart:     `cart@${CART_URL}/remoteEntry.js`,
          wishlist: `wishlist@${WISHLIST_URL}/remoteEntry.js`
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
};
