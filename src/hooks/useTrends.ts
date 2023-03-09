import { cloneDeep } from "lodash-es";
import type { Ref } from "vue";

import { isEmpty } from "/@/utils/internal/isType";

// 可以对如此结构进行增删的方法
// [
//   {
//     a:"",
//     list:[
//       {
//         b
//       }
//     ]
//   }
// ]
// data 为增删的数组  item 是新增的子项 filed可选，给二级增删时需要
// add 是有sonItem  i 时，给二级新增 反之只是给一级， del同理
export function useTrends<T>(data: Ref<T[]>, item: T, filed?: string) {
  function add<S>(sonItem?: S, i?: number) {
    if (!sonItem) {
      data.value.push(cloneDeep(item));
    }
    if (filed && sonItem && !isEmpty(i)) {
      data.value[i as number][filed as string].push(cloneDeep(sonItem));
    }
  }
  function del(i: number, j?: number | string) {
    if (!isEmpty(i) && j === undefined) {
      data.value.splice(i, 1);
    }
    if (filed && (j || j === 0) && (j || j === 0)) {
      data.value[i][filed as string].splice(j, 1);
    }
  }

  return {
    add,
    del,
  };
}
