<template>
  <div>
    <!--中部-->
    <div id="backgroudColer" class="center app-column-center-layout shadow">
      <div class="center-box">
        <!--个人资料)-->
        <div class="about-box">
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
                <a class="a-class" href="https://github.com/15207126400" target="_blank">Github</a>
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
            </div>
          </div>
          <!-- 博客搭建过程描述 -->
          <div style="margin-top:50px;" class="about-top-box">
            <span class="base-title">搭建过程</span>
          </div>
          <div style="width:95%;" class="block app-column-center-layout">
            <el-timeline>
              <el-timeline-item v-for="(history, index) in historyList" 
                placement="top"
                
                :key="index"
                :timestamp="history.createTime">
                <el-card>
                  <h4>{{history.title}}</h4>
                  <p>{{history.content}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStatistical } from '../api/blog/statistical.js'
import { getHistoryList } from '../api/blog/about.js'
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      historyList: [],
      statistical: {}
    }
  },
  //页面加载时
  created() {
    this.getStatistical()
    this.getHistoryList()
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

    //获取历史记录
    getHistoryList() {
      getHistoryList().then((res) => {
        this.historyList = res.data
      })
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
