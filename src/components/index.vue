<template>
  <!--外层-->
  <div class="outer-box app-column-center-layout">
    <!--外层边框-->
    <div class="outer-border-box app-column-center-layout">
      <!--内层-->
      <div class="inner-box">
        <!--顶部导航栏-->
        <div class="index-top-box app-row-around-layout hidden-xs-only">
          <!--左-->
          <div style="width:30%;" class="app-row-start-layout hidden-xs-only">
            <router-link class="menu-router-box" to="/">
              <h2 style="color:#eeeeee;">Ivan Blog</h2>
            </router-link>
          </div>
          <!--中-->
          <div class="index-nav-box app-row-between-layout"></div>
          <!--右-->
          <div style="width:30%;" class="app-row-end-right hidden-xs-only">
            <label>{{currentTime}}</label>
          </div>
        </div>
        <!--中部内容-->
        <div class="content-bg-box app-column-start-end">
          <!--移动端展示-->
          <header class="header header--index" style="overflow:hidden;width:100%;">
            <div class="wrapper header__title">
                <div style="height:100px;" class="app-column-between-layout">
                  <h2 class="header__desc mobile-center-title">Ivan | 晏飞个人博客</h2>
                  <span class="header__desc article-title">It's more important to go far than to go fast</span>
                </div>
                <transition name="el-fade-in-linear">
                  <router-link class="menu-router-box" to="/articleList">
                    <svg class="header__down" id="headerDown" viewBox="0 0 32 32" width="100%" height="100%">
                        <path d="M15.992 25.304c-0 0-0 0-0.001 0-0.516 0-0.981-0.216-1.31-0.563l-0.001-0.001-14.187-14.996c-0.306-0.323-0.494-0.76-0.494-1.241 0-0.998 0.809-1.807 1.807-1.807 0.517 0 0.983 0.217 1.313 0.565l0.001 0.001 12.875 13.612 12.886-13.612c0.331-0.348 0.797-0.565 1.314-0.565 0.481 0 0.918 0.187 1.242 0.493l-0.001-0.001c0.723 0.687 0.755 1.832 0.072 2.555l-14.201 14.996c-0.33 0.348-0.795 0.564-1.311 0.564-0.001 0-0.003 0-0.004 0h0z"></path>
                    </svg>
                  </router-link>
                </transition>
            </div>
          </header>

          <!--轮播图-->
          <!-- <div class="carousel-box app-row-between-layout hidden-xs-only">
            <el-carousel :interval="4000" type="card" arrow="always" trigger="click" height="100px" @change="onChange">
              <el-carousel-item v-for="(item,index) in articleList" :key="index">
                <img :src="item.img" alt="轮播图" @click="routerToDetail" class="carousel-img" />
              </el-carousel-item>
            </el-carousel>
          </div> -->
          
          
          <!--文章标题及简介-->
          <div class="article-box hidden-xs-only">
            <div style="height:35px;">
               <el-button type="info" size="small" @click="routerTo" class="bottom-btn">
                 LET ' S GO
                 <i style="color:#eee;" class="el-icon-caret-right"></i>
                </el-button>
            </div>
            <h1 class="article-title header__desc">It's more important to go far than to go fast</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogIndex } from '../api/blog/article.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      timer: "",                
      currentTime: new Date(),  
      articleList: [],
      id:'',
      title: '',
      summary: '',
      // seen: false,
      show: false
    }
  },
  //页面加载时
  created() {
    // this.blogIndex()
    // this.getTimer(this)
  },
  //页面离开时销毁
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    //跳转文章列表
    routerTo(){
      // var id = this.id
      this.$router.push({
         name: 'articleList'
      });
    },

    //跳转文章详情
    routerToDetail(){
      var id = this.id
      this.$router.push({
         name: 'article',
         params: {
            id: id
          }
      });
    },

    //获取文章信息
    blogIndex() {
      blogIndex().then((res) => {
        console.log('index: ' + res)
        this.articleList = res.data
      })
      this.btnVisible = true
    },

    //动态替换背景图
    onChange(i){
      var articleList = this.articleList
      //console.log(i);
      for(var k in articleList){
        if(k == i){
          var id = articleList[k].id
          //var img = articleList[k].img
          var title = articleList[k].title
          var summary = articleList[k].summary
          this.id = id
          this.title = title
          this.summary = summary
          // this.seen = true
        }
      }
    },

    //获取当前时间
    getTimer(_this){
      this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1).toString().padStart(2,'0') +
        "-" +
        (new Date().getDate()).toString().padStart(2,'0') +
        " " +
        (new Date().getHours()).toString().padStart(2,'0') +
        ":" +
        (new Date().getMinutes()).toString().padStart(2,'0') +
        ":" +
        (new Date().getSeconds()).toString().padStart(2,'0');
      }, 1000);
    }
  }
}
</script>

<!-- 样式 -->
<style scoped lang="stylus">
  /**标签样式**/
  ul
    list-style none
  li
    font-size 13px
    color #fff
    text-decoration none
  label
    font-size 10px
    color #eeeeee
  li:hover
    padding-bottom 2px
    border-bottom 2px solid #fff
  .router-link-active 
    text-decoration none

  /**element-ui样式**/
  .carousel-box
    position absolute
    right 50px
    bottom 60px
    display flex
    flex-direction column
    justify-content space-between
  .carousel-img
    width 100%
    overflow hidden
    height 100%
  .el-carousel--horizontal
    width 300px
  .el-carousel__item h3
    color #475669
    font-size 14px
    opacity 0.75
    line-height 200px
    margin 0
  .el-carousel__item:nth-child(2n) 
    background-color #99a9bf
  .el-carousel__item:nth-child(2n+1) 
    background-color #d3dce6

  /**自定义样式**/
  .outer-box
    background-image  url('../assets/index/index_bg.jpg')
    position fixed
    width 100%
    height 100%
    background-position center center
    background-size cover
    background-repeat unset
  .outer-border-box
    width 95%
    height 85%
    border 15px solid #fff
    border-radius 10px
  .inner-box
    width 100%
    height 100%
  .index-top-box
    opacity 0.9
    background #292929
    width 100%
    height 60px
  .index-nav-box
    width 25%
  .content-bg-box
    background-size 100% 100%
    height 100%
  .article-box
    display flex
    flex-direction column
    justify-content space-between
    width 90%
    height 100px
    margin-bottom 100px
    line-height 35px
  .article-title
    color #FFF
    opacity 0.3
    font-weight 900
    font-size 30px
    text-shadow 0 3px 6px rgba(0,0,0,0.1)
  .bottom-btn
    width 150px
    height 40px
    font-size 13px
    background #000
    opacity 0.7
    transition all 0.5s ease
  .bottom-btn:hover
    width 180px
    height 40px
    font-size 13px
    color #FFFFFF
    background-color #4cc9f0
    -webkit-box-shadow 10px 10px 99px 6px rgba(76,201,240,1)
    -moz-box-shadow 10px 10px 99px 6px rgba(76,201,240,1)
    box-shadow 10px 10px 99px 6px rgba(76,201,240,1)
  .header
    display none
  #headerDown
    display none

  /* 移动端样式 */
  @media screen and (max-width: 750px) 
    .index-nav-box
      width 80%
    .article-box
      width 80%
    .carousel-box
      position absolute
      width 100%
      right 0px
      bottom 280px
      z-index 2
      display flex
      flex-direction column
      justify-content center
    .article-title
      color #eee
      opacity 0.9
      font-weight 900
      font-size 14px
      text-shadow 0 3px 6px rgba(0,0,0,0.3)
    .outer-box
      background url('../assets/index/index_bg.jpg')
      position absolute
      width 100%
      height 100%
      background-position center center
      background-size cover
      background-repeat unset
    .outer-border-box
      width 90%
      height 450px
      border 10px solid #fff
      border-radius 5px
      position fixed
      z-index 1
    .mobile-center-box
      position absolute
      top 15%
    .mobile-center-title
      font-size 23px
      color #eee
      letter-spacing -1px
      font-weight 700
      text-shadow 0 3px 6px rgba(0,0,0,0.3)
    .header
      display block
    #headerDown
      display block


</style>
