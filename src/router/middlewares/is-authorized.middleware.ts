import { NavigationGuard } from "vue-router/types/router";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export const isAuthorized: NavigationGuard = async (to, from, next) => {
  const authController = app.make<AuthController>(TYPES.AuthController);
  const notificationController = app.make<NotificationController>(TYPES.NotificationController);

  const requiredAbilities: string[] = to.matched.reduce((abilities, route) => {
    if (route?.meta?.middlewares?.length) {
      abilities = abilities.concat(route.meta.abilities);
    }
    return abilities;
  }, []);

  if (!authController.userCan(requiredAbilities)) {
    next({ name: 'dashboard' });
    notificationController.push({
      type: 'warning',
      message: 'Você não tem permissão para acessar essa página.',
    });
  } else {
    next();
  }
}
