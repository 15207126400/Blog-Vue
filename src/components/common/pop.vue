<!--菜单-->
<template>
    <div id="menu">
      <transition name="el-fade-in-linear">
        <!-- <div @click="drawer=true" class="menu-btn">
          <i style="color:#eee;" class="el-icon-s-unfold"></i>
          <span class="menu-font" style="color:#fff;font-size:12px;">MENU</span>
        </div> -->
        <!--特效-->
        <div id="memnu-box" class="menu-btn" @click="drawer=true"> 
          <span style="color:#fff;font-size:12px;font-weight:bold;">MENU</span> 
          <div class="icon icon1"></div>    
          <div class="icon icon2"></div>
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
              <div v-if="flag==1" style="margin-top:150px;cursor:pointer">
                <!--兼容默认头像-->
                <div @click="dialogForUserinfo = true" class="app-column-center-layout">
                  <li>
                    <img style="width:40px;height:40px;border-radius:50%;" :src="userinfo.avatar" />
                  </li>
                  <li style="font-size:12px;color:#15800E;margin-top:10px;font-weight:bold;">用户: {{userinfo.nickname}}</li>
                </div>
                
                <!--注销-->
                <div class="app-column-center-layout">
                  <el-button @click="loginOut()" style="margin-top:10px;height:25px;" type="primary" size="mini">注销</el-button>
                </div>
              </div>

              <!--登录弹窗-->
              <div v-else style="margin-top:150px;cursor:pointer" class="app-column-center-layout">
                <el-button type="text" @click="dialogForLogin = true">
                  <li style="display:inline-block;width:40px;height:40px;border-radius:50%;background:#C0C4CC;line-height:40px;color:#fff;">空</li>
                  <li style="font-size:12px;color:#99999A;margin-top:10px;">未登录</li>
                </el-button>
              </div>
            </div>
          </ul>
      </el-drawer>

      <!--登录窗口-->
      <el-dialog
        title="" 
        width="350px" 
        :show-close=false
        :visible.sync="dialogForLogin"
        center>
        <div class="app-column-center-layout">
          <div class="app-column-center-layout">
            <h1 id="login-title" style="font-family:Arial,Helvetica,sans-serif;vertical-align:middle;font-weight:blog;">Blog Login</h1>
          </div>
          <div style="margin-top:30px;width:280px;" class="app-row-between-layout">
            <el-input prefix-icon="el-icon-message" placeholder="e-maill" v-model="username" size="medium" clearable />
          </div>
          <div style="margin-top:15px;width:280px;" class="app-row-between-layout">
            <el-input prefix-icon="el-icon-lock" placeholder="password" v-model="password" size="medium" show-password />
          </div>
          <div class="app-row-end-right">
              <el-button @click="dialogForUserinfo = true" style="padding-left:150px;" type="text" size="mini">快速注册</el-button>
          </div>
          <el-button @click="loginForUsername(username, password)" style="margin:10px;width:230px;" type="primary" size="small">Login</el-button>
          </div>
          <el-divider></el-divider>
          <div @click="login()" style="margin-top:20px;cursor:pointer" class="app-column-center-layout">
            <img style="width:40px;height:40px;border-radius:50%;" src="../../assets/github.jpg" />
            <span style="font-size:12px;color:#C0C4CC;margin-top:10px;">Github登录</span>
          </div>
      </el-dialog>

      <!--用户信息窗口-->
      <el-dialog style="box-shadow:0 2px 12px 0 rgba(62, 63, 63, 0.3)" title="" width="350px" :visible.sync="dialogForUserinfo">
        <div class="app-column-center-layout">
          <!--头像-->
          <div style="width:100%;height:150px;background:linear-gradient(-125deg, #57bdbf, #2f9de2);" class="app-column-center-layout">
            <div class="app-column-center-layout">
              <div class="app-column-center-layout">
                <el-upload
                  class="avatar-uploader"
                  action="/api/blog/uploadAvatar"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  accept=".jpg,.jpeg,.png"
                >
                  <img
                    v-if="avatar"
                    :src="avatar"
                    style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid #BCBFC2;"
                    class="avatar"
                  />
                  <img
                    v-else
                    style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid #BCBFC2;"
                    src="http://1.117.251.254:9000/system/default_avatar.png"
                  />
                </el-upload>
              </div>
            </div>
          </div>
          <!--邮箱-->
          <div
            style="
              display: -webkit-box;
              -webkit-box-align: center;
              margin-top: 20px;
            "
          >
            <div class="app-row-between-layout">
              <el-input v-if="userid"
                prefix-icon="el-icon-message"
                style="width:280px"
                v-model="username"
                @blur="changeEmail(username)"
                :disabled="true"
                size="medium"
                clearable
              />
              <el-input v-else
                prefix-icon="el-icon-message"
                style="width:280px"
                placeholder="e-mail"
                v-model="username"
                @blur="changeEmail(username)"
                size="medium"
                clearable
              />
            </div>
          </div>
          <div style="height:20px;width:280px" class="app-row-start-layout">
            <span
              v-show="emailFlag == true"
              style="color:#d23a32;font-size:12px"
              >{{ emailMessage }}</span
            >
          </div>
          <!--密码-->
          <div style="display: -webkit-box; -webkit-box-align: center">
            <el-input
              prefix-icon="el-icon-lock"
              style="width:280px"
              maxlength="20"
              placeholder="password"
              v-model="password"
              @blur="changePassword(password)"
              size="medium"
              show-password
            />
          </div>
          <div style="height:20px;width:280px" class="app-row-start-layout">
            <span
              v-show="passwordFlag == true"
              style="color:#d23a32;font-size:12px"
              >{{ passwordMessage }}</span
            >
          </div>
          <!--昵称-->
          <div style="display: -webkit-box; -webkit-box-align: center">
            <el-input
              prefix-icon="el-icon-link"
              style="width:280px"
              maxlength="20"
              placeholder="nickname"
              v-model="nickname"
              @blur="changeNickname(nickname)"
              size="medium"
              clearable
            />
          </div>
          <div style="height:20px;width:280px" class="app-row-start-layout">
            <span
              v-show="nicknameFlag == true"
              style="color:#d23a32;font-size:12px"
              >{{ nicknameMessage }}</span
            >
          </div>
          <el-button
            @click.native="registerOrUpdateAccount(username, password, nickname)"
            style="margin:35px 10px 10px 10px; width:250px;position:relative"
            type="primary"
            size="medium"
            >Submit</el-button
          >
        </div>
      </el-dialog>
    </div>
</template>


<script>
  import { loginForUsername, registerOrUpdateAccount } from '../../api/login/login.js'
  export default {
    data() {
      return {
        dialogForLogin: false,
        dialogForUserinfo: false,
        userinfo: {},
        userid: '',
        username: '',
        password: '',
        nickname: "",
        avatar: "",
        disabled: false,
        emailMessage: "",
        emailFlag: false,
        passwordMessage: "",
        passwordFlag: false,
        nicknameMessage: "",
        nicknameFlag: false,
        drawer: false,
        flag: 0
      };
    },
    //监听路由变化
    watch: {
      '$route': 'changeDrawer'
    },

    created(){
      var userinfoCache = localStorage.getItem("userinfo")
      var userinfo = JSON.parse(userinfoCache)
      if(userinfo != null){
        this.userinfo = userinfo
        this.userid = userinfo.id
        this.username = userinfo.username
        this.password = userinfo.password
        this.avatar = userinfo.avatar
        this.nickname = userinfo.nickname
        this.flag = 1
      } else {
        this.userinfo = {}
        this.flag = 0
      }
    },

    methods: {
      //Github登录
      login(){
        //保存当前页面路由
        localStorage.setItem("currentRoute",this.$route.path)
        //github请求code
        const url = 'http://www.github.com/login/oauth/authorize?client_id=6f44473f8efbb96f16fc&redirect_uri=http://blog.ivan.group/loginCallback'
        //路径跳转
        window.location.href = url
      },

      //账密登录
      loginForUsername(username, password){
          //关闭弹出层
          this.dialogForLogin = false
          //数据组装
          var form = {
            username: username,
            password: password
          }
        loginForUsername(form).then((res) => {
          if(res.code == 0){
            this.$message({
              type: 'success',
              center: true,
              message: '登录成功!'
            });
            //缓存用户信息
            var userinfo = res.data
            localStorage.setItem('userinfo',JSON.stringify(userinfo))
            this.userinfo = userinfo
            this.username = userinfo.username
            this.password = userinfo.password
            this.avatar = userinfo.avatar
            this.nickname = userinfo.nickname
            clearTimeout(this.timer);         //清除延迟执行
            this.timer = setTimeout(()=>{     //设置延迟执行
              location.reload()
            },500);
          } else {
            this.$message.error({
              center: true,
              message: res.msg
            });
          }
        })
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
              console.log('注销账号')
              localStorage.removeItem("userinfo")
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '正在注销...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  //跳转首页
                  this.$router.push('/articleList');
                  //刷新页面
                  location.reload()
                  instance.confirmButtonLoading = false;
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
            message: this.userinfo.nickname + ', 注销成功!'
          });
        });
      },

      //上传前操作
      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 > 1;
        if (isLt1M) {
          this.$message.error({
            center: true,
            message: "图片不允许超过1M大小",
          });
        } 
      },

      //上传成功后操作
      uploadSuccess(res) {
        console.log("服务器返回值===" + res.data);
        this.avatar = res.data;
      },

      //账号验证(邮箱格式)
      changeEmail: function (username) {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (username == "" || username == null) {
          this.emailMessage = "邮箱必须填写哦";
          this.emailFlag = true;
        } else if (!regEmail.test(username)) {
          this.emailMessage = "邮箱格式不符合规范";
          this.emailFlag = true;
        } else {
          this.emailFlag = false;
        }
      },

      //密码校验
      changePassword: function (password) {
        var num = 5;
        if (password.length <= num) {
          this.passwordMessage = "密码长度必须大于6位数";
          this.passwordFlag = true;
        } else {
          this.passwordFlag = false;
        }
      },

      //昵称校验
      changeNickname: function (nickname) {
        var regNickname = /[^\a-\z\A-\Z0-9\u4e00-\u9fe5_]/g;
        if (nickname == "" || nickname == null) {
          this.nicknameMessage = "昵称必须填写哦";
          this.nicknameFlag = true;
        } else if (regNickname.test(nickname)) {
          this.nicknameMessage = "昵称不可以包含特殊字符";
          this.nicknameFlag = true;
        } else {
          this.nicknameFlag = false;
        }
      },

      //提交请求
      registerOrUpdateAccount(username, password, nickname) {
        //非空判断
        if (username == "" || username == null) {
          this.emailMessage = "邮箱必须填写哦";
          this.emailFlag = true;
        }
        if (password == "" || password == null) {
          this.passwordMessage = "密码长度必须大于6位数";
          this.passwordFlag = true;
        }
        if (nickname == "" || nickname == null) {
          this.nicknameMessage = "昵称必须填写哦";
          this.nicknameFlag = true;
        }

        if (this.emailFlag == false && this.passwordFlag == false && this.nicknameFlag == false) {
          var form = {
            id: this.userid,
            username: username,
            password: password,
            nickname: nickname,
            avatar: this.avatar,
          };
          registerOrUpdateAccount(form).then((res) => {
            var that = this;
            if (res.code == 0) {
              this.$message({
                type: "success",
                center: true,
                message: "操作成功!",
              });
              //跳转回之前的路由路径
              var path = localStorage.getItem("currentRoute");
              //保存用户信息
              var userinfo = res.data
              localStorage.setItem("userinfo", JSON.stringify(userinfo));
              that.$router.push(path);
              clearTimeout(this.timer); //清除延迟执行
              that.timer = setTimeout(() => {
                //设置延迟执行
                that.dialogForUserinfo = false
                location.reload();
              }, 500);
            } else {
              that.$message.error({
                center: true,
                message: res.msg,
              });
            }
          });
        }
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
  #login-title
    background #EEE 
    text-shadow 5px -5px black, 4px -4px white
    font-weight bold
    -webkit-text-fill-color transparent
    -webkit-background-clip text
  .menu-btn
    position fixed
    right 0px
    top 25px
    z-index 30
    padding 6px 10px 6px 10px
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
    position fixed
    right 0px
    top 25px
    z-index 30
    padding 6px 10px 6px 10px
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