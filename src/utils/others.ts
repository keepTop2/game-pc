import pinia from "@/store";
import { User } from '@/store/user';
import { storeToRefs } from "pinia";
import { Local } from "./storage";
import { Page } from "@/store/page";

const { settings } = storeToRefs(Page(pinia));
const { info: userInfo } = storeToRefs(User(pinia));

// 只有这些充值方式
export const bankPayMethods = [1, 2, 3, 4, 5, 6];
// 充值方式对应的名称
export const bankPayType = [
    { paymenttype: 1, payname: 'bankcard' },
    { paymenttype: 2, payname: 'momo' },
    { paymenttype: 3, payname: 'zalo' },
    { paymenttype: 4, payname: 'viettel' },
    { paymenttype: 5, payname: 'scratchcard' },
    { paymenttype: 6, payname: 'usdt' },
];

/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
export const handleOpenLink = (url: string) => {
    let dom = document.createElement('a')
    dom.setAttribute('href', `${url}`)
    dom.setAttribute('target', '_blank')
    document.body.appendChild(dom)
    dom.click()
    document.body.removeChild(dom)
};

export const getCurrencyValue = (val: number | string | undefined | null) => {
    const currencyUnit = Local.get('currency') || 1;
    console.warn(currencyUnit)
    switch (currencyUnit) {
        case 1:
        default:
            return Number(val);
        case 2:
            return Math.floor(Number(val) / Number(userInfo.value.usdt_rate) * 100) / 100
    }
};
export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat(val: string) {
    // 匹配空格
    let v = val.replace(/(^\s*)|(\s*$)/g, '');
    // 只能是数字和小数点，不能是其他输入
    v = v.replace(/[^\d.]/g, '');
    // 以0开始只能输入一个
    v = v.replace(/^0{2}$/g, '0');
    // 保证第一位只能是数字，不能是点
    v = v.replace(/^\./g, '');
    // 小数只能出现1位
    v = v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    // 小数点后面保留2位
    v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    // 返回结果
    return v;
}

/**
 * 金额用 `,` 区分开
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberComma(val: string, isDecimal: boolean = true ): any {
    // 调用小数或整数(不可以负数)方法
    let v: any = verifyNumberIntegerAndFloat(val);
    v = isDecimal ? v : Math.trunc(v); // 直接舍弃小数
    // 字符串转成数组
    v = v.toString().split('.');
    // \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
    v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 数组转字符串
    v = v.join('.');
    // 返回结果
    return v;
}
// 玩家IP
export const IP = (): Promise<string> => {
    return new Promise(async (resolve) => {
        let fastCost = 99999;
        let fastIndex = 0;
        let _ip = "";
        let promises: Promise<{ cost: number; index: number; str: string }>[] = settings.value.GET_IP_LIST.map((url: any, index: any) => {
            return new Promise((resolve) => {
                let startTime = new Date().getTime();

                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.timeout = 5000;
                xhr.responseType = "text";

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            let endTime = new Date().getTime();
                            let cost = endTime - startTime;
                            let str: any = xhr.responseText;
                            // cc.log(请求:${url} 耗时:${cost}, index:${index}, str);
                            resolve({ cost, index, str });
                        } else {
                            // console.error("Error: xhr.status", xhr.status);
                            resolve({ cost: 9999999, index, str: '' }); // 如果出错，将 cost 设置为 Infinity
                        }
                    }
                };

                xhr.send();
            });
        });

        Promise.all(promises).then((results) => {
            results.forEach(({ cost, index, str }) => {
                if (cost < fastCost) {
                    fastCost = cost;
                    fastIndex = index;
                    _ip = str;
                }
            });
            let fastestUrl = settings.value.GET_IP_LIST[fastIndex];
            console.log(`最快IP: ${fastestUrl} 耗时: ${fastCost} IP: ${_ip}`);
            resolve(_ip);
        });
    });
}
/**
 *  精确小数点，截取位数，不四舍五入
 *  l 小数点位数
 *  精度丢失问题
 * */
export const toFixedNumber = (value: any, l = 2) => {
    if (!value) {
        return `0.${''.padEnd(l, '0')}`;
    }
    const str = value.toString().split('.');
    const str1 = str[1] ? str[1].substr(0, l).padEnd(l, '0') : ''.padEnd(l, '0');
    return str[0] + '.' + str1;
}


/**
 * 将对象数组 按字母顺序排序 
 * @param arr 对象数组；prop：要排序的对象属性key名
 * @returns: nut-elevator list格式
*/
export function sortAndGroupByLetter(arr:any, prop:string) {
    // 按prop属性排序
    const sorted = arr?.sort((a:any, b:any) => a[prop]?.localeCompare(b[prop], 'en'));
    // 根据首字母分组
    const grouped = sorted.reduce((grouped:any, item:any) => {
      const firstChar = item[prop]&&item[prop][0]?.toUpperCase() ||"*" ;
      grouped[firstChar] = grouped[firstChar] || [];
      grouped[firstChar].push(item);
      return grouped;
    }, {});
    let list: any = []
    Object.keys(grouped).forEach(key => {
      let item = { title: key, list: <any>[] }
      console.log(key, grouped[key]);
      grouped[key].map((it: any) => {
        item.list.push(it)
      })
      list.push(item)
    })
   
    // 获取分组的字母数组
    const letters = Object.keys(grouped).sort();
   
    // 返回分组后的对象，包含字母数组和对应的分组数组
    return { list, letters, grouped };
  }

// 去除千位符
export const removeComma = (val: any) => {
  return val ? Number(val.replaceAll(",", "")) : 0;
}
