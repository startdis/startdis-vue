import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/src/utils/http/axios';
import { UploadFileParams } from '/types/axios';
import { useGlobSetting } from '/src/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

export function downLoadApi(params) {
  console.log('params',params);
  
  return defHttp.get<string>( {
    url: '/common/file/downloadFile', params,responseType: "blob",
  },{ isTransformResponse: false }
  );
}
