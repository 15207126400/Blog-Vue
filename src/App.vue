<template>
    <div>
      <cube></cube>
      <pop v-show="!(path==='/')"></pop>
      <top v-show="!(path==='/')"></top>
      <router-view v-if="isRouterAlive"></router-view>
      <bottom v-show="!(path==='/')"></bottom>
      <go-top></go-top>
    </div>
</template>

<script>
import cube from './components/common/cube.vue'
import pop from './components/common/pop.vue'
import top from './components/common/top.vue'
import bottom from './components/common/bottom.vue'
import goTop from './components/common/goTop.vue'
export default {
  name: 'app',
  data(){
    return{
      path:'',
      isRouterAlive: true
    }
  },
  components: {
    'cube':cube,
    'pop':pop,
    'top':top,
    'bottom':bottom,
    'go-top':goTop
    
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  // 判断路由
  mounted() {
    this.path = this.$route.path;
    // console.log(this.$route.path)
  },
  watch:{
    $route(to,from){
      this.path = to.path
    }
  }
}
</script>

<style>
body{
  margin: 0px;
}

</style>
