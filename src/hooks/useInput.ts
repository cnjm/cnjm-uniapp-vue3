import { isRef } from "vue";

// 针对输入input事件时校验输入，setTimeout后操作才生效，感觉是uview的form表单不行，真心难用
export default function useInput(formState) {
  let timer: NodeJS.Timeout | null = null;

  function inputCommon(value: string, filed: string, fun: (value: string) => string) {
    timer && clearTimeout(timer);

    const oldValue = value;
    const newValue = fun(value);

    if (oldValue === newValue) {
      return;
    }

    let tempObj: any;
    if (isRef(formState)) {
      tempObj = formState.value;
    } else {
      tempObj = formState;
    }

    filed = filed.replace(/\[(\w+)\]/g, ".$1");
    filed = filed.replace(/^\./, "");
    const keyArr = filed.split(".");

    if (keyArr.length < 1) {
      return;
    }

    const prop = keyArr.at(keyArr.length - 1) as string;
    for (let i = 0; i < keyArr.length - 1; i++) {
      const key = keyArr[i];
      tempObj = tempObj[key];
    }
    timer = setTimeout(() => {
      tempObj[prop] = newValue;
    }, 40);
  }
  //限制输入手机号  校验通过form校验，只限制输入的是0-9的数字
  function inputPhone(value: string, filed: string) {
    inputCommon(value, filed, (value: string) => {
      const newValue = value.replace(/[^0-9]/g, "");
      return newValue;
    });
  }

  // 限制输入正整数 常用于非0的数量限制
  function inputInteger(value: string, filed: string) {
    inputCommon(value, filed, (value: string) => {
      let newValue = "";
      if (value.length == 1) {
        newValue = value.replace(/[^1-9]/g, "");
      } else {
        newValue = value.replace(/\D/g, "");
      }
      // newValue = newValue.replace(/^\./g, "");
      return newValue;
    });
  }

  //金额输入限制 可以零元，不限制金额
  function inputMoney(value: string, filed: string) {
    inputCommon(value, filed, (value: string) => {
      let newValue = value.replace(/[^\d.]/g, "");
      newValue = newValue.replace(/^\./g, "");
      newValue = newValue.replace(/\.{2,}/g, ".");
      newValue = newValue.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      return newValue;
    });
  }
  return { inputMoney, inputPhone, inputInteger };
}
