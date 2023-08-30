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
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        short_name: "JATE",
        name: "Just Another Text Editor",
        icons: [
          {
            src: "./assets/icons/logo.png",
            type: "image/png",
            sizes: "96x96",
            purpose: "any maskable",
          },
          // {
          //   src: "./assets/icons/icon_128x128.png",
          //   type: "image/png",
          //   sizes: "128x128",
          //   purpose: "any maskable",
          // },
          // {
          //   src: "./assets/icons/icon_192x192.png",
          //   type: "image/png",
          //   sizes: "192x192",
          //   purpose: "any maskable",
          // },
          // {
          //   src: "./assets/icons/icon_512x512.png",
          //   type: "image/png",
          //   sizes: "512x512",
          //   purpose: "any maskable",
          // },
        ],
        orientation: "portrait",
        display: "standalone",
        start_url: "./",
        description: "Virtual Notebook",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
      }),
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
