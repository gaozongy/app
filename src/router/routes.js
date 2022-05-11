//配置路由信息
//引入一级路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
//引入二级路由组件
// import myOrder from "@/pages/Center/MyOrder/myOrder";
// import GroupOrder from "@/pages/Center/GroupOrder/groupOrder";

/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，
这样就会更加高效。
*/



export default [
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: {show: true},
        //二级路由
        children:[
            {
                path:'myorder',
                component: ()=>import('@/pages/Center/MyOrder/myOrder'),
            },
            {
                path:'grouporder',
                component: ()=>import('@/pages/Center/GroupOrder/groupOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: {show: true}
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to,from,next) => {
            if(from.path=='/trade') {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to,from,next) => {
            if(from.path=='/shopcart') {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {show: true}
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {show: true}
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: {show: true}
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: {show: true}
    },
    {
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
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
        component: ()=>import('@/pages/Login'),
        meta: {show: false}
    }
    ,
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: {show: false}
    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]
