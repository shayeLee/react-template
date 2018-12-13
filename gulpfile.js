var config = require("./build/config.js"), 
  gulp = require("gulp"),
  gulpSequence = require("gulp-sequence"),
  gutil = require("gulp-util"),
  del = require("del"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  express = require("express"),
  webpack = require("webpack"),
	webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware"),
  history = require("connect-history-api-fallback"),
  proxyMiddleware = require("http-proxy-middleware"),
  opn = require("opn");
  
// 开发服务器
gulp.task("dev", function() {
  var webpackDevConfig = require("./build/webpack.dev.js");

	webpackDevConfig.entry = ["webpack-hot-middleware/client?quiet=true"].concat(
		[webpackDevConfig.entry]
  );

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
  if (config.target) server.use(proxyMiddleware("/api", {
    target: config.target,
    changeOrigoin: true,
    pathRewrite: { '^/api': '/' }
  }));
	server.use(devMiddleware);
	server.use(hotMiddleware);
	server.listen(3008, function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		opn("http://localhost:3008");
	});
});

//清除
gulp.task("clean", function(cb) {
	del.sync("dist");
	cb();
});

//图片压缩
gulp.task("copyImg", function() {
	return gulp
		.src("img/**/*.*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img/"));
});

//复制无需编译的js文件
gulp.task("copyJs", function() {
	return gulp
		.src([
			"src/js_modules/react/pro/react.js",
			"src/js_modules/react-dom/pro/react-dom.js"
		])
		.pipe(uglify())
		.pipe(gulp.dest("dist/js/"));
});

//webpack production
gulp.task("webpackPro", function(cb) {
	var webpackProConfig = require("./build/webpack.pro.js");
	webpack(webpackProConfig, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack:production", err);
		gutil.log(
			"[webpack:production]",
			stats.toString({
				chunks: false,
				colors: true,
				timings: true,
				source: true,
				cachedAssets: false
			})
		);
		cb();
	});
});

gulp.task("buildSuccess", function(cb) {
	gutil.log("[webpack:production]", "build success!");
	cb();
});

gulp.task(
	"build",
	gulpSequence("clean", "copyImg", "webpackPro", "buildSuccess")
);