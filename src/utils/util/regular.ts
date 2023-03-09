// 特殊字符正则 基本上除了. %
export const specialPattern = /[`~!@#$^&*()=|{}':;',\\\\[\]<>\\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;

// 是否http or https
export const httpReg = /^http(s?):\/\//;

// 金额-两位小数
export const moneyReg = /^([0-9]{1}|^[1-9]{1}\d{1,15})(\.\d{1,2})?$/;

// 手机号
export const phoneReg = /^1\d{10}$/;
// 姓名
export const nameReg = /^[\u9FA6-\u9FCB\u3400-\u4DB5\u4E00-\u9FA5·s]{2,30}$/;

// 校验手机号
export const phoneValidator = (_rule, value, _callback) => {
  return phoneReg.test(value);
};

// 校验人名
export const nameValidator = (_rule, value, _callback) => {
  return nameReg.test(value);
};
