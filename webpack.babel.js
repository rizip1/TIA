import path from 'path'
import webpack from 'webpack'
import dotenv from 'dotenv'
import { PUBLIC } from './src/common/constants'

dotenv.config()

export default function makeConfig(isDevelopment=false) {
  const config = {
    devtool: isDevelopment ? 'eval' : 'source-map',
    entry: (() => {
      const entries = ['./src/index.js']
      if (isDevelopment) {
        entries.push('webpack-hot-middleware/client')
      }
      return entries
    })(),
    output: {
      path: path.join(__dirname, PUBLIC, 'bundles'), // must be absolute path to output dir
      filename: 'bundle.js', // must be relative path
      publicPath: `/${PUBLIC}/bundles/`, // path to bundle when accessing from browser
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,

          // .babelrc is only used by babel-node
          // do not store this options in .babelrc otherwise HMR would not work
          query: {
            // when turned on, it sometimes leads to strange errors
            cacheDirectory: false,
            presets: ['es2015', 'react'].concat(isDevelopment ? ['react-hmre'] : []),
            // add babel plugins here if required
            // plugins: ['transform-decorators-legacy'],
          },
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        /*{
          test: /\.png$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.jpg$/,
          loader: 'file-loader',
        },*/
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
        /*{
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml',
        },*/
        {
          test: /\.json?$/,
          loader: 'json-loader',
        },
        {
          loader: 'url-loader',
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
          options: {
            limit: 10000,
          },
        },
        {
          loader: 'url-loader',
          test: /favicon\.ico$/,
          options: {
            limit: 1,
          },
        },
      ],
    },
    plugins: (() => {
      const plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          },
          'api': {
            HOST: JSON.stringify(isDevelopment ?
              process.env.API_HOST_DEV : process.env.API_HOST_PROD),
          },
        }),
      ]
      if (isDevelopment) {
        plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        )
      } else {
        plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false, // Because uglify reports irrelevant warnings
            },
          }),
      )}
      return plugins
    })(),
  }
  return config
}
