const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T) {
  return typeof val !== "undefined";
}

export function isUnDef<T = unknown>(val?: T) {
  return !isDef(val);
}

export function isObject(val: any) {
  return val !== null && is(val, "Object");
}

export function isEmpty<T = unknown>(val: T) {
  if (isArray(val) || isString(val)) {
    return (val as any).length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown) {
  return is(val, "Date");
}

export function isNull(val: unknown) {
  return val === null;
}

export function isNullAndUnDef(val: unknown) {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown) {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown) {
  return is(val, "Number");
}

export function isPromise<T = any>(val: unknown) {
  return (
    is(val, "Promise") && isObject(val) && isFunction((val as Promise<T>).then) && isFunction((val as Promise<T>).catch)
  );
}

export function isString(val: unknown) {
  return is(val, "String");
}

export function isFunction(val: unknown) {
  return typeof val === "function";
}

export function isBoolean(val: unknown) {
  return is(val, "Boolean");
}

export function isRegExp(val: unknown) {
  return is(val, "RegExp");
}

export function isArray(val: any) {
  return val && Array.isArray(val);
}

export function isWindow(val: any) {
  return typeof window !== "undefined" && is(val, "Window");
}

export function isElement(val: unknown) {
  return isObject(val) && !!(val as Element).tagName;
}

export function isMap(val: unknown) {
  return is(val, "Map");
}

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export function isUrl(path: string) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
