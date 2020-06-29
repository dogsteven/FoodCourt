
import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '../views/sign-in'
import SignUpView from '../views/sign-up'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignInView
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUpView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/menu')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/cart')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "notifications" */ '../views/order')
  },
  {
    path: '/detail',
    name: 'Order',
    component: () => import(/* webpackChunkName: "profile" */ '../views/detail')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile')
  },
  //{
  //  path: '/item-detail/:id',
  //  name: 'Item Detail',
  //  component: () => import(/* webpackChunkName: "item-detail" */ '../views/menu/item-detail.vue')
  //}
  {
    path: '*',
    redirect: '/menu'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let publicPaths = ['/sign-in', '/sign-up']
  let isSignedIn = localStorage.getItem('customer') !== null
  let isAtPublicPath = publicPaths.includes(to.path)
  if (isAtPublicPath && isSignedIn)
    next({ path: '/menu' })
  else if (!isAtPublicPath && !isSignedIn)
    next({ path: '/sign-in' })
  else
    next()
})

export default router