import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import ServicesVue from '@/views/ServicesVue.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesVue,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, layout: 'crm' }, // <-- Marcamos esta ruta como no protegida
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView, // Temporalmente apunta a HomeView
      meta: { requiresAuth: true, layout: 'crm' }, // <-- Marcamos esta ruta como protegida
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
