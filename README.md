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
    Header、Header在上面四个路由组件里都出现了，不懂老师为啥说只出现在了首页和搜索页
    Footer【在首页、搜索页】，但是在登录|注册页面是没有的

4：完成非路由组件Header与Footer业务
    在项目当中，不再以HTML + CSS为主，主要搞业务和逻辑
    在开发项目的时候：
    1：书写静态页面（HTML + CSS）
    2：拆分组件
    3：获取服务器的数据动态展示
    4：完成相应的动态业务逻辑

    注意1：创建组件的时候，组件的结构 + 组建的样式 + 图片资源
    注意2：项目采用的是less样式，浏览器不识别less样式，需要通过less、less-loader【安装5版本】进行处理less样式，
        把less样式变为css样式，浏览器才能识别。
    注意3：如果想让组件识别less样式，需要在style标签的身上加上lang=less

    4.1：使用组件的步骤（非路由组件）
        -创建或者定义
        -引入
        -注册
        -使用

5：路由组件的搭建
    vue-router
    在上面的分析中，路由组件应该有四个：Home、Search、Login、Register
    -components文件夹：经常放置的非路由组件（共用全局组件）
    -pages|views文件夹：经常放置路由组件

    5.1：配置路由
        项目当中配置的路由一般放置在router文件夹中
    5.2：总结
    路由组件与非路由组件的区别
        1：路由组件一般放置在pages|views文件夹中，非路由组件一般放置在components文件夹中
        2：路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以
            标签的形式使用
        3：注册完路由，不管是路由组件、还是非路由组件身上都有$route和$router属性

        $route：一般获取路由信息【路径、query、params等等】
        $router：一般进行编程式导航进行路由跳转【push、replace】

    5.3：路由的跳转？
        路由的跳转有两种形式：
        声明式导航router-link，可以进行路由的跳转
        编程式导航push|replace，可以进行路由跳转

        编程式导航：声明式导航能做的，编程式导航都能做
        但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑。

6：Footer组件的显示与隐藏
    显示或者隐藏组件：v-if|v-show
    Footer组件：在Home、Search显示
    Footer组件：在登录、注册时候隐藏
    6.1：我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏。
    6.2：配置路由的时候，可以给路由添加元信息【meta】，路由需要配置对象，他的key不能乱写

7：路由传参
    8.1：路由跳转有集中方式？
    比如A=>B
    声明式导航：router-link（务必要有to属性），可以实现路由的跳转。
    编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转。

    8.2：路由传参有几种写法？
    params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
    query参数：不属于路径当中的一部分，类似于ajax中的queryString，不需要占位

8：路由传参相关面试题
    1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
        不可以：不能这样书写，程序会崩掉；params参数只能结合name:'路由名称'使用

    2:如何指定params参数可传可不传?
        配置路由的时候，params参数已经占位了，但是路由跳转的时候没有传递params参数，路径会出问题
        所以想指定params参数可传可不传可以在配置路由的时候，params参数进行占位的时候在后面加一个？就行了

    3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
        params参数传递空字符串，会出现路径问题，就和上面没传params参数一样
        如果params参数传递的是空字符串，可以使用undefined解决，就是在空的params参数后面加一个||undefined就行了
        
    4: 路由组件能不能传递props数据?
        是可以的，有三种写法
            //第一种：布尔值写法，props只支持传递params参数
            // props:true
            //第二种：对象写法，额外给路由组件传递一些props
            // props:{a:1,b:2}
            //第三种：函数写法（最常用）可以把params参数和query参数都传给路由组件
            props:($route)=>{
                return {keyWord: $route.params.keyWord,k:$route.query.k}
            }
     

     

    

