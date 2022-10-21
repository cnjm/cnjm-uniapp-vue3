
interface AppEnvConfig {
	// 超时时间
	VITE_TIMEOUT?: number;
	// 请求地址
	VITE_GLOB_API_URL?: string;
	// 接口前缀
	VITE_GLOB_API_PRE_FIX?: string;
}
export function getAppEnvConfig(): AppEnvConfig {
	const { VITE_GLOB_API_URL, VITE_TIMEOUT, VITE_GLOB_API_PRE_FIX } = import.meta.env
	return {
		VITE_GLOB_API_URL,
		VITE_TIMEOUT,
		VITE_GLOB_API_PRE_FIX
	}
}

export function getEnv(): string {
	return import.meta.env.MODE;
}

export function isDevMode(): boolean {
	return import.meta.env.DEV;
}