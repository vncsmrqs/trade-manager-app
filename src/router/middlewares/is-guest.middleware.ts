import { NavigationGuard } from "vue-router/types/router";
import { app, TYPES } from "@/core/common/container";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";

export const isGuestMiddleware: NavigationGuard = async (to, from, next) => {
  const authController = app.make<AuthController>(TYPES.AuthController);
  if (authController.isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};
