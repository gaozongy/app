import Vue from 'vue'
import App from './App.vue'
//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/carousel/carousel";
import Pagination from "@/components/Pagination/pagination";
//按需引入Element-UI
import { Button, MessageBox} from 'element-ui';
//第一个参数是：全局组件的名字  第二个参数是：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局组件
Vue.component(Button.name,Button)
//Element-UI注册组件的时候，还有一种写法就是挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入仓库
import store from './store'
//引入mockServe.js
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接收api文件夹里面的全部请求函数
//统一引入
import * as API from '@/api'
import atm from '@/assets/1.gif'
//引入插件
import VueLazyload from "vue-lazyload";
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
})

Vue.config.productionTip = false


//引入自定义插件
import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{
  name:'upper'
})

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router属性
  router,
  //注册组件：组件一旦注册，组件实例的身上就会出现一个$store属性
  store
}).$mount('#app')
