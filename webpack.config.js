/* eslint-disable no-undef */
const publicPath = '/dist';

const config = {
  //context: `${__dirname}/src`,  // `__dirname` is root of project

  entry: ['es5-shim', 'es5-shim/es5-sham', 'json3', 'babel-polyfill', './src/index'],

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
  },

  // To run development server
  devServer: {
    contentBase: __dirname,
    publicPath,
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html',
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true, // don't fail the build for linting errors
      //   },
      // },
      {
        test: /\.ya?ml$/,
        use: 'yaml-loader',
      },
      {
            test: /\.js$/,
            exclude: /\/node_modules\//,
            use: {
                loader: 'babel-loader'
            }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              publicPath,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      config: `${__dirname}/config.js`,
    },
  },

  devtool: 'eval-source-map', // Default development sourcemap

};

module.exports = config;
