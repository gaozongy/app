<template>
  <div>
  <!-- 使用三级联动全局组件，三级联动已经注册为全局组件，因此不需要再引入，直接使用即可 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import {mapState} from "vuex";

export default {
  name: '',
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style scoped>

</style>
