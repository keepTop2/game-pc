import { reactive, onMounted, toRefs } from 'vue';
import IWebsocket from './chatWS'
const state_data: any = reactive({
  ChatGroupListReq: '',
  Input: null,

  per_page: 50,
  page: 1,
  chatitemList: [], // 聊天列表
  groupChatitemList: [], // 分组聊天列表

  groupList:[] ,   // 分组列表
  groupItem:''    // 选中分组
});

const usechatHooks = (state?: any) => {


  const getchatId = () => {
    if (state.deviceID > state.todeviceid) {
      return state.deviceID + '-' + state.todeviceid; //大的在前小的在后
    } else {
      return state.todeviceid + '-' + state.deviceID; //大的在前小的在后
    }
  };
  // 解析消息体
const decodeContent = (data: any, name: string) => {
  let MessageOutputeItem = state.root.lookupType(name)
  const buffer1 = new Uint8Array(data);
  const decodedMessage2 = MessageOutputeItem.decode(buffer1);

  return MessageOutputeItem.toObject(decodedMessage2);
}



  // 获取聊天列表
  const getChatlist = (item?:any) => {
    state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 13; //
    var payload = {
      deviceid: state.deviceID,
      groupid: item?item.id:0,
      page: 1,
      pagesize: 1000,
    };
    state_data.groupItem = item
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
    const KfRoleIdGetReq = state.root.lookupType('KfRoleIdGetReq');
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
      const decodeobj00 = decodeContent(decodeobj1.data, 'GroupChatListRsp');
      if (state_data.groupItem&&state_data.groupItem.id) {
        state_data.groupChatitemList = decodeobj00.chatitem;
      }else{
        state_data.chatitemList = decodeobj00.chatitem;
        const item = state_data.chatitemList[0];
        if (item?.iskf != 1) {
          getKfChat();
        }
      }
      console.log(3333333, state_data.chatitemList);
      //如果没有官方的历史聊天记录需要获取一下
    } else {
      getKfChat();
    }
  };
  //  获取客服信息
  const getChatMsg24 = (decodeobj1: any) => {
    //先解析出消息体
    const UserRole = state.root.lookupType('UserRole');
    const buffer00 = new Uint8Array(decodeobj1.data);
    const decodedMessage00 = UserRole.decode(buffer00);
    const decodeobj00 = UserRole.toObject(decodedMessage00);
    const obj = {
      THeadPhoto: '1001',
      TUsername: decodeobj00.username,
      Tdeviceid: decodeobj00.roleid,
      chatid: '',
      deep: 0,
      deviceid: state.deviceID,
      id: 99999,
    };
    state_data.chatitemList.unshift(obj);
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

  // 获取分组列表
  const getListGroup = () => {
    state.requestid++;
    const requestid = state.requestid;
    const type = 12; //
    var payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 100,
    };
    const GroupListReq = state.root.lookupType('GroupListReq');
    const decodedata = GroupListReq.encode(
      GroupListReq.create(payload),
    ).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };
    //  获取分组列表
    const getChatMsg12 = (decodeobj1: any) => {
      const decodeobj00 = decodeContent(decodeobj1.data, 'GroupListRsp');
      state_data.groupList = decodeobj00.groupitem
      console.log(3333333,state_data.groupList)
    };

  //处理聊天数据表情
  const initMessage = (text: any) => {
    const EMOJI_REMOTE_SRC =
      'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64';
    // 定义一个函数来将特定格式的字符串替换为图片
    function replaceWithEmojiImages(text: any) {
      // 定义一个正则表达式来匹配 /:1f600:/ 格式的字符串
      const regex = /\/:(.*?):\//g;

      // 使用 replace 方法和回调函数进行替换
      return text.replace(regex, (match: any) => {
        const value = match.slice(2, -2);
        // 构建图片标签
        const imgSrc = `${EMOJI_REMOTE_SRC}/${value}.png`; // 假设图片存储在这个路径
        return `<img data-code="${value}" src="${imgSrc}"  width="20" height="20" class="emoji-img"/>`;
      });
    }
    // 调用函数进行替换
    const outputText = replaceWithEmojiImages(text);
    return outputText;
  };

  // 编码发送参数
const encodeParams = (params: any, name: string) => {
  let item = state.root.lookupType(name)
  const errMsg = item.verify(params);
  if (errMsg) throw new Error(errMsg);
  const message = item.create(params);
  const buffer = item.encode(message).finish();
  return buffer;
}

// 编辑聊天列表
const editchat = (item: any, decodeobj00: any,setType?:any) => {//
  const requestid = state.requestid;
  const type = 14; // 消息同步触发
  var payload = {
    id: item.id,
    deviceid: state.deviceID,
    chatgroupid: decodeobj00.id||0,
    sort: 6,
    istop: setType&&setType.id==1?1:6,
    enableflag: setType&&setType.id==3?1:6,
  }
  const decodedata = encodeParams(payload, 'ChatItemModifyReq')
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest);
}

// 置顶 禁言，移动分组
const itemSet = (o:any,item:any)=>{
  editchat(item,item,o)
}

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
    initMessage,
    getListGroup,
    getChatMsg12,
    encodeParams,
    encodeInput,
    decodeContent,
    itemSet,
    editchat
  };
};
export default usechatHooks;
