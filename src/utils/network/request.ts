import { cloneDeep } from "lodash-es";
import { checkStatus } from "./checkStatus";
import { requestInterceptors } from "./transform";
import { ResultStatusEnum } from "/@/enums/network.enum";
export class UniRequest {
  private readonly options: RequestOptions;
  private readonly config: RequestConfig;

  constructor(config: RequestConfig, options: RequestOptions) {
    this.config = config;
    this.options = options;
  }

  get<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  post<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }

  async request<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    const requestConfig: RequestConfig = Object.assign(this.config, cloneDeep(config));
    const requestOptions: RequestOptions = Object.assign(this.options, cloneDeep(options));

    const {
      requestUrl,
      params,
      header,
      method,
      timeout,
      errorMessageMode,
      isReturnNativeResponse,
      isTransformResponse,
    } = await requestInterceptors(requestConfig, requestOptions);

    return new Promise((resolve, reject) => {
      uni.request({
        url: requestUrl,
        data: params,
        header,
        method,
        timeout,
        success: (res) => {
          // 返回原生的response
          if (isReturnNativeResponse) {
            resolve(res as unknown as Promise<T>);
            return;
          }
          // 不需要处理，直接返回 code data message等信息
          if (!isTransformResponse) {
            resolve(res.data as unknown as Promise<T>);
            return;
          }
          const { data } = res as RequestResponse<RequestResult>;

          if (!data) {
            reject(new Error("请求出错，请稍候重试"));
          }

          const { code, payload, message } = data;

          const hasSuccess = code && code === ResultStatusEnum.SUCCESS;
          // 请求成功 直接返回响应信息
          if (hasSuccess) {
            resolve(payload);
            return;
          }

          checkStatus(code, message, errorMessageMode);

          reject(new Error("请求出错，请稍候重试"));
        },
        fail(err) {
          uni.showToast({
            title: "网络请求错误",
            icon: "none",
            duration: 2000,
          });
          reject(new Error(err.errMsg));
        },
      });
    });
  }
}
