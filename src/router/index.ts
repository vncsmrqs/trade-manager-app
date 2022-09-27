import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue')
  },
  {
    path: '/trades',
    name: 'trades',
    component: import(/* webpackChunkName: "trade" */ '../views/trade/index.vue')
  },
  {
    path: '/settings/setup',
    name: 'settings.setup',
    component: () => import(/* webpackChunkName: "settings.setup" */ '../views/settings/setup/index.vue'),
  },
  {
    path: '/settings/setup-add-on',
    name: 'settings.setup-add-on',
    component: () => import(/* webpackChunkName: "settings.setup-setup-add-on" */ '../views/settings/setup-add-on/index.vue'),
  },
  {
    path: '/settings/trade-type',
    name: 'settings.trade-type',
    component: () => import(/* webpackChunkName: "settings.trade-type" */ '../views/settings/trade-type/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
