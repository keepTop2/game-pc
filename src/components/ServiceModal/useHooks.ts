import { reactive, onMounted, toRefs } from 'vue';
import { sortAndGroupByLetter } from '../../utils/others';
import IWebsocket from './chatWS';
const state_data: any = reactive({
  ChatGroupListReq: '',
  Input: null,

  per_page: 150,
  page: 1,
  chatitemList: [], // 聊天列表
  groupChatitemList: [], // 分组聊天列表
  friendList: [], // 好友列表

  groupList: [], // 分组列表
  groupItem: '', // 选中分组

  quickPhrasesCateList: [], // 快捷语分类列表
  quickPhrasesList: [], // 快捷语列表
  keywordArr: [], //关键词列表
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

  // 公共发送方法  type:类型    payload 参数  Req请求类型
  const wsReqSend = (type: any, payload: any, Req: any) => {
    state.requestid++;
    const requestid = state.requestid;
    //编码消息体
    const decodedata = encodeParams(payload, Req);
    const encodedRequest = encodeInput(type, requestid, decodedata);
    IWebsocket.sendMessageHandler(encodedRequest);
  };

  // 获取聊天列表
  const getChatlist = (item?: any) => {
    const type = 13; //
    var payload = {
      deviceid: state.deviceID,
      groupid: item ? item.id : 0,
      page: 1,
      pagesize: 1000,
    };
    state_data.groupItem = item;
    //编码消息体
    wsReqSend(type, payload, 'ChatGroupListReq');
  };

  // 获取官方客服
  const getKfChat = () => {
    const type = 24; //
    var payload = {
      deviceid: state.deviceID,
    };
    //编码消息体
    wsReqSend(type, payload, 'KfRoleIdGetReq');
  };

  //  type13   聊天列表回执
  //deep -1代表上级
  // 1代表直属下级
  // 大于1代表 非直属下级
  const getChatMsg13 = (decodeobj1: any) => {
    //先解析出消息体
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(decodeobj1.data, 'GroupChatListRsp');
      if (state_data.groupItem && state_data.groupItem.id) {
        state_data.groupChatitemList = decodeobj00.chatitem || [];
      } else {
        state_data.chatitemList = decodeobj00.chatitem.filter(
          (i: any) => i.TUsername,
        );
        const item = state_data.chatitemList[0];
        if (item?.iskf != 1) {
          getKfChat();
        }
      }
      //如果没有官方的历史聊天记录需要获取一下
    } else {
      state_data.chatitemList = [];
      getKfChat();
    }
    const { list } = sortAndGroupByLetter(state_data.chatitemList, 'TUsername');
    state_data.friendList = list;

    console.log('聊天列表', state_data.chatitemList);
    state_data.chatitemList.forEach((item:any) => {
      if (item.id==state.userData?.id) {
        item.unreadnums = 0;
      }
      
    });

  };
  //  获取客服信息
  const getChatMsg24 = (decodeobj1: any) => {
    //先解析出消息体
    const UserRole = state.root.lookupType('UserRole');
    const buffer00 = new Uint8Array(decodeobj1.data);
    const decodedMessage00 = UserRole.decode(buffer00);
    const decodeobj00 = UserRole.toObject(decodedMessage00);

    const obj = {
      THeadPhoto: decodeobj00.headphoto||'1001',
      TUsername: decodeobj00.username,
      Tdeviceid: decodeobj00.roleid,
      chatid: '',
      deep: 0,
      deviceid: state.deviceID,
      id: 99999,
    };
    state_data.chatitemList.unshift(obj);
    const { list } = sortAndGroupByLetter(state_data.chatitemList, 'TUsername');

    state_data.friendList = list;
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
    const type = 8; // 消息同步触发
    var payload = {
      chatid: getchatId(),
      perpage: state_data.per_page,
      page: 1,
    };
    //编码消息体
    wsReqSend(type, payload, 'SyncHistoryInput');
  };

  // 获取分组列表
  const getListGroup = () => {
    const type = 12; //
    var payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 100,
    };
    //编码消息体
    wsReqSend(type, payload, 'GroupListReq');
  };
  //  获取分组列表
  const getChatMsg12 = (decodeobj1: any) => {
    const decodeobj00 = decodeContent(decodeobj1.data, 'GroupListRsp');
    state_data.groupList = decodeobj00.groupitem;
    console.log('分组列表', state_data.groupList);
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
        return `<img data-code="${value}" src="${imgSrc}?t=${Date.now()}"  width="20" height="20" class="emoji-img"/>`;
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
    const type = 23; //
    const payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 200,
    };
    //编码消息体
    wsReqSend(type, payload, 'QuickPhrasesCListListReq');
  };
  // 接收快捷语--分类列表
  const getShortcutCateMsg = (decodeobj1: any) => {
    console.log('快捷语分类解析前--', decodeobj1);
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(
        decodeobj1.data,
        'QuickPhrasesCListRsp',
      );
      state_data.quickPhrasesCateList = decodeobj00.quickphrasec || [];
      console.log('快捷语分类解析后==', state_data.quickPhrasesCateList);
    }
  };
  // 获取快捷语列表
  const getShortcutlist = () => {
    const type = 19; //
    const payload = {
      deviceid: state.deviceID,
      page: 1,
      pagesize: 200,
    };
    //编码消息体
    wsReqSend(type, payload, 'QuickPhrasesListReq');
  };
  // 接收快捷语列表
  const getShortcutMsg = (decodeobj1: any) => {
    console.log('快捷语解析前--', decodeobj1);
    if (decodeobj1.data) {
      const decodeobj00 = decodeContent(decodeobj1.data, 'QuickPhrasesListRsp');
      state_data.quickPhrasesList = decodeobj00.quickphrase;
      console.log('快捷语解析后==', state_data.quickPhrasesList);
    } else { // 空数据
      console.log('没有快捷语数据---')
      state_data.quickPhrasesList = []
    }
  };
  // 发送添加快捷语列表数据请求
  const sendShortcutList = (data: any) => {
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
    console.log(type, '添加快捷语参数--', payload);
    wsReqSend(type, payload, 'QuickPhrasesModifyReq');
  };
  // 发送添加快捷语--分类请求
  const sendShortcutCateList = (data: any) => {
    const type = data?.mType; // type: 20 新增, 21 修改， 22 删除
    const payload = {
      deviceid: state.deviceID, //用户id
      id: data?.id, // id只有删除和修改的时候传，新增的时候不传
      sort: data?.sort || 1, //排序，这个需要前端自己定义数字
      title: data?.title || '', //分类的标题
    };
    console.log(type, '添加分类-快捷语参数--', payload);
    wsReqSend(type, payload, 'QuickPhrasesCModifyReq');
  };

  // 编辑聊天列表
  const editchat = (item: any, decodeobj00: any, setType?: any) => {
    const type = 14; // 消息同步触发
    let enableflag = 6
    let istop = 6
    if (setType && setType.id == 3) {
      enableflag = item.enableflag==1?6:1
    }
    if (setType && setType.id == 1) {
      istop = item.istop == 1 ? 6 : 1
    }
    if (setType && setType.id == 5) {
      istop = item.istop == 1 ? 6 : 1
    }
    var payload:any = {
      id: item.id,
      deviceid: state.deviceID,
      chatgroupid: setType && setType.id == 5 ? -1 : decodeobj00.id || 0,
      sort: 6,
      istop: istop,
      enableflag: enableflag,
    };
    wsReqSend(type, payload, 'ChatItemModifyReq');
  };

  // 置顶 禁言，移动分组
  const itemSet = (o: any, item: any) => {
    if (!item.todeviceid) {
      return
    }

    editchat(item, item, o);
    if (o.id == 1) {
      // 置顶
      item.istop = item.istop == 1 ? 6 : 1;
    }
  };
  // 发起新聊天
  const searchuser = () => {
    if (!state.search) {
      return;
    }
    const type = 15; // 查询用户
    var payload = {
      username: state.search,
      deviceid: state.deviceID,
    };
    wsReqSend(type, payload, 'UserRoleReq');
  };

  // 获取关键词列表
  const keywordList = () => {
    const type = 28; // 查询用户
    var payload = {
      deviceid: state.deviceID,
    };
    wsReqSend(type, payload, 'KwlistReq');
  };

  // 获取关键词列表
  const getkeywordList = (decodeobj1: any) => {
    const decodeobj00 = decodeContent(decodeobj1.data, 'KwlistReqRsp');
    state_data.keywordArr = decodeobj00.words.map((item: any) => item.word);
    console.log('禁言',state_data.keywordArr)
  };

  //  发起新聊天回执
  const getChatMsg15 = (decodeobj1: any) => {
    const decodeobj00 = decodeContent(decodeobj1.data, 'UserRolesRsp');
    let ids = state_data.chatitemList.map((item: any) => item.roleid);
    if (
      decodeobj00 &&
      decodeobj00.roles &&
      !ids.includes(decodeobj00.roles[0].roleid)
    ) {
      const params = {
        ...decodeobj00.roles[0],
        TUsername: decodeobj00.roles[0].username,
        Tdeviceid: decodeobj00.roles[0].roleid,
        THeadPhoto:decodeobj00.roles[0].headphoto,
        id:decodeobj00.roles[0].roleid
      };
      state_data.chatitemList = [...state_data.chatitemList, params];
      selectUser(params);
    }
    // state_data.groupList = decodeobj00.groupitem;
  };

  //消息同步（可以看未读消息和历史消息）
  const allRead = () => {
    const type = 27; // 消息回应
    var payload = {
      deviceid: state.deviceID,
      chatid: getchatId(),
    };
    wsReqSend(type, payload, 'ReadChatItemReq');
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

    allRead,
    keywordList,
    getkeywordList,
  };
};
export default usechatHooks;
