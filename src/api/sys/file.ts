import { defHttp } from '/src/utils/http/axios';
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
  Upload = '/common/file/upload',
}
export function Upload(params) {
  // console.log(params,'paramsparams');
  return defHttp.uploadFile<{data:fileInfo[]}>({ url: Api.Upload},{...params,name:'multipartFile'});
}
export type {fileInfo}
