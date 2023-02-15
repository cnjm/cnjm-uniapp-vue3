import { defRequest } from "/@/utils/network/index";
import { ExampleParams, LoginResult } from "./model/example.model";
enum Api {
  Add = "/mock/example/add",
  List = "/mock/example/list",
}
/**
 * @description: mack示例
 */
export const addExample = (
  data: ExampleParams,
  mode: ErrorMessageMode = "toast"
) =>
  defRequest.post<UniApp.RequestSuccessCallbackResult>(
    { url: Api.Add, data },
    { errorMessageMode: mode }
  );

export const listExample = (
  data: LoginResult,
  mode: ErrorMessageMode = "toast"
) =>
  defRequest.post<UniApp.RequestSuccessCallbackResult>(
    { url: Api.List, data },
    { errorMessageMode: mode }
  );
