const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const conf = [{
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     enforce: "pre",
    //     use: ["source-map-loader"],
    //   },
    // ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      // filename: 'index.html', // название выходного файла
    }),
    
    new CopyPlugin({
      patterns: [
        {
          from: "src/style.css",
          // to: "dist"
        },
      ],
    }),
  ],
  entry: {
    index: './src/index.js',
    // mpegts: './src/mpegts.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.min.js',
  },
  devtool: 'source-map',
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, './dist'),
    publicPath: '/',
    compress: true,
    port: 8083,
    host: 'localhost'
  },
}]

module.exports = (env, options) => {
  let production = options.mode === 'production';

  conf.devtool = production ? false : 'eval-sourcemap';

  return conf;
}