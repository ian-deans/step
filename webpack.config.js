const WebpackErrorNotificationPlugin = require( 'webpack-error-notification' )
const webpack = require( 'webpack' )

const determineHost = () => {
  switch ( process.env.NODE_ENV ) {
    case 'production':
      return "'http://localhost:1337'"
    case 'test':
      return "'http://localhost:7357'"
    case 'development':
      return "'http://localhost:1337'"
    default:
      return "'http://localhost:1337'"
  }
}

module.exports = {
  entry: './source/root.js',
  output: {
    filename: './public/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackErrorNotificationPlugin(),
    new webpack.DefinePlugin({
      __HOST__: determineHost(),
      __ENV__: `"${process.env.NODE_ENV}"`
    })
  ]
}
