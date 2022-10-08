import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import middlewarePipeline from "@/router/middleware-pipeline";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { app, TYPES } from "@/core/common/container";
import { isAuthenticated, isGuest } from "@/router/middlewares";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('../common/layouts/guest-layout.vue'),
    meta: {
      middlewares: [isGuest],
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
        meta: {
          pageTitle: 'Login',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../common/layouts/authenticated-layout.vue'),
    meta: {
      middlewares: [isAuthenticated],
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue'),
        meta: {
          pageTitle: 'Dashboard',
        }
      },
      {
        path: '/trades',
        name: 'trades',
        meta: {
          pageTitle: 'Meu diário',
        },
        component: () => import(/* webpackChunkName: "trades" */ '@/views/trades/index.vue')
      },
      {
        path: '/configuracoes/setups',
        name: 'configuracoes.setups',
        meta: {
          pageTitle: 'Setup',
        },
        component: () => import(/* webpackChunkName: "configuracoes.setups" */ '../views/configuracoes/setups/index.vue'),
      },
      {
        path: '/configuracoes/gatilhos',
        name: 'configuracoes.gatilhos',
        meta: {
          pageTitle: 'Gatilhos',
        },
        component: () => import(/* webpackChunkName: "configuracoes.gatilhos" */ '../views/configuracoes/gatilhos/index.vue'),
      },
      {
        path: '/configuracoes/tipos-entradas',
        name: 'configuracoes.tipos-entradas',
        meta: {
          pageTitle: 'Tipos de entradas',
        },
        component: () => import(/* webpackChunkName: "configuracoes.tipos-entradas" */ '../views/configuracoes/tipos-entradas/index.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: { name: 'dashboard' },
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

const systemController: SystemController = app.make<SystemController>(TYPES.SystemController);

router.afterEach((to) => {
  const pageTitle = to.meta?.pageTitle;
  if (pageTitle) {
    systemController.updatePageTitle(pageTitle);
    return;
  }
  systemController.updatePageTitle(systemController.state.appTitle);
});

export default router;
