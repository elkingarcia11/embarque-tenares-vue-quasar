import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/IndexPage.vue'),
        name: 'main',
      },
      {
        path: 'track',
        component: () => import('src/pages/TrackPage.vue'),
        name: 'track',
      },
      {
        path: 'search/:invoice(\\d+)',
        component: () => import('src/pages/TrackSpecificPage.vue'),
        name: 'search',
      },
      {
        path: 'rates',
        component: () => import('src/pages/RatesPage.vue'),
        name: 'rates',
      },
      {
        path: 'shipping-services',
        component: () => import('src/pages/ShippingServicesPage.vue'),
        name: 'shipping-services',
      },
      {
        path: 'ny-branch',
        component: () => import('src/pages/NyBranchPage.vue'),
        name: 'nyb',
      },
      {
        path: 'dr-branch',
        component: () => import('src/pages/DrBranchPage.vue'),
        name: 'drb',
      },
      {
        path: 'faqs',
        component: () => import('src/pages/FAQsPage.vue'),
        name: 'faqs',
      },
      {
        path: 'shipping-policy',
        component: () => import('src/pages/ShippingPolicyPage.vue'),
        name: 'shipping-policy',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFoundPage.vue'),
  },
];

export default routes;
