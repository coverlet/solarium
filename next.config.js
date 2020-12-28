/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
});
