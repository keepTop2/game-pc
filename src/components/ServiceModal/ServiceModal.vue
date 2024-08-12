<template>
  <!-- 客服聊天弹窗 -->

  <div class="main">
    <!-- 快捷语设置 -->
    <shortcutSettings v-model:visible="visibleSetting" />
    <h4 class="top_title">
      <span>与{{ state.userData.TUsername }}的聊天</span>

      <i>
        <n-switch v-model:value="active" />
        <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
      </i>

    </h4>
    <div class="main_body">
      <!-- 左侧设置 -->
      <div class="left_setting">
        <div class="set_item" v-for="item in settingList" :key="item.id">
          <n-badge :value="5" :max="15" class="set_item" :show="item.id == 1" :offset="[-17]">
            <iconpark-icon :icon-id="item.img" color="#fff" size="1.8rem"></iconpark-icon>
            <img :src="`/img/serviceModal/${item.img}`" alt="">
            <span>{{ item.name }}</span>
          </n-badge>
        </div>
      </div>
      <!-- 左侧菜单 -->
      <div class="left_menu">
        <div style="padding:0 10px">
          <n-flex class="tabs">
            <div :class="['tab', { active_tab: tab.id == active_id }]" v-for="tab in tab_list" :key="tab.id"
              @click="tabClick(tab)">
              {{ t(tab.label) }}
            </div>
          </n-flex>
          <n-input v-model:value="search" placeholder="查找聊天列表" />
          <div class="manage_group" @click="manageClick">管理分组</div>
        </div>
        <div class="user_list">
          <div :class="['list_item', state.activeId == item.id ? 'item_active' : '']" v-for="item in chatitemList"
            :key="item.id" @click="selectUser(item)">
            <div class="item_left">
              <div class="avatar">
                <img :src="`/img/head_icons/${item.THeadPhoto}.webp`" alt="" class="img1">
                <img :src="`/img/serviceModal/vip${item.vip}.webp`" alt="" class="img2">
              </div>
              <span>{{ item.TUsername }}</span>
            </div>
            <n-popover trigger="click" placement="bottom-start" :show-arrow="false">
              <template #trigger>
                <div class="high_proxy">{{ deepObj[item.deep] }}</div>
              </template>
              <div class="select_wrap">
                <div v-for="o in selectList" :key="o.id">{{ o.name }}</div>
              </div>
            </n-popover>
          </div>
        </div>
      </div>
      <!-- 右侧聊天区域 -->
      <div class="right_content">
        <chatArea :chatList="state.chatMessagesList"></chatArea>
        <!-- 快捷语选择 -->
        <div class="setting_wrap">
          <div class="short_wrap">
            <div v-for="item in shortList" :key="item.id">
              <n-popover trigger="hover" placement="top" :show-arrow="false">
                <template #trigger>
                  <div class="short_wrap_item">
                    <span>{{ item.name }}</span>
                  </div>
                </template>
                <div class="short_wrap_list">
                  <span v-for="op in short_options" :key="op">{{ op }}</span>
                </div>
              </n-popover>
            </div>
          </div>
          <div class="setting" @click="showSetting">快捷语设置</div>
        </div>
        <div class="send_message">
          <!-- <picker set="emojione" /> -->
          <div class="input_content">
            <div id="message-input" ref="msgRef" v-html="testMsg"   contenteditable="true"   spellcheck="false" autofocus class="input_wrap">
          </div>
          <div class="send_icon">
                <iconpark-icon icon-id="ftsx04" size="1.2rem" class="pointer" @click="sendMoney" />
                <iconpark-icon icon-id="ftsx01" size="1.2rem" class="pointer" />
                <iconpark-icon icon-id="ftsx03" size="1.2rem" class="pointer" />
                <n-popover trigger="hover" :show-arrow="false" placement="top-end">
                  <template #trigger>
                    <iconpark-icon icon-id="ftsx02" size="1.2rem" class="pointer" />
                  </template>
                  <div class="emoji">
                    <EmojiPicker :native="true" @select="onSelectEmoji" />
                  </div>
                </n-popover>
              </div>
          </div>
          <!-- <n-input v-model:value="testMsg" type="textarea" rows="2">
            <template #suffix>
              <div class="send_icon">
                <iconpark-icon icon-id="ftsx04" size="1.2rem" class="pointer" @click="sendMoney" />
                <iconpark-icon icon-id="ftsx01" size="1.2rem" class="pointer" />
                <iconpark-icon icon-id="ftsx03" size="1.2rem" class="pointer" />
                <n-popover trigger="hover" :show-arrow="false" placement="top-end">
                  <template #trigger>
                    <iconpark-icon icon-id="ftsx02" size="1.2rem" class="pointer" />
                  </template>
                  <div class="emoji">
                    <EmojiPicker :native="true" @select="onSelectEmoji" />
                  </div>
                </n-popover>
              </div>
            </template>
          </n-input> -->
          <div class="send_btn" @click="sendMsg" @keyup.enter="sendMsg">发送</div>
        </div>
      </div>
    </div>
    <!-- 快捷语设置 -->
    <shortcutSettings v-model:visible="visibleSetting" />

    <manageGroup v-model:visible="visibleGroup" />
    <!-- 转账弹窗 -->
    <sendMoneyModal v-model:visible="visibleTransfor" />
  </div>

</template>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import EmojiPicker from 'vue3-emoji-picker'
import IWebsocket from './chatWS'
import 'vue3-emoji-picker/css'
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import ReconnectingWebSocket from 'reconnecting-websocket';
import protobuf from 'protobufjs';
import chatArea from './components/chatArea.vue';
import shortcutSettings from './components/shortcutSettings.vue';
import manageGroup from './components/manageGroup.vue'
import sendMoneyModal from './components/sendMoneyModal.vue'
import usechatHooks from './useHooks';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';

import { Buffer } from 'buffer';
// import { Local } from "@/utils/storage";
interface tabType {
  label: string;
  id: number;
}
import { useI18n } from 'vue-i18n';
const EMOJI_REMOTE_SRC = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64";
const msgRef:any = ref(null)

const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const deepObj: any = {
  '-1': '上级代理',
  '1': '下级代理',
  '0': '官方客服',
}

const state: any = reactive({
  root: null,
  messagetype: 1,//消息类型
  seqnumber: '',
  chatMessagesList: [], // 聊天消息
  deviceID: 10086,// roleInfo.value.id,
  requestid: 5000, //对方ID
  todeviceid: 10085, //对方设备ID
  firstIn: false,
  messageType: null,
  userData: '',
  activeId: null,
})





// 解析消息体
const decodeContent = (data: any, name: string) => {
  let MessageOutputeItem = state.root.lookupType(name)
  const buffer1 = new Uint8Array(data);
  const decodedMessage2 = MessageOutputeItem.decode(buffer1);

  return MessageOutputeItem.toObject(decodedMessage2);
}


const { getChatlist, getChatMsg13, getDateFromat, synchistorymsg, chatitemList, getChatMsg24 }: any = usechatHooks(state, IWebsocket, decodeContent)


const emit = defineEmits(['update:visible']);
const active_id = ref(1);
const search = ref('')
const testMsg = ref('')
const sendMsgText = ref('')

const active = ref(true)  // 禁言

const tab_list = [
  { label: '聊天列表', id: 1 },
  { label: '用户列表', id: 2 },
];

// tab 标签点击
const tabClick = (tab: tabType) => {
  active_id.value = tab.id;
};


const selectList = [
  { name: '置顶', id: 1 },
  { name: '未读', id: 2 },
  { name: '屏蔽', id: 3 },
  { name: '移动分组到', id: 4 }
]

const shortList = [
  { name: '充值', role: 'proxy', id: 1 },
  { name: '提款', role: 'user', id: 2 },
  { name: '投注', role: 'user', id: 3 },
  { name: '代理', role: 'user', id: 4 },
  { name: '活动', role: 'proxy', id: 5 },
]
const short_options = ['1.USDT如何充值？', '2.越南盾如何充值？', '3.越南盾和USDT的汇率', '4.充值不到账', '5.解绑银行卡']

const settingList = [
  { name: '全部对话', img: 'zuocweidy01', id: 1 },
  { name: '工作', img: 'zuocweidy02', id: 2 },
  { name: '编辑', img: 'zuocweidy03', id: 3 },
]


// 添加表情

function onSelectEmoji(emoji: any) {
  testMsg.value =  msgRef.value.innerHTML
  const emojiImg = EMOJI_REMOTE_SRC + `/${emoji.r}.png`
  // 表情转化为标签
  let img = `<img src="${emojiImg}" width="23" height="23" style="vertical-align: middle;">`
  testMsg.value = testMsg.value + img
  msgRef.value.innerHTML = testMsg.value 

  /*
    // result
    { 
        i: "😚", 
        n: ["kissing face"], 
        r: "1f61a", // with skin tone
        t: "neutral", // skin tone
        u: "1f61a" // without tone
    }
    */
}

const visibleTransfor = ref(false)
const visibleSetting = ref(false) // 快捷语设置
const visibleGroup = ref(false) // 管理分组弹窗

// 转账
const sendMoney = () => {
  visibleTransfor.value = true
}


const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

const manageClick = () => {
  visibleGroup.value = true
}

// 打开快捷语设置
const showSetting = () => {
  visibleSetting.value = true
}
// 选择用户聊天
const selectUser = (item: any) => {
  state.chatMessagesList = []
  state.userData = item
  state.activeId = item.id
  state.todeviceid = item.Tdeviceid
  // 获取聊天记录
  synchistorymsg()
}



// 发送消息
const sendMsg = () => {
  testMsg.value  = msgRef.value.innerHTML
  if (testMsg.value !== '') {
    const type = 6; // 给用户发消息
    state.requestid++;
    const requestid = state.requestid;

    const msginput = {
      // data:new TextEncoder().encode(this.jsmessage),
      data: testMsg.value
    };

    //编码消息内容
    let MessageTextContentItem = state.root.lookupType('MessageTextContent')
    const errMsg1 = MessageTextContentItem.verify(msginput);
    if (errMsg1) throw new Error(errMsg1);
    const msginputdata = MessageTextContentItem.encode(MessageTextContentItem.create(msginput)).finish();
    var datatime = getDateFromat()
    const msgcontent = {
      fromdeviceid: state.deviceID,
      todeviceid: state.todeviceid,
      sendtime: datatime,
      mtype: state.messagetype,//文字类型消息
      data: msginputdata,
    };

    //编码消息体
    let MessageInputeItem = state.root.lookupType('MessageInpute')
    const errMsg2 = MessageInputeItem.verify(msgcontent);
    if (errMsg2) throw new Error(errMsg2);
    const msgcontentdata = MessageInputeItem.encode(MessageInputeItem.create(msgcontent)).finish();
    // { text: '文字', value: 1 },
    // 	{ text: '表情', value: 2 },
    // 	{ text: '图片', value: 3 },
    // 	{ text: '视频', value: 4 },
    // 	{ text: '转账', value: 5 },
    // 	{ text: 'json', value: 6 },
    // 	{ text: '混合', value: 7 },
    const params = {
      type: type,
      requestid: requestid,
      data: msgcontentdata,
    };
    const encodedRequest = encodeParams(params, 'Input')
    let InputItem = state.root.lookupType('Input')
    const buffer = Buffer.from(encodedRequest);
    const decodedMessage = InputItem.decode(buffer);
    const buffer1 = Buffer.from(decodedMessage.data);
    const decodedMessage1 = MessageInputeItem.decode(buffer1);
    const decoder = new TextDecoder('utf-8');
    const decodedString2 = decoder.decode(decodedMessage1.data);
    console.log("decodedMessage1.data :", decodedString2)
    // this.sendmessages.push(this.deviceid + ":" + this.jsmessage + "(" + datatime + ")类型:" + msgcontent.mtype)

    IWebsocket.sendMessageHandler(encodedRequest);
    testMsg.value = ''
    state.chatMessagesList.push({ date: datatime, role: 1, content: decodedString2.substring(1), name: state.deviceID })
  }
}



// 编码发送参数
const encodeParams = (params: any, name: string) => {
  let item = state.root.lookupType(name)
  const errMsg = item.verify(params);
  if (errMsg) throw new Error(errMsg);
  const message = item.create(params);
  const buffer = item.encode(message).finish();
  return buffer;
}

const onOpen = () => {
  const type = 1; // PT_SIGN_IN
  const requestid = 5000;
  const singin = {
    deviceid: state.deviceID,//用户的roleid
    userid: state.deviceID,//用户的roleid
    token: 'mmssdfasd1155',// Local.get('user').token,//后期从另外一个项目中获取
  }
  const data = encodeParams(singin, 'SignInInput')
  const params = {
    type: type,
    requestid: requestid,
    data: data,
  };
  const encodedRequest = encodeParams(params, 'Input')
  IWebsocket.sendMessageHandler(encodedRequest);

}
const getChatMsgPublic = (data: any) => {
  const decodeobj2 = decodeContent(data.content, 'MessageOutpute')

  console.log("onMessage/MessageOutpute output2 ", decodeobj2)
  let obj: any = {
    1: 'MessageTextContent',//文字消息
    2: 'MessageMoContent',//表情消息
    3: 'MessagePicContent', //图片
    4: 'MessageVideoContent',//视频
    5: 'MessageMoneyContent'//转账
  }

  const decodeobj3 = decodeContent(decodeobj2.data, obj[decodeobj2.mtype])
  console.log("onMessage/MessageTextContent output3 ", decodeobj3)
  const messageObj = {
    date: decodeobj2.sendtime,   // 时间
    role: decodeobj2.fromdeviceid == state.deviceID ? 1 : 2,   //角色1 我方消息 2 对方消息
    content: decodeobj3.data,   //消息
    name: decodeobj2.fromdeviceid
  }
  if (state.messageType == 4) {    //获取到新消息
    state.chatMessagesList.push(messageObj)
  } else {    // 聊天记录
    state.chatMessagesList.unshift(messageObj)
  }

}

// 收到对方发来的消息
const getChatMsg4 = (decodeobj1: any, ServiceMessage: string) => {
  const decodeobj00 = decodeContent(decodeobj1.data, ServiceMessage)
  console.log("onMessage/ServiceMessage output1 ", decodeobj00)
  getChatMsgPublic(decodeobj00)
}


//  聊天记录
const getChatMsg2 = (decodeobj1: any, SyncResp: string) => {

  const decodeobj00 = decodeContent(decodeobj1.data, SyncResp);
  console.log("onMessage/SyncResp output4 ", decodeobj00)

  if (Object.keys(decodeobj00).length > 0) {
    if (Object.keys(decodeobj00.messages).length > 0) {
      decodeobj00.messages.forEach((item: any) => {
        getChatMsgPublic(item)
      })
    }
  } else {
    state.chatMessagesList = []
  }
}
//收到消息
const onMessage: any = async (buffer: any) => {
  const decodeobj1 = decodeContent(buffer, 'Output');;
  console.log("onMessage/Output output0 ", decodeobj1)
  state.messageType = decodeobj1.type
  if (decodeobj1.code > 10000) {
    alert(decodeobj1.message)
    return;
  }
  if (decodeobj1.type == 6) {//给用户发送消息的，确定发送成功还是失败
    console.log(decodeobj1)
  }

  else if (decodeobj1.type == 4) {// 获取到新消息投递
    getChatMsg4(decodeobj1, 'Message')
  }
  //消息同步触发,或者是历史消息 也是使用type等于2下发的
  else if (decodeobj1.type == 2) {
    getChatMsg2(decodeobj1, 'SyncResp')
  }
  // 获取聊天列表
  else if (decodeobj1.type == 13) {
    getChatMsg13(decodeobj1)
  }
  // 获取客服聊天列表
  else if (decodeobj1.type == 24) {
    getChatMsg24(decodeobj1)
  }

}

onMounted(async () => {
  IWebsocket.conectWebsocket()
  state.root = await protobuf.load('/connect.ext.proto');
  onOpen()
  IWebsocket.resgisterHandler(onMessage)
  getChatlist()
  // synchistorymsg()
  state.firstIn = true


})
</script>
<style lang="less" scoped>
.main {
  // width: 100%;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  overflow: hidden;
  // background-color: #231353;

  .top_title {
    margin: 0;
    width: 100%;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    // border-radius: 14px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    text-align: center;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-image: linear-gradient(to bottom,
        #4c36b3 100%,
        #3a2786 28%,
        #3c279a 0%);

    >i {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &:deep(.n-switch--active .n-switch__rail) {

      background-color: #0CC51E;

    }
  }

  .main_body {
    height: 686px;
    display: flex;

    .left_menu {
      padding: 16px 0px;
      height: 100%;
      width: 280px;
      background-color: #2D1769;
      box-sizing: border-box;

      &:deep(.n-input__placeholder) {

        text-align: center;

      }
    }

    .left_setting {
      width: 72px;
      background-color: #2D1769;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;

      .set_item {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        img {
          width: 32px;
        }

      }
    }

    .right_content {
      position: relative;
      padding: 0 30px;
      height: 100%;
      width: 920px;
      background-color: #231353;
    }
  }
}

.tabs {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 14px;
  background: linear-gradient(0deg, #1d0e4a, #1d0e4a),
    radial-gradient(50% 50% at 50% 50%,
      rgba(126, 126, 126, 0.1) 0%,
      rgba(21, 21, 21, 0.1) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);

  .tab {
    flex: 1;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #8d84c5;
    cursor: pointer;
  }

  .active_tab {
    background: url(/img/serviceModal/tab_btn.webp) no-repeat;
    background-size: 100% 112%;
    color: #fff;
  }
}

.user_list {
  .list_item {
    height: 70px;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item_left {
      display: flex;
      align-items: center;

      .avatar {
        display: flex;
        flex-direction: column;

        .img1 {
          height: 50px;
          width: 50px;
          margin-right: 10px;
        }

        .img2 {
          height: 21px;
          margin-top: -15px;
        }
      }
    }

    .high_proxy {
      cursor: pointer;
      font-size: 12px;
      color: #fff;
      padding: 6px 8px;
      border-radius: 6px;
      background-image: radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%), linear-gradient(to bottom, #fff, #928776);
    }
  }

  .item_active {
    background-color: #422299
  }

}

.send_message {
  //height: 52px;
  display: flex;
  align-items: center;

  &:deep(.n-input) {

    // height: 52px;

    .n-input__input-el {
      // height: 52px;
    }

    .n-input__suffix {
      display: block;
    }
  }

  .send_btn {
    cursor: pointer;
    height: 52px;
    width: 130px;
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/img/serviceModal/send_btn.webp) no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }

  .send_icon {
    margin-top: 10px;
    display: flex;
    gap: 12px;

    img {
      height: 24px;
      width: 24px;
      cursor: pointer;
    }
  }
}

.emoji {
  &:deep(.v3-emoji-picker) {
    width: 350px;
    height: 350px;
  }
}

.manage_group {
  display: flex;
  justify-content: flex-end;
  color: #C0C2DB;
  margin-top: 12px;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}

.select_wrap {
  width: 118px;

  div {
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    color: #8E82C2;
    padding-left: 19px;

    &:hover {
      background-color: #1154FF;
      color: #ffffff;
    }

    &:last-child {
      border: unset;
    }
  }
}

.setting_wrap {
  display: flex;
  justify-content: space-between;

  .setting {
    cursor: pointer;
    margin-top: 6px;
    padding: 0 23px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border: solid 1px #322c59;
    background-color: #1d0e4a;
  }
}

.short_wrap {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  margin-top: 12px;

  .short_wrap_item {
    width: 98px;
    height: 33px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    border-radius: 10px;
    background: url(/img/serviceModal/anniu.webp) no-repeat;
    background-size: 100% 100%;
  }
}

.short_wrap_list {
  display: flex;
  flex-direction: column;
  color: #ffffff;
  padding: 16px;
  gap: 10px;

  span {
    cursor: pointer;
  }
}

:deep(.n-popover) {
  padding: unset !important;

  &:not(.n-popover--raw) {
    overflow: hidden;
    background-image: linear-gradient(to bottom, #2c205c 100%, #261771 -50%), linear-gradient(to bottom, #fff 0%, #af9eff 102%);
  }
}

.input_content{
  position: relative;
  width: 100%;
  height: 100%;
  .send_icon{
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
.input_wrap{
  width: 100%;
  height: 80px;
  border-radius: 12px;
  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #322c59;
  background-color: #1d0e4a;
  outline:none;
  position: relative;
  padding: 10px;
  padding-right: 135px;
  overflow-y: auto;
}
</style>
