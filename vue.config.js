const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭校验工具
  lintOnSave:false,
  //打包时，代码都是经过压缩加密的，不加载出map文件。map文件：如果项目运行报错，通过map文件
  //可以像未加密的代码一样，准确的输出哪一行有错
  productionSourceMap:false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
