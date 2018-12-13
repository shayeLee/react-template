var webpack = require("webpack"), 
  base = require("./webpack.base.js"),
	merge = require("webpack-merge"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
		.BundleAnalyzerPlugin;

base.output.filename = "js/[name].js?v=[chunkhash:8]";

module.exports = merge(base, {
	mode: "production",
	plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.HashedModuleIdsPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true,
			chunksSortMode: "auto",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
    }),
    // new BundleAnalyzerPlugin()
	]
});
