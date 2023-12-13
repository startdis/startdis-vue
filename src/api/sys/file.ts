import { defHttp } from '/@/utils/http/axios';
type fileInfo = {
  companyTenantId?: string;
  createdAt?: string;
  createdBy?: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  groupTenantId?: string;
  id?: string;
  imageCheckUrl?: string;
}
enum Api {
  Upload = '/file/upload',
  share = '/file/share',
}
export function Upload(params) {
  // console.log(params,'paramsparams');
  return defHttp.uploadFile<{data:fileInfo[]}>({ url: Api.Upload},{...params,name:'multipartFile'});
}
export function GetUploadLink(params) {
  // console.log(params,'paramsparams');
  return defHttp.get<{data:fileInfo[]}>({ url: Api.share,params});
}
export type {fileInfo}