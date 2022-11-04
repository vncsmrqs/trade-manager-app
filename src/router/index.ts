import Vue, { CreateElement } from 'vue';
import VueRouter, { RouteConfig, RouterView } from 'vue-router';
import middlewarePipeline from "@/router/middleware-pipeline";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { app, TYPES } from "@/core/common/container";
import { isAuthenticatedMiddleware, isGuestMiddleware } from "@/router/middlewares";
import { isAuthorized } from "@/router/middlewares/is-authorized.middleware";
import { loadSessionMiddleware } from "@/router/middlewares/load-session.middleware";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    meta: {
      middlewares: [loadSessionMiddleware],
    },
    component: { render: (c: CreateElement) => c('router-view') },
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: '',
        component: () => import('../common/layouts/guest-layout.vue'),
        meta: {
          middlewares: [isGuestMiddleware],
        },
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
            meta: {
              pageTitle: 'Login',
            },
          },
        ],
      },
      {
        path: '',
        component: () => import('../common/layouts/authenticated-layout.vue'),
        meta: {
          middlewares: [isAuthenticatedMiddleware],
        },
        children: [
          {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue'),
            meta: {
              pageTitle: 'Dashboard',
            }
          },
          {
            path: 'trades',
            name: 'trades',
            meta: {
              pageTitle: 'Meu diário',
            },
            component: () => import(/* webpackChunkName: "trades" */ '@/views/trades/index.vue')
          },
          {
            path: 'configuracoes',
            component: { render: (c: CreateElement) => c('router-view') },
            children: [
              {
                path: 'setups',
                name: 'configuracoes.setups',
                meta: {
                  pageTitle: 'Setup',
                },
                component: () => import(/* webpackChunkName: "configuracoes.setups" */ '../views/configuracoes/setups/index.vue'),
              },
              {
                path: 'gatilhos',
                name: 'configuracoes.gatilhos',
                meta: {
                  pageTitle: 'Gatilhos',
                },
                component: () => import(/* webpackChunkName: "configuracoes.gatilhos" */ '../views/configuracoes/gatilhos/index.vue'),
              },
              {
                path: 'tipos-entradas',
                name: 'configuracoes.tipos-entradas',
                meta: {
                  pageTitle: 'Tipos de entradas',
                },
                component: () => import(/* webpackChunkName: "configuracoes.tipos-entradas" */ '../views/configuracoes/tipos-entradas/index.vue'),
              },
              {
                path: 'importacoes',
                name: 'configuracoes.importacoes',
                meta: {
                  pageTitle: 'Importações',
                },
                component: () => import(/* webpackChunkName: "configuracoes.importacoes" */ '../views/configuracoes/importacoes/index.vue'),
              },
            ],
          },
          {
            path: 'admin',
            meta: {
              middlewares: [isAuthorized],
              abilities: ['admin'],
            },
            component: { render: (c: CreateElement) => c('router-view') },
            children: [
              {
                path: '',
                name: 'admin',
                redirect: { name: 'admin.users' },
              },
              {
                path: 'usuarios',
                name: 'admin.users',
                meta: {
                  pageTitle: 'Gestão de usuários',
                },
                component: () => import(/* webpackChunkName: "admin.users" */ '../views/admin/users/index.vue'),
              }
            ],
          },
        ],
      },
      {
        path: '*',
        redirect: { name: 'dashboard' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
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

router.afterEach((to) => {
  const systemController: SystemController = app.make<SystemController>(TYPES.SystemController);
  const pageTitle = to.meta?.pageTitle;
  if (pageTitle) {
    systemController.updatePageTitle(pageTitle);
    return;
  }
  systemController.updatePageTitle(systemController.state.appTitle);
});

export default router;
