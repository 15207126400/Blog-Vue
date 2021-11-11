import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/index'

Vue.use(Router)

// 详情页
const article = (resolve) => {
  import('../components/article').then((module) => {
    resolve(module)
  })
}

//列表页
const articleList = (resolve) => {
  import('../components/articleList').then((module) => {
    resolve(module)
  })
}

//标签-文章列表页
const tags = (resolve) => {
  import('../components/tags').then((module) => {
    resolve(module)
  })
}

//关于我
const about = (resolve) => {
  import('../components/about').then((module) => {
    resolve(module)
  })
}

//友情链接
const links = (resolve) => {
  import('../components/links').then((module) => {
    resolve(module)
  })
}

//github回调界面
const loginCallback = (resolve) => {
  import('../components/github').then((module) => {
    resolve(module)
  })
}

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      name: 'article',
      path: '/article/:id',
      component: article,
      props: true
    },
    {
      name: 'articleList',
      path: '/articleList',
      component: articleList,
      props: true
    },
    {
      name: 'tags',
      path: '/tags/:id',
      component: tags,
      props: true
    },
    {
      name: 'about',
      path: '/about',
      component: about,
      props: true
    },
    {
      name: 'links',
      path: '/links',
      component: links,
      props: true
    },
    {
      name: 'loginCallback',
      path: '/loginCallback',
      component: loginCallback,
      props: true
    }
  ],
  mode: 'history',
  
  
  // 跳转页面回顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})