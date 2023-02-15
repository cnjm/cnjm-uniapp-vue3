import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/mock/example/add",
    method: "post",
    response: (rep) => {
      console.log(rep);
      return {
        code: 20000,
        payload: null,
        message: "添加成功",
      };
    },
  },
  {
    url: "/mock/example/list",
    method: "get",
    response: () => {
      return {
        code: 20000,
        payload: [
          {
            userId: 1,
            userName: "微茫1",
          },
          {
            userId: 2,
            userName: "微茫2",
          },
        ],
        message: "获取列表成功",
      };
    },
  },
] as MockMethod[];
