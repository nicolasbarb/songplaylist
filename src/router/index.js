import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artiste',
    name: 'Artiste',
    component: () => import(/* webpackChunkName: "about" */ '../views/Artiste.vue')
  },

  {
    path: '/card',
    name: 'Card',
    component: () => import('../components/Card.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
