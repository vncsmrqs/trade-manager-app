import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const Setup = () => import('@/pages/setting/setup/index.vue');

const routes: RouteConfig[] = [
  {
    path: '/settings/setup',
    name: 'setting.setup',
    component: Setup,
  },
];
