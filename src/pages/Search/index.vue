<template>
  <div>
    <h1>params参数---{{$route.params.keyWord}}-------{{keyWord}}</h1>
    <h1>query参数---{{$route.query.k}}----------{{k}}</h1>
  </div>
</template>

<script>
export default {
  name: '',
  //路由组件可以传递props，只能传递params参数
  props:['keyWord','k']
}
</script>

<style scoped>

</style>
