const webpack = require('@nativescript/webpack');

module.exports = env => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack(config => {
    config.module
      .rule('istanbul-loader')
      .enforce('post')
      .include.add(webpack.Utils.platform.getEntryDirPath())
      .end()
      .test(/\.(ts|js)/)
      .use('@jsdevtools/coverage-istanbul-loader')
      .loader(require.resolve('@jsdevtools/coverage-istanbul-loader'))
      .options({ esModules: true });
  });

  return webpack.resolveConfig();
};
