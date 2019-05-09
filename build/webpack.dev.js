var base = require("./webpack.base.js"),
  merge = require('webpack-merge'),
  webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	copyWebpackPlugin = require("copy-webpack-plugin");

base.output.filename = "js/[name].js?v=[hash:8]";

module.exports = merge(base, {
  mode: "development",
  devtool: "#cheap-module-eval-source-map",
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new copyWebpackPlugin([
			{
				from: "img/**/*.*",
				to: ""
			}
		]),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true,
			chunksSortMode: "auto"
		})
	]
});
