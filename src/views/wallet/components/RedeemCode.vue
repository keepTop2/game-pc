<template>
  <CommonForm :title="t('walletInfo_page_code')" :submit-text="t('redeemCode_page_redeemCodeNow')"
    :cancel="t('redeemCode_page_cancel')" :form-ref="'formRef'" :form="form" :show-form="showRedeemCode"
    @on-close="onClose" @on-submit="onSubmit" @on-cancel="onCancel" @update-form-ref="updateFormRef" />
</template>

<script setup lang="ts">
import CommonForm from '@/components/CommonForm.vue';
import { storeToRefs } from 'pinia';

import pinia from '@/store/index';
import { Wallet } from "@/store/wallet";
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { TForm } from '@/utils/types/formTypes';
import { useI18n } from "vue-i18n";

import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { Message } from "@/utils/discreteApi";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import useWalletInfo from "@/views/wallet/walletInfo/useWalletInfo.ts";

const { t } = useI18n();
const walletInfo = Wallet(pinia);
const { showRedeemCode } = storeToRefs(walletInfo);
const { getNewMon } = useWalletInfo();
const formRef = ref();
const updateFormRef = (ref: any) => formRef.value = ref;

const form: TForm = reactive({
  fields: {
    code: {
      name: 'code',
      label: 'walletInfo_page_code_input',
      placeholder: 'addBank_page_pInput'
    },

  },
  rules: {},
  data: {
    code: '',
  }
});

const onClose = () => walletInfo.setShowRedeemCode(false);
const onSubmit = () => {
  formRef.value?.validate((err: any) => {
    if (!err) {
      const code =String (form.data.code).trim()
      if (!code) {
        return Message.error(t('redeemCode_page_enterCode'))
      }
      handleSubmit();
    }
  })

};
const onCancel = () => {
  walletInfo.setShowRedeemCode(false);
  form.data.code = '';
}
const handleSubmit = () => {
  const req = NetPacket.req_exchange();
  req.code = form.data.code;
  Net.instance.sendRequest(req);
};
// result： 1 成功，2 失败
const handleExchange = (res: any) => {
  const type_str: any = {
    0: 'proxy_page_caoZuo',
    1: 'invalid_ID',
    2: 'redeem_cannot_be_swap',
    3: 'exceeded_daily_limit',
    4: 'activity_not_open',
    5: 'code_does_not_exist',
    6: 'code_already_used',
    7: 'code_exceeded_limit',
    8: 'code_can_only_used_once',
  }
  if (res.result === 0) {
    getNewMon();
    onClose();
    Message.success(t('redeemCode_page_success'))
  } else {
    Message.error(t(type_str[res.result]))
  }
}
onMounted(() => {
  setTimeout(() => {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_exchange, handleExchange);
  }, 500)
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_exchange, null);
});
</script>
