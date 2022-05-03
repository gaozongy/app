//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
//先把VueRouter原型对象上的push方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace方法以彻底解决编程式导航进行路由跳转的时候，多次执行会抛出NavigationDuplicated的警告
//第一个参数：是告诉原来的push方法，你往哪里跳转以及传递哪些参数
//第二个参数：是成功的回调
//第三个参数：是失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply相同点：都可以调用函数一次，都可以篡改函数的上下文一次；
        //不同点：call和apply传递参数时，call传递多个参数用逗号隔开，apply传递数组参数
        originPush.call(this, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {show: true}
        },
        {
            path: '/search/:keyword?',
            component: Search,
            meta: {show: true},
            name: 'search',
            //路由组件能不能传递props数据？
            //第一种：布尔值写法，props只支持传递params参数
            // props:true
            //第二种：对象写法，额外给路由组件传递一些props
            // props:{a:1,b:2}
            //第三种：函数写法（最常用）可以把params参数和query参数都传给路由组件
            props: ($route) => {
                return {keyword: $route.params.keyword, k: $route.query.k}
            }

        }
        ,
        {
            path: '/login',
            component: Login,
            meta: {show: false}
        }
        ,
        {
            path: '/register',
            component: Register,
            meta: {show: false}
        },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})