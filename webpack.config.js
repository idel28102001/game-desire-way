const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
  },
  module: {
    rules: [
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    fallback: {
      crypto: false,
      fs: false,
      https: false,
      stream: false,
      url: false,
      path: false,
      util: false,
      http: false,
    },
  },
};
