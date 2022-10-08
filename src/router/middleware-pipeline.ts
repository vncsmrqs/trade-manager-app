import { Route } from "vue-router";
import { NavigationGuard, NavigationGuardNext } from "vue-router/types/router";

type NavigationGuardParams = {
  to: Route,
  from: Route,
  next: NavigationGuardNext,
};

const nextFactory = (
  context: NavigationGuardParams,
  middlewares: NavigationGuard[],
  index: number
): NavigationGuardNext =>  {
  const subsequentMiddleware = middlewares[index];

  if (!subsequentMiddleware) {
    return context.next;
  }

  return async (route) => {
    if (route) {
      return context.next(route);
    }

    const nextMiddleware = nextFactory(context, middlewares, index + 1);

    return await subsequentMiddleware(context.to, context.from, nextMiddleware);
  };
};

const middlewarePipeline: NavigationGuard = async (to: Route, from: Route, next: NavigationGuardNext) => {
  const middlewares: NavigationGuard[] = to.matched.reduce((middlewares, record) => {
    if (record?.meta?.middlewares?.length) {
      middlewares = middlewares.concat(record.meta.middlewares);
    }
    return middlewares;
  }, []);

  if (!middlewares || !middlewares.length) {
    return next();
  }

  const context = { to, from, next };

  return await middlewares[0](to, from, nextFactory(context, middlewares, 1));
};

export default middlewarePipeline;
