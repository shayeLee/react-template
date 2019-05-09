var path = require("path");

var cssLoader = {
  loader: "css-loader",
  options: {
    minimize: {
      safe: true,
      discardComments: {
        removeAll: true
      }
    }
  }
}

module.exports = {
	entry: path.resolve(__dirname, "../src/index.js"),
	output: {
		path: path.resolve(__dirname, "../dist/"),
		chunkFilename: "js/[name].js?v=[chunkhash:8]",
		publicPath: "/"
	},
	resolve: {
		extensions: [".web.js", ".jsx", ".js", ".json"],
		alias: {}
	},
	module: {
		rules: [
			{
				test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
				exclude: /node_modules/,
				use: ["url-loader?limit=8192"]
			},
			{
				enforce: "pre",
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "eslint-loader",
						options: {
							emitError: true,
							emitWarning: true,
							failOnError: true
						}
					}
				]
			},
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.(css)?$/,
				use: [
					"style-loader/url",
					cssLoader,
					"postcss-loader"
				]
			},
			{
				test: /\.less$/,
				use: ["style-loader", cssLoader, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ["style-loader", cssLoader, "postcss-loader", "sass-loader"]
			}
		]
	},

	externals: {
    
	},

	plugins: [],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 99,
        },
      },
    },
  }
};
