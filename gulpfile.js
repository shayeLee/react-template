var gulp = require("gulp"),
  gutil = require("gulp-util"),
  express = require("express"),
  webpack = require("webpack"),
	webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware"),
  history = require("connect-history-api-fallback"),
	opn = require("opn");

gulp.task("webpackDevServer", function() {
  var webpackDevConfig = require("./build/webpack.dev.js");

	webpackDevConfig.entry = ['react-hot-loader/patch', "webpack-hot-middleware/client?noInfo=true"].concat(
		[webpackDevConfig.entry]
  );

	webpackDevConfig.plugins = webpackDevConfig.plugins.concat([
		new webpack.HotModuleReplacementPlugin()
	]);

	var devCompiler = webpack(webpackDevConfig);
	var devMiddleware = webpackDevMiddleware(devCompiler, {
		publicPath: webpackDevConfig.output.publicPath,
		stats: {
			chunks: false,
			colors: true,
			timings: true,
			source: true,
			cachedAssets: false
		},
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: true
		}
	});
	var hotMiddleware = webpackHotMiddleware(devCompiler, {
		log: false
	});

	var server = express();
	server.use(history());
	server.use(devMiddleware);
	server.use(hotMiddleware);
	server.listen(3008, function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		opn("http://localhost:3008");
	});
});
