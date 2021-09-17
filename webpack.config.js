const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'), // шаблон
        // filename: 'index.html', // название выходного файла
      }),
      // new CleanWebpackPlugin(),
    ],
    entry: {
      index: './index.js',
      mpegts: './mpegts.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      compress: true,
      port: 8083,
      host: 'localhost'
    },
}