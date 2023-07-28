const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
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
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource',
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
  ],
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, '/dist/'),
    compress: true,
    host: 'localhost',
    port: 8080,
  }
};