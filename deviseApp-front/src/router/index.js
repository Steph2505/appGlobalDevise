import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/middleware/AuthMiddleware'

import LoginView    from '@/views/auth/LoginView.vue'

import DeviseView       from '@/views/dashboard/DeviseView.vue'
import DeviseCreateView from '@/views/dashboard/devises/DeviseCreateView.vue'
import DeviseEditView   from '@/views/dashboard/devises/DeviseEditView.vue'
import DeviseShowView   from '@/views/dashboard/devises/DeviseShowView.vue'

import UsersView       from '@/views/dashboard/UsersView.vue'
import UserCreateView  from '@/views/dashboard/users/UserCreateView.vue'
import UserEditView    from '@/views/dashboard/users/UserEditView.vue'
import UserShowView    from '@/views/dashboard/users/UserShowView.vue'

import CustomersView       from '@/views/dashboard/CustomersView.vue'
import CreateView from '@/views/dashboard/customers/CreateView.vue'
import EditView   from '@/views/dashboard/customers/EditView.vue'
import ShowView   from '@/views/dashboard/customers/ShowView.vue'

const routes = [
  {
    path: '/',
    redirect: '/devises',
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true, title: 'Connexion' },
  },

  // Routes des devises
  {
    path: '/devises',
    name: 'devises.index',
    component: DeviseView,
    meta: { requiresAuth: true, title: 'Gestion des devises' },
  },
  {
    path: '/devises/create',
    name: 'devises.create',
    component: DeviseCreateView,
    meta: { requiresAuth: true, title: 'Ajouter une devise' },
  },
  {
    path: '/devises/:id',
    name: 'devises.show',
    component: DeviseShowView,
    meta: { requiresAuth: true, title: 'Détail devise' },
  },
  {
    path: '/devises/:id/edit',
    name: 'devises.edit',
    component: DeviseEditView,
    meta: { requiresAuth: true, title: 'Modifier une devise' },
  },

  // Routes des clients
  {
    path: '/customers',
    name: 'customers.index',
    component: CustomersView,
    meta: { requiresAuth: true, title: 'Gestion des clients' },
  },
  {
    path: '/customers/create',
    name: 'customers.create',
    component: CreateView,
    meta: { requiresAuth: true, title: 'Ajouter un client' },
  },
  {
    path: '/customers/:id',
    name: 'customers.show',
    component: ShowView,
    meta: { requiresAuth: true, title: 'Détail client' },
  },
  {
    path: '/customers/:id/edit',
    name: 'customers.edit',
    component: EditView,
    meta: { requiresAuth: true, title: 'Modifier un client' },
  },

  // Routes utilisateurs
  {
    path: '/users',
    name: 'users.index',
    component: UsersView,
    meta: { requiresAuth: true, title: 'Gestion des utilisateurs' },
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: UserCreateView,
    meta: { requiresAuth: true, title: 'Ajouter un utilisateur' },
  },
  {
    path: '/users/:id',
    name: 'users.show',
    component: UserShowView,
    meta: { requiresAuth: true, title: 'Détail utilisateur' },
  },
  {
    path: '/users/:id/edit',
    name: 'users.edit',
    component: UserEditView,
    meta: { requiresAuth: true, title: 'Modifier un utilisateur' },
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