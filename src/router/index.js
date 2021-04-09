import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import HomePage from '../views/app/HomePage.vue'
import Login from '../views/login/Login.vue'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// guard for proper router movement
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //when heading to any with requiresAuth: true in meta
    if (!store.getters.loggedIn) {
      //if not logged in login pushed
      next({ name: 'Login' })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    //when heading to any with requiresVisitor: true in meta
    if (store.getters.loggedIn) {
      //if logged in homepage pushed
      next({ name: 'HomePage' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
