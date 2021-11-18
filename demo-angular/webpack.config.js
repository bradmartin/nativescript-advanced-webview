const webpack = require('@nativescript/webpack');
const { join } = require('path');

module.exports = env => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack(config => {
    config.module
      .rule('istanbul-loader')
      .enforce('post')
      .include
      .add(webpack.Utils.platform.getEntryDirPath())
      .add(join(webpack.Utils.project.getProjectRootPath(), '..', 'src'))
      .end()
      .exclude
      .add(/\.spec\.ts$/)
      .add(/tests\/.*\.ts$/)
      .add(join(webpack.Utils.platform.getEntryDirPath(), 'test.ts'))
      .add(join(webpack.Utils.platform.getEntryDirPath(), 'test.js'))
      .end()
      .test(/\.(ts|js)/)
      .use('@jsdevtools/coverage-istanbul-loader')
      .loader(require.resolve('@jsdevtools/coverage-istanbul-loader'))
      .options({ esModules: true });
  });

  return webpack.resolveConfig();
};
