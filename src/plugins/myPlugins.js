//vue的自定义插件一定对外暴露的是一个对象，对象一定有一个方法：install方法
let myPlugins = {}
myPlugins.install = function(Vue,options) {
    // Vue.prototype.$bus //任何组件都可以使用
    //Vue.directive //全局指令
    //Vue.component //全局组件
    //Vue.filter..... //过滤器....等等等很多
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
    })
}
export default myPlugins