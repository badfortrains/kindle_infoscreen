/* eslint-disable no-undef */
// Start with dev config
const config = require('./webpack.config.js');

// Remove development server and code map
// config.devServer = undefined;
// config.devtool = 'eval-source-map';

// Replace development with production config
config.resolve.alias.config = `${__dirname}/config.prod.js`;

module.exports = config;
