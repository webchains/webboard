import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import index from './views/Index.vue'
import register from './views/Register.vue'
import login from './views/Login.vue'
import errors from './views/Errors.vue'
import profile from './views/Profile.vue'
import post from './views/Post.vue'
import category from './views/Category.vue'
import categories from './views/Categories.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/post/:post',
      name: 'post',
      component: post
    },
    {
      path: '/categories',
      name: 'categories',
      component: categories
    },
    {
      path: '/catagories/:category',
      name: 'category',
      component: category
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: errors
    },
    {
      path: '*',
      name: 'error',
      redirect: { name: 'notfound' }
    }
  ]
})
