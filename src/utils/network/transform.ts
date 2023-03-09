import { httpReg } from "../util/regular";
import { loginSleep } from "/@/hooks/useSleep";

function getRequestUrl(url: string, baseURL: string, urlPrefix: string, joinTime?: boolean) {
  return httpReg.test(url) ? url : `${baseURL}${urlPrefix}${url}${joinTime ? "?_t=" + new Date().getTime() : ""}`;
}
// 请求拦截
export async function requestInterceptors(requestConfig: RequestConfig, requestOptions: RequestOptions) {
  const { baseURL = "", urlPrefix = "", url, data, header = {}, method, timeout } = requestConfig;
  const { joinTime, ident, errorMessageMode, isReturnNativeResponse, isTransformResponse } = requestOptions;

  // 请求url
  const requestUrl = getRequestUrl(url, baseURL, urlPrefix, joinTime);
  // 请求头
  let token = uni.getStorageSync("token");
  if (ident && !token) {
    // 如果login超时，后续终止
    await loginSleep();
  }
  const position = uni.getStorageSync("position");
  token = uni.getStorageSync("token");
  if (position) {
    header!["POSITION"] = position;
  }
  if (token) {
    header!["X-Access-Token"] = token;
  }
  // 请求参数
  const params: any = data || {};

  return {
    header,
    method,
    timeout,
    requestUrl,
    params,
    errorMessageMode,
    isReturnNativeResponse,
    isTransformResponse,
  };
}

// 响应拦截
export function responseInterceptors() {}
