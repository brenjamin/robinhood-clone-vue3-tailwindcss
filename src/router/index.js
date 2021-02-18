import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import SignUp from '@/views/auth/SignUp'

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
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
