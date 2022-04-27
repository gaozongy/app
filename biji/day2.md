1：编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理好了
    1.1为什么编程式导航进行路由跳转的时候，就有这种警告？
    "vue-router": "^3.5.3"：最新的vue-router引入promise
    1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决

    1.3通过底部的代码，可以实现解决错误
    this.$router.push({name:'search',params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}},()=>{},()=>{})
    这种写法：治标不治本，将来在别的组件当中push|replace，编程式导航还是会有类似错误

    1.4
    this：指的是当前组件实例对象，也就是VC（search）
    this.$router属性：当前的这个属性，他的属性值是VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例对象添加$router|$route属性
    push：是VueRouter类的一个实例。

    按照自己的理解就是：this是组件实例对象，注册路由的时候给组件实例对象添加$router|$route属性，
    而this.$router是VurRouter() new出来的一个实例对象，push就是VurRouter原型对象上的方法

        function VueRouter() {

        }
        //原型对象上的方法
        VueRouter.prototype.push = function() {
            //函数上下文为VueRouter类的一个实例
        }
        let $router = new VueRouter()
        $router.push()
        this.$router.push()

2：Home模块组件拆分
--先完成静态页面
--拆分静态组件
--获取服务器的数据进行展示
--动态业务
（Home模块总共拆了7个组件，其中三级联动模块是全局组件）

    2.1：三级联动组件
    ---由于三级联动，在Home、Search、Detail都存在，所以把三级联动组件注册为全局组件
    好处：只需要注册一次，就可以在项目任意地方使用

    2.2：完成其余静态组件
        拆分组件，要关注HTML + CSS +图片资源---【结构、样式、图片资源】

3：POSTMAN测试接口
    --经过postman工具测试，接口有问题，服务器接口崩了
    --如果服务器返回的数据code字段是200，代表服务器返回数据成功，如果不是200就说明服务器返回数据失败
    --整个项目，所有的接口前缀都有/api字样

4：axios二次封装
    XMLHttpRequest、fetch、JQ、axios这些方式都可以向服务器发请求，常用axios
    4.1为什么需要进行二次封装axios？
        是为了搞请求拦截器和响应拦截器：请求拦截器：可以在发请求之前处理一些业务；响应拦截器：当服务器数据返回以后，可以处理一些事情
    4.2在项目当中经常会出现API文件夹【API文件夹经常是关于axios请求的】
        接口当中：路径都带有“/api”
        baseURL:'/api'的作用是在发请求的路径前面都加上/api，就不用自己书写了

5：接口统一管理
    项目很小：完全可以在组件的生命周期函数中发请求
    项目大：对api进行统一管理
    5.1：跨域问题
        什么是跨域：当一个请求url的协议,域名,端口三者之间任意一个与当前的url不同即为跨域
        http://localhost:8080/#/home-----当前页面url
        http://gmall-h5-api.atguigu.cn-----被请求页面url

        跨域解决方案：JSONP CROS 代理

6：nprogress进度条的使用
    start：进度条开始
    done：进度条结束
    进度条颜色可以修改的，需要修改他的样式