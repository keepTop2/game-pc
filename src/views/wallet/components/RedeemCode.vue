<template>
  <CommonForm :title="t('walletInfo_page_code')" :submit-text="t('redeemCode_page_redeemCodeNow')"
    :cancel="t('redeemCode_page_cancel')" :form-ref="'formRef'" :form="form" :show-form="showRedeemCode"
    @on-close="onClose" @on-submit="onSubmit" @on-cancel="onCancel" @update-form-ref="updateFormRef" />
</template>

<script setup lang="ts">
import CommonForm from '@/components/CommonForm.vue';
import { storeToRefs } from 'pinia';

import pinia from '@/store/index';
import { Wallet } from "@/store";
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { TForm } from '@/utils/types/formTypes';
import { useI18n } from "vue-i18n";

import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { Message } from "@/utils/discreteApi";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";

const { t } = useI18n();
const walletInfo = Wallet(pinia);
const { showRedeemCode } = storeToRefs(walletInfo);

const formRef = ref();
const updateFormRef = (ref: any) => formRef.value = ref;

const form: TForm = reactive({
  fields: {
    code: {
      name: 'code',
      label: t('walletInfo_page_code'),
      placeholder: t('addBank_page_pInput')
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
      if (!form.data.code) {
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
  if (res.result === 2) {
    Message.error(t('redeemCode_page_errorCode'))
  } else {
    onClose();
    Message.success(t('redeemCode_page_success'))
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
@/netBase/NetPacket@/netBase/NetMsgType