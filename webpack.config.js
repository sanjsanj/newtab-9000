const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCss = new ExtractTextPlugin({
  filename: './css/s.css',
});

module.exports = {
  entry: './js/index.js',

  output: {
    path: path.join(__dirname, './js'),
    filename: 'app.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    extractCss,
  ],
};
