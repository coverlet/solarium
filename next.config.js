/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
// maybe use this later
//const withCSS = require('@zeit/next-css');

module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    [
      withSass,
      {
        cssModules: true,
      },
    ],
  ],
  {
    /* global config here ... */
  }
);
