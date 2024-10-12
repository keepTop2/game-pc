
import Rwebsocket from 'reconnecting-websocket'
import { RingBuffer } from "./RingBuffer";
import { MessageMap } from "./MessageMap";
import { MessageEvent2 } from "./MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { Message } from '@/utils/discreteApi'
import { i18n } from '@/languages/index';
// 改成单例模式
class IWebsocket {
    // 定义一个对象 用于接收websocket对象
    public instance: Rwebsocket | null = null;
    private ringBuffer = new RingBuffer();
    // wenbsocket数据处理注册事件
    public handler?: (params: any) => void;
    constructor() { }
    // 创建连接
    conectWebsocket(urlOut?: string) {
        // 对webSocket连接创建回调
        return new Promise((resolve, reject) => {
            let url: string = urlOut || 'ws://18.167.175.195:9001';
            this.instance = new Rwebsocket(url);
            this.instance.onopen = (evt) => {
                console.log("websocket-连接成功", evt);
                resolve(evt);
            };
            this.instance.onclose = () => {
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
        // console.log(333333, data)
        this.instance?.send(data);
    }
    // 消息事件监听
    async onMessageHandler(event: MessageEvent<any>) {
        if (typeof event.data == "string") {
            let array = [];
            for (let i = 0; i < event.data.length; i++) {
                array.push(event.data.charCodeAt(i));
            }
            // console.log("array:",array);
            let buf = new Uint8Array(array);
            this.ReceiveMessage(buf);
            return;
        }

        let reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        let self = this;
        reader.onload = function () {
            let buf = new Uint8Array(reader.result as any);
            //先存入队列中
            self.ReceiveMessage(buf);
        };


        // const arrayBuffer = await event.data.arrayBuffer();
        // this.handler?.call(this, arrayBuffer);
    }
    // 断开连接
    close() {
        this.instance?.close();
    }
    ReceiveMessage(buf: any) {
        var len = buf.byteLength;
        if (buf == undefined || buf == null || len == 0) {
            return;
        }
        for (var i = 0; i < len; ++i) {
            this.ringBuffer.Push(buf[i]);
        }
        while (true) {
            var receivedlength = this.ringBuffer.DataLength();
            if (receivedlength < 4) {
                return;
            }

            let bodyLen = this.ringBuffer.decode_msg_total_length();

            if (bodyLen < 1) {
                return;
            }

            if (receivedlength < bodyLen + 4) {
                return;
            }
            this.DecodeMessage(bodyLen);
        }
    }
    // 解码消息体
    DecodeMessage(bodyLen: number) {
        this.ringBuffer.addHead(4); //先去掉4个字节的包长度，再开始解析msg_id
        let msgID = this.ringBuffer.decode_msg_id();

        let messageStruct = MessageMap.getMessage(msgID);
        if (messageStruct == null) {
            //找不到对应的解码结构体时，循环消息ringbuffer的标识也要往后移，跳过这条消息的数据
            this.ringBuffer.addHead(bodyLen - 4);
            console.log("msgID not register", msgID);
            return;
        }
        let message = this.ringBuffer.decode_msg_body(messageStruct, bodyLen - 4);
        if (message.code != 1) {

            if (message.message) {
                if (!['account_type_error', 'withdraw_password_can_be_bound'].includes(message.message)) {
                    Message.error(i18n.global.t(message.message))
                }

            }
        }
        // console.log("DecodeMessage==>", this.getMsgType(msgID));

        if (![18, 10].includes(msgID)) {
            console.log(
                `返回协议的id为 ==> ${msgID}
协议字段为 ==> ${this.getMsgType(msgID)}
返回的数据为 ==>`, JSON.parse(JSON.stringify(message))
            );
        }
        //  第二个 net 对应第二个ip地址
        if (msgID == 5) { // 这个事件id监听不到
            MessageEvent2.sendEvent(10086, message);
        }
        MessageEvent2.sendEvent(msgID, message);
    }
    // 获取消息类型
    getMsgType(msgID: number) {
        let msgType: any = NetMsgType.msgType
        for (const key in msgType) {
            if (msgType[key] == msgID) {
                return key;
            }
        }
    }
}
export default new IWebsocket();

