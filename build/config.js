var path = require("path");

module.exports = {
	// __dirname表示当前目录，path.resolve()可以将相对路径转为绝对路径

  // 项目入口文件
  entry: path.resolve(__dirname, "../src/index.js"),
  
	output: {
    // 打包后的文件的生成位置
    path: path.resolve(__dirname, "../dist/"),
    // 打包后的文件名
    filename: "js/[name].js",
    // 打包后的按需加载的文件的名称规则
    chunkFilename: "js/[name].js",
    // publicPath + chunkFilename 为打包后生成的html文件请求按需加载文件的路径
    // publicPath + 图片的URL 为打包后生成的html文件请求图片的路径，其他静态资源文件同理
		publicPath: "/"
  },
  
  // 如何解析模块路径
  resolve: {
    // 指定要解析的文件扩展名
    extensions: [".web.js", ".jsx", ".js", ".json"],
  },
	
	loaders: [
		{
			test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
			exclude: /node_modules/,
			use: ["url-loader?limit=10000"]
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
			use: ["style-loader", "css-loader", "postcss-loader"]
		},
		{
			test: /\.less$/,
			use: ["style-loader", "css-loader", "less-loader"]
		}
	],
	alias: {
		fetch: path.resolve(__dirname, "../src/js_modules/fetch/fetch"),
		javaFetch: path.resolve(__dirname, "../src/js_modules/fetch/javaFetch"),
		fetchCommon: path.resolve(__dirname, "../src/js_modules/fetch/common"),
		utils: path.resolve(__dirname, "../src/js_modules/utils")
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM"
	},
	optimization: {
		// minimize: false,
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "-",
			name: true,
			cacheGroups: {
				default: false,
				vendor: {
					name: "vendor",
					minChunks: 2,
					priority: 99
				}
			}
		}
	}
};
