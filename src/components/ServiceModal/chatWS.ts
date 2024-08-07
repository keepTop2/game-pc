
import Rwebsocket from 'reconnecting-websocket'
// 改成单例模式
class IWebsocket {
    // 定义一个对象 用于接收websocket对象
    public instance: Rwebsocket | null = null;
    // wenbsocket数据处理注册事件
    public handler?: (params: any) => void;
    constructor() { }
    // 创建连接
    conectWebsocket(urlOut?: string) {
        // 对webSocket连接创建回调
        return new Promise((resolve, reject) => {
            let url: string = urlOut || 'ws://18.162.112.52:8512/ws';
            this.instance = new Rwebsocket(url);
            this.instance.onopen = (evt) => {
                console.log("websocket-连接成功", evt);
                resolve(evt);
            };
            this.instance.onclose = (evt) => {
                console.log("websocket-断开连接");
            };
            this.instance.onmessage = (evt) => {
                this.onMessageHandler(evt);
            };
            this.instance.onerror = (evt) => {
                // console.log(evt);
                console.log("websocket-连接错误");
                reject(evt)
            };
        })
    }
    //注册监听事件
    resgisterHandler(cb: (evt: MessageEvent<any>) => void) {
        this.handler = cb;
    }
    // 清除注册事件
    clearHandler() {
        this.handler = () => { };
    }
    // 发送消息
    sendMessageHandler(data: any) {
        this.instance?.send(data);
    }
    // 消息事件监听
    async onMessageHandler(evt: MessageEvent<any>) {
        const arrayBuffer = await evt.data.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        this.handler?.call(this, buffer);
    }
    // 断开连接
    close() {
        this.instance?.close();
    }
}
export default new IWebsocket();

