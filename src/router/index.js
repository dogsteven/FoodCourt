import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInUp from '../views/sign-in-up'
import Menu from '../views/menu'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in-up',
    name: 'Sign In',
    component: SignInUp
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart-view" */ "../views/cart")
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile-view" */ "../views/profile")
  },
  {
    path: '*',
    redirect: '/sign-in-up'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isSignedIn = localStorage.getItem('customer') != null
  let isAtPublicPaths = to.path === '/sign-in-up'
  if (isAtPublicPaths && isSignedIn)
    next('/menu')
  else if (!isAtPublicPaths && !isSignedIn)
    next('/sign-in-up')
  else
    next()
})

export default router
