/* 路由器模块 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import mapShow from '../views/MapShow.vue'
// import register from '../views/register.vue'
// import admin from  '../views/admin'

Vue.use(VueRouter)

export default new VueRouter({
  // n个路由
  routes:[
    // {
    //   path:'/admin',
    //   name:'admin',
    //   component:admin,
    //   props: { default: true, sidebar: false },
    //   params:''
    // },
    {
      path:'/mapshow',
      component:mapShow,
    },
    // {
    //   path:'/register',
    //   component:register,
    //   meta:{
    //     login:true,
    //     normal:false,
    //     poor:false,
    //     admin:false
    //   }
    // },
    {
      path:'/',
      redirect:'/mapshow'
    },
  ]
})
