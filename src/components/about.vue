<template>
  <div>
    <!--中部-->
    <div class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--个人资料)-->
        <div class="about-box">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>关于</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="about-top-box">
            <span class="base-title">个人资料</span>
          </div>
          <div class="about-top-item-box app-row-start-layout">
            <div class="about-top-item">
              <img class="about-top-item-avg" src="../assets/avg.jpg" />
              <div class="about-left-box app-row-between-layout">
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.articleCount}}</label>
                  <span class="about-data-span">博客</span>
                </div>
                <div class="line"></div>
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.tagsCount}}</label>
                  <span class="about-data-span">标签</span>
                </div>
                <div class="line"></div>
                <div class="app-column-center-layout">
                  <label class="about-data-label">{{statistical.commentCount}}</label>
                  <span class="about-data-span">评论</span>
                </div>
              </div>
              <div class="a-box app-row-between-layout">
                <a class="a-class" href="https://github.com/15207126400?tab=repositories" target="_blank">Github</a>
                <a class="a-class hidden-xs-only" href="tencent://message/?uin=286835776&Site=qq&Menu=yes">Call Me</a>
              </div>
            </div>
            <div class="about-top-info-box">
              <span>昵称: 苏</span>
              <span>实名: Ivan</span>
              <span>性别: 男</span>
              <span>生日: 1997年08月15日</span>
              <span>QQ：286835776</span>
              <span>Email: 286835776@qq.com</span>
              <span>座右铭：走得远比走得快更加重要</span>
              <!-- <span class="qq-group">QQ群: 
                <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=8d443a712bbeb5aae1e78ba0954bce2544a7b07b19d8123c34b0e4d63b45d97c">
                  <img style="height:20px;margin-left:10px;" border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="牛逼花吹牛交流群" title="牛逼花吹牛交流群">
                </a>
              </span> -->
            </div>
          </div>
          <!-- 博客搭建过程描述 -->
          <div style="margin-top:50px;" class="about-top-box">
            <span class="base-title">搭建过程</span>
          </div>
          <div style="width:100%;" class="block app-column-center-layout">
            <el-timeline>
              <el-timeline-item timestamp="2019/12/28" placement="top">
                <el-card>
                  <h4>博客上线</h4>
                  <p>参照友链三位大神的博客素材, 搭建了第一版的博客界面</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2019/01/02" placement="top">
                <el-card>
                  <h4>新增滑动菜单</h4>
                  <p>修改了最初版的顶部横向导航栏, 改为右侧动态滑动菜单栏</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/04" placement="top">
                <el-card>
                  <h4>新增评论</h4>
                  <p>文章详情界面新增评论展示和评论发表, 回复功能</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/08" placement="top">
                <el-card>
                  <h4>移动端自适应</h4>
                  <p>针对绝大部分时候网站会通过移动端进行访问, 做了移动端兼容处理</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/12" placement="top">
                <el-card>
                  <h4>新增动效及整体样式完善</h4>
                  <p>为了让博客整体看上去效果更好, 加入了部分动态效果</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/16" placement="top">
                <el-card>
                  <h4>新增github登录</h4>
                  <p>登录还是不能少的</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/18" placement="top">
                <el-card>
                  <h4>新增评论分页</h4>
                  <p>评论数据展示栏加入分页, 保证数据量过大时不会影响到性能</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/01/20" placement="top">
                <el-card>
                  <h4>界面优化</h4>
                  <p>增加动画特效及博客部分UI细节优化</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/11/01" placement="top">
                <el-card>
                  <h4>博客迁移</h4>
                  <p>云服务器到期, 进行环境及数据迁移, 顺便优化原项目, 实现Docker化项目部署和Minio资源服务器搭建上传</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <!--右侧部分-->
        <div class="right-box hidden-xs-only">
          <div class="right-top-box shadow">
            <span class="base-title">推荐文章</span>
            <div class="right-top-box-item" v-for="(item,index) in articleRandList" :key="index">
              <img @click="routerTo(item.id)" class="article-list-right-img" :src="item.img" /> 
              <!-- <div class="right-top-box-item-title">
                <h5>{{item.title}}</h5>
              </div> -->
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
import { getListByRand } from '../api/blog/article.js'
import { getCategoryList } from '../api/blog/category.js'
import { getStatistical } from '../api/blog/statistical.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      articleList: [],
      articleRandList: [],
      categoryList: [],
      statistical: {}
    }
  },
  //页面加载时
  created() {
    console.log('about初始化')
    this.getListByRand()
    this.getCategoryList()
    this.getStatistical()
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {

    //统计
    getStatistical() {
      getStatistical().then((res) => {
        console.log(res)
        this.statistical = res.data
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
  p {
    margin-top: 10px;
    color: #555;
    font-size: 12px;
  }
  .qq-group{
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 12px;
  }
  .block ul{
    width: 90%;
  }
  .block ul li{
    width: 100%;
  }



</style>
