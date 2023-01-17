import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Index.vue') },
      { path: 'track', component: () => import('src/pages/Track.vue') },
      { path: 'rates', component: () => import('src/pages/Rates.vue') },
      { path: 'ny-branch', component: () => import('src/pages/NyBranch.vue') },
      { path: 'dr-branch', component: () => import('src/pages/DrBranch.vue'), meta: { title: 'Surcursal' } },
      {
        path: 'faqs',
        component: () => import('src/pages/FAQs.vue'),
        meta: {
          title: 'FAQs'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
