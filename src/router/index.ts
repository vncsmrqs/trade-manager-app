import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: HomeView
  },
  {
    path: '/settings/setup',
    name: 'setting.setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings.setup" */ '../views/settings/setup/index.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
