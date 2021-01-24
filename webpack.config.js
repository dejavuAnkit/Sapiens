const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true,
    port: 3001,
  },
  entry: ["babel-polyfill", "./src/index.tsx"],
  output: {
    publicPath: "/",
    path: __dirname + "/server/dist",
    filename: "[name].js",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["css-modules-typescript-loader","style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|pdf|ico)$/,
        loader: "file-loader?name=assets/[name].[ext]",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
