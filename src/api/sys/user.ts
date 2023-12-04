import { defHttp } from '/src/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, AuthLoginParams, AuthLoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/types/axios';

enum Api {
  Token = '/common/token',
  Logout = '/common/logout',
  GetUserInfo = '/common/getUserInfo',
  GetUserInfoById = '/getUserInfoById',
  GetPermissions = '/flow/main/getPermissions',
  GetSystemSettings = '/getSystemSettings',
}

/**
 * 获取配置信息
 */
export function getSystemSettings() {
  // 测试先屏蔽
  return Promise.resolve([])
  return defHttp.get<LoginResultModel>(
    {
      url: Api.GetSystemSettings,
    }
  );
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // 测试先屏蔽
  return Promise.resolve({token: '90457cdd-8498-4fcb-a9bc-8b765b00d6f6'});
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  ).then(res=>{
    return Promise.resolve({token: res});
  });
}
export function loginByCodeApi(params: AuthLoginParams,mode: ErrorMessageMode = 'modal',errorLogout:Boolean=true) {
  return defHttp.get<AuthLoginResultModel>(
    {
      url: Api.Token,
      params,
    },
    { errorMessageMode: 'modal',errorLogout }
  ).then(res=>{
    return Promise.resolve(res);
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfoById(params: any) {
  return defHttp.get({
    url: Api.GetUserInfoById,
    params,
  });
}
/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  // 测试先屏蔽
  // return Promise.resolve({})
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'modal' });
}

export function getPermCode() {
  // 测试先屏蔽
  return Promise.resolve([])
  return defHttp.get<string[]>({ url: Api.GetPermissions });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
