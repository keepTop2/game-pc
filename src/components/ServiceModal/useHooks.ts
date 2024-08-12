import {  reactive, onMounted, toRefs } from 'vue';

const usechatHooks = (state: any, IWebsocket: any,decodeContent:any) => {
  const state_data: any = reactive({
    ChatGroupListReq: '',
    Input: null,

    per_page: 50,
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

    // 获取官方客服
    const getKfChat = () => {
     const KfRoleIdGetReq= state.root.lookupType('KfRoleIdGetReq');
      state.requestid++;
      const requestid = state.requestid;
      const type = 24; //
      var payload = {
        deviceid: state.deviceID,
      };
      //编码消息体
      const errMsg2 = KfRoleIdGetReq.verify(payload);
      if (errMsg2) throw new Error(errMsg2);
      const decodedata = KfRoleIdGetReq.encode(
        KfRoleIdGetReq.create(payload),
      ).finish();
      const encodedRequest = encodeInput(type, requestid, decodedata);
      IWebsocket.sendMessageHandler(encodedRequest);
    };

  //  type13   聊天列表回执
  //deep -1代表上级
  // 1代表直属下级
  // 大于1代表 非直属下级
  const getChatMsg13 = (decodeobj1: any) => {
    //先解析出消息体
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(decodeobj1.data,'GroupChatListRsp')
      state_data.chatitemList = decodeobj00.chatitem;
      const item = state_data.chatitemList[0]
       //如果没有官方的历史聊天记录需要获取一下
      if (item?.iskf!=1) {
        getKfChat()
      }
    }
  };
  //  获取客服信息
  const getChatMsg24 = (decodeobj1: any) => {
    //先解析出消息体
    const UserRole =state.root.lookupType('UserRole');
    const buffer00 = new Uint8Array(decodeobj1.data);
    const decodedMessage00 = UserRole.decode(buffer00);
    const decodeobj00 = UserRole.toObject(decodedMessage00);
    const obj = {
      THeadPhoto: '1001',
      TUsername: decodeobj00.username,
      Tdeviceid: decodeobj00.roleid,
      chatid: "",
      deep: 0,
      deviceid: state.deviceID,
      id: 99999
    }
    state_data.chatitemList.unshift(obj)
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
      page: 1,
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
    getChatMsg24,
    getDateFromat,
    synchistorymsg,
  };
};
export default usechatHooks;
