import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/middleware/AuthMiddleware'

import LoginView from '@/views/auth/LoginView.vue'

import DevisView       from '@/views/dashboard/DevisView.vue'
import DevisCreateView from '@/views/dashboard/devis/DevisCreateView.vue'
import DevisEditView   from '@/views/dashboard/devis/DevisEditView.vue'
import DevisShowView   from '@/views/dashboard/devis/DevisShowView.vue'
import DevisPrintView  from '@/views/dashboard/devis/DevisPrintView.vue'

import UsersView      from '@/views/dashboard/UsersView.vue'
import UserCreateView from '@/views/dashboard/users/UserCreateView.vue'
import UserEditView   from '@/views/dashboard/users/UserEditView.vue'
import UserShowView   from '@/views/dashboard/users/UserShowView.vue'

import CustomersView from '@/views/dashboard/CustomersView.vue'
import CreateView    from '@/views/dashboard/customers/CreateView.vue'
import EditView      from '@/views/dashboard/customers/EditView.vue'
import ShowView      from '@/views/dashboard/customers/ShowView.vue'

const routes = [
  {
    path: '/',
    redirect: '/devis',
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true, title: 'Login' },
  },

  // Quote routes
  {
    path: '/devis',
    name: 'devis.index',
    component: DevisView,
    meta: { requiresAuth: true, title: 'Quote management' },
  },
  {
    path: '/devis/create',
    name: 'devis.create',
    component: DevisCreateView,
    meta: { requiresAuth: true, title: 'New quote' },
  },
  {
    path: '/devis/:id',
    name: 'devis.show',
    component: DevisShowView,
    meta: { requiresAuth: true, title: 'Quote details' },
  },
  {
    path: '/devis/:id/edit',
    name: 'devis.edit',
    component: DevisEditView,
    meta: { requiresAuth: true, title: 'Edit quote' },
  },
  {
    path: '/devis/:id/print',
    name: 'devis.print',
    component: DevisPrintView,
    meta: { requiresAuth: true, title: 'Print quote' },
  },

  // Customer routes
  {
    path: '/customers',
    name: 'customers.index',
    component: CustomersView,
    meta: { requiresAuth: true, title: 'Customer management' },
  },
  {
    path: '/customers/create',
    name: 'customers.create',
    component: CreateView,
    meta: { requiresAuth: true, title: 'Add customer' },
  },
  {
    path: '/customers/:id',
    name: 'customers.show',
    component: ShowView,
    meta: { requiresAuth: true, title: 'Customer details' },
  },
  {
    path: '/customers/:id/edit',
    name: 'customers.edit',
    component: EditView,
    meta: { requiresAuth: true, title: 'Edit customer' },
  },

  // User routes
  {
    path: '/users',
    name: 'users.index',
    component: UsersView,
    meta: { requiresAuth: true, title: 'User management' },
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: UserCreateView,
    meta: { requiresAuth: true, title: 'Add user' },
  },
  {
    path: '/users/:id',
    name: 'users.show',
    component: UserShowView,
    meta: { requiresAuth: true, title: 'User details' },
  },
  {
    path: '/users/:id/edit',
    name: 'users.edit',
    component: UserEditView,
    meta: { requiresAuth: true, title: 'Edit user' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = to.meta.title
    ? `${to.meta.title} — DeviseApp`
    : 'DeviseApp'
  return authMiddleware(to, from)
})

export default router
