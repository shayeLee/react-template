var config = require("./config.js"),
	path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: config.entry,
	output: config.output,
	module: {
		rules: config.loaders.concat([
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"resolve-url-loader",
					"sass-loader"
				]
			}
		])
	},
	resolve: {
		extensions: config.extensions,
		alias: config.alias
	},
	externals: config.externals,
	plugins: [
		new copyWebpackPlugin([
			{
				from: "src/js_modules/responsive.js",
				to: "js/"
			},
			{
				from: "src/js_modules/react/dev/react.js",
				to: "js/"
			},
			{
				from: "src/js_modules/react-dom/dev/react-dom.js",
				to: "js/"
			},
			{
				from: "img/**/*.*",
				to: ""
			}
		]),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			chunks: ["main", "vendor"],
			inject: true,
			chunksSortMode: "auto"
		})
	],
	optimization: config.optimization,
	devtool: "#cheap-module-eval-source-map"
};
