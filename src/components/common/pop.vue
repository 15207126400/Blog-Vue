<!--菜单-->
<template>
    <div id="menu">
      <transition name="el-fade-in-linear">
        <div @click="drawer=true" class="menu-btn">
          <i style="color:#eee;" class="el-icon-s-unfold"></i>
          <span class="menu-font" style="color:#fff;font-size:12px;">MENU</span>
        </div>
      </transition>

      <el-drawer title="右侧菜单" size="100px"
        :visible.sync="drawer" 
        :with-header="false">
          <ul class="menu-box app-column-start-layout">
            <div class="menu-avg-box app-column-center-layout">
              <img class="menu-avg" src="../../assets/avg.jpg" />
            </div>
            
            <div style="height:400px;;width:100%;" class="app-column-between-layout">
              <router-link class="menu-router-box" to="/">
                <div class="app-column-center-layout">
                  <i class="el-icon-house"></i>
                  <li>主页</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/articleList">
                <div class="app-column-center-layout">
                  <i class="el-icon-reading"></i>
                  <li>博客</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/about">
                <div class="app-column-center-layout">
                  <i class="el-icon-user"></i>
                  <li>关于</li>
                </div>
              </router-link>
              <router-link class="menu-router-box" to="/links">
                <div class="app-column-center-layout">
                  <i class="el-icon-link"></i>
                  <li>友链</li>
                </div>
              </router-link>
              <div v-if="flag==1" @click="loginOut()" style="margin-top:200px;cursor:pointer" class="app-column-center-layout">
                <li><img style="width:35px;border-radius:50%;" :src="userinfo.avatar_url" /></li>
                <li style="font-size:12px;color:#15800E;margin-top:10px;font-weight:bold;">用户: {{userinfo.name}}</li>
              </div>
              <div v-else @click="login()" style="margin-top:200px;cursor:pointer" class="app-column-center-layout">
                <li><img style="width:35px;border-radius:50%;" src="../../assets/github.jpg" /></li>
                <li style="font-size:12px;color:#999999;margin-top:10px;">github登录</li>
              </div>
            </div>
          </ul>
      </el-drawer>
    </div>
</template>


<script>

  export default {
    data() {
      return {
        drawer: false,
        userinfo: {},
        flag: 0
      };
    },
    //监听路由变化
    watch: {
      '$route': 'changeDrawer'
    },

    created(){
      console.log("userinfo: " + localStorage.getItem("userinfo"))
      var userinfo = localStorage.getItem("userinfo")
      if(userinfo && userinfo != null){
        this.userinfo = JSON.parse(userinfo)
        this.flag = 1
      } else {
        this.userinfo = {}
        this.flag = 0
      }
    },
    methods: {
      //登录
      login(){
        //保存当前页面路由
        localStorage.setItem("currentRoute",this.$route.path)
        //github请求code
        const url = 'http://www.github.com/login/oauth/authorize?client_id=6f44473f8efbb96f16fc&redirect_uri=http://blog.ivan.group/loginCallback'
        //路径跳转
        window.location.href = url
      },

      //登出
      loginOut(){
        const h = this.$createElement;
        this.$msgbox({
          title: '操作提示',
          message: h('p', null, [
            h('span', null, '确定要退出吗?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              console.log('退出')
              localStorage.removeItem("userinfo")
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '正在注销...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  location.reload()
                }, 1000);
              }, 1500);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            center: true,
            message: this.userinfo.name + ', 退出成功!'
          });
        });
      },

      //关闭菜单
      changeDrawer(){
        clearTimeout(this.timer);         //清除延迟执行
          this.timer = setTimeout(()=>{   //设置延迟执行
          this.drawer = false
        },100);
      }
    }
  };
</script>

<style scoped lang="stylus">
  li
    color #000
    margin-top 5px
    text-shadow 0 3px 6px rgba(0,0,0,0.2)
  i 
    color #000
  a
    text-decoration none
  a hover
    text-decoration none
  .menu-btn
    position absolute
    right 20px
    top 20px
    z-index 30
    padding 12px 15px 12px 15px
    border 1px solid rgba(255,255,255,0.6)
    background #333333
    cursor pointer
  .menu-box
    height 100%
    list-style none
    font-size 14px
  .menu-avg-box
    height 150px
  .menu-avg
    width 30px
    height 30px
    border 2px solid #1E1E1E
    padding 5px
    border-radius 50%
    margin 0px 10px 0px 10px
  .menu-avg:hover
    animation rotate 3s linear infinite
  .menu-router-box
    text-decoration none
    width 100%
    padding 20px 0px 20px 0px
  .menu-router-box:hover 
    background #eee
    
@media screen and (max-width: 750px)
  .menu-avg-box
    height 100px
  .menu-btn
    position absolute
    right 0px
    top 20px
    z-index 30
    padding 12px 15px 12px 15px
    border 1px solid rgba(255,255,255,0.6)
    background #333333
    cursor pointer
</style>

<style>
  .el-message-box__wrapper{
    bottom: 150px!important;
  }
  @media screen and (max-width: 750px) {
    .el-message-box {
      width: 250px!important;
    }
  }
  
</style>