import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login'
// @ -> src/
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Right from '@/components/rights/right'
import Role from '@/components/rights/role'
import Goodslist from '@/components/goods/goodslist'
import Goodsadd from '@/components/goods/goodsadd'
import Cateparams from '@/components/goods/cateparams'
import Goodscate from '@/components/goods/goodscate'
import Order from '@/components/order/order'
import Report from '@/components/reports/reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'rights',
          path: 'rights',
          component: Right
        },
        {
          name: 'roles',
          path: 'roles',
          component: Role
        },
        {
          name: 'goods',
          path: 'goods',
          component: Goodslist
        },
        {
          name: 'goodsadd',
          path: 'add',
          component: Goodsadd
        },
        {
          name: 'cateparams',
          path: 'params',
          component: Cateparams
        },
        {
          name: 'goodscate',
          path: 'categories',
          component: Goodscate
        },
        {
          name: 'order',
          path: 'orders',
          component: Order
        },
        {
          name: 'reports',
          path: 'reports',
          component: Report
        }
      ]
    }
  ]
})
