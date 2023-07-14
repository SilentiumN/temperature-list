import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TempListView from '@/views/TempListView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: TempListView,
  },
  {
    path: '/edit/:tempId?',
    name: 'editPage',
    component: () => import('../views/TempEditView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
