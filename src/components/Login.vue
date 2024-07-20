<template>
  <div class="login_from_box">
    <img src="/img/login/silder.webp" alt="" />
    <span class="close">
      <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
    </span>
    <div class="login_form">
      <div class="tab">
        <span :class="state.active == i ? 'active' : ''" v-for="(tab, i) in tabList" :key="i" @click="changeTab(i)">{{
        t(tab.name) }}</span>
      </div>
      <n-form :model="state.login" :rules="state.loginRules" :show-label="false" ref="loginFormRef">
        <template v-for="item in state.loginList">
          <n-form-item :path="item.name" v-if="item.show" feedback-class="input_item_err">

            <n-popselect v-if="item.isPhone" v-model:value="state.codeValue" :options="state.codeOptions"
              @update:value="valueChange" trigger="click">
              <span class="code_box">
                <span>+{{ state.codeValue }}</span>
                <iconpark-icon icon-id="Group39369" color="#8e82c2" size="1rem"></iconpark-icon>
              </span>
            </n-popselect>
            <!-- <n-select v-if="item.type == 'select'" v-model:value="state.login[item.name]" :filterable="item.filterable"
              :multiple="item.multiple" :placeholder="t(item.placeholder)" :options="item.options"
              :render-label="renderLabel" /> -->
            <n-input clearable @keyup.enter="handleSubmit" :type="item.type" size="large"
              v-model:value="state.login[item.name]" :placeholder="t(item.placeholder)">
              <template #prefix v-if="item.leftIcon">
                <iconpark-icon :icon-id="item.leftIcon" color="#8e82c2" size="1rem"></iconpark-icon>
              </template>
              <template #suffix v-if="item.slot">
                <iconpark-icon v-if="item.changeRightIcon" @click="iconClick(item)" :icon-id="item.changeRightIcon"
                  color="#8e82c2" size="1rem"></iconpark-icon>
              </template>
            </n-input>
            <span v-if="item.slot && item.name == 'captcha'" @click="refresh_captcha" class="btn">
              <img :src="captchaURL" alt="captchaURL">
              <iconpark-icon icon-id="Group39366" color="#8e82c2" size="1.5rem"></iconpark-icon>
            </span>
          </n-form-item>
        </template>

      </n-form>
      <p class="set_password">
        <!-- <span class="checkbox" @click="savePassword">
          <b :class="state.rememberPassword ? 'checkbox_click' : ''"></b>{{ t('home_page_rememberPassword') }}
        </span> -->
        <!-- <span class="forgot"> -->
        <i @click="onForget">{{ t('home_page_forgetPassword') }}</i>

        <i @click="onReg">{{ t('home_page_noAccount') }}</i>
        <!-- </span> -->
      </p>
      <n-button class="login_btn" :loading="state.loading" :bordered="false" block @click="onLoginSubmit">{{
        t('home_page_login') }}</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, } from "vue";
// import {
//   NAvatar,
//   NText,
//   NTag,
//   SelectRenderTag,
//   SelectRenderLabel,
//   NIcon
// } from 'naive-ui'
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { NetMsgType } from "@/netBase/NetMsgType";
import { NetEnumDef } from "@/netBase/NetEnumDef";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { needLoginApi } from "@/utils/storage";
// import { Close } from '@vicons/ionicons5'
import { getRandomSign, getDeviceId, aaa, bbb, device_model } from "@/net/Utils";
import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { Message } from '@/utils/discreteApi'
import { verifyCaptcha, verifyEmail, verifyMobile, verifyPassword, verifyWithdrawPwd } from "@/utils/is";
import { useI18n } from 'vue-i18n';
import { IP } from "@/utils/others";
import { useRoute } from "vue-router";
const { t } = useI18n();
const loginFormRef = ref();
const route = useRoute();
// const userInfo = User(pinia);
// const { isLogin } = storeToRefs(userInfo);

const captchaURL = ref("");


// const renderLabel: SelectRenderLabel = (option) => {
//   return h(
//     'div',
//     {
//       style: {
//         display: 'flex',
//         justifyContent: 'space-around',
//         alignItems: 'center'
//       }
//     },
//     [
//       h('div', { style: { width: '100px' } }, [option.label as string]),
//       h(NIcon, {
//         style: {
//           marginLeft: '20px'
//         }
//       }, {
//         default: () => h(Close)
//       }),
//     ]
//   )
// }

// 测试账号   // zy0003, zy0003,
const state: any = reactive({
  loading: false,
  active: 0,
  formInitValue: null,
  rememberPassword: true,
  loginList: {
    phone: {
      name: "phone",
      type: "text",
      placeholder: 'home_page_enterPhoneNumber',
      slot: !1,
      leftIcon: false,
      changeRightIcon: !1,
      show: !1,
      isPhone: true
    },
    account: {
      name: "account",
      type: "text",
      placeholder: 'home_page_enterAccount',
      slot: !1,
      leftIcon: "Group39361",
      changeRightIcon: !1,
      show: true,
      // filterable: true,
      // options: [
      //   {
      //     label: 'Drive My Car',
      //     value: 'song1'
      //   },
      //   {
      //     label: 'Norwegian Wood',
      //     value: 'song2'
      //   },
      //   {
      //     label: "You Won't See",
      //     value: 'song3',

      //   },
      // ]
    },
    email: {
      name: "email",
      type: "text",
      placeholder: 'home_page_enterEmail',
      slot: !1,
      leftIcon: "Group39361",
      changeRightIcon: !1,
      show: false,
    },
    password: {
      name: "password",
      type: "password",
      placeholder: 'home_page_enterPassword',
      slot: !0,
      leftIcon: "Group39362",
      changeRightIcon: "Group39364",
      show: !0,
    },
    captcha: {
      name: "captcha",
      type: "text",
      placeholder: 'home_page_enterVerificationCode',
      slot: !0,
      leftIcon: "Group39363",
      changeRightIcon: !1,
      show: !0,
    },
  },

  login: {
    captcha: "",
    userName: '',
    phone: '',
    account: '',
    email: '',
    password: '',
  },
  loginRules: {
    phone: [
      {
        required: true,
        trigger: "blur",
        validator: (_rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterPhoneNumber'))
          } else
            if (verifyMobile(state.codeValue, value)) {
              return true
            } else {
              return new Error(t('home_page_phoneNumberFormatIncorrect'))
            }

        },
      }
    ],
    captcha: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterVerificationCode'))
          } else
            if (verifyCaptcha(rule, value)) {
              return true
            } else {
              return new Error(t('home_page_verificationCodeFormatIncorrect'))
            }
        },

      },
    ],
    email: [
      {
        required: !0,
        trigger: "blur",
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterEmail'))
          } else if (verifyEmail(rule, value)) {
            return true
          } else {
            return new Error(t('home_page_emailIncorrect'))
          }
        },
      }
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterPassword'))
          } else
            if (verifyPassword(rule, value)) {
              return true
            } else {
              return new Error(t('home_page_passwordFormatIncorrect'))
            }
        },

      },
    ],
    account: [
      {
        required: true,
        trigger: "blur",
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterAccount'))
          } else
            if (verifyWithdrawPwd(rule, value)) {
              return true
            } else {
              return new Error(t('home_page_accountFormatIncorrect'))
            }
        },

      },
    ],
  },

  codeValue: '84',
  codeOptions: [
    // {
    //   label: '+63',
    //   value: '+63',
    // },
    {
      label: '84',
      value: '84',
    },
    // {
    //   label: '+86',
    //   value: '+86',
    // },
  ]
})

const tabList = [
  { name: 'home_page_accountLogin', value: 1 },
  { name: 'home_page_emailLogin', value: 2 }
]
const valueChange = (item: any) => {
  console.log(item);

}
// const savePassword = () => {

//   state.rememberPassword = !state.rememberPassword

// }


const onForget = async () => {
  await User(pinia).setLogin(false)
  await User(pinia).setForget(true)
};
const onReg = async () => {
  await User(pinia).setLogin(false)
  await User(pinia).setReg(true)
};
const onLoginSubmit = () => {
  loginFormRef.value?.validate((errors: any) => {
    if (!errors) {

      handleSubmit();
    } else {
      console.log(errors);
    }
  });
};
const iconClick = (a: any) => {
  if (a.changeRightIcon == "Group39364") {

    a.type = "text"
    a.changeRightIcon = "Group39365"
    state.rememberPassword = false
  } else {
    a.type = "password"
    a.changeRightIcon = "Group39364"
    state.rememberPassword = true
  }
};


const changeTab = (tabId: number) => {
  state.active = tabId;
  if (state.active == 1) {

    state.loginList.account.show = false
    state.loginList.email.show = true
  } else {
    state.loginList.account.show = true
    state.loginList.email.show = false

  }

};

const handleCaptchaReceive = (captcha: any) => {
  captchaURL.value = captcha.url;
}

const loginSuccess = async (message: any) => {
  state.loading = false
  if (message.code == 4444) {
    return;
  }
  if (message.code == 1) {
    if (message.message) {
      Message.success(t(message.message))
    }
    // if (state.rememberPassword && state.active == 0) {
    //   Local.set('userName', state.login.email)
    //   Local.set('password', state.login.password)
    // }
    // if (!state.rememberPassword) {
    //   Local.remove('userName')
    //   Local.remove('password')
    // }
    await User(pinia).getUserLoginInfo(message)

    onClose()
    needLoginApi()
  } else {
    refresh_captcha()
  }
}

const onHander_check_version = async (message: any) => {

  if (message.result != NetEnumDef.check_version_result.cvr_yes) {
    console.log("check version failed");
    return;
  }
  onClose()
}

const refresh_captcha = async () => {
  const req_register_captcha = NetPacket.req_register_captcha();
  let id = await getDeviceId()
  req_register_captcha.sign = getRandomSign(id);;
  req_register_captcha.aaa = aaa;
  req_register_captcha.bbb = bbb;
  Net.instance.sendRequest(req_register_captcha);
};

const handleSubmit = async () => {
  state.loading = true
  const req_login = NetPacket.req_login();



  switch (state.active) {
    case 0:
      req_login.username = state.login.account;
      req_login.login_type = 4;
      break;
    case 1:
      req_login.username = state.login.email;
      req_login.login_type = 5;
      // req_login.username = state.codeValue + state.login.phone;
      break;
  }

  req_login.password = state.login.password;
  req_login.device_id = await getDeviceId();
  req_login.device_model = device_model;
  req_login.channel_id = route.query.channel_id || 123;
  req_login.aaa = aaa;
  req_login.bbb = bbb;
  req_login.ip = await IP();
  req_login.captcha = state.login.captcha;
  Net.instance.sendRequest(req_login);
};
const onClose = async () => {
  await User(pinia).setLogin(false)
}
onMounted(async () => {
  // if (state.rememberPassword) {
  //   state.login.username = Local.get('userName')
  //   state.login.account = Local.get('userName')
  //   state.login.email = Local.get('userName')
  //   state.login.password = Local.get('password')
  //   state.loginList.password.type = 'password'
  // } else {
  //   state.login.account = ''
  //   state.login.email = ''
  //   state.login.username = ''
  //   state.login.password = ''
  // }
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_register_captcha,
    handleCaptchaReceive
  );
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_nodify_login, loginSuccess);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_check_version,
    onHander_check_version
  );
  state.formInitValue = JSON.parse(JSON.stringify(state.login))
  refresh_captcha();

})
onUnmounted(async () => {
  state.login = state.formInitValue
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_register_captcha, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_nodify_login, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_check_version, null);

})


</script>

<style lang="less" scoped>
.login_from_box {
  display: flex;
  width: 850px;
}

.input_item_err {
  position: absolute;
  font-size: 18px;
}
</style>
