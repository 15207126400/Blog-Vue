<!--回到顶部-->
<template>
    <transition name="el-fade-in">
        <div v-if="btnFlag" class="go-top-box app-column-center-layout" @click="backTop">
            <img class="go-top-img" src="../../assets/goTop.jpg">
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            btnFlag:false
        }
    },
    mounted () {
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
    },

    methods: {
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop () {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 15)
        },
    
        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 100) {
                that.btnFlag = true
            } else {
                that.btnFlag = false
            }
        }
    }
}
</script>
<style scoped lang="stylus">
    .go-top-box
        position fixed
        right 3%
        bottom 20%
        background #282828
        width 50px
        height 50px
        cursor pointer
        border-radius 5px
    .go-top-box:hover
        background #575555
    .go-top-img
        width 20px
        height 20px

@media screen and (max-width: 750px) 
    .go-top-box
        position fixed
        right 6%
        bottom 20%
        background #282828
        width 40px
        height 40px
        cursor pointer
        border-radius 5px
    .go-top-img
        width 15px
        height 15px
</style>