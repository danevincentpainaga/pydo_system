const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

var SRC = path.resolve(__dirname, './src/app/app.js');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  entry: {
    vendor: './src/app/vendor.js',
    main: './src/app/app.js',
  },
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      // {
      //  // test: /\.(woff|woff2|ttf|eot)$/,
      //  // use: 'file-loader?name=[path][name].[ext]!static'
      //  test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100000,
      //       },
      //     },
      //   ],
      // },
    {
      exclude: path.resolve(__dirname, './src/index.html'),
      test: /\.html$/i,
      use: [
        { loader:'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src/views')) },
        { loader: 'raw-loader' }
      ]
    },
    {
     // test: /\.(woff|woff2|ttf|eot|svg|jpg|jpeg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
     test: /\.(jpg|jpeg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images'
          }
        }
      ]
    },
    {
      test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=100000&mimetype=image/svg+xml&name=/[name].[ext]'
    },
    {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=100000&mimetype=application/font-woff&name=/[name].[ext]'
    },
    {
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=100000&mimetype=application/font-woff2&name=/[name].[ext]'
    },
    {
      test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=100000&mimetype=application/octet-stream&name=/[name].[ext]'
    },
    {
      test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject&name=/[name].[ext]'
    },
    ], 
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "images" },
      ],
    }),
  ]
};