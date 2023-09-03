const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name]bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./src-sw.js",
      }),
      new WebpackPwaManifest({
        short_name: "JATE",
        name: "Just Another Text Editor",
        fingerprints: false,
        icons: [
          {
            src: path.resolve("assets/icons/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
