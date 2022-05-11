//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//引入路由组件
import routes from "@/router/routes";
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
let router =  new VueRouter({
    //配置路由
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y: 0}
    }
})
//全局路由守卫
router.beforeEach(async (to,from,next)=>{
    //to:去哪里；from:从哪来；next:放行函数
    // next()
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    //已登录
    if(token) {
        //已登录，还去登陆页面，让他停留在首页
        if(to.path=='/login') {
            next('/home')
        }else {
            //已登录，去除了login的其他页面,如果有用户信息就放行
            if(name) {
                next()
            }else {
                //如果没有用户信息,派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功放行
                    await store.dispatch('getUserInfo')
                    next()
                }catch(error){
                    //token过期了失效了，重新登陆
                    //清除token
                    await store.dispatch('userLoginOut')
                    next('/login')
                }
            }
        }
    }else {
        //未登录，不能去交易(trade)和支付(pay、paysuccess)和个人中心(center)相关的页面
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
            //把未登录的时候想去而没有去成的信息，存储于地址栏中
            next('/login?redirect='+toPath)
        }else {
            next()
        }
    }
})


export default router