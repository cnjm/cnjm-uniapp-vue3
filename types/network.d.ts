type ErrorMessageMode = "none" | "modal" | "toast" | undefined;
type MethodMode = "GET" | "POST" | "PUT" | "DELETE";
type RequestHeaders = Record<string, string | number | boolean>;

interface RequestResult<T = any> {
  code: number;
  // type: "success" | "error" | "warning";
  message: string;
  result: T;
}

interface RequestResponse<T = any> {
  data: T;
  statusCode: number;
  header: any;
  cookies: string[];
}

interface RequestConfig<D = any> {
  // 基础url
  baseURL?: string;
  // 请求拼接路径前缀
  urlPrefix?: string;
  // 请求url
  url: string;
  // 请求参数
  data?: Object | String | ArrayBuffer;
  // 请求头
  header?: RequestHeaders;
  // 请求方法
  method?: MethodMode;
  // 超时时间
  timeout?: number;
}

interface RequestOptions {
  // post请求的时候添加参数到url
  joinParamsToUrl?: boolean;
  //是否对返回数据进行处理
  isTransformResponse?: boolean;
  // 是否需要原生的response
  isReturnNativeResponse?: boolean;
  // 错误弹窗类型
  errorMessageMode?: ErrorMessageMode;
  // 是否加时间戳
  joinTime?: boolean;
  // 是否带token
  withToken?: boolean;
}
