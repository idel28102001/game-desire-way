const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env) => ({
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "main.js",
    publicPath: "/",
  },
  module: {
    rules: [
      // {
      //       test: /\.m?js$/,
      //       exclude: /(node_modules|bower_components)/,
      //       use: {
      //           loader: "babel-loader",
      //           options: {
      //               presets: ["@babel/preset-env"],
      //           },
      //       },
      //   },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s?css$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
