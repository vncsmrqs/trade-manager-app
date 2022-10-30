import { NavigationGuard } from "vue-router/types/router";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { app, TYPES } from "@/core/common/container";

export const isAuthenticatedMiddleware: NavigationGuard = async (to, from, next) => {
  const authController = app.make<AuthController>(TYPES.AuthController);
  if (!authController.isAuthenticated) {

    next({
      name: 'login',
      query: {
        redirectTo: to.fullPath,
      },
    });
  } else {
    next();
  }
}
