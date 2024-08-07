import { ref, reactive, onMounted, nextTick } from 'vue';

const usechatHooks = (state: any, IWebsocket: any) => {
  const state_data: any = reactive({
    ChatGroupListReq: '',
    Input: null,
  });

  // 获取聊天列表
  const getChatlist = () => {
    console.log(222222, state);
    state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 13; //
    var payload = {
      deviceid: state.deviceid,
      groupid: 0,
      page: 1,
      pagesize: 1,
    };
    //编码消息体
    const errMsg2 = state_data.ChatGroupListReq.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = state_data.ChatGroupListReq.encode(
      state_data.ChatGroupListReq.create(payload),
    ).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  //  type13   聊天列表回执
  const getChatMsg13 = (decodeobj1: any, ServiceMessage: string) => {
    //先解析出消息体
    // const buffer00 = new Uint8Array(decodeobj1.data);
    // const decodedMessage00 = this.GroupChatListRsp.decode(buffer00);
    // const decodeobj00 = this.GroupChatListRsp.toObject(decodedMessage00);
    // console.log(
    //   'onMessage/GroupChatListRsp output4 ' + this.deviceid,
    //   decodeobj00,
    // );
  };

  const encodeInput = (type: any, request_id: any, data: any) => {
    state_data.Input = state.root.lookupType('Input');
    // Build payload object
    const payload = {
      type: type,
      requestid: request_id,
      data: data,
    };
    // Verify payload
    const errMsg = state_data.Input.verify(payload);
    if (errMsg) throw new Error(errMsg);
    // Create message
    const message = state_data.Input.create(payload);
    // Encode message
    const buffer = state_data.Input.encode(message).finish();
    return buffer;
  };

  onMounted(() => {
    // state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    // state_data.Input = state.root.lookupType('Input');
  });
  return {
    getChatlist,
    getChatMsg13,
  };
};
export default usechatHooks;
