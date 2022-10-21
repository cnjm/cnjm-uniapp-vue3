import { cloneDeep } from "lodash-es";
import { httpReg } from "/@/utils/util/regular";


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

	request<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
		const con = cloneDeep(config);
		const opt = cloneDeep(options);

		const requestConfig: RequestConfig = Object.assign({}, this.config, con);
		const requestOptions: RequestConfig = Object.assign({}, this.options, opt);
		const { baseURL, urlPrefix, url, data, header, method, timeout } = requestConfig;
		const requestUrl = httpReg.test(url) ? url : baseURL + urlPrefix + url;
		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUrl,
				data,
				header,
				method,
				timeout,
				success: (res) => {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			});
			console.log(options)
		})
	}
}