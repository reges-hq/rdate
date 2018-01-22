const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: {
    rdate: "./lib/index.js"
  },
  output: {
    path: path.join(process.cwd()),
    filename: "index.js",
    library: "rdate",
    libraryTarget: "umd"
  },
  plugins: [new MinifyPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
