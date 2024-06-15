export class MessageEvent2 {
    private static msgEvent: any = {};

    //一对多注册
    static addMsgEvent(msgID: string | number, msgHandler: any, target = null) {


        if (this.msgEvent[msgID] == null) {
            this.msgEvent[msgID] = [];
        }
        let msgEvent = this.msgEvent[msgID];
        let len = msgEvent.length;
        for (let i = 0; i < len; i++) {
            if (msgEvent[i].target == target) {
                return;
            }
        }
        this.msgEvent[msgID].push({ handler: msgHandler, target: target });
    }

    static sendEvent(msgID: number, data?: any) {

        if (this.msgEvent[msgID] == null) {
            return;
        }
        this.msgEvent[msgID].forEach((info: { handler: (arg0: any) => void; }) => {
            info.handler(data);
        });
    }

    static removeMsgEvent(msgID: string | number, target: any) {
        let msgEvent = this.msgEvent[msgID];
        if (!msgEvent) return;
        let len = msgEvent.length;
        for (let i = 0; i < len; i++) {
            if (msgEvent[i].target == target) {
                this.msgEvent[msgID].splice(i, 1);
                if (this.msgEvent[msgID].length == 0) {
                    delete this.msgEvent[msgID];
                }
                return;
            }
        }
    }

    static getMsgHander(msgID: string | number) {
        return this.msgEvent[msgID];
    }
}
