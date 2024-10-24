<template>
  <header class="header">
    <div>
      <div class="logo_box">
        <Imgt src="/img/header/logo.webp" class="home_logo" @click="router.push('/')" />
        <Imgt src="/img/header/fiba.webp" class="fiba" v-if="!isSearch" />
      </div>
      <div class="welcome">
        <Imgt src="/img/header/tips.webp" @click="router.push('/')" />
        <div class="title">
          <notice :textAnnouncement="textAnnouncement"></notice>
        </div>
      </div>

      <div class="search" v-click-outside="onClickOutside">
        <n-input size="large" placeholder="搜索" :class="{ input_ac: isSearch }">
          <template #prefix>
            <iconpark-icon
              icon-id="gliconshous"
              size="1.2rem"
              @click="search"
              class="input_icon"
              style="margin-left: 4px"
            ></iconpark-icon>
          </template>
        </n-input>

        <!-- <Imgt src="/img/header/search.webp" @click="search" v-if="!isSearch" /> -->
      </div>
      <!--       
      邮件收藏 -->
      <div class="email_wrap" v-if="hasLogin">
        <div class="email_main">
          <Imgt src="/img/header/email.webp" @click="router.push('/wallet/myEmail')" />
          <div class="email_dot" v-if="myEmail.hasNoRead"></div>
        </div>

        <Imgt src="/img/header/collect.webp" @click="router.push('/gameCollection')" />
      </div>

      <div class="login_wrap" v-if="!hasLogin">
        <div @click="onLoginOpen">Login</div>
        <n-button @click="onRegisterOpen">Sign Up</n-button>
      </div>

      <!--       
      主题色切换 -->
      <div class="theme">
        <Imgt
          v-if="theme == 'day'"
          src="/img/header/day.webp"
          @click="changeTheme('night')"
        />
        <Imgt v-else src="/img/header/night.webp" @click="changeTheme('day')" />
      </div>

      <!--       
      账号信息 -->
      <div class="account" v-if="hasLogin">
        <div class="account_bit">
          <span>BIT</span>
          <Imgt src="/img/header/bit.webp" />
        </div>
        <div>{{ verifyNumberComma(String(roleInfo.money)) }}</div>
      </div>

      <!--       
      头像 语言 -->
      <div class="avatar">
        <div>
          <n-popover trigger="hover" display-directive="show" :show-arrow="false">
            <template #trigger>
              <span class="avatar_wrap" @click="visibleSetting = true">
                <Imgt
                  @error="avatarLoadError"
                  :src="
                    `/img/head_icons/${roleInfo.head_photo}.webp` ||
                    '/img/home/avatar.webp'
                  "
                  class="avatar_logo"
                />
                <iconpark-icon
                  icon-id="Group39340"
                  color="#8e82c2"
                  size="1rem"
                ></iconpark-icon>
              </span>
            </template>
            <div class="menu_box">
              <p
                :class="menuActive == i ? 'active' : ''"
                v-for="(item, i) in menu"
                :key="i"
                @click="menuClick(item, i)"
              >
                <iconpark-icon :icon-id="item.icon" size="1.2rem"></iconpark-icon>
                <span>{{ t(item.name) }}</span>
              </p>
            </div>
          </n-popover>
        </div>
        <div class="country_box">
          <n-popselect
            v-model:value="lang"
            :render-label="renderLabel"
            :options="settings.lang_list"
            @update:value="valueChange"
            trigger="click"
          >
            <span>
              <Imgt :src="`/img/header/${lang}.webp`" alt="country" />
            </span>
          </n-popselect>
        </div>
      </div>

      <!-- 弹窗登录 -->
      <n-modal :show="isLogin" :mask-closable="false">
        <div class="change_card1">
          <Login v-if="isLogin" />
        </div>
      </n-modal>
      <!-- 注册 -->
      <n-modal :show="isReg" :mask-closable="false">
        <div class="change_card1">
          <Register v-if="isReg" />
        </div>
      </n-modal>
      <!-- 忘记密码 -->
      <n-modal :show="isForget" :mask-closable="false">
        <div class="change_card1">
          <Forget v-if="isForget" />
        </div>
      </n-modal>
      <!-- 进入免费夺宝入口 -->
      <RegPop></RegPop>

      <!-- 头像设置 -->
      <avatarSettings v-model:visible="visibleSetting" />
    </div>
    <RedeemCode v-if="showRedeemCode" />
  </header>
</template>

<script setup lang="ts" name="Header">
import { onUnmounted, onMounted, ref, defineAsyncComponent, reactive, h } from "vue";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { Local, needLoginApi } from "@/utils/storage";
import { useRoute, useRouter } from "vue-router";

import { Dialog, Message } from "@/utils/discreteApi";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { Page } from "@/store/page";
import { User } from "@/store/user";
import { handleOpenLink, verifyNumberComma } from "@/utils/others";
import avatarSettings from "@/views/wallet/components/avatarSettings.vue";
import { useI18n } from "vue-i18n";
import { NetEnumDef } from "@/netBase/NetEnumDef";
import defaultAvatar from "/img/home/avatar.webp";
import { convertDateToObject, convertObjectToDateString } from "@/utils/dateTime";
// import { SelectRenderLabel } from 'naive-ui';
import { NetPacket } from "@/netBase/NetPacket";
import { Net, getLocale } from "@/net/Net";
import Imgt from "@/components/Imgt.vue";
import useHeaderHooks from "./useHooks";
import { SelectRenderLabel } from "naive-ui";
import useClickOutSideHooks from "@/utils/vClickOutside";
import notice from "./notice.vue";
import RedeemCode from "@/views/wallet/components/RedeemCode.vue";

const Login = defineAsyncComponent(() => import("@/components/Login.vue"));
const Register = defineAsyncComponent(() => import("@/components/Register.vue"));
const RegPop = defineAsyncComponent(() => import("@/components/RegPop.vue"));

const { vClickOutside } = useClickOutSideHooks();

const onClickOutside = () => {
  console.log("点击了外部 DOM");
  isSearch.value = false;
};

const { t } = useI18n();
const page = Page(pinia);
const { menuActive, settings, lang, textAnnouncement } = storeToRefs(page);
// import { Message } from "@/utils/discreteApi.ts";
// import { Search } from '@vicons/ionicons5'
const userInfo = User(pinia);
const {
  hasLogin,
  isLogin,
  isReg,
  isForget,
  roleInfo,
  kefuVisible,
  agentInfo,
  myEmail,
} = storeToRefs(userInfo);
const router = useRouter();
const route = useRoute();
const theme = ref("day");
const visibleSetting = ref(false);
const state: any = reactive({
  userInfo: null,
  active: 0,
  slider: true,
});
const menu = [
  {
    icon: "txxlicon01",
    name: "page_route_wallet",
    url: "/wallet/walletInfo",
  },
  {
    icon: "txxlicon02",
    name: "page_route_recharge",
    url: "/wallet/records",
  },
  {
    icon: "txxlicon03",
    name: "page_route_withdraw",
    url: "/wallet/withdraw",
  },
  {
    icon: "txxlicon04",
    name: "page_route_VIP",
    url: "/wallet/levelInfo",
  },
  {
    icon: "txxlicon05",
    name: "page_route_proxy",
    url: "/wallet/proxyCooperation",
  },
  {
    icon: "txxlicon06",
    name: "page_route_payment",
    url: "/wallet/paymentManagement",
  },

  {
    icon: "txxlicon07",
    name: "page_route_activity",
    url: "/wallet/activity",
  },
  {
    icon: "txxlicon08",
    name: "page_route_discount",
    url: "/wallet/myPromo",
  },
  {
    icon: "txxlicon15",
    name: "page_route_record",
    url: "/wallet/records",
  },
  // {
  //   icon: 'txxlicon09',
  //   name: '奖励',
  //   url: '/wallet/myEmail',
  // },
  {
    icon: "txxlicon10",
    name: "page_route_redemptionCode",
    url: "redeemCode",
  },
  {
    icon: "txxlicon11",
    name: "page_route_mail",
    url: "/wallet/myEmail",
  },
  {
    icon: "txxlicon12",
    name: "page_route_security",
    url: "/wallet/securitySettings",
  },
  {
    icon: "txxlicon13",
    name: "page_route_feedback",
    url: settings.value.serviceTelegram,
  },
  // {
  //   icon: "txxlicon13",
  //   name: "客服",
  //   url: settings.value.serviceTelegram,
  //   value: 666,
  // },
  {
    icon: "txxlicon14",
    name: "home_page_logout",
    url: "444",
    value: 444,
  },
];
const { search, isSearch, showRedeemCodeModal, showRedeemCode } = useHeaderHooks();
const valueChange = async (item: any) => {
  await page.setLang(item);
};
const avatarLoadError = (e: any) => {
  e.target.src = defaultAvatar;
};
const renderLabel: SelectRenderLabel = (option: any) => {
  return h("div", {}, t(option.label));
};
// 主题色切换1
const changeTheme = (value: any) => {
  console.log(value);
  theme.value = value;
};
// 打开登录弹窗
const onLoginOpen = async () => {
  state.active = 1;
  await User(pinia).setLogin(true);
};
// 打开注册弹窗
const onRegisterOpen = async () => {
  state.active = 2;
  await User(pinia).setReg(true);
};

const menuClick = async (item: any, j: number) => {
  let str = item.url.substring(0, 4);
  if (item.value == 444) {
    return Dialog.warning({
      showIcon: false,
      title: t("home_page_logout"),
      content: t("home_page_confirmSignOut"),
      positiveText: t("home_page_confirm"),
      negativeText: t("home_page_cancel"),
      onPositiveClick: async () => {
        Local.remove("user");
        Local.remove("roleInfo");
        Local.set("menuActive", "");
        Local.set("menuName", "");
        await User(pinia).setHasLogin(false);
        location.href = "/";
      },
      onNegativeClick: () => {},
    });
  } else if (item.url == "redeemCode") {
    // 兑换码
    showRedeemCodeModal(true);
  } else if (item.value == 666) {
    if ([2, 4].includes(agentInfo.value.mutetype.type_id)) {
      return Message.error("用户被封禁");
    } else {
      kefuVisible.value = true;
      return;
    }
  } else if (str === "http" || str === "www.") {
    handleOpenLink(item.url);
  } else {
    await page.setMenuActive(j);
    router.push(item.url);
  }
};

// const renderLabel: SelectRenderLabel = (option: any) => {
//   return h('div', {}, t(option.label))
// }
// const openLink = (item: any) => {
//   if (item.url) {
//     handleOpenLink(item.url)
//   }

// }

// wait页面跳转来的逻辑处理
const params: any = new URL(location.href).searchParams;
const paramsObj: any = {};
params.forEach((value: any, key: any) => {
  paramsObj[key] = value;
});
if (paramsObj.user_level) {
  // agent_level
  localStorage.setItem("agent_infodata", JSON.stringify(paramsObj));
  localStorage.setItem("agent_level", paramsObj.user_level);
  localStorage.setItem("device_id", paramsObj.device_id);
  // 缓存
  sessionStorage.setItem("agent_infodata", JSON.stringify(paramsObj));
  sessionStorage.setItem("agent_level", paramsObj.user_level);
  sessionStorage.setItem("device_id", paramsObj.device_id);
  // kefuVisible.value = true
  router.push("/customer");
} else {
  localStorage.setItem("agent_level", sessionStorage.getItem("agent_level") || "");
  localStorage.setItem("agent_infodata", sessionStorage.getItem("agent_infodata") || "");
  localStorage.setItem("device_id", sessionStorage.getItem("device_id") || "");
}

const onHander_check_version = async (message: any) => {
  if (message.result != NetEnumDef.check_version_result.cvr_yes) {
    console.log("check version failed");
    return;
  }
  needLoginApi();
};
const onHander_system_notice = async (message: any) => {
  if (message.notice_list?.length) {
    const dialogList: any = message.notice_list.filter((item: any) => item.position == 1);

    const paomaList: any = message.notice_list.filter((item: any) => item.position == 0);

    // 弹窗公告
    let localIds = []; // 本地记录的不再显示
    try {
      localIds = JSON.parse(localStorage.getItem("readed_notice_ids") || "[]");
    } catch {
      localIds = [];
    }
    const list: any = dialogList
      .filter((item: any) => !localIds.includes(item.title))
      .sort((a: any, b: any) => {
        return b.priority - a.priority;
      });
    console.log(77777777, list);

    if (list.length) {
      await getLocale(); // 获取最新翻译文案
      await User(pinia).setNoticeList(list);
      User(pinia).setNotice(true);
    }

    // 轮播公告
    paomaList.forEach((item: any) => {
      page.setTextAnnouncementMore(t(item.title) + " - " + t(item.content));
    });
  }
};

// const avatarLoadError = (e: any) => {
//   e.target.src = defaultAvatar
// }
const onHandler_system_msg = async (m: any) => {
  // console.error('----系统消息', m)
  if (m.code == 903) {
    if (m.Params[0] == 1) {
      // 弹窗公告
      try {
        const list: any = [
          {
            content: `system_notice_content_${m.Params[3]}`,
            title: `system_notice_title_${m.Params[2]}`,
            position: 1,
            priority: m.priority,
            type: m.Params[1],
          },
        ];
        await getLocale(); // 获取最新翻译文案

        await User(pinia).setNoticeList(list);
        User(pinia).setNotice(true);
      } catch {
        console.error("error msg", m);
      }
    } else {
      if (m.Params && m.Params.length == 6) {
        // 跑马灯
        // ***[0]*** 在 [3] 获得 [4] 金币奖励！
        const str = t("home_notice_mixtext", {
          user: `${m.Params[0]?.substr(0, 4)}***`,
          game: m.Params[3] ? t(m.Params[3]) : "",
          money: m.Params[4] ? Number(m.Params[4]).toLocaleString() : 0,
        });
        page.setTextAnnouncementMore(str);
      }
    }
  }
};

MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_loading_end, async () => {
  await User(pinia).setLoadingEnd(true);
});

// 重复登录
MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_repeat_login, async () => {
  Local.remove("user");
  Local.remove("roleInfo");
  Local.set("menuActive", "");
  Local.set("menuName", "");
  await User(pinia).setHasLogin(false);
  Dialog.warning({
    showIcon: false,
    maskClosable: false,
    title: t("home_page_offlineNotification"),
    content: t("home_page_offlineContent", {
      time: convertObjectToDateString(convertDateToObject(new Date())),
    }),
    positiveText: t("home_page_offlineConfirm"),
    onPositiveClick: async () => {
      location.href = "/";
      await User(pinia).setLogin(true);
    },
    onClose: async () => {
      location.href = "/";
    },
  });
});
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
//   onClose: async () => {
//     Local.remove('user')
//     await User(pinia).setHasLogin(false)
//     router.push('/')
//   },
// })

// document.addEventListener("click", (el: any) => {
//   const className = el.target?.className;
//   console.log(44444444, className.indexOf("input"));
//   if (className.indexOf("input") == "-1") {
//     isSearch.value = false;
//   }
// });

onMounted(async () => {
  let req_check_version_req = NetPacket.req_check_version();
  req_check_version_req.version = 1;
  Net.instance.sendRequest(req_check_version_req);

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_check_version,
    onHander_check_version
  );

  Local.set("agentid", route.query.uid || "0");
  if (Local.get("menuActive")) {
    await page.setMenuActive(Local.get("menuActive"));
  }

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_send_system_notice,
    onHander_system_notice
  );
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_sys_msg, onHandler_system_msg);
});

onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_check_version, null);
});
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.header-bg-img {
  background-blend-mode: color-burn;
}

.country_box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;

  cursor: pointer;

  img {
    width: 32px;
    height: 24px;
    vertical-align: middle;
  }
}

.header {
  width: 100%;
  height: 95px;
  display: flex;
  justify-content: center;
  // border-bottom: 2px solid var(--c-border);
  position: relative;
  z-index: 100;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    .home_logo {
      height: 68px;
      width: 186px;
    }

    .fiba {
      width: 162px;
      height: 42px;
      margin-left: 11px;
    }

    .logo_box {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
      }
    }

    // justify-content: space-between;
    .welcome {
      width: 424px;
      height: 60px;
      margin-left: 30px;
      border-radius: 100px;
      background: #0b0b0b;
      display: flex;
      align-items: center;

      img {
        width: 77px;
        height: 66px;
      }

      .title {
        color: #9497a1;
        font-size: 20px;
        font-weight: 500;
        margin-left: 20px;
        white-space: nowrap;
      }
    }

    .search {
      display: flex;
      align-items: center;
      margin-left: 44px;

      img {
        width: 60px;
        height: 60px;
        cursor: pointer;
      }

      .input_ac {
        width: 260px !important;
        transition: all 1s ease;
      }

      .n-input {
        height: 60px;
        background: #000223;
        width: 60px;
        border: 1px solid #36445e;
        border-radius: 100px;
        will-change: width;
        transition: all 500ms;
        cursor: pointer;

        &:deep(.n-input-wrapper) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &:deep(.n-input__placeholder) {
          height: 60px;
          line-height: 60px;
          font-size: 20px;
          padding-left: 10px;

          span {
            height: 60px;
            line-height: 60px;
            font-size: 20px;
          }
        }

        &:deep(.n-input__input-el) {
          height: 60px;
          line-height: 60px;
          font-size: 20px;

          span {
            height: 60px;
            line-height: 60px;
            font-size: 20px;
          }
        }
      }
    }

    .email_wrap {
      display: flex;
      align-items: center;
      margin-left: 10px;

      img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .login_wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: 24px;
      width: 215px;

      div {
        font-weight: 500;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }

      .login_btn {
        width: 142px;
        height: 52px;
        border-radius: 8px;
        line-height: 52px;
        text-align: center;
        font-weight: 500;
        color: #fff;
        font-size: 20px;
        background: linear-gradient(180deg, #5567ff 0%, #9e1eff 100%);
      }
    }

    .theme {
      margin-left: 20px;
      display: flex;
      align-items: center;

      img {
        width: 102px;
        height: 56px;
        cursor: pointer;
      }
    }

    .account {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      font-size: 20px;
      margin-left: 10px;

      img {
        height: 30px;
        width: 30px;
      }

      .account_bit {
        display: flex;
        align-items: center;
      }
    }

    .avatar {
      display: flex;
      align-items: center;

      .avatar_wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .avatar_logo {
        margin-left: 20px;
        height: 53px;
        width: 53px;
        cursor: pointer;
        border-radius: 50%;
      }
    }

    .user_box {
      text-align: end;

      > span {
        margin-right: 10px;
      }

      > .login_box {
        display: flex;
        justify-content: space-around;
        width: 180px;
        margin-left: 40px;
        color: #fff;

        > span {
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

          border-image: url("/img/home/unactive1.webp?t=@{timestamp}") 0 30 0 30 fill /
            0px 10px stretch stretch;
          // background-size: cover;
          cursor: pointer;
        }

        .active {
          border-image: url("/img/home/active1.webp?t=@{timestamp}") 0 30 0 30 fill / 0px
            10px stretch stretch;
        }
      }
    }
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

    > p {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      margin: 0;
      padding: 1px;
      border-radius: 10px;
      background: linear-gradient(to top, #5734b4 -3%, #9d79ff 79%, #5734b4 97%);

      > span {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 10px;
        height: 32px;
        background: #131421;
        padding: 0 6px;
        color: #fff;

        > img {
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
      background-image: radial-gradient(
          circle at 50% 0%,
          #1170ff,
          #1154ff 56%,
          #6b11ff 90%
        ),
        linear-gradient(to bottom, #fff 0%, #8cacff 103%);
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

  > p {
    color: #fff;
    padding: 10px 10px;
    margin: 0;
    // color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;

    > span {
      margin-left: 8px;
      font-size: 16px;
    }
  }

  .active {
    color: #8e82c2;
  }
}

.change_card1 {
  border-radius: 16px;
  border: 1px solid #26294c;
  background-color: #14173a;
}

.change_card {
  width: 494px;
  min-height: 415px;
  padding: 0 0 45px;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  background-color: #231353;
}

.community_box {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #8e82c2;
  cursor: pointer;

  > span {
    margin-left: 12px;
  }
}
.email_main {
  position: relative;
  .email_dot {
    position: absolute;
    top: 5px;
    right: 10px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: red;
    animation: dot-info-animal 1.6s infinite ease-in-out;
  }

  @keyframes dot-info-animal {
    0% {
      opacity: 0.3;
      transform: scale(0.9);
    }

    50% {
      opacity: 0.7;
      transform: scale(1.12);
    }

    100% {
      opacity: 0.3;
      transform: scale(0.9);
    }
  }
}
</style>
