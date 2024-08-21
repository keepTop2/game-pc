import { reactive, onMounted, toRefs } from 'vue';
import IWebsocket from './chatWS';
const state_data: any = reactive({
  ChatGroupListReq: '',
  Input: null,

  per_page: 50,
  page: 1,
  chatitemList: [], // 聊天列表
  groupChatitemList: [], // 分组聊天列表

  groupList: [], // 分组列表
  groupItem: '', // 选中分组

  quickPhrasesCateList: [], // 快捷语分类列表
  quickPhrasesList: [], // 快捷语列表
});

const usechatHooks = (state?: any, selectUser?: any) => {
  const getchatId = () => {
    if (state.deviceID > state.todeviceid) {
      return state.deviceID + '-' + state.todeviceid; //大的在前小的在后
    } else {
      return state.todeviceid + '-' + state.deviceID; //大的在前小的在后
    }
  };
  // 解析消息体
  const decodeContent = (data: any, name: string) => {
    let MessageOutputeItem = state.root.lookupType(name);
    const buffer1 = new Uint8Array(data);
    const decodedMessage2 = MessageOutputeItem.decode(buffer1);

    return MessageOutputeItem.toObject(decodedMessage2);
  };

  // 获取聊天列表
  const getChatlist = (item?: any) => {
    state_data.ChatGroupListReq = state.root.lookupType('ChatGroupListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 13; //
    var payload = {
      deviceid: state.deviceID,
      groupid: item ? item.id : 0,
      page: 1,
      pagesize: 1000,
    };
    state_data.groupItem = item;
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
    state_data.chatitemList = [];
    //先解析出消息体
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(decodeobj1.data, 'GroupChatListRsp');
      if (state_data.groupItem && state_data.groupItem.id) {
        state_data.groupChatitemList = decodeobj00.chatitem;
      } else {
        state_data.chatitemList = decodeobj00.chatitem;
        const item = state_data.chatitemList[0];
        if (item?.iskf != 1) {
          getKfChat();
        }
      }
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
    state_data.groupList = decodeobj00.groupitem;
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
    let item = state.root.lookupType(name);
    const errMsg = item.verify(params);
    if (errMsg) throw new Error(errMsg);
    const message = item.create(params);
    const buffer = item.encode(message).finish();
    return buffer;
  };
  // 获取快捷语--分类列表
  const getShortcutCatelist = () => {
    const sendReq = state.root.lookupType('QuickPhrasesCListListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 23; //
    const payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 200,
    };
    //编码消息体
    const errMsg2 = sendReq.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = sendReq.encode(sendReq.create(payload)).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };
  // 接收快捷语--分类列表
  const getShortcutCateMsg = (decodeobj1: any) => {
    console.log('快捷语分类解析前--', decodeobj1);
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(
        decodeobj1.data,
        'QuickPhrasesCListRsp',
      );
      state_data.quickPhrasesCateList = decodeobj00.quickphrasec;
      console.log('快捷语分类解析后==', state_data.quickPhrasesCateList);
    }
  };
  // 获取快捷语列表
  const getShortcutlist = () => {
    const sendReq = state.root.lookupType('QuickPhrasesListReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = 19; //
    const payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 200,
    };
    console.log('获取快捷语列表参数--', payload)
    //编码消息体
    const errMsg2 = sendReq.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = sendReq.encode(sendReq.create(payload)).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };
  // 接收快捷语列表
  const getShortcutMsg = (decodeobj1: any) => {
    console.log('快捷语解析前--', decodeobj1);
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(decodeobj1.data, 'QuickPhrasesListRsp');
      console.log('-----***', decodeobj00)
      state_data.quickPhrasesList = decodeobj00.quickphrase;
      console.log('快捷语解析后==', state_data.quickPhrasesList);
    }
  };
  // 发送添加快捷语列表数据请求
  const sendShortcutList = (data: any) => {
    const sendReq = state.root.lookupType('QuickPhrasesModifyReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = data?.mType; // type: 16 新增快捷语, 17 修改， 18 删除
    const payload = {
      id: data?.id, //快捷语id只有删除和修改的时候传，新增的时候不传
      qhcid: data?.qhcid || '', //分类id
      deviceid: state.deviceID, //用户id
      istop: data?.istop || 2, // 1为置顶 2不置顶
      sort: data?.sort || 1, //排序，这个需要前端自己定义数字
      isautorsp: data?.isautorsp || 2, // 1 自动回复，2 不自动回复，是否是自动回复 前端用的
      content: data?.content || '', // 快捷语的内容
    };
    console.log('添加快捷语请求参数--', payload)
    //编码消息体
    const errMsg2 = sendReq.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = sendReq.encode(sendReq.create(payload)).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };
  // 发送添加快捷语--分类请求
  const sendShortcutCateList = (data: any) => {
    const sendReq = state.root.lookupType('QuickPhrasesCModifyReq');
    state.requestid++;
    const requestid = state.requestid;
    const type = data?.mType; // type: 20 新增, 21 修改， 22 删除
    const payload = {
      deviceid: state.deviceID, //用户id
      id: data?.id, // id只有删除和修改的时候传，新增的时候不传
      sort: data?.sort || 1, //排序，这个需要前端自己定义数字
      title: data?.title || '', //分类的标题
    };
    console.log('添加快捷语分类请求--', type, payload);
    //编码消息体
    const errMsg2 = sendReq.verify(payload);
    if (errMsg2) throw new Error(errMsg2);
    const decodedata = sendReq.encode(sendReq.create(payload)).finish();
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  // 编辑聊天列表
  const editchat = (item: any, decodeobj00: any, setType?: any) => {
    //
    const requestid = state.requestid;
    const type = 14; // 消息同步触发
    var payload = {
      id: item.id,
      deviceid: state.deviceID,
      chatgroupid: decodeobj00.id || 0,
      sort: 6,
      istop: setType && setType.id == 1 ? 1 : 6,
      enableflag: setType && setType.id == 3 ? 1 : 6,
    };
    const decodedata = encodeParams(payload, 'ChatItemModifyReq');
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  // 置顶 禁言，移动分组
  const itemSet = (o: any, item: any) => {
    editchat(item, item, o);
  };
  // 发起新聊天
  const searchuser = () => {
    if (!state.search) {
      return;
    }
    state.requestid++;
    const requestid = state.requestid;
    const type = 15; // 查询用户
    var payload = {
      roleid: state.search * 1,
      deviceid: state.deviceID,
    };
    console.log(333333, payload)
    //编码消息体
    const decodedata = encodeParams(payload, 'UserRoleReq');
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  //  发起新聊天回执
  const getChatMsg15 = (decodeobj1: any) => {
    const decodeobj00 = decodeContent(decodeobj1.data, 'UserRolesRsp');
    let ids = state_data.chatitemList.map((item: any) => item.roleid)
    if (decodeobj00 && decodeobj00.roles && !ids.includes(decodeobj00.roles[0].roleid)) {
      const params = {
        ...decodeobj00.roles[0],
        TUsername: decodeobj00.roles[0].username,
        Tdeviceid: decodeobj00.roles[0].roleid,
      }
      state_data.chatitemList = [...state_data.chatitemList, params]
      selectUser(params)

    }
    // state_data.groupList = decodeobj00.groupitem;
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
    initMessage,
    getListGroup,
    getChatMsg12,
    encodeParams,
    encodeInput,
    decodeContent,
    itemSet,
    editchat,
    searchuser,
    getChatMsg15,

    getShortcutCatelist,
    getShortcutCateMsg,
    getShortcutlist,
    getShortcutMsg,
    sendShortcutList,
    sendShortcutCateList,
  };
};
export default usechatHooks;
