import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'
// import Login from '..//views/login/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      redirect:'/dashboard', //重定向
      component: Layout,
      //嵌套路由
      children:[
        {
          path:'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          //路由元信息
          meta:{
            title:'数据看板',
            icon:'HomeOutlined',
            index:"1"
          }
        },
        {
          path:'setting',
          component: () => import('../views/dashboard/setting.vue'),
          //路由元信息
          meta:{
            title:'角色管理',
            icon:'SettingOutlined',
            index:"2"
          }
        }
      ]
    }
  ]
})


export default router
