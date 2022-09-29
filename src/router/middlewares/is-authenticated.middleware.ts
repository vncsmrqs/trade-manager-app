import { NavigationGuard } from "vue-router/types/router";

export const isAdmin: NavigationGuard = async (to, from, next) => {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    next({ name: 'auth.login' });
  } else {
    next();
  }
};
