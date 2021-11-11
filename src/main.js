import Vue from 'vue'
import App from './App.vue'
import './static/css/common.css'
import './static/css/article.css'
import './static/css/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import router from './router'

//折叠展开
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

