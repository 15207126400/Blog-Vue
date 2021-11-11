<template>
  <div>
    <div v-for="(item, index) in replies" style="margin-top: 20px" :key="index">
      <div
        @mouseout="showCommentButton(0,item.id)"
        @mouseover="showCommentButton(1, item.id)">
        <span>
          <a-avatar title="模拟用户头像" type="user" style="padding-right: 3px; text-align: center">{{ item.commentator }}</a-avatar>
          {{ item.commentator }}：
        </span>
        <span style="color: lightgrey">回复 {{who}}</span>
        <span title="回复内容">{{ item.content }}</span>
        <span style="padding-left: 10px; color: lightgrey">({{ item.createTime }} &nbsp; #{{index + 1}}楼)</span>
        <span
          :id="item.id"
          style="margin-left: 5px; display: none"
        >
        <a @click="replying(item, index)" style="color: #3a87ad;  font-size: smaller;">回复</a>
        <span v-if="item.reply.length !== 0">
          <a-divider type="vertical"/>
          <a title="查看回复" :id="item.id + 'e'" @click="checkingReply(1, item.id)" style="color: #3a87ad;  font-size: smaller;">
            查看回复 ({{item.reply.length}})
          </a>
          <a itle="收起回复" :id="item.id + 'c'" @click="checkingReply(2, item.id)"
             style="color: #3a87ad;  font-size: smaller; display: none">收起回复</a>
        </span>
      </span>
      </div>
      <!-- 下面是孙子组件, 也就是该组件自己, 它可以实现递归回复 -->
      <reply
        title="孙组件"
        :class="item.id + 'r'"
        @listenToChild="getDataFromChild"
        style="margin: 0 0 0 20px; border-left: double 4px darkgray; padding-right: 3px; display: none"
        :who="item.commentator"
        :replies="item.reply">
      </reply>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'reply',
  data () {
    return {
      comment: {},
      index: undefined
    }
  },
  props: {
    replies: Array,
    who: String
  },
  mounted () {
  },
  methods: {
    // 显示回复可操作按钮
    showCommentButton (code, id) {
      if (code === 0) {
        $(function () {
          console.log(id)
          $('#' + id).hide()
        })
      } else {
        $(function () {
          $('#' + id).show()
        })
      }
    },
    // 查看回复
    checkingReply (code, id) {
      if (code === 1) {
        $(function () {
          $('#' + id + 'e').hide()
          $('#' + id + 'c').show()
          $('.' + id + 'r').show()
        })
      } else {
        $('#' + id + 'e').show()
        $('#' + id + 'c').hide()
        $('.' + id + 'r').hide()
      }
    },
    // 回复
    replying (item, index) {
      let _this = this
      // _this.$emit('isResponsible', true)
      _this.$emit('listenToChild', item, index)
    },
    // 父子组件通信的方法
    getDataFromChild (item, index) {
      let _this = this
      _this.isResponsible = true
      _this.placeholder = '回复：' + item.commentator + '：' + item.content
      _this.replying(item, index)
    }
  }
}
</script>
 
<style scoped>
 
</style>