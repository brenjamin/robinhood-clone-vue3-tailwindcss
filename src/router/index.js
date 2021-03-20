import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import SignupFreeStock from '@/views/auth/SignupFreeStock'
import Dashboard from '@/views/Dashboard'
import SingleStock from '@/components/dashboard/SingleStock'
import RandomStock from '@/components/dashboard/RandomStock'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signup-free-stock',
    name: 'SignupFreeStock',
    component: SignupFreeStock
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'stocks/:symbol',
        name: 'SingleStock',
        component: SingleStock,
        props: true
      },
      {
        path: '',
        name: 'RandomStock',
        component: RandomStock
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
