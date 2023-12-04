import type { Router } from 'vue-router';
import { useAppStore } from '/src/store/modules/app';
import { useMultipleTabStore } from '/src/store/modules/multipleTab';
import { useUserStore } from '/src/store/modules/user';
import { usePermissionStore } from '/src/store/modules/permission';
import { PageEnum } from '/src/enums/pageEnum';
import { removeTabChangeListener } from '/src/logics/mitt/routeChange';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
