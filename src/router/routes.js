//import { useAuthStore } from '../stores/auth-store';
//import { useAuthStore } from 'src/stores/auth-store';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignUpPage.vue'), meta: { auth: true } },
      { path: '/chat', component: () => import('pages/IndexPage.vue'), meta: { auth: true } },
      { path: '/test', component: () => import('pages/TestPage.vue'), meta: { auth: true } },
      { path: '/config', component: () => import('pages/ConfigPage.vue'),  },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
