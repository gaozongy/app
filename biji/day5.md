swiper插件：经常制作轮播图
1）解决轮播图最完美的方案（之前套了一个定时器,但是不完美）
用 watch + nextTick 解决：数据监听，监听已有数据的变化
$nextTick:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

2)开发floor组件
切记：仓库当中的state的数据格式取决于服务器返回的数据的格式！！！！
2.1：getFloorList这个action在哪里触发？？在Home路由组件当中触发
2.2:v-for也可以在自定义标签中使用
2.3：组件间通信方式
    props:用于父子组件通信
    自定义事件：@emit @on 可以实现子给父通信
    全局事件总线：$bus 全能
    pubsub-js：在vue当中几乎不用 全能
    插槽
    vuex

3)把首页当中的轮播图搞成一个共用全局组件

4)search模块开发
1：静态页面 + 静态组件拆分
2：发请求（API）
3：vuex(state + actions + mutations)
4:组件获取仓库数据，动态展示