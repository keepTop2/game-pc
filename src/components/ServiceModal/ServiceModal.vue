<template>
  <!-- 客服聊天弹窗 -->

  <div class="main">

    <h4 class="top_title">
      <span>与{{ state.userData.TUsername }}的聊天 {{ roleInfo.id }}</span>

      <div class="forbidden">
        <div class="forbidden_btn" @click="visibleForbidden = true"
          v-if="agentInfo.user_type && agentInfo.user_type == 1 && agentInfo.muteuser == 1">
          禁言
        </div>
        <n-switch v-if="false" v-model:value="active" />
        <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"
          style="margin-top: 6px;"></iconpark-icon>
      </div>
    </h4>
    <div class="main_body">
      <!-- 左侧设置  v-if="agentInfo.user_type && agentInfo.user_type > 0" -->
      <div class="left_setting" v-if="agentInfo.user_type && agentInfo.user_type > 0">
        <div class="set_item " @click="groupClick('all')">
          <n-badge :value="allUnReadNum" :max="999999" class="set_item" :offset="[-14, 0]">
            <iconpark-icon icon-id="zuocweidy01" :color="state.groupType == 'all' ? '#fff' : '#8D84C5'"
              size="1.8rem"></iconpark-icon>
            <!-- <Imgt :src="`/img/serviceModal/${item.img}`" alt=""> -->
            <span :style="{ color: state.groupType == 'all' ? '#fff' : '#8D84C5' }">全部对话</span>
          </n-badge>
        </div>
        <!-- 分组 -->
        <div class="group_area">
          <div class="set_item" v-for="item in groupList" :key="item.id" @click="groupClick(item)">
            <iconpark-icon icon-id="zuocweidy02" :color="state.groupType.id == item.id ? '#fff' : '#8D84C5'"
              size="1.8rem"></iconpark-icon>
            <span :style="{ color: state.groupType.id == item.id ? '#fff' : '#8D84C5' }">{{ item.name }}</span>
          </div>
        </div>
        <!-- 编辑 -->
        <div class="set_item" @click="groupClick('edit')">
          <iconpark-icon icon-id="zuocweidy03" :color="state.groupType == 'edit' ? '#fff' : '#8D84C5'"
            size="1.8rem"></iconpark-icon>
          <span :style="{ color: state.groupType == 'edit' ? '#fff' : '#8D84C5' }">编辑</span>
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
          <div class="mark">查找{{ active_id == 1 ? '聊天' : '用户' }}列表</div>
          <n-input v-model:value="state.search" placeholder="查找聊天列表">
            <template #suffix>
              <div class="new_btn" @click="searchuser">发起新聊天</div>
            </template>
          </n-input>
          <!-- <n-input v-model:value="search" placeholder="查找聊天列表" v-if="agentInfo.user_type&&agentInfo.user_type>0" /> -->
          <div class="manage_group" @click.stop="manageClick" v-if="agentInfo.user_type && agentInfo.user_type > 0">分组管理
          </div>
        </div>
        <div class="list_wrap">
          <!-- 聊天列表 -->
          <div class="user_list" v-if="active_id == 1">
            <div :class="['list_item', state.activeId == item.id ? 'item_active' : '']"
              v-for="item in (state.groupType == 'all' ? chatitemList : groupChatitemList)" :key="item.id"
              @click="selectUser(item)" :style="{ order: item.deep == '0' ? 0 : item.istop || 100 }">
              <div class="item_left">
                <div class="avatar">
                  <n-badge :value="item.unreadnums" :show="item.unreadnums > 0" :max="9999" class="set_item"
                    :offset="[-14, 8]">
                    <Imgt :src="`/img/head_icons/${item.THeadPhoto ? item.THeadPhoto : '1002'}.webp`" alt=""
                      class="img1" />
                  </n-badge>
                  <Imgt :src="`/img/serviceModal/vip${item.vip}.webp`" alt="" class="img2" v-if="item.vip" />
                </div>
                <span>{{ item.TUsername }}</span>
              </div>
              <n-popover trigger="hover" placement="bottom-start" :show-arrow="false" :disabled="item.deep == '0'">
                <template #trigger>
                  <div class="high_proxy" :style="{ background: deepObj[item.deep] ? deepObj[item.deep].color : '' }">{{
                    deepObj[item.deep] && deepObj[item.deep].label || '直属玩家' }}</div>
                </template>
                <div class="select_wrap">
                  <div v-for="o in selectList.slice(0, 2)" :key="o.id" @click="itemSet(o, item)">
                    <span v-if="o.id == 1">{{ item.istop == 1 ? '取消置顶' : '置顶' }}</span>
                    <span v-else> {{ o.name }}</span>
                  </div>
                  <div v-if="agentInfo.user_type && agentInfo.user_type > 0 && state.groupType == 'all'">
                    <n-popover trigger="hover" placement="right" :show-arrow="false">
                      <template #trigger>
                        <div class="high_proxy select_group"> {{ selectList.find((i: any) => i.id == 4)?.name }}</div>
                      </template>
                      <div class="select_wrap_two">
                        <div v-for="o in groupList" :key="o.id" @click="editchat(item, o)">{{ o.name }}</div>
                      </div>
                    </n-popover>
                  </div>
                  <!-- 从分组移除 -->
                  <div v-if="state.groupType != 'all' && agentInfo.user_type && agentInfo.user_type > 0"
                    @click="itemSet({ id: 5 }, item)">
                    <span>从分组移除</span>
                  </div>
                </div>
              </n-popover>
            </div>
          </div>
          <!-- 好友列表 -->
          <div v-else>
            <div v-for="item in friendList" :key="item.title">
              <div style="margin: 16px 0px 5px 10px;">{{ item.title }}</div>
              <div :class="['list_item', state.activeId == i.id ? 'item_active' : '']" v-for="i in item.list"
                :key="i.id" @click="selectUser(i)">
                <div class="item_left">
                  <div class="avatar">
                    <n-badge :value="i.unreadnums" :show="i.unreadnums > 0" :max="9999" class="set_item"
                      :offset="[-14, 8]">
                      <Imgt :src="`/img/head_icons/${i.THeadPhoto ? i.THeadPhoto : '1002'}.webp`" alt="" class="img1" />
                    </n-badge>
                    <Imgt :src="`/img/serviceModal/vip${i.vip}.webp`" alt="" class="img2" v-if="i.vip" />
                  </div>
                  <span>{{ i.TUsername }}</span>
                </div>

                <div class="high_proxy" :style="{ background: deepObj[i.deep] ? deepObj[i.deep].color : '' }">{{
                  deepObj[i.deep] && deepObj[i.deep].label || '直属玩家' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧聊天区域 -->
      <div class="right_content">
        <chatArea :chatList="state.chatMessagesList" :userData="state.userData" :deepObj="deepObj"></chatArea>
        <!-- 快捷语选择 -->
        <div class="setting_wrap">
          <div class="short_wrap">
            <n-carousel :slides-per-view="5" :space-between="10" :loop="false" draggable :show-dots="false">
              <div v-for="item in quickPhrasesCateList" :key="item.id">
                <n-popover trigger="hover" placement="top" :show-arrow="false">
                  <template #trigger>
                    <div class="short_wrap_item">
                      <span>{{ item.title }}</span>
                    </div>
                  </template>
                  <div class="short_wrap_list">
                    <span class="short_wrap_title"
                      v-for="op in quickPhrasesList.filter((ite: any) => ite.qhcid === item.id)"
                      @click="chooseQuick(op)" :key="op">{{ op.content }}</span>
                  </div>
                </n-popover>
              </div>
            </n-carousel>

          </div>
          <div class="setting" @click="showSetting" v-if="agentInfo.user_type && agentInfo.user_type > 0">快捷语设置</div>
        </div>
        <div class="send_message">
          <!-- <picker set="emojione" /> -->
          <div class="input_content">
            <div id="message-input" ref="msgRef" v-html="initMessage(testMsg)" contenteditable="true" spellcheck="false"
              autofocus class="input_wrap">
            </div>
            <div class="send_icon">
              <iconpark-icon icon-id="ftsx04" size="1.2rem" class="pointer" @click="sendMoney"
                v-if="agentInfo.user_type && agentInfo.user_type == 1 && agentInfo.moneyauth == 1" />
              <n-upload @before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.gif" :show-file-list="false">
                <iconpark-icon icon-id="ftsx01" size="1.2rem" class="pointer" />
              </n-upload>
              <n-upload @before-upload="beforeUpload" accept=".mp4,.avi,.mov,.wmv" :show-file-list="false">
                <iconpark-icon icon-id="ftsx03" size="1.2rem" class="pointer" />
              </n-upload>
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
          <div class="send_btn" @click="sendMsg" @keyup.enter="sendMsg">发送</div>
        </div>
      </div>
    </div>
    <!-- 快捷语设置 -->
    <shortcutSettings v-model:visible="visibleSetting" @showCateSetting="showCateSetting"
      @addModifyQuick="addModifyQuick" :quickPhrasesCateList="quickPhrasesCateList"
      :quickPhrasesList="quickPhrasesList" />
    <!-- 快捷语--分类设置 -->
    <categoryList v-model:visible="visibleCateSetting" @addModifyCateQuick="addModifyCateQuick"
      :quickPhrasesCateList="quickPhrasesCateList" />

    <manageGroup ref="groupRef" v-model:visible="visibleGroup" :deepObj="deepObj" :stateData="state"
      :itemList="chatitemList" />
    <!-- 转账弹窗 -->
    <sendMoneyModal v-model:visible="visibleTransfor" />
    <!-- 禁言弹窗 -->
    <forbiddenSpeech v-model:visible="visibleForbidden" :stateData="state" />
  </div>

</template>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import EmojiPicker from 'vue3-emoji-picker'
import IWebsocket from './chatWS'
import 'vue3-emoji-picker/css'
import protobuf from 'protobufjs';
import chatArea from './components/chatArea.vue';
import shortcutSettings from './components/shortcutSettings.vue';
import categoryList from './components/categoryList.vue';
import manageGroup from './components/manageGroup.vue'
import sendMoneyModal from './components/sendMoneyModal.vue'
import forbiddenSpeech from './components/forbiddenSpeech.vue'
import usechatHooks from './useHooks';
import { Message } from "@/utils/discreteApi.ts";
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import Imgt from '@/components/Imgt.vue';
import { useRoute } from 'vue-router';

import { Buffer } from 'buffer';
// import { Local } from "@/utils/storage";
interface tabType {
  label: string;
  id: number;
}
import { useI18n } from 'vue-i18n';

const route = useRoute()
const userInfo = User(pinia);
const { roleInfo, agentInfo } = storeToRefs(userInfo);
const msgRef: any = ref(null)
const groupRef: any = ref(null)
const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const deepObj: any = {
  '-1': { label: '上级代理', color: 'radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%), linear-gradient(to bottom, #fff, #928776)' },
  '1': { label: '下级代理', color: 'radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%), linear-gradient(to bottom, #fff, #928776)' },
  '0': { label: '官方客服', color: 'radial-gradient(circle at 50% 14%, #4c36b3 0%, #3a2786 48%, #3c279a 65%), linear-gradient(to bottom, #fff 0%, #af9eff 102%)' },

}
// const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
const state: any = reactive({
  root: null,
  messagetype: 1,//消息类型
  seqnumber: '',
  chatMessagesList: [], // 聊天消息
  deviceID: roleInfo.value.id,  //2654917
  requestid: 5000, //对方ID
  todeviceid: '', //对方设备ID
  firstIn: false,
  messageType: null,
  userData: {},
  activeId: null,
  search: '',   // 查询用户
  groupType: 'all',
})



// 上传图片视频
const beforeUpload = (data: any) => {
  const file = data.file.file
  const type = file.type.includes('image') ? 'image' : file.type.includes('video') ? 'video' : ''

  if (file && file.size > 1024 * 1024 * 2 && type == 'image') { // 2MB限制
    Message.error('文件大小不能超过2MB！')
    return;
  }
  if (file && file.size > 1024 * 1024 * 100 && type == 'video') { // 100MB限制
    Message.error('文件大小不能超过100MB！')
    return;
  }
  const formData = new FormData();
  formData.append(type, file);
  formData.append('device_id', state.deviceID);
  fetch(`http://18.162.112.52:8031/api/upload/${type == 'image' ? 'img' : 'video'}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json()).then(response => {
      if (response.code == 200 || response.status == 'success') {
        const urlImg = response.data.path
        msgRef.value.innerHTML = urlImg;
        state.messagetype = type == 'image' ? 3 : 4
        sendMsg()
      }
    })
}


// 选择用户聊天
const selectUser = (item: any) => {
  state.chatMessagesList = []
  state.userData = item
  state.activeId = item.id
  state.todeviceid = item.Tdeviceid
  // testMsg.value = ''
  // msgRef.value.innerHTML = ''
  // 获取聊天记录
  synchistorymsg()
  allRead()
  state.userData.unreadnums = 0  // 清掉未读消息
}

const {
  getChatlist, getChatMsg13, getDateFromat, synchistorymsg, chatitemList, getChatMsg24, getChatMsg12, initMessage, getListGroup, encodeParams,
  getShortcutCatelist, getShortcutCateMsg, sendShortcutCateList, getShortcutlist, getShortcutMsg, sendShortcutList, quickPhrasesCateList, quickPhrasesList,
  decodeContent, itemSet, groupList, editchat, searchuser, getChatMsg15, groupChatitemList, allRead, friendList
}: any = usechatHooks(state, selectUser)


const emit = defineEmits(['update:visible']);
const active_id = ref(1);
const testMsg = ref('')

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
  // { name: '未读', id: 2 },
  { name: '屏蔽', id: 3 },
  { name: '移动分组到', id: 4 },
]
// 添加表情

function onSelectEmoji(emoji: any) {
  testMsg.value = msgRef.value.innerHTML
  let img = `/:${emoji.r}:/`
  testMsg.value = testMsg.value + img
  msgRef.value.innerHTML = testMsg.value
}

const visibleTransfor = ref(false)
const visibleSetting = ref(false) // 快捷语设置
const visibleCateSetting = ref(false) // 快捷语分类设置
const visibleGroup = ref(false) // 管理分组弹窗
const visibleForbidden = ref(false) // 禁言弹窗

// 转账
const sendMoney = () => {
  visibleTransfor.value = true
}
// 所有未读消息数量
const allUnReadNum = computed(() => {
  let total = 0
  chatitemList.value.forEach((item: any) => {
    if (item.unreadnums && item.unreadnums > 0) {
      total = total + item.unreadnums
    }
  })
  return total
})


const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});


// 打开管理分组，获取分组列表
const manageClick = () => {
  visibleGroup.value = true
  getListGroup()
}

// 打开快捷语设置
const showSetting = () => {
  visibleSetting.value = true
}
// 打开快捷语分类设置
const showCateSetting = () => {
  visibleCateSetting.value = true
}


// 分组点击
const groupClick = (item: any) => {
  if (item == 'edit') {
    manageClick()
  } else if (item == 'all') {
    active_id.value = 1
    chatitemList.value = []
    state.groupType = item
    getChatlist()
  } else {
    active_id.value = 1
    state.groupType = item
    groupChatitemList.value = chatitemList.value.filter((o: any) => o.chatgroupid == item.id)
  }

}



// 发送消息
const sendMsg = () => {
  if (!state.todeviceid) {
    return
  }
  testMsg.value = msgRef.value.innerHTML
  if (testMsg.value != '') {
    const type = 6; // 给用户发消息
    state.requestid++;
    const requestid = state.requestid;

    const msginput = {
      // data:new TextEncoder().encode(this.jsmessage),
      data: testMsg.value
    };
    if (testMsg.value) {

    }
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
  } else {
    Message.error('请输入');
  }
}





const onOpen = async () => {
  if (route.name == 'customer') {
    state.deviceID = (localStorage.getItem('device_id') || state.deviceID) * 1
    const agent_infodata: any = localStorage.getItem('agent_infodata') || {}
    if (agent_infodata) {
      const data = JSON.parse(agent_infodata)
      agentInfo.value = data
    }
  }

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
  let obj: any = {
    1: 'MessageTextContent',//文字消息
    2: 'MessageMoContent',//表情消息
    3: 'MessagePicContent', //图片
    4: 'MessageVideoContent',//视频
    5: 'MessageMoneyContent'//转账
  }

  const decodeobj3 = decodeContent(decodeobj2.data, obj[decodeobj2.mtype])
  // console.log("onMessage/MessageTextContent output3 ", decodeobj3)
  if (data.cstatus == 1) {
    const messageObj = {
      cstatus: data.cstatus,  // 1; // 通过 显示   等于0或者没有这个字段  就不能显示
      msgtype: data.msgtype,
      date: decodeobj2.sendtime,   // 时间
      role: decodeobj2.fromdeviceid == state.deviceID ? 1 : 2,   //角色1 我方消息 2 对方消息
      content: decodeobj3.data,   //消息
      name: decodeobj2.fromdeviceid == state.deviceID ? '' : state.userData.TUsername
    }
    if (state.messageType == 4) {    //获取到新消息如果是当前用户直接显示
      if (state.userData.todeviceid == decodeobj2.fromdeviceid) {
        state.chatMessagesList.push(messageObj)
      } else {   // 不是当前用户则未读消息加1
        const todeviceItem = chatitemList.value.find((item: any) => item.todeviceid == decodeobj2.fromdeviceid)
        todeviceItem && todeviceItem.unreadnums++
      }

    } else {    // 聊天记录

      state.chatMessagesList.unshift(messageObj)
    }
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
  const decodeobj1 = decodeContent(buffer, 'Output');
  console.log("onMessage/Output output0 ", decodeobj1)
  state.messageType = decodeobj1.type
  if (decodeobj1.code && decodeobj1.code > 1000) {
    Message.error(t(decodeobj1.code));
    testMsg.value = ''
    msgRef.value.innerHTML = ''
    state.messagetype = 1
    return;
  }
  if (decodeobj1.type == 6) {//给用户发送消息的，确定发送成功还是失败
    // 没返回错误码正常可发送
    if (!decodeobj1.code) {
      var datatime = getDateFromat()
      if (state.messagetype != 1 && agentInfo.value.user_type != 1) {
        testMsg.value = `您发送的${state.messagetype == 3 ? '图片' : '视频'}正在审核，请耐心等待，审核通过后显示在前台`
      }
      state.chatMessagesList.push({ date: datatime, role: 1, content: testMsg.value, name: '' })
    }
    testMsg.value = ''
    msgRef.value.innerHTML = ''
    state.messagetype = 1
  }

  else if (decodeobj1.type == 4) {// 获取到新消息投递
    getChatMsg4(decodeobj1, 'Message')
  }
  //消息同步触发,或者是历史消息 也是使用type等于2下发的
  else if (decodeobj1.type == 2) {
    getChatMsg2(decodeobj1, 'SyncResp')
  }
  //消息同步触发,或者是历史消息 也是使用type等于2下发的
  else if (decodeobj1.type == 8) {
    getChatMsg2(decodeobj1, 'SyncResp')
  }
  // 保存分组成功
  else if (decodeobj1.type == 13) {
    getChatMsg13(decodeobj1)
  }
  // 移动好友到分组成功
  else if (decodeobj1.type == 14) {
    // Message.success('操作成功')
    getChatlist()
    state.groupType = 'all'
  }

  //分组列表保存回执
  else if (decodeobj1.type == 9) {
    Message.success('操作成功')
    groupRef.value.getChatMsg9(decodeobj1)
    getListGroup()
  }
  //分组列表保存回执
  else if (decodeobj1.type == 10) {
    Message.success('操作成功')
    groupRef.value.getChatMsg9(decodeobj1)

  }
  //分组列表删除回执
  else if (decodeobj1.type == 11) {
    getListGroup()
    Message.success('操作成功')
  }
  // 获取分组列表
  else if (decodeobj1.type == 12) {
    getChatMsg12(decodeobj1)
  }
  // 发起新聊天
  else if (decodeobj1.type == 15) {
    getChatMsg15(decodeobj1)
  }
  // 获取客服聊天列表
  else if (decodeobj1.type == 24) {
    getChatMsg24(decodeobj1)
  }

  // 新增，修改，删除快捷语，重新请求列表
  else if ([16, 17, 18].includes(decodeobj1.type)) {
    console.log('----更新快捷语')
    // 删除
    if (decodeobj1.type == 18) {
      Message.success(t('delete_success'));
    }
    getShortcutlist();
    getShortcutCatelist();
  }
  // 快捷语列表
  else if ([19].includes(decodeobj1.type)) {
    console.log('----获取快捷语')
    getShortcutMsg(decodeobj1)
  }
  // 快捷语--分类列表，重新请求列表
  else if ([20, 21, 22].includes(decodeobj1.type)) {
    console.log('----更新快捷语分类')
    // 删除
    if (decodeobj1.type == 22) {
      Message.success(t('delete_success'));
    }
    visibleCateSetting.value = false;
    getShortcutCatelist();
  }
  // 快捷语--分类列表，重新请求列表
  else if ([23].includes(decodeobj1.type)) {
    console.log('----获取快捷语分类')
    getShortcutCateMsg(decodeobj1);
  }

}


// 快捷语选择

const chooseQuick = (data: any) => {
  msgRef.value.innerHTML = data.content
  sendMsg()
}
// 快捷语增删改查
const addModifyQuick = (data: any) => {
  if (!data.mType) {
    return
  }
  sendShortcutList(data)
}
// 快捷语--分类增删改查
const addModifyCateQuick = (data: any) => {
  if (!data.mType) {
    return
  }
  sendShortcutCateList(data)
}


onMounted(async () => {
  IWebsocket.conectWebsocket()
  state.root = await protobuf.load('/connect.ext.proto');
  onOpen()
  IWebsocket.resgisterHandler(onMessage)
  getChatlist()

  getShortcutCatelist()
  getShortcutlist()
  getListGroup()
  // synchistorymsg()
})
</script>
<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

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

    >.forbidden {
      position: absolute;
      top: 0px;
      right: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;

      .forbidden_btn {
        width: 100px;
        background: url('/img/serviceModal/speech_btn.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 112%;
        color: #fff;
      }
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

        // text-align: center;

      }

      .mark {
        margin-bottom: 18px;
        width: 260px;
        height: 36px;
        background-color: #372771;
        border-radius: 10px;
        border: 1px solid #5a47b2;
        display: flex;
        justify-content: center;
        align-items: center;

        &:deep(.n-input) {
          .n-input__suffix {
            color: #ffffff
          }


        }
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

        span {
          padding: 0 6px;
          text-align: center;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

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
    background: url('/img/serviceModal/tab_btn.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 112%;
    color: #fff;
  }
}

.list_wrap {
  height: 420px;
  overflow: auto;

}

.user_list {
  display: flex;
  flex-direction: column;
  // gap: 20px

}

.list_item {
  height: 72px;
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
      position: relative;

      .img1 {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }

      .img2 {
        height: 21px;
        position: absolute;
        bottom: -6px;
        // margin-top: -15px;
      }
    }
  }

  .high_proxy {
    cursor: pointer;
    font-size: 12px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    color: #fff;
    padding: 6px 8px;
    border-radius: 6px;
    background-image: radial-gradient(circle at 50% 0%, #505481, #38406d 49%, #474e82 65%), linear-gradient(to bottom, #fff, #928776);

  }
}

.item_active {
  background-color: #422299
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
    background: url('/img/serviceModal/send_btn.webp?t=@{timestamp}') no-repeat;
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

  &:deep(.n-upload) {
    display: flex;
    align-items: center;

    .n-upload-trigger {
      display: flex;
      align-items: center;
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

.select_wrap,
.select_wrap_two {
  width: 150px;

  div {
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    // height: 36px;
    // line-height: 36px;
    cursor: pointer;
    color: #8E82C2;
    padding-left: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;

    &:last-child {
      padding-left: 0px;
    }

    &:hover {
      background-color: #1154FF;
      color: #ffffff;
    }

    &:last-child {
      border: unset;
    }
  }
}

.select_wrap_two {
  div {
    padding-left: 19px !important;
  }
}

.setting_wrap {
  display: flex;
  justify-content: space-between;

  .setting {
    cursor: pointer;
    margin-top: 6px;
    padding: 0 23px;
    width: 150px;
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
  max-width: 700px;
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 10px;
  padding-bottom: 6px;
  margin-bottom: 6px;
  margin-top: 12px;

  &::-webkit-scrollbar {
    display: block;
    height: 3px
  }

  &::-webkit-scrollbar-thumb {
    background: #3c279a;
    border-radius: 8px
  }

  .short_wrap_item {
    min-width: 98px;
    height: 33px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    border-radius: 10px;
    background: url('/img/serviceModal/anniu.webp?t=@{timestamp}') no-repeat;
    padding: 0 10px;
    background-size: 100% 100%;
  }
}

.short_wrap_list {
  display: flex;
  flex-direction: column;
  color: #ffffff;
  min-width: 110px;
  // padding: 16px 0px;
  // gap: 10px;

  span {
    cursor: pointer;
    text-align: left;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    &:hover {
      background-color: #1154FF;
    }
  }
}

:deep(.n-popover) {
  padding: unset !important;

  &:not(.n-popover--raw) {
    overflow: hidden;
    background-image: linear-gradient(to bottom, #2c205c 100%, #261771 -50%), linear-gradient(to bottom, #fff 0%, #af9eff 102%);
  }
}

.input_content {
  position: relative;
  width: 100%;
  height: 100%;

  .send_icon {
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.input_wrap {
  width: 100%;
  height: 80px;
  border-radius: 12px;
  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #322c59;
  background-color: #1d0e4a;
  outline: none;
  position: relative;
  padding: 10px;
  padding-right: 135px;
  overflow-y: auto;
}

.new_btn {
  color: #ffffff;
  cursor: pointer;
}

.group_area {
  max-height: 430px;
  overflow-y: auto;
}
</style>
