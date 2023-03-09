import { UniRequest } from "./request";
import { deepMerge } from "/@/utils/util";
import { getAppEnvConfig } from "/@/utils/util/env";

const { VITE_GLOB_API_URL, VITE_GLOB_API_PRE_FIX, VITE_TIMEOUT } = getAppEnvConfig();
function createRequest(config?: RequestConfig, options?: RequestOptions) {
  return new UniRequest(
    deepMerge(
      {
        baseURL: VITE_GLOB_API_URL,
        urlPrefix: VITE_GLOB_API_PRE_FIX,
        url: "",
        data: {},
        headers: {},
        method: "none",
        timeout: VITE_TIMEOUT,
      },
      config || {},
    ),
    deepMerge(
      {
        joinParamsToUrl: false,
        isTransformResponse: true,
        isReturnNativeResponse: false,
        errorMessageMode: "none",
        joinTime: true,
        withToken: true,
        ident: true,
      },
      options || {},
    ),
  );
}
// 默认导出的http请求
export const defRequest = createRequest();
