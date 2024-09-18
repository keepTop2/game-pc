<template>
  <n-modal :show="isLogin" :mask-closable="false">
    <div class="change_card1 ">
      <Login v-if="isLogin" />
    </div>
  </n-modal>

  <n-modal :show="isReg" :mask-closable="false" style="margin-top: 100px;">
    <div class="login_from_box">
      <Register v-if="isReg" />
    </div>
  </n-modal>

  <n-modal :show="isForget" :mask-closable="false">
    <div class="change_card">
      <Forget v-if="isForget" />
    </div>
  </n-modal>

  <!-- 一般公告 -->
  <n-modal :show="isNotice" :mask-closable="false">
    <div>
      <NoticeDialog v-if="isNotice" />
    </div>
  </n-modal>
  <!-- 客服弹窗 -->
  <n-modal :show="kefuVisible" :mask-closable="false">
    <div>
      <ServiceModal v-model:visible="kefuVisible" />
    </div>
  </n-modal>
  <header class="header">
    <div>
      <div class="logo_box">
        <Imgt src="/logo.png" class="logo" @click="router.push('/')" />
      </div>
      <div class="user_box">
        <!-- 皮肤切换 -->
        <themeBox />
        <n-popover trigger="hover" :show-arrow="false" v-for="(item, i) in state.icons" :key="i">
          <template #trigger>
            <span class="menu" :style="item.bg" @click="iconClick(item)">
              <n-badge :value="item.url == 'kf' ? page.unread : ''" :dot="item.icon == 'youxiang' && myEmail.hasNoRead">
                <iconpark-icon :icon-id="item.icon" size="1rem"></iconpark-icon>
              </n-badge>
            </span>
          </template>
          <div v-if="item.url == 'sq'">
            <p v-for="(v, j) in settings.community_list" :key="j" class="community_box" @click="openLink(v)">
              <iconpark-icon :icon-id="v.icon" color="#fff" size="1rem"></iconpark-icon>
              <span>{{ t(v.name_key) }}</span>
            </p>
          </div>
          <span v-else class="text_color">{{ t(item.tips) }}</span>
        </n-popover>
        <span class="country_box">
          <span>
            <n-popselect v-model:value="lang" :render-label="renderLabel" :options="settings.lang_list"
              @update:value="valueChange" trigger="click">
              <span>
                <Imgt :src="`/img/home/${lang}.png`" alt="country" />
                <iconpark-icon icon-id="Group39340" color="#8e82c2" size="1rem"></iconpark-icon>
              </span>
            </n-popselect>
          </span>
        </span>

        <div class="login_box" v-if="!hasLogin">

          <span :class="state.active == 1 ? 'active' : ''" @click="onLoginOpen">{{ t('home_page_login') }}</span>
          <span :class="state.active == 2 ? 'active' : ''" @click="onRegisterOpen">{{ t('home_page_signUp') }}</span>
        </div>

        <div v-else class="user_info">
          <p class="user_info_mon">
            <span>
              <Imgt src="/img/home/coin.webp" />
              <span>{{ verifyNumberComma(String(roleInfo.money + roleInfo?.bank_money)) }}</span>
            </span>
          </p>
          <span class="info_options">
            <n-popover trigger="hover" display-directive="show">
              <template #trigger>
                <span>
                  <Imgt @error="avatarLoadError"
                    :src="`/img/head_icons/${roleInfo.head_photo}.webp` || '/img/home/avatar.webp'" />
                  <iconpark-icon icon-id="Group39340" color="#8e82c2" size="1rem"></iconpark-icon>
                </span>
              </template>
              <div class="menu_box">
                <p :class="menuActive == i ? 'active' : ''" v-for="(item, i) in menu" :key="i"
                  @click="menuClick(item, i)">
                  <iconpark-icon :icon-id="item.icon" :color="menuActive == i ? '#fff' : '#8e82c2'"
                    size="1.2rem"></iconpark-icon>
                  <span>{{ t(item.name) }}</span>
                </p>
              </div>
            </n-popover>
          </span>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup lang='ts' name="Header">
import { reactive, onUnmounted, onMounted, defineAsyncComponent, h, watch } from 'vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { Local, needLoginApi } from '@/utils/storage';
import { useRoute, useRouter } from 'vue-router';

import { Dialog } from '@/utils/discreteApi';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { User } from '@/store/user';
import { handleOpenLink, verifyNumberComma } from '@/utils/others';

import { useI18n } from "vue-i18n";
import { NetEnumDef } from '@/netBase/NetEnumDef';
import defaultAvatar from "/img/home/avatar.webp"
import { convertDateToObject, convertObjectToDateString } from '@/utils/dateTime';
import { SelectRenderLabel } from 'naive-ui';
import { NetPacket } from '@/netBase/NetPacket';
import { Net, getLocale } from '@/net/Net';
import ServiceModal from './ServiceModal/ServiceModal.vue'
import Imgt from '@/components/Imgt.vue';
import themeBox from '@/components/ThemeC.vue';
const { t } = useI18n()
const page = Page(pinia);
const { menuActive, settings, lang } = storeToRefs(page);

// import { Search } from '@vicons/ionicons5'
const userInfo = User(pinia);
const { hasLogin, roleInfo, isForget, isReg, isLogin, isNotice, myEmail, kefuVisible } = storeToRefs(userInfo);
const router = useRouter();
const route = useRoute();


const Login = defineAsyncComponent(() => import('@/components/Login.vue'));
const Register = defineAsyncComponent(() => import('@/components/Register.vue'));
const Forget = defineAsyncComponent(() => import('@/components/Forget.vue'));
const NoticeDialog = defineAsyncComponent(() => import('@/components/NoticeDialog.vue'));

const menu = [
  {
    icon: 'qianbao1',
    name: 'home_page_myWallet',
    url: '/wallet/walletInfo',
  },
  {
    icon: 'Group39341',
    name: 'home_page_rechargeRecord',
    url: '/wallet/rechargeRecord',
  },
  {
    icon: 'Group39342',
    name: 'home_page_withdrawRecord',
    url: '/wallet/withdrawRecord',
  },
  {
    icon: 'Group39345',
    name: 'home_page_accountsRecord',
    url: '/wallet/accountsRecord',
  },
  {
    icon: 'Group39343',
    name: 'home_page_betRecord',
    url: '/wallet/betRecord',
  },
  {
    icon: 'Group39344',
    name: 'home_page_auditRecord',
    url: '/wallet/auditRecord',
  },

  // {
  //   icon: 'diannaodenglujilu1',
  //   name: 'home_page_loginRecord',
  //   url: '/wallet/loginRecord',
  // },
  {
    icon: 'diannaodenglujilu1',
    name: 'home_page_waterRecord',
    url: '/wallet/waterRecord',
  },
  {
    icon: 'Group39346',
    name: 'home_page_paymentManagement',
    url: '/wallet/paymentManagement',
  },
  {
    icon: 'Group39347',
    name: 'home_page_myPromo',
    url: '/wallet/myPromo',
  },
  {
    icon: 'youxiang2',
    name: 'home_page_myEmail',
    url: '/wallet/myEmail',
  },
  {
    icon: 'Group39348',
    name: 'home_page_onlineService',
    url: 'kf',
  },
  {
    icon: 'Group39349',
    name: 'home_page_securitySettings',
    url: '/wallet/securitySettings',
  },
  {
    icon: 'tuichu1',
    name: 'home_page_logout',
    url: '444',
    value: 444,
  },
]
const state: any = reactive({
  userInfo: null,
  active: 0,
  slider: true,
  icons: [
    {
      icon: 'shequ',
      color: '#8e82c2',
      tips: 'home_page_community',
      url: 'sq'
    },
    {
      icon: 'Group39337',
      color: '#8e82c2',
      tips: 'home_page_customerService',
      url: 'kf'
    },
    {
      icon: 'youxiang',
      color: '#8e82c2',
      tips: 'home_page_email',
      url: '/wallet/myEmail',
    },
    {
      icon: 'APPxiazai1',
      color: '#8e82c2',
      tips: 'home_page_downloadApp',
      url: 'dw'
    },
  ],
})

const renderLabel: SelectRenderLabel = (option: any) => {
  return h('div', {}, t(option.label))
}
const openLink = (item: any) => {
  if (item.url) {
    handleOpenLink(item.url)
  }

}

// wait页面跳转来的逻辑处理
const params: any = new URL(location.href).searchParams;
const paramsObj: any = {};
params.forEach((value: any, key: any) => {
  paramsObj[key] = value;
});
if (paramsObj.user_level) { // agent_level
  localStorage.setItem('agent_infodata', JSON.stringify(paramsObj))
  localStorage.setItem('agent_level', paramsObj.user_level)
  localStorage.setItem('device_id', paramsObj.device_id)
  // 缓存
  sessionStorage.setItem('agent_infodata', JSON.stringify(paramsObj))
  sessionStorage.setItem('agent_level', paramsObj.user_level)
  sessionStorage.setItem('device_id', paramsObj.device_id)
  // kefuVisible.value = true
  router.push('/customer')
} else {
  localStorage.setItem('agent_level', sessionStorage.getItem('agent_level') || '')
  localStorage.setItem('agent_infodata', sessionStorage.getItem('agent_infodata') || '')
  localStorage.setItem('device_id', sessionStorage.getItem('device_id') || '')
}
const iconClick = async (item: any) => {
  console.log(item)
  if (item.url) {
    switch (item.url) {
      // 客服
      case 'kf':
        handleOpenLink(settings.value.serviceTelegram)
        break;
      case 'dw':
        handleOpenLink(settings.value.appDownTipList.app_down_url)
        break;
      case 'sq':
        break;
      case '/wallet/myEmail':
        router.push(item.url)
        await page.setMenuActive(9, 'home_page_myEmail')

        break;
      default:
        router.push(item.url)
        break;
    }


  }
}
const menuClick = async (item: any, j: number) => {
  if (item.value == 444) {
    Dialog.warning({
      showIcon: false,
      title: t('home_page_logout'),
      content: t('home_page_confirmSignOut'),
      positiveText: t('home_page_confirm'),
      negativeText: t('home_page_cancel'),
      onPositiveClick: async () => {
        Local.remove('user')
        Local.remove('roleInfo')
        Local.set('menuActive', '')
        Local.set('menuName', '')
        await User(pinia).setHasLogin(false)
        location.href = '/'
      },
      onNegativeClick: () => {

      },
    })
  } else if (item.url == 'kf') {
    kefuVisible.value = true
  }
  else {
    await page.setMenuActive(j, item.name)
    router.push(item.url)
  }


}
const valueChange = async (item: any) => {

  await page.setLang(item)
}
const onLoginOpen = async () => {
  state.active = 1
  await User(pinia).setLogin(true)

};

const onRegisterOpen = async () => {
  state.active = 2
  await User(pinia).setReg(true)

};

const onHander_check_version = async (message: any) => {
  if (message.result != NetEnumDef.check_version_result.cvr_yes) {
    console.log("check version failed");
    return;
  }
  needLoginApi()
}
const onHander_system_notice = async (message: any) => {
  if (message.notice_list?.length) {
    const dialogList: any = message.notice_list.filter((item: any) => item.position == 1)

    const paomaList: any = message.notice_list.filter((item: any) => item.position == 0)

    // 弹窗公告
    let localIds = [] // 本地记录的不再显示
    try {
      localIds = JSON.parse(localStorage.getItem('readed_notice_ids') || '[]')
    } catch {
      localIds = []
    }
    const list: any = dialogList.filter((item: any) => !localIds.includes(item.title)).sort((a: any, b: any) => {
      return b.priority - a.priority
    })
    if (list.length) {

      await getLocale() // 获取最新翻译文案
      await User(pinia).setNoticeList(list)
      User(pinia).setNotice(true)
    }

    // 轮播公告
    paomaList.forEach((item: any) => {
      page.setTextAnnouncementMore(t(item.title) + ' - ' + t(item.content))
    })
  }
}

const avatarLoadError = (e: any) => {
  e.target.src = defaultAvatar
}
const onHandler_system_msg = async (m: any) => {
  // console.error('----系统消息', m)
  if (m.Params && m.Params.length == 6) { // 跑马灯
    // ***[0]*** 在 [3] 获得 [4] 金币奖励！
    const str = t('home_notice_mixtext', {
      user: `${m.Params[0]?.substr(0, 4)}***`,
      game: m.Params[3] ? t(m.Params[3]) : '',
      money: m.Params[4] ? Number(m.Params[4]).toLocaleString() : 0
    })
    page.setTextAnnouncementMore(str)
  }
  else if (m.Params.length == 1 && m.Params[0].includes('noticelist:')) { // 弹窗公告
    try {
      const msgId = m.Params[0].split(':')[1]
      if (msgId) {
        const list: any = [{
          content: `system_notice_content_${msgId}`,
          title: `system_notice_title_${msgId}`,
          position: 1,
          priority: m.priority,
          type: m.type,
        }]
        await getLocale() // 获取最新翻译文案

        await User(pinia).setNoticeList(list)
        User(pinia).setNotice(true)
      }
    } catch {
      console.error('error msg', m)
    }
  }
}

MessageEvent2.addMsgEvent(
  NetMsgType.msgType.msg_notify_loading_end,
  async () => {
    await User(pinia).setLoadingEnd(true)
  }
);


// 重复登录
MessageEvent2.addMsgEvent(
  NetMsgType.msgType.msg_notify_repeat_login,
  async () => {
    Local.remove('user')
    Local.remove('roleInfo')
    Local.set('menuActive', '')
    Local.set('menuName', '')
    await User(pinia).setHasLogin(false)
    Dialog.warning({
      showIcon: false,
      maskClosable: false,
      title: t('home_page_offlineNotification'),
      content: t('home_page_offlineContent', { time: convertObjectToDateString(convertDateToObject(new Date())) }),
      positiveText: t('home_page_offlineConfirm'),
      onPositiveClick: async () => {
        location.href = '/'
        await User(pinia).setLogin(true)
      },
      onClose: async () => {
        location.href = '/'
      },

    })
    // Dialog.warning({
    //   showIcon: false,
    //   maskClosable: false,
    //   title: '重复登录',
    //   content: '您的账号上次在2024-05-28 19:20:02于另一台安卓手机登录，如非本人操作，则密码可能泄露，建议您修改密码',
    //   positiveText: '修改密码',
    //   negativeText: '关闭',
    //   onPositiveClick: async () => {
    //     Local.remove('user')
    //     await User(pinia).setHasLogin(false)
    //     router.push('/')
    //   },
    //   onNegativeClick: () => {

    //   },
    // onClose: async () => {
    //   Local.remove('user')
    //   await User(pinia).setHasLogin(false)
    //   router.push('/')
    // },
    // })
  }
);

onMounted(async () => {
  let req_check_version_req = NetPacket.req_check_version();
  req_check_version_req.version = 1;
  Net.instance.sendRequest(req_check_version_req);

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_check_version,
    onHander_check_version
  );


  Local.set('agentid', route.query.uid || '0')
  if (Local.get('menuActive')) {
    await page.setMenuActive(Local.get('menuActive'), Local.get('menuName'))
  }



  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_send_system_notice,
    onHander_system_notice
  );
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_sys_msg,
    onHandler_system_msg
  );

})

onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_check_version, null);

});
watch(
  () => route.path,
  async (n: any) => {
    if (n) {
      let index = menu.findIndex((e: any) => e.url == n)

      if (index != -1) {
        await page.setMenuActive(index, menu[index].name)
      }
    }
  }
)


</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.header-bg-img {
  background-blend-mode: color-burn;
}

.country_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 32px;
  cursor: pointer;
  border-radius: 10px;
  background: linear-gradient(to top, #5734b4 -3%, #9d79ff 79%, #5734b4 97%);

  >span {
    width: 56px;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    padding: 6.7px 9px;
    border-radius: 10px;
    background-color: #131421;

  }

  span {
    display: flex;
    align-items: center;
    vertical-align: middle;
  }

  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}

.header {
  width: 100%;
  height: 80px;
  background-color: var(--c-bg-1);
  box-shadow: inset 0 0 4px 0 rgba(7, 144, 242, 0.2), 0 2px 4px 0 var(--c-shadow);
  background: linear-gradient(var(--c-he-f) 20%, var(--c-he-t)) 90%,
  url('/img/home/header.webp?t=@{timestamp}') no-repeat 0% 20%/cover;
  border-bottom: 2px solid var(--c-border);
  position: fixed;
  z-index: 100;

  >div {
    display: flex;
    height: 100%;
    width: 1562px;
    justify-content: space-between;


    >div {
      display: flex;
      justify-content: space-around;
      align-items: center;


    }

    .user_box {
      text-align: end;

      >span {
        margin-right: 10px;
      }

      >.login_box {
        display: flex;
        justify-content: space-around;
        width: 180px;
        margin-left: 40px;
        color: #fff;

        >span {
          min-width: 62px;
          height: 32px;
          display: flex;
          font-size: 12px;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          padding: 0 10px;
          // border: solid 1px #5a47b2;
          // background-color: #402c95;

          border-image: url('/img/home/unactive1.webp?t=@{timestamp}') 0 30 0 30 fill / 0px 10px stretch stretch;
          // background-size: cover;
          cursor: pointer;
        }

        .active {
          border-image: url('/img/home/active1.webp?t=@{timestamp}') 0 30 0 30 fill / 0px 10px stretch stretch;

        }
      }
    }
  }

  .logo {
    width: 141.3px;
    height: 40px;
    margin: 0 34.8px 0 62px;
    cursor: pointer;
  }



  .user_info {
    display: flex;
    align-items: center;

    .user_info_mon {
      font-size: 16px;
      cursor: pointer;
    }

    .info_options {
      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }


      img {
        width: 42px;
        height: 42px;
        border-radius: 15px;
        margin: 0 8px;
      }
    }


    >p {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      margin: 0;
      padding: 1px;
      border-radius: 10px;
      background: linear-gradient(to top, #5734b4 -3%, #9d79ff 79%, #5734b4 97%);

      >span {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 10px;
        height: 32px;
        background: #131421;
        padding: 0 6px;
        color: #fff;

        >img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .menu {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: solid 1px #5a47b2;
    background-color: #402c95;
    cursor: pointer;
    color: #8e82c2;

    &:hover {
      border-image-source: linear-gradient(to bottom, #fff 0%, #8cacff 103%);
      border-image-slice: 1;
      background-image: radial-gradient(circle at 50% 0%, #1170ff, #1154ff 56%, #6b11ff 90%), linear-gradient(to bottom, #fff 0%, #8cacff 103%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #fff;
      border: none;
    }
  }


}

.text_color {
  font-size: 12px;
  color: #fff;
}

.menu_box {
  // width: 120px;
  display: flex;
  flex-direction: column;

  >p {
    color: #8e82c2;
    padding: 10px 10px;
    margin: 0;
    // color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;

    >span {
      margin-left: 8px;
      font-size: 16px;
    }
  }

  .active {
    color: #fff;
  }
}

.change_card1 {
  width: 850px;
  min-height: 415px;
  background-color: #231353;
}

.change_card {
  width: 494px;
  min-height: 415px;
  padding: 0 0 45px;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  background-color: #231353;
}

.login_from_box {
  display: block;
  width: 494px;
  min-height: 415px;
  background-color: #231353;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.community_box {

  display: flex;
  align-items: center;
  font-size: 16px;
  color: #8e82c2;
  cursor: pointer;

  >span {
    margin-left: 12px;
  }
}
</style>
