const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
    entry: "./src/index.js",
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
