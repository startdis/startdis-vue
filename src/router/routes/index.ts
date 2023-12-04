import type { AppRouteRecordRaw, AppRouteModule } from '/src/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/src/router/routes/basic';

import { PageEnum } from '/src/enums/pageEnum';
import { t } from '/src/hooks/web/useI18n';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const IconfontRoute: AppRouteRecordRaw = {
  path: '/iconfont',
  name: 'Iconfont',
  component: () => import('/src/views/sys/iconfont/Iconfont.vue'),
  meta: {
    title: '应用列表',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/src/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const AuthLoginRoute: AppRouteRecordRaw = {
  path: '/authLogin',
  name: 'authLogin',
  component: () => import('/src/views/sys/login/authLogin.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};
// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute,AuthLoginRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];