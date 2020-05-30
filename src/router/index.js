
import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '../views/SignIn'
import SignUpView from '../views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'Sign In',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUpView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/Cart')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import(/* webpackChunkName: "notifications" */ '../views/Notifications')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let publicPaths = ['/signin', '/signup']
  let isSignedIn = localStorage.getItem('account') !== null
  let isAtPublicPath = publicPaths.includes(to.path)
  if (isAtPublicPath && isSignedIn)
    next({ path: '/menu' })
  else if (!isAtPublicPath && !isSignedIn)
    next({ path: '/signin' })
  else
    next()
})

export default router