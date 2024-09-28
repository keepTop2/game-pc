export class MessageMap {
    private static msgMap = {};

    static addMsgMap(msgStruct) {
        let msgID = msgStruct().getMsgID();
        this.msgMap[msgID] = msgStruct;
    }

    static getMessage(msgID) {
        return this.msgMap[msgID];
    }
}
