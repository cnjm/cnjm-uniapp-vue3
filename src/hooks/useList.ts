import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { BasicFetchResult, BasicPageByLastIdParams } from "/@/api/base.model";
import { LoadingEnum } from "/@/enums/loading.enum";

import { BasicPageParams } from "/@/api/base.model";

// 针对如下两种请求、响应做的分页功能
// const params = {
//   pageNum: 1,
//   pageSize: 1,
//   // ...其他请求参数
// };
// const data = {
//   message: "",
//   code: "",
//   payload: [],
//   totalCount: 100,
// };

// const params = {
//   lastMinId: null,
//   limit:10
//   // ...其他请求参数
// };
// const data = {
//   message: "",
//   code: "",
//   payload: [],
// };

// 存在lastMinIdName 则走lastId方式
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export default function useList<T = any, S = any>(request: Function, formState: T, lastMinIdName?: string) {
  const data = reactive<{ list: S[] }>({
    // 列表数据
    list: [],
  });
  // 最后一个id
  const lastMinId: Ref<number | null> = ref(null);
  // 加载态    loading   nomore
  const loading: Ref<LoadingEnum> = ref(LoadingEnum.LOADING);
  // 当前页
  const pageNum = ref(1);
  // 总数量
  const total = ref(0);
  // 分页大小
  const pageSize = ref(10);
  const limit = ref(10);

  // 处理响应
  function handleList(res: BasicFetchResult<any>) {
    const { payload = [], totalCount } = res;

    // 第一页、并且没有数据，应为无数据状态 直接return
    if (pageNum.value === 1 && payload.length <= 0) {
      loading.value = LoadingEnum.NODATA;
      return;
    }

    data.list = [...data.list, ...payload];
    total.value = totalCount as number;
    pageNum.value++;

    // 如果数据长度等于总数，则加载完成
    if (data.list.length >= (totalCount as number)) {
      loading.value = LoadingEnum.NOMORE;
    }
  }
  // 根据lastId处理
  function handleListBylastId(payload: any[] = []) {
    // 无lastMinId并且没有数据，应为无数据状态 直接return
    if (!lastMinId.value && payload.length <= 0) {
      loading.value = LoadingEnum.NODATA;
      return;
    }

    // 如果条数不足pagesize 可以判断没有数据了
    if (payload.length < pageSize.value) {
      loading.value = LoadingEnum.NOMORE;
    }

    data.list = [...data.list, ...payload];

    lastMinId.value = data.list[data.list.length - 1][lastMinIdName as string];
  }

  // 处理参数
  function handleParams() {
    if (lastMinIdName) {
      const params: BasicPageByLastIdParams & T = {
        ...formState,
        lastMinId: lastMinId.value,
        limit: limit.value,
      };
      return params;
    }
    if (!lastMinIdName) {
      const params: BasicPageParams & T = {
        ...formState,
        pageNum: pageNum.value,
        pageSize: pageSize.value,
      };
      return params;
    }
    return {};
  }

  // 获取页面列表
  function getList() {
    if (loading.value === LoadingEnum.LOADING) {
      request(handleParams())
        .then((res) => {
          if (lastMinIdName) {
            handleListBylastId(res);
          }
          if (!lastMinIdName) {
            handleList(res);
          }
        })
        .catch(() => {
          // 如果请求出错
          loading.value = LoadingEnum.FAIL;
        });
    }
  }

  // 初始化列表
  function initList() {
    lastMinId.value = null;
    pageNum.value = 1;
    total.value = 0;
    loading.value = LoadingEnum.LOADING;
    data.list = [];

    getList();
  }

  // 下拉刷新
  onPullDownRefresh(initList);
  // 触底加载更多
  onReachBottom(() => {
    getList();
  });

  // 每次页面展示初始化第一波数据
  onShow(() => {
    initList();
  });
  return {
    data,
    loading,
    getList,
    initList,
  };
}
