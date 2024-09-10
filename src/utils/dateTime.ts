
// 日期转对象
export function convertDateToObject(date: Date): any {
    const d = new Date(date)
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1, // JavaScript 中的月份从 0 开始，因此需要加 1
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
    };
}

// 对象转时间显示 yyyy-MM-dd HH:mm:ss
export function convertObjectToDateString(obj: any): string {
    const t = `${obj.year}-${padZero(obj.month)}-${padZero(obj.day)} ${padZero(obj.hour)}:${padZero(obj.minute)}:${padZero(obj.second)}`
    return t == '0-00-00 00:00:00' ? '--' : t
}
function padZero(n: number): string {
    if (n > 9) return n.toString()
    return '0' + n
}
