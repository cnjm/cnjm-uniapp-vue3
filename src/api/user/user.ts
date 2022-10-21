import { defRequest } from "/@/utils/network/index";
import { LoginParams, LoginResult } from "./user.model";
enum Api {
	Login = "/user/login",
}
/**
 * @description: 用户登录
 */
export const loginApi = (data: LoginParams, mode: ErrorMessageMode = "modal") =>
	defRequest.post<LoginResult>({ url: Api.Login, data }, { errorMessageMode: mode });