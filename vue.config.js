// 分析包内容
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  assetsDir: './',

  /* 开启vue运行时模板编译功能！！ */
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: false,

  configureWebpack: (config) => {
    config.resolve = { extensions: ['.js', 'css', 'scss', '.vue'] };
    config.devtool = 'source-map';
    config.output.libraryExport =
      'default'; /* 解决import UMD打包文件时, 组件install方法执行报错的问题！！ */
  },
  css: {
    loaderOptions: {
      scss: {
        /* 自动引入全局scss文件 */
        prependData: `
          @import "./src/styles/global.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    /* 配置svg图标自动加载 begin */
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    /* 配置svg图标自动加载 end */
  },
  devServer: {
    // host: "127.0.0.1",
    port: 8888, // 端口
    disableHostCheck: true,
    https: false,
  },
};
