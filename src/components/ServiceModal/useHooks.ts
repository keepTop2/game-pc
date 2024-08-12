import { reactive, onMounted, toRefs } from 'vue';

const usechatHooks = (state: any, IWebsocket: any) => {
  const state_data: any = reactive({
    ChatGroupListReq: '',
    Input: null,

    per_page: 20,
    page: 1,
    chatitemList: [], // 聊天列表
  });

  const getchatId = () => {
    if (state.deviceID > state.todeviceid) {
      return state.deviceID + '-' + state.todeviceid; //大的在前小的在后
    } else {
      return state.todeviceid + '-' + state.deviceID; //大的在前小的在后
    }
  };

  // 获取聊天列表
  const getChatlist = () => {
    state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 13; //
    var payload = {
      deviceid: state.deviceID,
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
    const GroupChatListRsp = state.root.lookupType('GroupChatListRsp');
    //先解析出消息体
    if (decodeobj1.data) {
      const buffer00 = new Uint8Array(decodeobj1.data);
      const decodedMessage00 = GroupChatListRsp.decode(buffer00);
      const decodeobj00 = GroupChatListRsp.toObject(decodedMessage00);
      console.log(
        'onMessage/GroupChatListRsp output4 ' + state.deviceID,
        decodeobj00,
      );
      state_data.chatitemList = decodeobj00.chatitem;
      console.log(666666, state_data.chatitemList);
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

  //  同步历史数据
  const synchistorymsg = () => {
    //同步历史消息
    state.requestid++;
    const requestid = state.requestid;
    const type = 8; // 消息同步触发
    var payload = {
      chatid: getchatId(),
      perpage: state_data.per_page,
      page: state_data.page,
    };
    console.log('synchistorymsg', payload);
    const SyncHistoryInput = state.root.lookupType('SyncHistoryInput');
    state_data.page++;
    //编码消息体
    const errMsg2 = SyncHistoryInput.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = SyncHistoryInput.encode(
      SyncHistoryInput.create(payload),
    ).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  onMounted(() => {
    // state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    // state_data.Input = state.root.lookupType('Input');
  });
  return {
    ...toRefs(state_data),
    getChatlist,
    getChatMsg13,
    getDateFromat,
    synchistorymsg,
  };
};
export default usechatHooks;
