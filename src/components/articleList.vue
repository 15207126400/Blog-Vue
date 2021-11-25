<template>
  <div>
    <!--中部-->
    <div class="center app-column-center-layout shadow">
      <div style="height:80%;" class="center-box">
        <!--左侧部分(文章列表)-->
        <div style="display: flex;flex-direction: column;" class="content-box">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
          </el-breadcrumb>
          <!--文章列表-->
          <div class="infinite-list-wrapper">
            <div style="overflow:auto;height:800px;" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <div v-for="(article,aIndex) in articleList" :key="aIndex">
                <div @click="routerTo(article.id)" class="article-list-left-box app-column-start-left shadow">
                  <img class="article-list-left-img" :src="article.img" />
                  <div style="height:40px;" class="app-row-start-layout">
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
              <div class="app-column-center-layout">
                <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#667481">没有更多了</p>
              </div>
            </div>
          </div>
        </div>

        <!--右侧部分-->
        <div class="right-box hidden-xs-only">
          <div class="right-top-box shadow">
            <span class="base-title">推荐文章</span>
            <div class="right-top-box-item" v-for="(item,index) in articleRandList" :key="index">
              <img @click="routerTo(item.id)" class="article-list-right-img" :src="item.img" />
            </div>
          </div>
          <div class="right-bottom-box shadow">
            <span class="base-title">热门标签</span>
            <div class="category-box">
              <span @click="routerToTags(category.id)" class="category-name" v-for="(category,cIndex) in categoryList" :key="cIndex">{{category.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList,getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      current: 1,
      pages: "",//取后端返回内容的总页数
      articleList: [],
      articleRandList: [],
      categoryList: []
    }
  },
  
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.current >= this.pages - 1;
    },
    disabled() {
      return this.noMore;
    }
  },

  //页面加载时
  created() {
    // console.log('articleList初始化')
    this.getArticleList()
    this.getListByRand()
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
    getArticleList() {
      let form = {
        current: this.current,
        size: 5 //每页查询条数
      }

      var loading;
      if(this.current > 1){
        loading = this.$loading({
          lock: true,
          text: '加载文章列表中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }

      getArticleList(form).then((res) => {
        this.articleList =  this.articleList.concat(res.data.records);
        this.pages = res.data.pages
        setTimeout(() => {
          loading.close();
        }, 1000);
      })
    },

    //获取随机文章
    getListByRand() {
      getListByRand().then((res) => {
        this.articleRandList = res.data
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
