<template>
  <n-config-provider style="width: 100%;" :locale="Language[lang].global" :date-locale="Language[lang].date"
    :theme-overrides="themeOverrides">
    <div class="app">
      <Header />
      <div class="hold"></div>
      <router-view></router-view>
      <Footer />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">

import { NConfigProvider, GlobalThemeOverrides, zhCN, dateZhCN, viVN, dateViVN, enUS, dateEnUS } from "naive-ui";
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { onMounted } from 'vue';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
// import { Page } from '@/store/page';
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { convertObjectToDateString } from '@/utils/dateTime';
const userInfo = User(pinia);
const { lang, roleInfo, myEmail } = storeToRefs(userInfo);
const Language: any = {
  en: {
    global: enUS,
    date: dateEnUS,
  },
  zh: {
    global: zhCN,
    date: dateZhCN,
  },
  vi: {
    global: viVN,
    date: dateViVN
  }
}


const themeOverrides: GlobalThemeOverrides = {

  common: {
    textColor1: '#8d81c1',
    primaryColor: '#5A47B2',
    primaryColorHover: '#000',
    borderRadius: '12px',
  },
  Button: {
    textColor: '#5A47B2',
    textColorHover: '#fff',
    textColorFocus: '#fff',
    textColorPressed: '#fff',
    paddingMedium: 0
  },
  Input: {
    color: '#1d0e4a',
    border: '1px solid #5A47B2',
    borderRadius: '12px',
    colorFocusError: '#1d0e4a',
    colorFocus: '#1d0e4a',
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
    const newData = { ...roleInfo.value }
    newData.money = data.cur_money
    await User(pinia).getRoleInfo(newData)
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
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_money_update2,
    handleUpdateMoney
  );
  // 监听新邮件
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_new_email,
    handleNewEmail
  );

})
</script>
<style lang="less" scoped>
.hold {
  height: 80px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: radial-gradient(circle at 50% 4%, #361e79, #22203e 66%);
}
</style>
@/netBase/NetMsgType
