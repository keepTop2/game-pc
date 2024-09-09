<template>
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="change_card">
      <div class="login_from_box">
        <h4 class="forget_title">
          <span>{{ t(state.formData?.title) }}</span>
          <i>
            <iconpark-icon @click="closeDialog" icon-id="Group39368" color="#fff" size="1rem"></iconpark-icon>
          </i>
        </h4>
        <div class="login_form">

          <div class="tab" v-if="state.formData?.tabList">
            <span :class="state.formData.active == i ? 'active' : ''" v-for="(tab, i) in state.formData.tabList"
              :key="i" @click="changeTab(i)">{{ t(tab.name) }}</span>
          </div>
          <n-form :model="state.formData?.formParams" :rules="state.formData?.rules"
            :show-label="state.formData?.showLabel" ref="formRef">
            <template v-for="item in state.formData?.list">
              <n-form-item :path="item.name" :label="t(item.label)" v-if="item.show">

                <n-popselect v-if="item.isMobile" v-model:value="state.formData.formParams.codeValue"
                  :options="state.codeOptions" @update:value="valueChange" trigger="click">
                  <span class="code_box">
                    <span>+{{ state.formData.formParams.codeValue }}</span>
                    <iconpark-icon icon-id="Group39369" color="#8e82c2" size="1rem"></iconpark-icon>
                  </span>
                </n-popselect>
                <n-select v-if="item.type == 'select'" v-model:value="state.formData.formParams[item.name]"
                  :filterable="item.filterable" :multiple="item.multiple" :placeholder="t(item.placeholder)"
                  :options="item.options" />
                <n-input v-else clearable :type="item.type" size="large" :disabled="item.disabled" autoComplete="off"
                  v-model:value="state.formData.formParams[item.name]" :placeholder="t(item.placeholder)">
                  <template #prefix v-if="item.leftIcon">
                    <iconpark-icon :icon-id="item.leftIcon" color="#8e82c2" size="1rem"></iconpark-icon>
                  </template>
                  <template #suffix v-if="item.slot">
                    <iconpark-icon v-if="item.changeRightIcon" @click="iconClick(item)" :icon-id="item.changeRightIcon"
                      color="#8e82c2" size="1rem"></iconpark-icon>
                  </template>
                </n-input>
                <n-button :bordered="false" :loading="item.loading" @click="submitSend(item)"
                  v-if="item.slot && item.type == 'code'" class="btn" :disabled="item.btnDisabled">{{
    isNaN(item.timeText) ? t(item.timeText) : item.timeText

  }}</n-button>
              </n-form-item>
            </template>
          </n-form>
          <n-button class="login_btn" :bordered="false" block @click="submitNext"> {{ t(state.formData?.buttonText)
            }}</n-button>
        </div>
      </div>
    </div>

  </n-modal>
  <SmsCode ref="SmsCodeRef" @submitEvent="sendMobileSmsCode"></SmsCode>

</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from "vue";
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { Message } from "@/utils/discreteApi";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const SmsCode = defineAsyncComponent(() => import('@/components/SmsCodeModal.vue'));
const emit = defineEmits(['changeTab', 'submitData', 'nextChange']);
const SmsCodeRef = ref()
const formRef = ref();
const isShow = ref(false)
const state: any = reactive({
  showModa: false,
  formData: null,
  formInitValue: null,

  type: 0,
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

const iconClick = (a: any) => {
  if (a.changeRightIcon == "Group39364") {
    a.type = "text"
    a.changeRightIcon = "Group39365"

  } else {
    a.type = "password"
    a.changeRightIcon = "Group39364"

  }
};


const changeTab = (tabId: number) => {
  resetInputHide()
  emit('changeTab', tabId);

};
const resetInputHide = () => {
  for (const key in state.formData.list) {
    state.formData.list[key].show = false
  }
}


const submitNext = () => {
  // 效验
  if (state.type == 3) {
    if (state.formData.step == 1) {
      formRef.value?.validate((errors: any) => {
        if (!errors) {
          emit('nextChange', state.formData.formParams);
        }
      });
    } else if (state.formData.step == 2) {
      formRef.value?.validate((errors: any) => {
        if (!errors) {
          emit('submitData', state.formData.formParams, state.type);
        }
      });

    } else {
      formRef.value?.validate((errors: any) => {
        if (!errors) {
          emit('submitData', state.formData.formParams, state.type);
        }
      });


    }
  } else {
    //常规修改密码
    formRef.value?.validate((errors: any) => {
      if (!errors) {
        emit('submitData', state.formData.formParams, state.type);
      }
    });
  }
};

// 手机验证码协议
const sendMobileSmsCode = () => {
  state.itemClick.loading = true

  SmsCodeRef.value.closeDialog()
  const req = NetPacket.req_get_mobile_sms_code()
  req.mobile = state.formData.formParams.codeValue + state.formData.formParams.mobile
  if (state.formData.list.mobile.disabled) {
    req.operate_type = 3
  } else {
    req.operate_type = 1
  }

  Net.instance.sendRequest(req)
}
// 发送验证码
const submitSend = (item: any) => {
  state.itemClick = item
  // 1 为手机  2 为邮箱 
  if (state.formData.active == 1) {
    formRef.value?.validate(
      (errors: any) => {
        if (errors) {
          console.log(errors)
        } else {
          SmsCodeRef.value.openDialog()
        }
      },
      (rule: any) => {
        return rule?.key === 'phone'
      }
    )



  }
  if (state.formData.active == 2) {
    formRef.value?.validate(
      (errors: any) => {
        if (errors) {
          console.log(errors)
        } else {
          item.loading = true
          const req = NetPacket.req_get_email_verification_code()
          req.email = state.formData.formParams.email
          Net.instance.sendRequest(req)
        }
      },
      (rule: any) => {
        return rule?.key === 'email'
      }
    )

  }
};

// 返回邮箱验证码是否发送
const handleGetEmailVerificationCode = (res: any) => {
  state.formData.list.emailCode.loading = false
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message))
    }
    state.formData.list.emailCode.btnDisabled = true
    state.formData.list.emailCode.timeText = 160
    state.formData.list.emailCode.timer = setInterval(() => {
      state.formData.list.emailCode.timeText--
      if (state.formData.list.emailCode.timeText <= 0) {
        state.formData.list.emailCode.btnDisabled = false
        clearInterval(state.formData.list.emailCode.timer)
        state.formData.list.emailCode.timer = null
        state.formData.list.emailCode.timeText = 'home_page_send'
      }
    }, 1000);
  }
};
// 返回手机验证码是否发送
const handleSMSback = (res: any) => {
  state.formData.list.phoneCode.loading = false
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message))
    }
    state.formData.list.phoneCode.btnDisabled = true
    state.formData.list.phoneCode.timeText = 180
    state.formData.list.phoneCode.timer = setInterval(() => {
      state.formData.list.phoneCode.timeText--
      if (state.formData.list.phoneCode.timeText <= 0) {
        clearInterval(state.formData.list.phoneCode.timer)
        state.formData.list.phoneCode.btnDisabled = false
        state.formData.list.phoneCode.timer = null
        state.formData.list.phoneCode.timeText = 'home_page_send'
      }
    }, 1000);
  }


}
const resetFormValue = () => { state.formData.formParams = state.formInitValue }
// 关闭弹窗
const closeDialog = () => {
  isShow.value = false
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_email_verification_code, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_mobile_sms_code, null);
  if (state.formData.list?.emailCode) {

    clearInterval(state.formData.list?.emailCode?.timer)
    state.formData.list.emailCode.disabled = true
    state.formData.list.emailCode.timer = null
    state.formData.list.emailCode.timeText = 'home_page_send'
  }
  if (state.formData.list?.phoneCode?.timer) {
    clearInterval(state.formData.list.phoneCode.timer)
    state.formData.list.phoneCode.disabled = true
    state.formData.list.phoneCode.timer = null
    state.formData.list.phoneCode.timeText = 'home_page_send'
  }

  resetFormValue()
  // state.formData = null

};
// 打开弹窗
const openDialog = async (formData: any, type: number) => {
  state.formData = formData
  state.formInitValue = JSON.parse(JSON.stringify(formData.formParams))
  state.type = type
  // 监听手机号验证码返回
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_mobile_sms_code,
    handleSMSback
  );
  // 监听邮箱验证码返回
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_email_verification_code,
    handleGetEmailVerificationCode
  );
  isShow.value = true
}

defineExpose({
  openDialog,
  closeDialog,
});

</script>
<style lang="less" scoped>
.change_card {
  width: 494px;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  background-color: #231353;


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
    // border-radius: 14px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
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
}
</style>
