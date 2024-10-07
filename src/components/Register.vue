<template>
  <div class="forget_title">
    <span class="title">{{ t('home_page_signUp') }}</span>
    <i class="close pointer">
      <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
    </i>
  </div>
  <div class="login_form">
    <div class="tab">
      <span :class="activeTab === value ? 'pointer active' : 'pointer'" v-for="({ name, value }) in tabList"
        :key="value" @click="changeTab(value)">{{ name }}</span>
    </div>
    <n-form :model="state.register" :rules="state.registerRules" :show-label="false" ref="registerFormRef">
      <template v-for="item in state.registerList">
        <n-form-item first v-if="!item.view || activeTab === item.view" :path="item.name">
          <n-select :placeholder="t('home_page_chooseHb')" v-if="item.hasPop" v-model:value="state.register.currency"
            :options="state.currencyList">
          </n-select>

          <n-input @change="changeIpt(item.name)" v-if="!item.hasPop" clearable @keyup.enter="handleSubmit"
            :type="item.type" size="large" v-model:value="state.register[item.name]" :placeholder="item.placeholder">
            <template #suffix v-if="item.changeRightIcon">
              <iconpark-icon @click="iconClick(item)" :icon-id="item.changeRightIcon" color="#8e82c2"
                size="1rem"></iconpark-icon>
            </template>
          </n-input>
          <template v-if="item.name === 'captcha'">
            <span v-if="activeTab === 1" @click="refresh_captcha" class="btn pointer">
              <Imgt :src="captchaURL" alt="captchaURL" />
              <iconpark-icon icon-id="Group39366" color="#8e82c2" size="1.5rem"></iconpark-icon>
            </span>
            <span v-if="activeTab === 2">
              <n-button :bordered="false" :loading="item.loading" @click="onEmailRequest" class="captcha_btn"
                :disabled="item.disabled">{{ emailLoadingCount ? emailLoadingCount : t('home_page_getcode')
                }}</n-button>
            </span>
          </template>
        </n-form-item>
      </template>
    </n-form>
    <n-button :bordered="false" class="submit_btn pointer" :loading="loading" block @click="onSubmit">{{
      t('home_page_reg')
    }}</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Imgt from '@/components/Imgt.vue';

import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { NetEnumDef } from "@/netBase/NetEnumDef";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { getRandomSign, getDeviceId, aaa, bbb, device_model } from "@/net/Utils";

import pinia from '@/store/index';
import { User } from '@/store/user';
import { Page } from '@/store/page';
import { Local, needLoginApi } from "@/utils/storage";
import { verifyCaptcha, verifyEmail, verifyPassword, verifyAccount } from "@/utils/is";
import { useI18n } from "vue-i18n";
import { Message } from '@/utils/discreteApi'
import { IP } from "@/utils/others";
import { useRoute } from "vue-router";
const route = useRoute();
const { t } = useI18n();
const registerFormRef = ref();
const captchaURL = ref("");
const req_register = NetPacket.req_register_account();

const verifyConfirmPassword = (): boolean => {
  if (state.register.password !== state.register.confirm)
    return false;
  else return true;
}
const changeIpt = (key: string) => {
  if (key == 'password' && state.register.password && state.register.confirm) { // 密码输入要联动
    registerFormRef.value?.validate(
      () => { },
      (rule: any) => {
        return rule?.key == 'confirm'
      }
    )
  }
}
// 验证码
const handleCaptchaReceive = (captcha: any) => {
  captchaURL.value = captcha.url;
};
const refresh_captcha = async () => {
  const req_register_captcha = NetPacket.req_register_captcha();
  const id = await getDeviceId()
  req_register_captcha.sign = getRandomSign(id);
  req_register_captcha.aaa = aaa;
  req_register_captcha.bbb = bbb;
  Net.instance.sendRequest(req_register_captcha);
};
const onEmailRequest = () => {
  if (emailLoadingCount.value) return
  if (!verifyEmail({}, state.register.email)) return Message.warning(t('home_page_accountFormatIncorrect'))
  const req_get_email = NetPacket.req_get_email_verification_code();
  req_get_email.operate_type = 1;
  req_get_email.email = state.register.email;
  Net.instance.sendRequest(req_get_email);

};

// 展示 / 隐藏密码数据
const iconClick = (a: any) => {
  if (a.changeRightIcon == "Group39364") {
    a.type = "text"
    a.changeRightIcon = "Group39365"
  } else {
    a.type = "password"
    a.changeRightIcon = "Group39364"
  }
};

// 货币单位
// const changeCurrency = (item: any) => {
// };

const onSubmit = () => {
  registerFormRef.value?.validate((err: any) => {
    if (!err) {
      handleSubmit();
    } else {
      console.log(err)
    }
  })
};


const loading = ref(false)
const handleSubmit = async () => {

  if (loading.value) return // 防抖
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)

  switch (activeTab.value) {
    case 1:
      req_register.username = state.register.account;
      break;
    case 2:
      req_register.username = state.register.email;
      break;
  }
  console.log(state);

  req_register.password = state.register.password;
  req_register.register_type = Local.get('user')?.token !== '' ? 1 : 2
  const id = await getDeviceId()
  req_register.sign = getRandomSign(id);
  req_register.ip = await IP();
  req_register.ip_error = "0";
  req_register.device_model = device_model;
  req_register.channel_id = route.query.channel_id || 123;
  req_register.device_id = await getDeviceId();
  req_register.aaa = aaa;
  req_register.bbb = bbb;
  req_register.captcha = state.register.captcha;
  req_register.currency = state.register.currency || 1;
  req_register.agent_id = Number(state.register.inviteCode) || 20668;
  localStorage.setItem('agent_id', req_register.agent_id)
  req_register.from_url = location.origin
  // req_register.name = state.register.name;
  // req_register.phone = state.register.phone;
  Net.instance.sendRequest(req_register);
};

const tabList = [
  { name: t('home_page_fullReg'), value: 1 },
  { name: t('home_page_emailReg'), value: 2 }
];

const activeTab = ref<number>(1);

const changeTab = (tabId: number) => {
  activeTab.value = tabId;
  state.register.password = ''
  state.register.confirm = ''
  state.register.captcha = ''
  setTimeout(() => {
    registerFormRef.value.restoreValidation()
  }, 200)
};

const state: any = reactive({
  currencyList: Page(pinia).settings?.currencyList,
  registerList: {
    email: {
      name: 'email',
      type: 'text',
      placeholder: t('home_page_enterEmail'),
      view: 2
    },
    // currency: {
    //   name: 'currency',
    //   type: 'text',
    //   placeholder: t('home_page_chooseHb'),
    //   hasPop: true
    // },

    account: {
      name: 'account',
      type: 'text',
      placeholder: t('home_page_inputAccount'),
      view: 1,
    },
    password: {
      name: 'password',
      type: 'password',
      placeholder: t('home_page_enterPassword'),
      changeRightIcon: "Group39364",
    },
    confirm: {
      name: 'confirm',
      type: 'password',
      placeholder: t('home_page_secPwd'),
      changeRightIcon: "Group39364",
    },
    // phone: {
    //   name: 'phone',
    //   type: 'text',
    //   placeholder: t('home_page_inputPhone'),
    //   view: 1,
    // },
    // name: {
    //   name: 'name',
    //   type: 'text',
    //   placeholder: t('home_page_inputName'),
    //   view: 1,
    // },
    captcha: {
      name: 'captcha',
      type: 'text',
      placeholder: t('home_page_enterVerificationCode'),
      message: t('home_page_verificationCodeFormatIncorrect'),
    },
    inviteCode: {
      name: 'inviteCode',
      type: 'text',
      placeholder: t('home_page_inviteCode'),
      required: !0,
      message: t('home_page_notCode'),
    },
  },
  register: {
    currency: null,
    inviteCode: '',
    account: '',
    password: '',
    confirm: '',
    phone: '',
    email: '',
    name: '',
    captcha: ''
  },
  registerRules: {
    account: [
      {
        required: !0,
        message: t('home_page_accountFormatIncorrect'),
        trigger: "blur",
      },
      {
        required: !0,
        validator: verifyAccount,
        message: t('input_tips_account'),
        trigger: "blur",
      },
    ],
    email: [
      {
        required: !0,
        validator: verifyEmail,
        message: t('home_page_accountFormatIncorrect'),
        trigger: "blur",
      },
    ],
    password: [
      {
        required: !0,
        validator: verifyPassword,
        message: t('home_page_passwordFormatIncorrect'),
        trigger: "blur",
      },
    ],
    captcha: [
      {
        required: true,
        message: t('home_page_enterVerificationCode'),
        trigger: ['input', 'blur']
      },
      {
        validator: verifyCaptcha,
        message: t('home_page_verificationCodeFormatIncorrect'),
        trigger: "blur",
      },
    ],
    confirm: [
      {
        key: 'confirm',
        required: !0,
        validator: verifyConfirmPassword,
        message: t('home_page_passwordsInconsistent'),
        trigger: "blur",
      },
    ],
  }
});

const registerSuccess = async (message: any) => {


  if (message.code == 1) {

    Message.success(t('home_page_registerSuccess'))

    const req_login = NetPacket.req_login();

    req_login.login_type = req_register.register_type;
    req_login.username = req_register.username;
    req_login.password = req_register.password;
    req_login.device_id = await getDeviceId();
    req_login.device_model = device_model;
    req_login.channel_id = route.query.channel_id || 123;
    req_login.aaa = aaa;
    req_login.bbb = bbb;
    req_login.ip = await IP();
    req_login.captcha = req_register.captcha;
    Net.instance.sendRequest(req_login);
  } else {
    refresh_captcha()
  }

}
const loginSuccess = async (message: any) => {
  // 注册成功 关闭弹窗
  User(pinia).setReg(false)
  localStorage.setItem('readed_notice_ids', '[]')
  if (message.code == 4444) {
    return;
  }
  await User(pinia).getUserLoginInfo(message)
  needLoginApi()
}


const emailLoadingCount = ref(0)
let interval: any = null
const loadingEmail = () => {
  if (emailLoadingCount.value) return
  if (interval) clearInterval(interval)
  emailLoadingCount.value = 180
  interval = setInterval(() => {
    emailLoadingCount.value--
    if (emailLoadingCount.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}
const emailVerificationSuccess = async (message: any) => {
  if (message.code == 1) {
    loadingEmail()
  } else {
    Message.error(t(message.message))
  }
}
const onHander_check_version = async (message: any) => {
  if (message.result != NetEnumDef.check_version_result.cvr_yes) {
    return;
  }

  let req_role_login_with_ip = NetPacket.req_role_login_with_ip();
  req_role_login_with_ip.uid = Local.get('user').user_id;
  req_role_login_with_ip.server_id = 2;
  req_role_login_with_ip.token = Local.get('user').token;
  req_role_login_with_ip.type = NetEnumDef.connect_type.common_connect;
  req_role_login_with_ip.version = 1;
  req_role_login_with_ip.device_id = await getDeviceId();
  req_role_login_with_ip.ip = "";

  Net.instance.sendRequest(req_role_login_with_ip);
}
const onClose = async () => {
  await User(pinia).setReg(false)
}

onMounted(() => {
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_register_captcha,
    handleCaptchaReceive
  );
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_register_account,
    registerSuccess
  );
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_nodify_login, loginSuccess);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_email_verification_code, emailVerificationSuccess);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_check_version,
    onHander_check_version
  );
  refresh_captcha();
})
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_register_captcha, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_register_account, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_nodify_login, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_email_verification_code, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_check_version, null);
})

</script>

<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

.login_form {
  padding: 40px 60px;

  .tab {
    width: 100%;
    display: flex;

    >span {
      flex: 1;
      font-size: 16px;
      text-align: center;
      border-radius: 12px;
      box-shadow: inset 0 0 2px 0 #1e153e;
      background-color: #372771;
    }
  }

  .submit_btn {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: #ebefff;
    border: 1px solid linear-gradient(to bottom, #82caff -100%, #646cff, #9266ff);
    border-image-slice: 1;
    border-radius: 16px;
    background-image: url('/img/login/login.webp?t=@{timestamp}');
    background-size: cover;
  }

  // }
}

.forget_title {
  margin: 0;
  width: 100%;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(to bottom, #4c36b3 100%, #3a2786 28%, #3c279a 0%);
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;

  >i {
    position: absolute;
    top: 18px;
    right: 15px;
    background: none;
  }
}

.btn {
  width: 130px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #322c59;
  background-color: #131421;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  vertical-align: middle;
  margin-left: 9px;

  img {
    width: 55px;
    height: 22px;
    vertical-align: middle;
  }
}

.captcha_btn {
  color: #fff;
  width: 94px;
  font-size: 14px;
  background: url('/img/login/sendBtn.webp?t=@{timestamp}') no-repeat;
  background-size: 100% 100%;
  height: 32px;
  margin-left: 9px;
}
</style>
