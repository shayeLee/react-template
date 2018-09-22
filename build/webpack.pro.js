var base = require('./webpack.base.js'),
  merge = require('webpack-merge'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  WebpackMd5Hash = require('webpack-md5-hash');

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        new WebpackMd5Hash(),
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['main', 'vendor'],
            inject: true,
            chunksSortMode: 'auto',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
});
