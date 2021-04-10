import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/app/HomePage.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        //za login force
        requiresAuth: false
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router