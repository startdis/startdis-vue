/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthLoginParams {
  code?: string;
  state?: string;
  token?: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface UserInfo {
  roles?:RoleInfo[],
  companyId: string;
  companyName: string;
  companyTenantId: string;
  createdAt: string;
  createdBy: string;
  deptId: string;
  deptName: string;
  email: string;
  groupTenantId: string;
  headPic: string;
  id: string;
  loginDate: string;
  loginIp: string;
  mobile: string;
  nickName: string;
  password: string;
  phone: string;
  postId: string;
  postName: string;
  roleId: string;
  roleName: string;
  sex: string;
}
export interface ModuleInfo {
  id: string;
  name: string;
  url: string;
  sn: string;
  status: string;
  image: string;
  orderNo: string;
  pid: string;
  appId: string;
  state: Number;
  component: string;
  pvs: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

export interface AuthLoginResultModel {
  accessToken: string ;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoByUserIdModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles?:RoleInfo[],
  companyId: string;
  companyName: string;
  companyTenantId: string;
  createdAt: string;
  createdBy: string;
  deptId: string;
  deptName: string;
  email: string;
  groupTenantId: string;
  headPic: string;
  id: string;
  loginDate: string;
  loginIp: string;
  mobile: string;
  nickName: string;
  password: string;
  phone: string;
  postId: string;
  postName: string;
  roleId: string;
  roleName: string;
  sex: string;
}
