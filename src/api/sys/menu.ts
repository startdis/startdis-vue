import { defHttp } from '/@/utils/http/axios';
import { getMenuListByIdParams, getMenuListByIdParamsResultModel, ModuleInfo } from './model/menuModel';
import { data} from './menu.json'
enum Api {
  // 测试先屏蔽
  // GetLoginModules = './menu.json'
  GetLoginModules = '/common/getUserMenuInfo'
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return data
  const result = defHttp.post<ModuleInfo>({ url: Api.GetLoginModules});
  return Promise.resolve(result).then(res => {
    let list = []
    list = res.map(item => {
      return {
        sn:item.menuCode,
        url:item.menuPath,
        name:item.menuName,
        image:item.menuIcon,
        showStatus:item.visible,
        component:item.menuComponent,
        ...item
      }
    })
    return list;
  });
  // return defHttp.get<getMenuListByIdParamsResultModel>({ url: Api.GetLoginModules });
};

/**
 * @description: Get user menu based on id
 */

export const getLoginModules = (params: getMenuListByIdParams) => {
  return defHttp.get<ModuleInfo>({ url: Api.GetLoginModules, params });
};
