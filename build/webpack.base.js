var path = require("path");

/**
 * 基础配置
 * 特别说明：
 * 1. __dirname表示当前目录，path.resolve()可以将相对路径转为绝对路径
*/
module.exports = {
  /**
   * 项目入口文件
  */
  entry: path.resolve(__dirname, '../src/index.js'),
  
  /**
   * 指定构建后的代码（文件）如何输出
  */
  output: {
    // 打包后的文件的生成位置（E:/react-template/dist/）
    path: path.resolve(__dirname, "../dist/"),

    // 主js文件（E:/react-template/dist/js/main.js）
    filename: "js/main.js",

    // 按需加载的文件（按需加载的模块会被拆分成单独的文件，name即为模块名称）
    chunkFilename: "js/[name].js",

    // publicPath + chunkFilename 为打包后生成的html文件请求按需加载文件的路径
    // publicPath + 图片的URL 为打包后生成的html文件请求图片的路径，其他静态资源文件同理
    publicPath: "/"
	},
  
  /**
   * 如何解析模块路径
  */
  resolve: {
    // 指定要解析的文件扩展名
    extensions: [".web.js", ".jsx", ".js", ".json"],

    // 模块路径别名
    alias: {
      
    }
  },
  
  /**
   * 指定如何处理（编译）各种类型的模块
   * 特别说明：
   * 1. webpack提供了丰富的针对不同类型模块的loader，你可以使用loader对模块进行预处理或者对模块的源代码进行转换（编译）
   * 2. 常见的模块类型：js, jsx, css, scss, less, json, png, git, jpg, ...
  */
  module: {
    /**
     * 各种类型模块的处理规则
     * 特别说明：
     * 1. use属性表示模块使用什么loader
    */
    rules: [
      // 图片文件小于8192byte时，转换为base64字符串
      {
        test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
        exclude: /node_modules/,
        use: ["url-loader?limit=8192"]
      },

      /**
       * 将js和jsx模块的源代码能正常执行的代码
       * 特别说明：
       * 1. 
      */ 
      {
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
          }, 
          "babel-loader"
        ]
      },
      {
        test: /\.(css)?$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
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
