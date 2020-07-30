import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInUp from '../views/sign-in-up'
import Menu from '../views/menu'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in-up',
    name: 'Đăng nhập',
    component: SignInUp
  },
  {
    path: '/menu',
    name: 'Thực đơn',
    component: Menu
  },
  {
    path: '/cart',
    name: 'Giỏ hàng',
    component: () => import(/* webpackChunkName: "cart-view" */ "../views/cart")
  },
  {
    path: '/order',
    name: 'Đơn hàng',
    component: () => import(/* webpackChunkName: "profile-view" */ "../views/order")
  },
  {
    path: '/profile',
    name: 'Thông tin',
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
