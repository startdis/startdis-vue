import type { AppRouteModule } from '/src/router/types';

import { LAYOUT } from '/src/router/constant';
import { t } from '/src/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/src/views/dashboard/analysis/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dashboard.analysis'),
      },
    }
  ],
};

export default dashboard;
