<template>
  <div>
    <h1 v-upper="msg"></h1>
    <Header></Header>
    <!--路由组件出口的地方-->
    <router-view></router-view>
    <!--在Home、Search显示，在登录、注册隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  data() {
    return {
      msg:'abc'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted() {
    //只从服务器获取一次三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
