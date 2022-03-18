<template>
  <div>
    <!--中部-->
    <div id="backgroudColer" class="center app-column-center-layout shadow">
      <div style="margin-bottom:5%;" class="center-box">
        <!--友情链接--> 
        <div class="about-box">
          <div style="padding:20px;width:1100px;">
            <div class="link-title-box app-column-start-left">
              <span class="base-title">优质博客</span>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="http://angelive.fun" target="_blank">
                  <img class="link-img" src="../assets/link/angelive.jpg" />
                  Angelive
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://blog.yuanaaa.top/" target="_blank">
                  <img class="link-img" src="../assets/link/yuan.jpg" />
                  吴予安
                </a>
              </div>
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://www.wmyskxz.com/" target="_blank">
                  <img class="link-img" src="../assets/link/wmyskxz.jpg" />
                  三颗心脏
                </a>
              </div>
            </div>

            <div style="margin-top:50px;" class="link-title-box app-column-start-left">
              <span class="base-title">精品社区</span>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://www.csdn.net/" target="_blank">
                  <img class="link-img" src="../assets/link/csdn.jpg" />
                  CSDN-专业IT技术社区
                </a>
              </div>
            </div>

            <div style="margin-top:50px;" class="link-title-box app-column-start-left">
              <span class="base-title">推荐网站</span>
            </div>
            <div class="link-box">
              <div class="link-item-box app-column-center-layout">
                <a class="link-name app-column-center-layout" href="https://cn.vuejs.org/" target="_blank">
                  <img class="link-img" src="../assets/link/vue.jpg" />
                  Vue.js
                </a>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    msg: String
  },
  //变量定义
  data () {
    return {
      
    }
  },
  //页面加载时
  created() {
    
  },
  //页面离开时销毁
  beforeDestroy() {
    
  },
  methods: {

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
