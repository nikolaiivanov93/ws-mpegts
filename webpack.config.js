const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './index.html'), // шаблон
        filename: 'index.html', // название выходного файла
      }),
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
      port: 9001,
      host: 'localhost'
    },
}