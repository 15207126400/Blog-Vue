<template>
  <div>
    <!--中部-->
    <div id="backgroudColer" class="app-column-center-layout shadow">
      <div class="center-box">
        <!--左侧部分(文章详情)-->
        <div style="margin-top:30px;" class="app-column-start-left">
          <!--位置-->
          <el-breadcrumb class="pos-box app-row-start-left" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/articleList' }">博客</el-breadcrumb-item>
            <el-breadcrumb-item>文章</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="white-bg app-column-start-left">
            <div class="content-item">
              <span class="base-title">{{article.title}}</span>
              <div class="posts-default-info season">
                <span><i class="el-icon-user-solid"></i> Ivan</span>
                <span><i class="el-icon-menu"></i> {{article.category}}</span>
                <span><i class="el-icon-time"></i> {{article.createTime}}</span>
                <span><i class="el-icon-view"></i> {{article.traffic}}</span>
                <span><i class="el-icon-chat-dot-round"></i> {{page.total}}</span>
              </div>
            </div>
            <transition name="el-fade-in-linear">
              <div class="center-left-item-box bodyFont" v-html="article.content" ref="bodyFont" :class="{bodyHeight:contentStatus}"></div>
            </transition>
            <div class="contentToggle" v-if="contentStatus" @click="contentStatus=!contentStatus">
              <span style="font-size:12px;">展开阅读全文</span>
            </div>
            <!--转载声明-->
            <div class="articleTips">
              <span>本站文章除注明转载外，均为本站原创。欢迎任何形式的转载，但请务必注明出处，尊重他人劳动共创开源社区。转载请注明：</span>
              <span>标题：{{article.title}}</span>
              <span>地址：<a>http://blog.ivan.group/article/{{article.id}}</a></span>
              <span>文章转载自: </span>
              <span>Ivan | 晏飞个人博客 [<a href="http://blog.ivan.group" target="_blank">http://blog.ivan.group</a>]</span>
            </div>
            <!--打赏栏-->
            <el-button style="margin:20px;" class="app-column-center-layout hidden-xs-only" type="text" @click="centerDialogVisible=true">
              <div class="reward-title">
                <p>请博主吃核桃</p>
              </div>
              <div class="app-column-center-layout">
                <span class="footer__heart2">❤️</span>
              </div>
            </el-button>
            <el-dialog class="app-column-center-layout hidden-xs-only" 
              :visible.sync="centerDialogVisible" 
              width="26%" 
              top="-5%" >
              <div class="app-column-center-layout">
                <h3 style="color:#7A7D7E;">请打开支付宝扫一扫</h3>
                <img style="height:300px;" src="../assets/payCode2.jpg"/>
              </div>
            </el-dialog>
            <!--分享-->
            <div class="share-box hidden-xs-only">
              <span>分享至: </span>
              <img @click="share('qq')" class="share-img" src="../assets/share/qq.jpg" />
              <img @click="share('qq-zone')" class="share-img" src="../assets/share/qq_zone.jpg" />
              <img @click="share('weibo')" class="share-img" src="../assets/share/weibo.jpg" />
            </div>
            <!--上一篇/下一篇-->
            <div class="router-article-box">
              <span class="router-article" @click="routerTo(article.beforeArticle.id)" v-if="article.beforeArticle">
                上一篇 : {{article.beforeArticle.title}}
              </span>
              <span class="router-article" @click="routerTo(article.afterArticle.id)" v-if="article.afterArticle">
                下一篇 : {{article.afterArticle.title}}
              </span>
            </div>
          </div>
          <div class="all-comment-box shadow">
            <div class="app-row-start-left">
              <span class="base-title">全部评论:</span>
              <span style="margin-left:10px;color:#333333;">{{page.total}} 条</span>
            </div>
            <span v-if="commentList.length == 0" style="font-size:12px;color:#A2A0A0;">暂无评论</span>
            <div class="all-comment-list-box" v-for="(comment,cIndex) in commentList" :key="cIndex">
              <div class="app-row-start-left">
                <img class="comment-avatar" :src="comment.avatarUrl" />
                <div class="app-column-start-left">
                  <div>
                    <span class="comment-name">{{comment.name}}</span>
                    <span class="comment-floor">#{{comment.ladder}}楼</span>
                  </div>
                  <div>
                    <span class="comment-time">{{comment.createTime}}</span>
                  </div>
                </div>
              </div>
              <div class="comment-content-box">
                <span>{{comment.content}}</span>
              </div>
              <!--回复信息展示-->
              <div class="reply-comment-box" v-for="(childs,csIndex) in comment.blogCommentList" :key="csIndex">
                <div class="app-row-start-left">
                  <img class="comment-avatar" :src="childs.avatarUrl" />
                  <div class="app-column-start-left">
                    <div>
                      <span class="comment-name">{{childs.name}}</span>
                      <span v-if="comment.id == childs.parentId" class="comment-floor">回复 {{comment.name}}</span>
                    </div>
                    <div>
                      <span class="comment-time">{{childs.createTime}}</span>
                    </div>
                  </div>
                </div>
                <div class="comment-content-box">
                  <span>{{childs.content}}</span>
                </div>
              </div>
              <!--回复按钮-->
              <div style="height:30px;" class="app-row-end-right">
                <span class="reply-comment-btn" @click="showReply(cIndex)">回复 TA</span>
              </div>
              <!--回复评论栏-->
              <div v-show="cIndex==i" class="reply-comment-item-box shadow">
                <div class="top-gap app-column-center-layout">
                  <el-input style="font-family:'微软雅黑';" type="textarea" :rows="3" :placeholder="'回复: ' + comment.name" v-model="replyContent"> </el-input>
                </div>
                <div class="top-gap app-row-end-right">
                  <el-button @click="reply(comment.id)" type="primary" size="mini">发表评论</el-button>
                </div>
              </div>
            </div>
            <!-- 分页栏 -->
            <div style="margin-top:20px;" class="app-column-center-layout">
              <el-pagination 
                @current-change="handleCurrentChange"
                @prev-click="prevClick"
                @next-click="nextClick" 
                small 
                layout="prev, pager, next" 
                :total="page.total">
              </el-pagination>
            </div>
          </div>
          <div class="send-comment-box shadow">
            <span class="base-title">发表评论:</span>
            <form id="submitForm">
              <div class="top-gap app-column-center-layout">
                <el-input style="font-family:微软雅黑;" type="textarea" :rows="4" placeholder="请留下你的神评妙语..." v-model="content"> </el-input>
              </div>
              <div class="top-gap app-row-end-right">
                <el-button @click="send()" type="primary" size="mini">发表评论</el-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../api/blog/article.js'
import { postComment,getCommentList } from '../api/blog/comment.js'
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
      //打赏栏
      centerDialogVisible: false,
      //分享
      activeNames: ['1'],
      name:'',
      avatarUrl:'',
      email:'',
      content:'',
      replyName:'',
      replyAvatarUrl:'',
      replyEmail:'',
      replyContent:'',
      parentId:'',
      show: false,
      article: {},
      commentList:[],
      page:{},
      i: -1,
      timer: null,
      contentStatus:false,  
      curHeight:0,
      bodyHeight:400,
      size: 10,
      ftit: '', // 分享出去得文章得标题
      flink: '' // 分享出去logo
    }
  },
  
  //监听路由是否变化并进行跳转
  watch: {
    '$route' (to) { 
      this.$router.go(to)
    }
  },

  mounted () {
    setTimeout(()=>{
      this.contentToggle();
    },700)
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  //页面加载时
  created() {
    var id = this.$route.params.id
    var form = {
      id: id,
      current: 0,
      size: this.size
    }
    this.getArticle(id)
    this.getCommentList(form)
  },
  //页面离开时销毁
  beforeDestroy() {
    this.show = false
  },
  methods: {
    //分享
    handleChange(val) {
      console.log(val);
    },

    //加载全部
    contentToggle(){
        this.curHeight = this.$refs.bodyFont.offsetHeight;
        if(this.curHeight > this.bodyHeight){
          this.contentStatus = true;
        }else{
          this.contentStatus = false;
        }
      },

    //获取文章信息
    getArticle(id) {
      getArticle(id).then((res) => {
        this.article = res.data
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

    //发表评论
    send(){
      const userinfo = localStorage.getItem('userinfo')
      if(userinfo){
        var user = JSON.parse(userinfo)
        if(user.nickname != "" && this.content != ""){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          console.log(user.avatar_url)

          var form = {
            name: user.nickname,
            email: user.email,
            avatarUrl: user.avatar,
            content: this.content,
            articleId: this.$route.params.id,
            parentId: 0
          }
          postComment(form).then((res) => {
            if(res.code == 0){
              this.successPop(res.msg)
            } else {
              this.errorPop(res)
            }
            clearTimeout(this.timer);       //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
              this.reload()
              loading.close();
            },1500);
          })
        } else if(this.content == ""){
          this.$message.error('请留下你的神评妙语!')
        }
      } else {
        this.$message.error('请登录!')
      }
    },

    //显示回复栏
    showReply(cIndex){
      this.i = cIndex
    },

    //回复评论
    reply(id){
      const userinfo = localStorage.getItem('userinfo')
      if(userinfo){
        var user = JSON.parse(userinfo)
        if(user.nickname != "" && this.replyContent != ""){
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

          var form = {
            name: user.nickname,
            email: user.email,
            avatarUrl: user.avatar,
            content: this.replyContent,
            articleId: this.$route.params.id,
            parentId: id
          }
          postComment(form).then((res) => {
            if(res.code == 0){
              this.successPop(res.msg)
            } else {
              this.errorPop(res)
            }
            clearTimeout(this.timer);       //清除延迟执行
            this.timer = setTimeout(()=>{   //设置延迟执行
              this.reload()
              loading.close();
              this.i = -1
            },1500);
          })
        } else if(this.replyContent == ""){
          this.$message.error('请留下你的神评妙语!')
        }
      } else {
        this.$message.error('请登录!')
      }
    },

    //获取评论数据列表
    getCommentList(form){
      getCommentList(form).then((res) => {
        this.page = res.data
        this.commentList = res.data.records
        //console.log('评论列表: ' + JSON.stringify(res.data))
      })
    },

    //分页--页数发生改变时
    handleCurrentChange(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //上一页
    prevClick(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //下一页
    nextClick(val){
      var form = {
        id: this.$route.params.id,
        current: val,
        size: this.size
      }
      //重新查询评论列表数据
      getCommentList(form).then((res) => {
        this.commentList = res.data.records
      })
    },

    //分享
    share(type){
      var ftit = this.article.title;  // 分享出去得文章得标题
      var flink = this.article.img;   // 分享出去logo
      var summary = this.article.summary
      console.log('当前网站: ' + ftit)
      if(type === 'qq'){
        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(document.location)+'?sharesource=qzone&title='+ftit+'&pics='+flink+'&summary='+summary+'&desc='+'');
      } else if(type === 'qq-zone'){
        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location)+'&sharesource=qzone&title='+ftit+'&desc='+flink+'&summary='+summary+'&site='+'');
      } else if(type === 'weibo'){
        window.open('http://service.weibo.com/share/share.php?url='+encodeURIComponent(document.location)+'?sharesource=weibo&title='+ftit+'&pic='+flink+'&appkey=3825954717');
      } 
    },

    //成功侧移弹框
    successPop(res){
      this.$notify({
        title: '成功',
        message: res,
        type: 'success',
        showClose: false,
        position: 'bottom-right'
      });
    },

    //失败侧移弹框
    errorPop(res){
      this.$notify({
        title: '警告',
        message: res.msg || res,
        type: 'warning',
        showClose: false,
        position: 'bottom-right'
      });
    }
  }
}
</script>

<!-- 样式 -->
<style scoped>
  /* 加载全部 */
  .bodyFont{
    color: #3C3D3D;
    font-size: 12px;
    text-align: left;
    word-break:break-all;
    word-wrap:break-word;
    padding-bottom: 30px;
    overflow: hidden;
    max-height: 100%;
  }
  .bodyHeight{
    height: 407px;
  }
  .contentToggle{
    line-height: 35px;
    text-align: center;
    background: #fff;
    color: #E80808;
    border:1px solid #E80808;
    border-radius: 5px;
    margin: 0px 20px 20px 20px;
    cursor:pointer;
  }
  
  /* 富文本样式 */
  .center-left-item-box >>> h1, h2, h3, h4 {
    color: #111111;
    font-weight: 400;
    margin-top: 1em;
  }

  .center-left-item-box >>> h1, h2, h3, h4, h5 {
    font-family: Georgia, Palatino, serif;
  }
  .center-left-item-box >>> h1, h2, h3, h4, h5, dl{
    margin-bottom: 16px;
    padding: 0;
  }
  .center-left-item-box >>> p {
    margin: 8px 0;
  }
  .center-left-item-box >>> h1 {
    font-size: 48px;
    line-height: 54px;
  }
  .center-left-item-box >>> h2 {
    font-size: 28px;
    line-height: 42px;
  }
  .center-left-item-box >>> h3 {
    font-size: 22px;
    line-height: 30px;
  }
  .center-left-item-box >>> h4 {
    font-size: 18px;
    line-height: 26px;
  }
  .center-left-item-box >>> h5 {
    font-size: 14px;
    list-style: 23px;
  }
  .center-left-item-box >>> a {
    color: #0099ff;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  .center-left-item-box >>> a:hover {
    text-decoration: none;
    color: #78abf7;
  }
  .center-left-item-box >>> ol {
    padding: 0;
    padding-left: 24px;
    margin: 0;
  }
  .center-left-item-box >>> ul {
    padding: 0;
    padding-left: 24px;
    margin: 0;
  }
  .center-left-item-box >>> li {
      line-height: 24px;
  }
  .center-left-item-box >>> p, ul, ol {
      font-size: 14px;
      line-height: 24px;
  }

  .center-left-item-box >>> ol ol, ul ol {
      list-style-type: lower-roman;
  }
  
  .center-left-item-box >>> code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      line-height: 1.5;
      font-size: 13px;
  }

  .center-left-item-box >>> code, pre {
      border-radius: 3px;
      background-color:#f7f7f7;
      color: inherit;
  }
  
  .center-left-item-box >>> code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      margin: 0 2px;
  }
  
  .center-left-item-box >>> pre {
    line-height: 1.7em;
    overflow: overlay;
    padding: 6px 10px;
    background: #F5F5F5;
    border: 1px solid #CCCCCC
  }

  .center-left-item-box >>> pre > code {
    border: 0;
    display: inline;
    max-width: initial;
    padding: 0;
    margin: 0;
    overflow: overlay;
    line-height: inherit;
    font-size: .85em;
    white-space: pre;
    background: 0 0;
  }

  .center-left-item-box >>> code {
      color: #666555;
  }
  .center-left-item-box >>> aside {
      display: block;
      float: right;
      width: 390px;
  }
  .center-left-item-box >>> blockquote {
      border-left:.5em solid #eee;
      padding: 0 0 0 2em;
      margin-left:0;
  }
  .center-left-item-box >>> blockquote  cite {
      font-size:14px;
      line-height:20px;
      color:#bfbfbf;
  }
  .center-left-item-box >>> blockquote cite:before {
      content: '\2014 \00A0';
  }

  .center-left-item-box >>> blockquote p {
      color: #666;
  }
  .center-left-item-box >>> hr {
      text-align: left;
      color: #999;
      height: 2px;
      padding: 0;
      margin: 16px 0;
      background-color: #e7e7e7;
      border: 0 none;
  }

  .center-left-item-box >>> dl {
      padding: 0;
  }

  .center-left-item-box >>> dl dt {
      padding: 10px 0;
      margin-top: 16px;
      font-size: 1em;
      font-style: italic;
      font-weight: bold;
  }

  .center-left-item-box >>> dl dd {
      padding: 0 16px;
      margin-bottom: 16px;
  }

  .center-left-item-box >>> dd {
      margin-left: 0;
  }

  .center-left-item-box >>> button,
  input,
  select,
  textarea {
      font-size: 100%;
      margin: 0;
      vertical-align: baseline;
      *vertical-align: middle;
  }
  .center-left-item-box >>> button, input {
      line-height: normal;
      *overflow: visible;
  }
  .center-left-item-box >>> button::-moz-focus-inner, input::-moz-focus-inner {
      border: 0;
      padding: 0;
  }
  .center-left-item-box >>> button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
      cursor: pointer;
      -webkit-appearance: button;
  }
  .center-left-item-box >>> input[type=checkbox], input[type=radio] {
      cursor: pointer;
  }
  /* override default chrome & firefox settings */
  .center-left-item-box >>> input:not([type="image"]), textarea {
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }

  .center-left-item-box >>> input[type="search"] {
      -webkit-appearance: textfield;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
  }
  .center-left-item-box >>> input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
  }
  .center-left-item-box >>> label,
  input,
  select,
  textarea {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: normal;
      line-height: normal;
      margin-bottom: 18px;
  }
  .center-left-item-box >>> input[type=checkbox], input[type=radio] {
      cursor: pointer;
      margin-bottom: 0;
  }
  .center-left-item-box >>> input[type=text],
  input[type=password],
  textarea,
  select {
      display: inline-block;
      width: 210px;
      padding: 4px;
      font-size: 13px;
      font-weight: normal;
      line-height: 18px;
      height: 18px;
      color: #808080;
      border: 1px solid #ccc;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
  }
  .center-left-item-box >>> select, input[type=file] {
      height: 27px;
      line-height: 27px;
  }
  .center-left-item-box >>> textarea {
      height: auto;
  }
  /* grey out placeholders */
  .center-left-item-box >>> :-moz-placeholder {
      color: #bfbfbf;
  }
  .center-left-item-box >>> ::-webkit-input-placeholder {
      color: #bfbfbf;
  }
  .center-left-item-box >>> input[type=text],
  input[type=password],
  select,
  textarea {
      -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
      -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
      transition: border linear 0.2s, box-shadow linear 0.2s;
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .center-left-item-box >>> input[type=text]:focus, input[type=password]:focus, textarea:focus {
      outline: none;
      border-color: rgba(82, 168, 236, 0.8);
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
      -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
  }
  /* buttons */
  .center-left-item-box >>> button {
      display: inline-block;
      padding: 4px 14px;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 18px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      background-color: #0064cd;
      background-repeat: repeat-x;
      background-image: -khtml-gradient(linear, left top, left bottom, from(#049cdb), to(#0064cd));
      background-image: -moz-linear-gradient(top, #049cdb, #0064cd);
      background-image: -ms-linear-gradient(top, #049cdb, #0064cd);
      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #049cdb), color-stop(100%, #0064cd));
      background-image: -webkit-linear-gradient(top, #049cdb, #0064cd);
      background-image: -o-linear-gradient(top, #049cdb, #0064cd);
      background-image: linear-gradient(top, #049cdb, #0064cd);
      color: #fff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
      border: 1px solid #004b9a;
      border-bottom-color: #003f81;
      -webkit-transition: 0.1s linear all;
      -moz-transition: 0.1s linear all;
      transition: 0.1s linear all;
      border-color: #0064cd #0064cd #003f81;
      border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  }
  .center-left-item-box >>> button:hover {
      color: #fff;
      background-position: 0 -15px;
      text-decoration: none;
  }
  .center-left-item-box >>> button:active {
      -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
      -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .center-left-item-box >>> button::-moz-focus-inner {
      padding: 0;
      border: 0;
  }
  .center-left-item-box >>> table {
      *border-collapse: collapse; /* IE7 and lower */
      border-spacing: 0;
      width: 100%;
  }
  .center-left-item-box >>> table {
      border: solid #ccc 1px;
      -moz-border-radius: 6px;
      -webkit-border-radius: 6px;
      border-radius: 6px;
      /*-webkit-box-shadow: 0 1px 1px #ccc;
      -moz-box-shadow: 0 1px 1px #ccc;
      box-shadow: 0 1px 1px #ccc;   */
  }
  .center-left-item-box >>> table tr:hover {
      background: #fbf8e9;
      -o-transition: all 0.1s ease-in-out;
      -webkit-transition: all 0.1s ease-in-out;
      -moz-transition: all 0.1s ease-in-out;
      -ms-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
  }
  .center-left-item-box >>> table td, .table th {
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      padding: 10px;
      text-align: left;
  }

  .center-left-item-box >>> table th {
      background-color: #dce9f9;
      background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
      background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
      background-image:    -moz-linear-gradient(top, #ebf3fc, #dce9f9);
      background-image:     -ms-linear-gradient(top, #ebf3fc, #dce9f9);
      background-image:      -o-linear-gradient(top, #ebf3fc, #dce9f9);
      background-image:         linear-gradient(top, #ebf3fc, #dce9f9);
      /*-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
      -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
      box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;*/
      border-top: none;
      text-shadow: 0 1px 0 rgba(255,255,255,.5);
      padding: 5px;
  }

  .center-left-item-box >>> table td:first-child, table th:first-child {
      border-left: none;
  }

  .center-left-item-box >>> table th:first-child {
      -moz-border-radius: 6px 0 0 0;
      -webkit-border-radius: 6px 0 0 0;
      border-radius: 6px 0 0 0;
  }
  .center-left-item-box >>> table th:last-child {
      -moz-border-radius: 0 6px 0 0;
      -webkit-border-radius: 0 6px 0 0;
      border-radius: 0 6px 0 0;
  }
  .center-left-item-box >>> table th:only-child{
      -moz-border-radius: 6px 6px 0 0;
      -webkit-border-radius: 6px 6px 0 0;
      border-radius: 6px 6px 0 0;
  }
  .center-left-item-box >>> table tr:last-child td:first-child {
      -moz-border-radius: 0 0 0 6px;
      -webkit-border-radius: 0 0 0 6px;
      border-radius: 0 0 0 6px;
  }
  .center-left-item-box >>> table tr:last-child td:last-child {
      -moz-border-radius: 0 0 6px 0;
      -webkit-border-radius: 0 0 6px 0;
      border-radius: 0 0 6px 0;
  }
</style>
