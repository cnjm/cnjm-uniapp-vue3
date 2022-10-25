
import { cloneDeep } from "lodash-es";
import { httpReg } from "/@/utils/util/regular";
import { ResultStatusEnum, RequestEnum } from "/@/enums/network.enum";

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

	request<T = any>(
		config: RequestConfig,
		options?: RequestOptions
	): Promise<T> {
		const requestConfig: RequestConfig = Object.assign(
			this.config,
			cloneDeep(config)
		);
		const requestOptions: RequestOptions = Object.assign(
			this.options,
			cloneDeep(options)
		);

		let {
			baseURL = "",
			urlPrefix = "",
			url,
			data,
			header,
			method,
			timeout,
		} = requestConfig;
		const {
			isReturnNativeResponse,
			isTransformResponse,
			errorMessageMode,
			joinTime,
		} = requestOptions;

		console.log(RequestEnum.GET);
		// 请求url
		const requestUrl = httpReg.test(url)
			? url
			: `${baseURL}${urlPrefix}${url}${joinTime ? "?_t=" + new Date().getTime() : ""
			}`;

		// 请求参数
		let parma: any = data || {};

		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUrl,
				data: parma,
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

					const { code, result, message } = data;

					const hasSuccess = code && code === ResultStatusEnum.SUCCESS;
					// 请求成功 直接返回响应信息
					if (hasSuccess) {
						resolve(result);
						return;
					}

					let errMessage = "请求出错，请稍候重试";

					// 以下都是错误处理
					switch (code) {
						case ResultStatusEnum.TIMEOUT:
							errMessage = "登录超时，请重新登录";
							break;
						default:
							if (message) {
								errMessage = message;
							}
					}

					// 提示处理
					if (errorMessageMode === "toast") {
						console.log(111);
						uni.showToast({
							title: errMessage,
							icon: "none",
							duration: 2000,
						});
					}
					if (errorMessageMode === "modal") {
						uni.showModal({
							title: "提示",
							content: errMessage,
							showCancel: false,
						});
					}

					reject(new Error("请求出错，请稍候重试"));
				},
				fail(err) {
					reject(new Error(err.errMsg));
				},
			});
			console.log(options);
		});
	}
}
