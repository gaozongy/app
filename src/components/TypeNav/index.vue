<template>
  <div class="type-nav">
    <div class="container">
      <!--事件委派-->
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                 :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)">
                <a href="">{{ c1.categoryName }}</a>
                <!--<router-link to="/search">{{c1.categoryName}}</router-link>-->
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a href="">{{ c2.categoryName }}</a>
                      <!--<router-link to="/search">{{c2.categoryName}}</router-link>-->
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a href="">{{ c3.categoryName }}</a>
                        <!--<router-link to="/search">{{c3.categoryName}}</router-link>-->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      currentIndex: -1
    }
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
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
    //一级分类鼠标移除的事件回调
    leaveIndex() {
      //鼠标移除currentIndex变为-1
      this.currentIndex = -1
    },
    //进行路由跳转的方法
    goSearch() {
      //最好的解决方法：编程式导航+事件委派
      //利用事件委派存在一些问题：1：你怎么知道点击的一定是a标签；2：如何获取参数【1、2、3级分类产品的名字、id】

      this.$router.push('/search')
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
  }
}
</style>
