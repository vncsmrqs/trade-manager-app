import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import middlewarePipeline from "@/router/middleware-pipeline";
import { isAdmin } from "@/router/middlewares/is-authenticated.middleware";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue'),
    meta: {
      middlewares: [isAdmin],
    }
  },
  {
    path: '/trades',
    name: 'trades',
    component: () => import(/* webpackChunkName: "trades" */ '@/views/trades/index.vue')
  },
  {
    path: '/configuracoes/setups',
    name: 'configuracoes.setups',
    component: () => import(/* webpackChunkName: "configuracoes.setups" */ '../views/configuracoes/setups/index.vue'),
  },
  {
    path: '/configuracoes/gatilhos',
    name: 'configuracoes.gatilhos',
    component: () => import(/* webpackChunkName: "configuracoes.gatilhos" */ '../views/configuracoes/gatilhos/index.vue'),
  },
  {
    path: '/configuracoes/tipos-entradas',
    name: 'configuracoes.tipos-entradas',
    component: () => import(/* webpackChunkName: "configuracoes.tipos-entradas" */ '../views/configuracoes/tipos-entradas/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(middlewarePipeline);

export default router;
