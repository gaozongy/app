<template>
  <div class="type-nav">
    <div class="container">
      <!--事件委派-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                   :class="{cur:currentIndex==index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!--<router-link to="/search">{{c1.categoryName}}</router-link>-->
                </h3>
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                            c2.categoryName
                          }}</a>
                        <!--<router-link to="/search">{{c2.categoryName}}</router-link>-->
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                              c3.categoryName
                            }}</a>
                          <!--<router-link to="/search">{{c3.categoryName}}</router-link>-->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//引入方式：是把lodash全部功能函数引入
// import _ from 'lodash'
//按需引入
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类上的索引值
      currentIndex: -1,
      show: true
    }
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    // //通知vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch('categoryList')
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //他会注入一盒参数state，这个参数就是大仓库的数据
      categoryList: state => state.home.categoryList

    })
  },
  methods: {
    //鼠标移到一级分类上，修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //index：鼠标移到某一个一级分类的元素的索引值
    //   //正常情况：用户慢慢操作，，鼠标进入每一个一级分类h3，都会触发鼠标进入事件
    //   //非正常情况：用户操作很快，，本身全部的一级分类都应该触发鼠标进入事件，但是实际只有部分h3触发了鼠标进入事件
    //   //就是由于用户的行为过快，浏览器反应不过来，如果当前回调函数中有大量工作，就会出现卡顿
    //   this.currentIndex = index
    // },
    //节流
    changeIndex: throttle(function (index) {
      //index：鼠标移到某一个一级分类的元素的索引值
      //正常情况：用户慢慢操作，，鼠标进入每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况：用户操作很快，，本身全部的一级分类都应该触发鼠标进入事件，但是实际只有部分h3触发了鼠标进入事件
      //就是由于用户的行为过快，浏览器反应不过来，如果当前回调函数中有大量工作，就会出现卡顿
      this.currentIndex = index
    }, 50),
    //进行路由跳转的方法
    goSearch() {
      //最好的解决方法：编程式导航+事件委派
      //利用事件委派存在一些问题：1：你怎么知道点击的一定是a标签；2：如何获取参数【1、2、3级分类产品的名字、id】
      //在子节点a标签加上自定义属性data-categoryName，其余子节点没有
      let node = event.target
      //获取当前触发的事件的节点
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let {
        categoryname,
        category1id,
        category2id,
        category3id
      } = node.dataset
      //如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = {name: 'search'}
        let query = {categoryName: categoryname}
        //一级分类、二级分类、三级分类
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        //整理完参数
        location.query = query
        //带着参数进行路由跳转
        this.$router.push(location)
      }
    },
    //当鼠标移入，让商品分类列表展示
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    //鼠标移除，列表隐藏
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }

      .cur {
        background-color: skyblue;
      }
    }
    //过渡动画样式
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 5S linear;
    }
  }
}
</style>
