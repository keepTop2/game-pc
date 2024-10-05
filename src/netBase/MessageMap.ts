export class MessageMap {
    private static msgMap: any = {};

    static addMsgMap(msgStruct: () => { (): any; new(): any; getMsgID: { (): any; new(): any; }; }) {
        let msgID = msgStruct().getMsgID();
        this.msgMap[msgID] = msgStruct;
    }

    static getMessage(msgID: string | number) {
        return this.msgMap[msgID];
    }
}
