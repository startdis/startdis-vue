import { Persistent, BasicKeys } from '/src/utils/cache/persistent';
import { CacheTypeEnum } from '/src/enums/cacheEnum';
import projectSetting from '/src/settings/projectSetting';
import { TOKEN_KEY,GROUP_KEY,COMPANY_KEY } from '/src/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getCompanyId() {
  return getAuthCache(COMPANY_KEY);
}

export function getGrounpId() {
  return getAuthCache(GROUP_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}