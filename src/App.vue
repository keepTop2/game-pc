<template>
  <n-config-provider style="width: 100%;" :locale="Language[lang].global" :date-locale="Language[lang].date"
    :theme-overrides="themeOverrides">
    <div class="app">
      <Header v-if="!['customer'].includes(route.name)" />
      <NewMenu></NewMenu>
      <!-- <div class="hold"></div> -->
      <router-view></router-view>
      <Footer v-if="!['customer', 'openGame'].includes(route.name)" />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">

import { NConfigProvider, GlobalThemeOverrides, zhCN, dateZhCN, viVN, dateViVN, enUS, dateEnUS } from "naive-ui";
import Header from '@/components/NewHeader.vue';
import NewMenu from '@/components/NewMenu.vue';
import Footer from '@/components/Footer/Footer.vue';
import { onMounted } from 'vue';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { Page } from '@/store/page';
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { convertObjectToDateString } from '@/utils/dateTime';
import { Message } from "@/utils/discreteApi";
import { useI18n } from "vue-i18n";
import { Local } from '@/utils/storage';
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { useRoute } from "vue-router"

const route: any = useRoute()
const userInfo = User(pinia);
const page = Page(pinia);
const { roleInfo, myEmail } = storeToRefs(userInfo);
const { lang, settings } = storeToRefs(page);
const Language: any = {
  en: {
    global: enUS,
    date: dateEnUS,
  },
  zh: {
    global: zhCN,
    date: dateZhCN,
  },
  vn: {
    global: viVN,
    date: dateViVN
  }
}

const { t } = useI18n();

const themeOverrides: GlobalThemeOverrides = {

  common: {
    // textColor1: '#8d81c1',
    primaryColor: '#5A47B2',
    primaryColorHover: '#000',
    borderRadius: '8px',
  },
  Tabs: {
    tabTextColorLine: '#fff',
    tabTextColorActiveLine: '#fff',
    tabTextColorHoverLine: '#AEAEB0',
    tabBorderColor: '#212443'

  },
  Button: {
    textColor: '#fff',
    textColorHover: '#fff',
    textColorFocus: '#fff',
    textColorPressed: '#fff',
    paddingMedium: 0
  },
  Input: {
    color: '#212443',
    border: '1px solid #5A47B2',
    borderRadius: '12px',
    colorFocusError: '#212443',
    colorFocus: '#212443',
    textColor: '#fff',
    placeholderColor: '#8e82c2',

  },
  Dialog: {

  },
  Card: {

  },
  Modal: {

  },
  Select: {

  }

}

// 角色详情
const handleRoleInfo = async (data: any) => {
  await getAgentLevel(data)
  await User(pinia).getRoleInfo(data)
}
// 角色VIP详情
const handleVipInfo = async (data: any) => {
  await User(pinia).getVIPInfo(data)
}
// 用户详情
const handleUserInfo = async (data: any) => {
  await User(pinia).getInfo(data)
  await User(pinia).setHasLogin(true)
}
//获取用户角色
async function getAgentLevel(roleInfo: any) {
  if (settings.value.customer_server) {
    // 获取角色
    fetch(settings.value.customer_server + `/api/user/info?device_id=${roleInfo.id}`)
      .then(response => {
        return response.json(); // 将响应解析为 JSON
      })
      .then(async res => {
        await User(pinia).setAgentInfo(res?.data)
      })
  }
}

const emailList: any = []
let email_id_list: any = []
// 我的邮箱
const handleEmailInfo = async (rs: any) => {
  if (rs.emails.length > 0) {
    if (!email_id_list.includes(rs.emails[0].email_id)) {
      emailList.push(rs.emails[0])
    }
    if (emailList.length > 0) {
      email_id_list = emailList.map((item: any) => item.email_id)
    }
    const sb = new Set(rs.email_readed);
    emailList.forEach((item: any) => {
      const timer = convertObjectToDateString(item.recv_time)
      item.time = new Date(timer).getTime()
    });


    emailList.sort((a: any, b: any) => b.time - a.time); // 排序
    const list = emailList.filter(
      (item: any) => item.attachments[0].award_value == 0,
    );
    const rewardList = emailList.filter(
      (item: any) => item.attachments[0].award_value > 0,
    );
    const params = {
      email_readed: rs.email_readed,
      list,
      rewardList,
      email_id_list,
      hasNoRead: email_id_list.some((x: any) => !sb.has(x))
    };
    await User(pinia).setEmailList(params);
  }
};
// 监听新收到邮箱
const handleNewEmail = (rs: any) => {
  //奖励邮箱
  if (rs.new_email.attachments[0].award_value > 0) {
    myEmail.value.rewardList.unshift(rs.new_email)
  } else {
    myEmail.value.list.unshift(rs.new_email)
  }
  myEmail.value.hasNoRead = true
}

// 监听金额变化
const handleUpdateMoney = async (data: any) => {
  if (data) {
    // Message.success(t('deposit_page_depSuccess')); // 充值成功需要弹出提示
    const newData = { ...roleInfo.value }
    newData.money = data.cur_money
    await User(pinia).getRoleInfo(newData)
  }
}
// 余额变化
const handleUpdateRoleInfo = async (data: any) => {
  if (data?.id) {
    console.log('update-roleInfo---', data)
    // 因为这里返回的数据缺少了很多字段，所以需要这样处理
    const newData = {
      ...roleInfo.value,
      ...data
    }
    await User(pinia).getRoleInfo(newData)
  }
}
// 充值成功，弹出提示
const handleDepositSuc = async (data: any) => {
  if (data?.amount) {
    Message.success(t('deposit_page_depSuccess')); // 充值成功需要弹出提示
  } else {
    Message.error(t('deposit_page_depFail'));
  }
}
// 登录成功后发送邀请码
const handleLoginFinish = async (data: any) => {
  if (data.result == 1) {
    const agent_id = localStorage.getItem('agent_id')
    if (Number(agent_id)) {
      const rq = NetPacket.req_set_invitecode();
      rq.superior_id = Number(agent_id)
      Net.instance.sendRequest(rq);
    }
  }
}

onMounted(async () => {

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_roleinfo_msg,
    handleRoleInfo
  )
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_user_info,
    handleUserInfo
  );
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_vip_info,
    handleVipInfo
  );
  // 回执监听
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_email_list,
    handleEmailInfo,
  );
  // 前台充值金额变化
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_money_update2,
    handleUpdateMoney
  );
  // 监听新邮件
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_new_email,
    handleNewEmail
  );
  // 用户金额变化后，重新拉取金额
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_roleinfo_with_id,
    handleUpdateRoleInfo
  );
  // 充值成功
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_recharge_success_from_third,
    handleDepositSuc
  );
  // 登录完成
  MessageEvent2.addMsgEvent(
    10086,
    handleLoginFinish,
  );

  await page.setLang(Local.get('lang'))
  await page.setTheme(Local.get('themeColor'))

})
</script>
<style lang="less" scoped>
.hold {
  height: 95px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(/img/home/bg.webp);
  background-size: 5%;
}
</style>
