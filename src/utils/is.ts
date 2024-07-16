export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFunction,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNumber,
  isNull,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from 'lodash-es';
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

// TODO 此处 isObject 存在歧义
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

// TODO 此处 isArray 存在歧义
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

export function isPascalCase(str: string): boolean {
  const regex = /^[A-Z][A-Za-z]*$/;
  return regex.test(str);
}
export function verifyPassword(_rule: any, val: string): boolean {
  // false: 密码不正确
  if (
    !/^[a-zA-Z0-9,./!@#$%^&*()_+=\-;':"[\]{}\\|]{6,16}$/.test(
      val
    )
  )
    return false;
  // true: 密码正确
  else return true;
}
export function verifyEmail(_rule: any, val: string) {
  // false: 邮箱不正确
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    )
  )
    return false;
  // true: 邮箱正确
  else return true;
}

export function verifyCaptcha(_rule: any, val: string) {
  // false: 图片验证码不正确
  if (!/^[0-9a-zA-Z]{4}$/.test(val))
    return false;
  // true: 图片验证码正确
  else return true;
}
export function verifyWithdrawPwd(_rule: any, val: string) {
  // false: 图片验证码不正确
  if (!/^[0-9a-zA-Z]{6,16}$/.test(val))
    return false;
  // true: 图片验证码正确
  else return true;
}
export function verifyPhoneCaptcha(_rule: any, val: string) {
  // false: 图片验证码不正确
  if (!/^[0-9]{5}$/.test(val))
    return false;
  // true: 图片验证码正确
  else return true;
}
const phoneCodeMap: any = {
  "63": { name: "philippines", code: "+63", regExp: /^(\+63|0)?(9\d{2}|[2-8]\d{2})\d{7}$/ }, // 菲律宾
  "84": { name: "vietnam", code: "+84", regExp: /^((^(\+84|84|0|0084)?)(3|5|7|8|9))+([0-9]{8})$/ }, // 越南
  "81": { name: "japan", code: "+81", regExp: /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/ }, // 日本
  "82": { name: "south_korea", code: "+82", regExp: /^(00){0,1}(82){1}0{0,1}[7,1](?:\d{8}|\d{9})$/ }, // 韩国
  "55": { name: "brazil", code: "+55", regExp: /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/ }, // 巴西
  "86": { name: "china", code: "+86", regExp: /^(\+?0?86\-?)?1[3-9]\d{9}$/ }, // 中国大陆
  "886": { name: "taiwan", code: "+886", regExp: /^(\+?886\-?|0)?9\d{8}$/ } // 中国台湾
};
export function verifyMobile(code: any, val: string) {
  let regExp = phoneCodeMap[code].regExp

  // false: 图片验证码不正确
  if (
    !regExp.test(
      val
    )
  )
    return false;
  // true: 图片验证码正确
  else return true;
}