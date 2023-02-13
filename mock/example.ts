import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/example/add",
    method: "post",
    response: () => {
      return {
        code: 20000,
        payload: null,
        message: "添加成功",
      };
    },
  },
  {
    url: "/api/example/list",
    method: "get",
    response: () => {
      return {
        code: 20000,
        payload: [
          {
            userId: 1,
            userName: "微茫",
          },
        ],
        message: "获取列表成功",
      };
    },
  },
] as MockMethod[];
