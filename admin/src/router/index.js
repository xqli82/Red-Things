import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import user from '@/views/user'
import device from '@/views/device'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/device',
    component: device,
    children: [
      { path: 'list', component: () => import('@/views/device/list.vue') },
      { path: 'add', component: () => import('@/views/device/add.vue') }
    ]
  },
  {
    path: '/user',
    component: user,
    children: [
      { path: 'list', component: () => import('@/views/user/list.vue') },
      { path: 'add', component: () => import('@/views/user/add.vue') },
      { path: 'group', component: () => import('@/views/user/group.vue') },
    ]
  },
  {
    path: '/red',
    component: () => import('@/views/red.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard.vue')
  },
  {
    path: '/v5w',
    component: () => import('@/views/v5w.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
