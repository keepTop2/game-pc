<template>
  <div class="login_from_box">
    <h4 class="forget_title">
      <span>{{ state.formData?.title }}</span>
      <i>
        <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1rem"></iconpark-icon>
      </i>
    </h4>
    <div class="login_form">

      <div class="tab" v-if="state.formData?.tabList">
        <span :class="state.formData.active == tab.value ? 'active' : ''" v-for="(tab, i) in state.formData.tabList"
          :key="i" @click="changeTab(tab.value)">{{ tab.name }}</span>
      </div>
      <n-form :model="state.formData?.formParams" :rules="state.formData?.rules" :show-label="state.formData?.showLabel"
        ref="formRef">
        <template v-for="item in state.formData?.list">
          <n-form-item :path="item.name" :label="item.label" v-if="item.show">

            <n-popselect v-if="item.isMobile" v-model:value="state.formData.formParams.codeValue"
              :options="state.codeOptions" @update:value="valueChange" trigger="click">
              <span class="code_box">
                <span>+{{ state.formData.formParams.codeValue }}</span>
                <iconpark-icon icon-id="Group39369" color="#8e82c2" size="1rem"></iconpark-icon>
              </span>
            </n-popselect>
            <n-input clearable :type="item.type" size="large" v-model:value="state.formData.formParams[item.name]"
              :placeholder="item.placeholder">
              <template #prefix v-if="item.leftIcon">
                <iconpark-icon :icon-id="item.leftIcon" color="#8e82c2" size="1rem"></iconpark-icon>
              </template>
              <template #suffix v-if="item.slot">
                <iconpark-icon v-if="item.changeRightIcon" @click="iconClick(item)" :icon-id="item.changeRightIcon"
                  color="#8e82c2" size="1rem"></iconpark-icon>
              </template>
            </n-input>

            <n-button :bordered="false" :loading="item.loading" @click="submitSend(item)"
              v-if="item.slot && item.type == 'code'" class="btn" :disabled="item.disabled">{{
        item.timeText
      }}</n-button>
          </n-form-item>
        </template>
      </n-form>
      <p class="set_password">
        <span>
        </span>
        <span class="forgot">
          <i></i>
          <i @click="onRegister">{{ t('home_page_noAccount') }}</i>
        </span>
      </p>
      <n-button class="login_btn" :bordered="false" block @click="submitNext"> {{ state.formData?.buttonText
        }}</n-button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { Page } from '@/store/page';
import { verifyCaptcha, verifyEmail, verifyMobile, verifyPassword, } from "@/utils/is";
import { useI18n } from 'vue-i18n';
import { Local } from "@/utils/storage";
import { Message } from "@/utils/discreteApi";
import { handleOpenLink } from "@/utils/others";
const page = Page(pinia);
const { settings } = storeToRefs(page);

const formRef = ref();

const { t } = useI18n();


const state: any = reactive({
  checkPhoneOremail: true,
  formData: {
    active: 1,
    step: 1,  //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
    buttonText: t('home_page_next'),
    title: t('home_page_retrievePassword'),
    showLabel: false,
    tabList: [
      { name: t('home_page_phoneRecovery'), value: 1 },
      { name: t('home_page_emailRetrieval'), value: 2 },
      { name: t('home_page_customerServiceRetrieval'), value: 3 }
    ],
    formParams: {
      operate_type: 2, //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
      modify_type: 1, //1表示常规修改密码，modify_type=2表示通过手机修改密码，modify_type=3表示通过邮箱修改密码
      phoneCode: "",
      emailCode: "",
      mobile: "",
      email: '',
      old_password: '',
      new_password: "",
      new_password_confirm: "",
      codeValue: '84',
    },
    rules: {
      mobile: [
        {
          required: !0,
          validator: () => {
            if (verifyMobile(state.formData.formParams.codeValue, state.formData.formParams.mobile)) {

              state.formData.list.phoneCode.disabled = false
              return true
            } else {
              state.formData.list.phoneCode.disabled = true
              return false
            }

          },
          message: t('home_page_phoneNumberFormatIncorrect'),
          trigger: "input",
        },
      ],
      verify_code: [
        {
          required: !0,
          validator: verifyCaptcha,
          message: t('home_page_verificationCodeFormatIncorrect'),
          trigger: "blur",
        },
      ],
      email: [
        {
          required: !0,
          validator: () => {
            if (verifyEmail({}, state.formData.formParams.email)) {
              state.formData.list.emailCode.disabled = false
              return true
            } else {
              state.formData.list.emailCode.disabled = true
              return false
            }
          },
          message: t('home_page_emailIncorrect'),
          trigger: "input",
        },
      ],
      old_password: [
        {
          required: !0,
          validator: verifyPassword,
          message: t('home_page_passwordFormatIncorrect'),
          trigger: "blur",
        },
      ],
      new_password: [
        {
          required: !0,
          validator: verifyPassword,
          message: t('home_page_passwordFormatIncorrect'),
          trigger: "blur",
        },
      ],
      new_password_confirm: [
        {
          required: !0,
          validator: (_rule: any, value: any) => {
            if (value != state.formData.formParams.new_password) {
              return false
            } else {
              return true
            }
          },
          message: t('home_page_passwordsInconsistent'),
          trigger: "blur",
        },
      ],
    },
    list: {
      mobile: {
        name: "mobile",
        type: "text",
        placeholder: t('home_page_enterPhoneNumber'),
        label: t('home_page_phone'),
        slot: !1,
        leftIcon: false,
        changeRightIcon: !1,
        show: true,
        isMobile: true,

      },

      email: {
        name: "email",
        type: "text",
        placeholder: t('home_page_enterEmail'),
        label: t('home_page_email'),
        slot: !1,
        leftIcon: "Group39361-d3pmjajn",
        changeRightIcon: !1,
        show: false,
      },
      old_password: {
        name: "old_password",
        type: "password",
        placeholder: t('home_page_enterOldPassword'),
        label: t('home_page_oldPassword'),
        slot: !0,
        leftIcon: "Group39362-d3pmjajk",
        changeRightIcon: "Group39364",
        show: false,
      },
      new_password: {
        name: "new_password",
        type: "password",
        placeholder: t('home_page_enterNewPassword'),
        label: t('home_page_newPassword'),
        slot: !0,
        leftIcon: "Group39362-d3pmjajk",
        changeRightIcon: "Group39364",
        show: false,
      },
      new_password_confirm: {
        name: "new_password_confirm",
        type: "password",
        placeholder: t('home_page_enterAgainNewPassword'),
        label: t('home_page_newPassword'),
        slot: !0,
        leftIcon: "Group39362-d3pmjajk",
        changeRightIcon: "Group39364",
        show: false,
      },
      phoneCode: {
        name: "phoneCode",
        type: "code",
        placeholder: t('home_page_enterSmsCode'),
        label: t('home_page_smsCode'),
        slot: !0,
        leftIcon: "Group39363-d3pmjao6",
        changeRightIcon: !1,
        show: true,
        disabled: true,
        loading: false,
        timeText: t('home_page_send'),
        timer: null
      },
      emailCode: {
        name: "emailCode",
        type: "code",
        placeholder: t('home_page_enterVerificationCode'),
        label: t('home_page_verificationCode'),
        slot: !0,
        leftIcon: "Group39363-d3pmjao6",
        changeRightIcon: !1,
        show: false,
        disabled: true,
        loading: false,
        timeText: t('home_page_send'),
        timer: null
      },
    },
  },
  codeOptions: [
    // {
    //   label: '+63',
    //   value: '+63'
    // },
    {
      label: '84',
      value: '84'
    },
    // {
    //   label: '+86',
    //   value: '+86',
    // },
  ]
})
const valueChange = (item: any) => {
  console.log(item);

}

const onClose = async () => {
  await User(pinia).setForget(false)
};
const onRegister = async () => {
  await User(pinia).setForget(false)
  await User(pinia).setReg(true)
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

const resetInputHide = () => {
  for (const key in state.formData.list) {
    state.formData.list[key].show = false
  }
}
const changeTab = (tabVal: number) => {


  if (tabVal == 1) {
    state.formData.active = tabVal;
    resetInputHide()
    state.formData.list.mobile.show = true
    state.formData.list.phoneCode.show = true
  }
  if (tabVal == 2) {
    state.formData.active = tabVal;
    resetInputHide()
    state.formData.list.email.show = true
    state.formData.list.emailCode.show = true
  }
  if (tabVal == 3) {

    handleOpenLink(settings.value.serviceTelegram)
  }
  state.step = 1;
};

const submitNext = () => {
  // 效验

  if (state.formData.step == 1) {
    formRef.value?.validate((errors: any) => {
      if (!errors) {
        changePassword(state.formData.formParams, 1)

      }
    });
  }
  if (state.formData.step == 2) {
    changePassword(state.formData.formParams, 2);

  }

};
const changePassword = (params: any, type: number) => {
  let req = NetPacket.req_reset_account_password();
  // 点击下一步验证手机或邮箱是否绑定
  if (type == 1) {
    state.checkPhoneOremail = true
    req.operate_type = 1

  } else {
    state.checkPhoneOremail = false
    req.operate_type = 2
  }
  if (state.formData.active == 1) {
    req.username = state.formData.formParams.codeValue + params.mobile
    req.modify_type = 1
    req.captcha = params.phoneCode
  }
  if (state.formData.active == 2) {
    req.username = params.email
    req.captcha = params.emailCode
    req.modify_type = 2
  }

  req.old_password = params.old_password
  req.new_password = params.new_password
  req.new_password_confirm = params.new_password_confirm

  Net.instance.sendRequest(req);
};
// 发送验证码
const submitSend = (item: any) => {
  item.loading = true
  // 1 为手机  2 为邮箱 
  if (state.formData.active == 1) {
    const req = NetPacket.req_get_mobile_sms_login_code()
    req.mobile = state.formData.formParams.codeValue + state.formData.formParams.mobile

    Net.instance.sendRequest(req)
  }
  if (state.formData.active == 2) {
    const req = NetPacket.req_get_email_verification_code()
    req.email = state.formData.formParams.email
    Net.instance.sendRequest(req)
  }
};


// 返回邮箱验证码是否发送
const handleGetEmailVerificationCode = (res: any) => {
  state.formData.list.emailCode.loading = false
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message))
    }
    state.formData.list.emailCode.disabled = true
    state.formData.list.emailCode.timeText = 160
    state.formData.list.emailCode.timer = setInterval(() => {
      state.formData.list.emailCode.timeText--
      if (state.formData.list.emailCode.timeText <= 0) {

        state.formData.list.emailCode.disabled = false
        clearInterval(state.formData.list.emailCode.timer)
        state.formData.list.emailCode.timer = null
        state.formData.list.emailCode.timeText = t('home_page_send')
      }
    }, 1000);
  } else {
    state.formData.list.emailCode.disabled = false
  }
};
// 返回手机验证码是否发送
const handleSMSback = (res: any) => {
  state.formData.list.phoneCode.loading = false
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message))
    }
    state.formData.list.phoneCode.disabled = true
    state.formData.list.phoneCode.timeText = 60
    state.formData.list.phoneCode.timer = setInterval(() => {
      state.formData.list.phoneCode.timeText--
      if (state.formData.list.phoneCode.timeText <= 0) {

        clearInterval(state.formData.list.phoneCode.timer)
        state.formData.list.phoneCode.disabled = false
        state.formData.list.phoneCode.timer = null
        state.formData.list.phoneCode.timeText = t('home_page_send')
      }
    }, 1000);
  } else {
    state.formData.list.phoneCode.disabled = false
  }


}
// 返回修改密码是否成功或验证手机或邮箱是否绑定
const handleChangePassword = async (res: any) => {
  if (state.checkPhoneOremail) {
    if (res.code == 1) {
      resetInputHide()
      state.formData.buttonText = t('home_page_retrieveNow')
      state.formData.step = 2
      state.formData.list.new_password.show = true
      state.formData.list.new_password_confirm.show = true
      state.checkPhoneOremail = false
    }
  } else {
    if (res.code == 1) {
      Message.success(t(res.message))
      Local.remove('user')
      await User(pinia).setHasLogin(false)
      setTimeout(() => {
        location.href = '/'
      }, 2000);


    }
  }
}

onMounted(() => {
  // 监听手机号验证码返回
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_nodify_get_mobile_sms_login_code,
    handleSMSback
  );


  // 监听邮箱验证码返回
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_email_verification_code,
    handleGetEmailVerificationCode
  );
  // 监听验证码是否通过 或设置密码是否通过
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_reset_account_password,
    handleChangePassword
  );
  // submitSend()
  // refresh_captcha()
});

onUnmounted(() => {

  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_nodify_get_mobile_sms_login_code, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_email_verification_code, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_nodify_reset_password, null);
});
</script>
<style lang="less" scoped>
.login_from_box {
  display: block;

  >.login_form {
    padding: 60px 40px 46px;

    >.tab {
      width: 100%;
      display: flex;
      justify-content: space-around;

      >span {
        flex: 1;
      }
    }

  }
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

  >i {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
  }
}

.set_password {
  margin-bottom: 20px;
}

.btn {
  color: #fff;
  width: 90px;
  font-size: 14px;
  background: url(/img/login/sendBtn.webp) no-repeat;
  background-size: contain;

}

:deep(.n-button .n-button__icon, ) {
  height: .7em;
  width: .7em;
}

:deep(.n-button .n-button__icon .n-icon-slot) {
  height: .7em;
  width: .7em;
}

:deep(.n-base-loading .n-base-loading__container .n-base-loading__icon) {
  height: .7em;
  width: .7em;
}

.login_btn {
  margin-top: 40px;
}
</style>
