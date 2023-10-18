const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/PicStation/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader','css-loader'],
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg})$/,
      type: 'asset/resource',
    },
    {
      test: /\.webp$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'picWebp'
          }
        }
      ]
    }
  ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /src\/public\/pic/
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, '/dist/'),
    compress: true,
    host: 'localhost',
    port: 8080,
  }
};