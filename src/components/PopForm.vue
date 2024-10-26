<template>
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="change_card">
      <div class="login_from_box">
        <h4 class="forget_title">
          <span>{{ t(state.formData?.title) }}</span>
          <i>
            <iconpark-icon @click="closeDialog" icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
          </i>
        </h4>
        <div class="login_form">
          <n-tabs type="line" v-model:value="state.tabActive" animated justify-content="space-evenly"
            @update:value="changeTab" v-if="state.formData?.tabList">
            <n-tab-pane :name="i" :tab="t(tab.name)" v-for="(tab, i) in state.formData.tabList" :key="i"> </n-tab-pane>
          </n-tabs>
          <!-- <div class="tab" v-if="state.formData?.tabList">
            <span :class="state.formData.active == i ? 'active' : ''" v-for="(tab, i) in state.formData.tabList"
              :key="i" @click="changeTab(i)">{{ t(tab.name) }}</span>
          </div> -->
          <div v-if="state.notBind" class="bind">
            您还未绑定，请绑定后再进行修改资金密码
          </div>
          <n-form v-else :model="state.formData?.formParams" :rules="state.formData?.rules"
            :show-label="state.formData?.showLabel" label-placement="left" ref="formRef">
            <template v-for="item in state.formData?.list">
              <n-form-item :path="item.name" :label="t(item.label)" v-if="item.show" label-placement="left">

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
const emit = defineEmits(['changeTab', 'submitData', 'nextChange', 'nextBind']);
const SmsCodeRef = ref()
const formRef = ref();
const isShow = ref(false)
const state: any = reactive({
  tabActive: 0,
  notBind: false,
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
  if (a.changeRightIcon == "gerenyincangicon") {
    a.type = "text"
    a.changeRightIcon = "gerenchakanicon"

  } else {
    a.type = "password"
    a.changeRightIcon = "gerenyincangicon"

  }
};


const changeTab = (tabId: number) => {
  state.tabActive = tabId
  if (state.type == 3) {
    if (state.tabActive == 1 && !state.formData.formParams.mobile) {
      state.notBind = true
    } else if (state.tabActive == 2 && !state.formData.formParams.email) {
      state.notBind = true
    } else {
      state.notBind = false
    }

  }


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
    if (state.formData.step == 1 && state.notBind) {
      if (state.tabActive == 1) {
        emit('nextBind', 5);
      } else if (state.tabActive == 2) {
        emit('nextBind', 4);
      } else {
        formRef.value?.validate((errors: any) => {
          if (!errors) {
            emit('nextChange', state.formData.formParams);
          }
        });
      }

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
  state.notBind = false

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

};
// 打开弹窗
const openDialog = async (formData: any, type: number) => {

  state.formData = formData
  state.formInitValue = JSON.parse(JSON.stringify(formData.formParams))
  state.type = type

  if (state.type == 3) {
    if (state.tabActive == 1 && !state.formData.formParams.mobile) {
      state.notBind = true
    } else if (state.tabActive == 2 && !state.formData.formParams.email) {
      state.notBind = true
    } else {
      state.notBind = false
    }

  }

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
@timestamp: `new Date().getTime()`;

.change_card {

  border-radius: 16px;
  border: 1px solid #26294C;
  background: #14173A;


  .login_from_box {
    display: block;
    width: 542px;
    height: auto;

    >.login_form {
      padding: 60px 40px 0x;

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
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    border-bottom: 2px solid #26294C;

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
    width: 100px;
    height: 40px;
    font-size: 16px;
    // margin: 0;
    // margin-left: 9px;
    // background: url('/img/login/sendBtn.webp?t=@{timestamp}') no-repeat;
    // background-size: contain;

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
    width: 330px;
    margin: 40px auto;
  }

  .bind {
    font-size: 16px;
    text-align: center;
    padding: 40px 0;
  }
}
</style>
