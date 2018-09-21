var base = require("./webpack.base.js"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
		.BundleAnalyzerPlugin;
(WebpackMd5Hash = require("webpack-md5-hash")),
	(HtmlWebpackPlugin = require("html-webpack-plugin")),
	(OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")),
	(extractTextWebpackPlugin = require("extract-text-webpack-plugin")),
	// MiniCssExtractPlugin = require("mini-css-extract-plugin");

	(module.exports = {
		mode: "production",
		entry: base.entry,
		output: base.output,
		module: {
			rules: base.loaders.concat([
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: extractTextWebpackPlugin.extract({
						fallback: "style-loader",
						use: [
							"css-loader",
							"postcss-loader",
							"resolve-url-loader",
							"sass-loader"
						]
					})
				}
			])
		},
		resolve: {
			extensions: base.extensions,
			alias: base.alias
		},
		externals: base.externals,
		plugins: [
			new extractTextWebpackPlugin({
				filename: "css/[name].css?_v=[chunkhash:8]"
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessor: require("cssnano"),
				cssProcessorOptions: {
					safe: true,
					discardComments: { removeAll: true }
				},
				canPrint: true
			}),
			new WebpackMd5Hash(),
			new BundleAnalyzerPlugin(),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: "index.html",
				chunks: ["main", "vendor"],
				inject: true,
				chunksSortMode: "auto"
				/* minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            } */
			})
		],
		optimization: base.optimization
	});
