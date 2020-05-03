/* eslint-env node */

import {resolve} from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const HASH_LENGTH = 12;

export default (_env, {mode})=> {
  const isProduction = mode === 'production';

  return {
    devtool: isProduction ? false : 'source-map',

    entry: {
      app: ['@babel/polyfill', './src/index.js']
    },

    output: {
      path: resolve(__dirname, 'build'),
      filename: isProduction
        ? `[contenthash:${HASH_LENGTH}].js`
        : `[name]-[contenthash:${HASH_LENGTH}].js`
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? `[contenthash:${HASH_LENGTH}].js`
          : `[name]-[contenthash:${HASH_LENGTH}].js`,
        chunkFilename: isProduction
          ? `[contenthash:${HASH_LENGTH}].css`
          : `[name]-[contenthash:${HASH_LENGTH}].css`
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([{from: './public'}]),
      new OptimizeCssAssetsPlugin()
    ],

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [resolve(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            envName: isProduction ? 'production' : 'webpack-dev'
          }
        },
        {
          test: /(\.scss|\.css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localsConvention: 'camelCase',
                sourceMap: !isProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: ()=> [
                  require('postcss-nested')({}),
                  require('autoprefixer')()
                ],
                sourceMap: !isProduction
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|mp4|woff|eot|woff2|ttf)$/i,
          use: [
            'url-loader?limit=10000',
            {
              loader: 'img-loader'
            }
          ]
        }
      ]
    },

    resolve: {
      alias: {
        '#scss': resolve(__dirname, './scss'),
        '#src': resolve(__dirname, './src')
      }
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        name: true,
        cacheGroups: {
          default: false,
          react: {
            test: /[\\/]node_modules[\\/]react/,
            name: 'react',
            chunks: 'all'
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              return `npm.${packageName.replace('@', '')}`;
            },
            chunks: 'async'
          }
        }
      }
    },

    devServer: {
      port: 8080,
      host: 'localhost',
      contentBase: './build',
      publicPath: '/',
      stats: 'minimal',
      historyApiFallback: {
        rewrites: [{from: /^\/$/, to: '/'}]
      }
    }
  };
};
