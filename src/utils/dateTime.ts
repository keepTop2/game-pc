
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


export function getMinuteDifference(timestamp1:any, timestamp2:any) {
    var date1:any = new Date(timestamp1);
    var date2:any = new Date(timestamp2);
    var difference = Math.abs(date2 - date1); // 计算两个日期之间的差值（毫秒）
    return Math.floor(difference / 1000 / 60); // 转换为分钟
}
