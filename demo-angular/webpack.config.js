const webpack = require('@nativescript/webpack');
const { join } = require('path');

module.exports = env => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack(config => {
    config.module
      .rule('istanbul-loader')
      .include
      .add(join(webpack.Utils.project.getProjectRootPath(), '..', 'src'));
  });

  return webpack.resolveConfig();
};
