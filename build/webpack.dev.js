var base = require("./webpack.base.js"),
  merge = require('webpack-merge'),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
  mode: "development",
  devtool: "#cheap-module-eval-source-map",
	plugins: [
		new copyWebpackPlugin([
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
	]
});
