import { reactive, onMounted } from 'vue';

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
  const getChatMsg13 = (decodeobj1: any) => {
    //先解析出消息体
    if (decodeobj1.data) {
      const buffer00 = new Uint8Array(decodeobj1.data);
      const decodedMessage00 = state_data.GroupChatListRsp.decode(buffer00);
      const decodeobj00 =
        state_data.GroupChatListRsp.toObject(decodedMessage00);
      console.log(
        'onMessage/GroupChatListRsp output4 ' + state.deviceid,
        decodeobj00,
      );
    }
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
  //获取一个格式化的时间
  const getDateFromat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const datatime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return datatime;
  };

  onMounted(() => {
    // state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    // state_data.Input = state.root.lookupType('Input');
  });
  return {
    getChatlist,
    getChatMsg13,
    getDateFromat
  };
};
export default usechatHooks;
