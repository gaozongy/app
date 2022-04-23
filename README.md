1：vue-cli脚手架初始化项目
    node + webpack +淘宝镜像

    node_modules文件夹：项目依赖文件夹

    public文件夹：一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，
    会原封不动打包到dist文件夹中。

    src文件夹（程序员源代码文件夹）

        assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面的静态资源，在
        webpack打包的时候，webpack会把静态资源当作一个模块，打包在JS文件里面。

        components文件夹：一般放置的是非路由组件（全局组件）

        App.vue：唯一的根组件，Vue当中的组件（.vue）
        main.js：程序入口文件，也是整个程序当中最优先执行的文件

    babel.config.js：配置文件（babel相关）

    package.json文件：被认为是项目的”身份证“，记录着项目叫什么，项目中有哪些依赖、项目怎么运行

    package-lock.json：缓存性文件

    README.md：说明性文件

2：项目的其他配置
    2.1项目运行起来的时候，让浏览器自动打开
    ---package.json
        "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
        },
    2.2eslint校验功能关闭
    ---在根目录下，找到vue.config.js
    加上一个语句：lintOnSave:false
    比如：声明变量但是没有使用，eslint校验工具会报错

    2.3src文件夹简写方法，配置别名。@
    ---在根目录下，找到jsconfig.json
    给jsconfig.json配置别名@提示【@代表的是src文件夹，这样将来文件过多，找的时候方便很多】
    {
        "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "baseUrl": "./",
        "moduleResolution": "node",
        "paths": {
        "@/*": [
        "src/*"
        ]
        },
        "lib": [
        "esnext",
        "dom",
        "dom.iterable",
        "scripthost"
            ]
        }
    }
3：项目路由的分析
    vue-router
    前端所谓路由：KV键值对。
    key：URL（地址栏中的路径）
    value：相应的路由组件
    注意：项目分为上中下结构

    路由组件：
    Home首页路由组件、Search路由组件、Login登录路由、Register注册路由
    非路由组件：
    Header、
    Footer【在首页、搜索页】，但是在登录|注册页面是没有的
    

