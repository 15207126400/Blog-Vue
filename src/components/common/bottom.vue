<!--底部部分-->
<template>
  <div class="bottom-box app-column-center-layout">
    <!--运行时长-->
    <div>
        <span class="footer__heart">❤️</span>{{ runningTime }}<span class="footer__heart">❤️</span>
    </div>  
    <label>
      鄂ICP备2021018502号
    </label>
    <!-- <label>
        Copyright © 2019 Ivan's Personal Blog
    </label> -->
  </div>
</template>

<script>
    export default {
        data() {
            return {
                runningTime: "",
            };
        },

        created() {
            this.showsectime();
        },

        methods: {
            showsectime() {
                var birthDay = this.NewDate("2019-10-01"); //博客注册时间
                var today = new Date();
                var timeold = today.getTime() - birthDay.getTime();
                var sectimeold = timeold / 1000;
                // var secondsold = Math.floor(sectimeold);
                var msPerDay = 24 * 60 * 60 * 1000;
                var e_daysold = timeold / msPerDay;
                var daysold = Math.floor(e_daysold);
                var e_hrsold = (daysold - e_daysold) * -24;
                var hrsold = Math.floor(e_hrsold);
                var e_minsold = (hrsold - e_hrsold) * -60;
                var minsold = Math.floor((hrsold - e_hrsold) * -60);
                var seconds = Math.floor((minsold - e_minsold) * -60).toString();
                this.runningTime =
                    "本站点运行时长：" +
                    daysold +
                    "天" +
                    hrsold +
                    "小时" +
                    minsold +
                    "分" +
                    seconds +
                    "秒";
                setTimeout(this.showsectime, 1000);
            },
            NewDate(str) {
                str = str.split("-");
                var date = new Date();
                date.setUTCFullYear(str[0], str[1] - 1, str[2]);
                date.setUTCHours(0, 0, 0, 0);
                return date;
            }
        },
    };
</script>