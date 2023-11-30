import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, COMPANY_KEY, GROUP_KEY,HOME_PATH_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams, AuthLoginParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi,loginByCodeApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { getAppEnvConfig } from '/@/utils/env';
const {
  VITE_GLOB_SSO_URL,
} = getAppEnvConfig();
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  homePath?: string;
  companyTenantId?: string;
  groupTenantId?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    homePath:null,
    // token
    token: undefined,
    companyTenantId: undefined,
    groupTenantId: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getHomePath(): string {
      return this.homePath || getAuthCache<string>(HOME_PATH_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setCompanyId(info: string | undefined) {
      this.companyTenantId = info ? info : ''; // for null or undefined value
      setAuthCache(COMPANY_KEY, info);
    },
    setGroupTenantId(info: string | undefined) {
      this.groupTenantId = info ? info : ''; // for null or undefined value
      setAuthCache(GROUP_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setHomePath(url: string | null) {
      this.homePath = url
      setAuthCache(HOME_PATH_KEY, url);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    // /**
    //  * @description: login
    //  */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;
        window.localStorage.setItem('X-ACCESS-TOKEN', token)
        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getTokenByCode(
      params: AuthLoginParams,
    ): Promise<string | null> {
      try {
        const data = !params.token ? await loginByCodeApi(params) : { accessToken: params.token };
        const { accessToken } = data;
        window.localStorage.setItem('X-ACCESS-TOKEN', accessToken)
        // save token
        this.setToken(accessToken);
        return this.afterLoginAction(true);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      console.log('getToken',this.getToken);
      
      const userInfo = await this.getUserInfoAction();
      
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          console.log('routerrouterrouter',router);
          permissionStore.setDynamicAddedRoute(true);
        }
        
        goHome && (await router.replace(this.getHomePath|| PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const { userInfoVO } = await getUserInfo();
      const userInfo = userInfoVO
      if (userInfo?.companyTenantId) {
        this.setCompanyId(userInfo.companyTenantId);
      }
      if (userInfo?.groupTenantId) {
        this.setGroupTenantId(userInfo.groupTenantId);
      }
      this.setUserInfo(userInfo);
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setCompanyId(undefined);
      this.setGroupTenantId(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN+'?loginType=logout');
      // this.setToken(undefined);
      // this.setSessionTimeout(false);
      // this.setUserInfo(null);
      // const {
      //   VITE_GLOB_SSO_URL
      // } = getAppEnvConfig();
      // window.location.replace(VITE_GLOB_SSO_URL+'/#/logout')
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
    goToMainApp() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', '确定返回主应用？'),
        onOk: async () => {
          window.location.replace(VITE_GLOB_SSO_URL)
          // await this.logout(true);
        },
      });
    },  
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
