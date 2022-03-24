<template>
  <div>
    <!--中部-->
    <div id="backgroudColer" class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--左侧部分(文章列表)-->
        <div style="display:flex;flex-direction:column;" class="content-box">
          <!--文章列表-->
          <div class="infinite-list-wrapper">
            <div style="height:1000px;overflow-y:scroll;" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <div v-for="(article,aIndex) in articleList" :key="aIndex">
                <div @click="routerTo(article.id)" class="article-list-left-box app-column-start-left shadow">
                  <div style="height:50px;" class="app-row-start-layout">
                    <span class="base-title text-two-line-omit">{{article.title}}</span>
                    <div v-if="article.isTop==1" class="isTop">
                      <span>Top</span>
                    </div>
                  </div>
                  <div class="article-list-left-summary text-two-line-omit">{{article.summary}}</div>
                  <div class="posts-default-info">
                    <span><i class="el-icon-user-solid"></i> Ivan</span>
                    <span><i class="el-icon-menu"></i> {{article.category}}</span>
                    <span><i class="el-icon-time"></i> {{article.createTime}}</span>
                    <span><i class="el-icon-view"></i> {{article.traffic}}</span>
                  </div>
                </div>
              </div>
              <div style="height:50px;" class="app-column-center-layout">
                <p v-if="noMore" style="font-size:13px;color:#667481">没有更多了</p>
              </div>
            </div>
          </div>
        </div>

        <!--右侧部分-->
        <div class="right-box hidden-xs-only">
          <div class="right-bottom-box shadow">
            <span class="base-title">分类栏</span>
            <div class="category-box" v-for="(category,cIndex) in categoryList" :key="cIndex">
              <span @click="routerToTags(category.id)" class="category-name">{{category.name}}（{{category.number}}）</span>
            </div>
          </div>
          <div style="margin-top:10px;" class="right-top-box shadow">
            <span class="base-title">评论栏</span>
            <div class="right-top-box-item" v-for="(item,index) in commentList" :key="index">
              <div @click="routerTo(item.articleId)" class="app-column-start-left category-comment-box">
                <span>{{item.name}}: {{item.content}}</span>
                <span>{{item.createTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleListByCategory } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
import { getCommentListByNew } from '../api/blog/comment.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //刷新页面
  inject:['reload'],
  //变量定义
  data () {
    return {
      current: 1,
      pages: "",//取后端返回内容的总页数
      articleList: [],
      commentList: [],
      categoryList: []
    }
  },

  //监听路由是否变化并进行跳转
  watch: {
    '$route' (to) { 
      this.$router.go(to)
    }
  },
  
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.current >= this.pages;
    },
    disabled() {
      return this.noMore;
    }
  },

  //页面加载时
  created() {
    var categoryId = this.$route.params.id
     console.log('来了====' + categoryId)
    var form = {
      categoryId: categoryId,
      current: 0,
      size: 10
    }
    this.getArticleListByCategory(form)
    this.getCommentListByNew()
    this.getCategoryList()
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {
    //滚动加载
    load() {
      this.current += 1; //页数+1
      this.getArticleList(); //调用接口，此时页数+1，查询下一页数据
    },

    //获取文章信息
    getArticleListByCategory(form) {
      var loading;
      if(this.current > 1){
        loading = this.$loading({
          lock: true,
          // text: '加载文章列表中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }

      getArticleListByCategory(form).then((res) => {
        this.articleList =  this.articleList.concat(res.data.records);
        this.pages = res.data.pages
        if(res.code == 0){
          loading.close();
        }
        // setTimeout(() => {
        //   loading.close();
        // }, 1000);
      })
    },

    //获取评论列表
    getCommentListByNew() {
      getCommentListByNew().then((res) => {
        this.commentList = res.data
      })
    },

    //获取分类列表
    getCategoryList(){
      getCategoryList().then((res) => {
        this.categoryList = res.data
      })
    },

    //跳转文章详情
    routerTo(id){
      this.$router.push({
         name: 'article', 
         params: {
            id: id
          }
      });
    },

    //通过标签跳转文章列表
    routerToTags(id){
      this.$router.push({
         name: 'tags', 
         params: {
            id: id
          }
      });
    }
  }
}
</script>

<!-- 样式 -->
<style scoped>
  ul{
    list-style:none;
  }
  ul li {
    float: left;
    margin:0 10px;
  }
</style>
