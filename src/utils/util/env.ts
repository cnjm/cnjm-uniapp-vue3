import manifest from "/@/manifest.json";
interface AppEnvConfig {
  // 超时时间
  VITE_TIMEOUT?: number;
  // appid
  VITE_GLOB_APP_ID: string;
  // 请求地址
  VITE_GLOB_API_URL?: string;
  // 接口前缀
  VITE_GLOB_API_PRE_FIX?: string;
  // 公共图片库
  VITE_GLOB_OSS_BASEURL: string;
  // oss桶
  VITE_GLOB_BUCKET_NAME: string;
}
export function getAppEnvConfig(): AppEnvConfig {
  const {
    // VITE_GLOB_APP_ID,
    VITE_GLOB_API_URL,
    VITE_TIMEOUT,
    VITE_GLOB_API_PRE_FIX,
    VITE_GLOB_OSS_BASEURL,
    VITE_GLOB_BUCKET_NAME,
  } = import.meta.env;
  return {
    VITE_GLOB_APP_ID: manifest["mp-weixin"].appid,
    VITE_GLOB_API_URL,
    VITE_TIMEOUT,
    VITE_GLOB_API_PRE_FIX,
    VITE_GLOB_OSS_BASEURL,
    VITE_GLOB_BUCKET_NAME,
  };
}

export function getEnv(): string {
  return import.meta.env.MODE;
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}
