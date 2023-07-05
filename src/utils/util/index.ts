import { isObject } from "/@/utils/internal/isType";

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description: 清除链接的参数
 * @param {string} url 需要清除的url
 * @param {string} queryList 指定哪些参数key需要清除，不传就是全部
 * @return {*}
 */
export function delUrlQuery(url: string, queryList: string[] = []) {
  if (!url) {
    return "";
  }
  const urls = url.split("?");
  if (urls.length !== 2) {
    return url;
  }
  if (queryList.length) {
    const params: string[] = [];
    const queryArr = urls[1].split("&");
    queryArr.forEach((item) => {
      const keys = item.split("=");
      if (!queryList.includes(keys[0])) {
        params.push(item);
      }
    });
    return `${urls[0]}?${params.join("&")}`;
  }
  return urls[0];
}

/**
 * @description: 去除空格
 * @param {*} str
 * @param {*} pos
 * @return {*}
 */
export function trim(str, pos = "both"): string {
  if (pos == "both") {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, "");
  } else if (pos == "right") {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == "all") {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}
