<template>
  <AddBank v-if="showAddBankRef" @getMyBindBankList="getMyBankList" :myBankName="myBankName" :myBankList="myBankList" />
  <n-spin :show="loading">
    <div class="flex payment_management">
      <div class="rel bank" v-for="(bank, i) in myBankList" :key="i">
        <span class="abs pointer center close">
          <iconpark-icon @click="() => removeBank(bank)" icon-id="Group39368" color="#fff" size="0.7em"></iconpark-icon>
        </span>
        <div class="abs number">**** **** **** {{ bank.account_number?.slice(12, 16) }}</div>
        <img class="abs bank_img" :src="bank.bankImgURL" :alt="bank.bank_name">
      </div>
      <div v-if="myBankList?.length < 6" class="bank add_bank pointer center" @click="() => showAddBankModal(true)">
        <span>+ {{ t('paymentManagement_page_addBank') }}</span>
      </div>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import usePaymentManagement from './usePaymentManagement';
import AddBank from '../components/AddBank.vue';
import { useI18n } from "vue-i18n";
import { NetPacket } from "@/utils/netBase/NetPacket";
import { Net } from "@/utils/net/Net";
import { onMounted, onUnmounted, ref } from "vue";
import { MessageEvent2 } from "@/utils/net/MessageEvent2";
import { NetMsgType } from "@/utils/netBase/NetMsgType";
import {Dialog, Message} from "@/utils/discreteApi";

const { t } = useI18n();
const { showAddBankModal } = usePaymentManagement();
const showAddBankRef = ref(false);
const myBankList = ref();
const myBankName = ref(); // 如果有已经绑定的银行卡姓名，下次绑定需要一致
const loading = ref(false)

// 获取已绑定的银行账号
const getMyBankList = () => {
  loading.value = true
  const req = NetPacket.req_bank_card_info_list();
  Net.instance.sendRequest(req);
}
const handleMyBankList = (res: any) => {
  setTimeout(() => {
    loading.value = false
  }, 300)
  myBankName.value = res.cardholder_name || '';
  showAddBankRef.value = true;
  myBankList.value = res.bank_card_info_list.map((item: any) => (
    {
      ...item,
      bankImgURL: '/img/payment/mockBank.webp',
    }
  ))
}
// 删除银行
const removeBank = (item: any) => {
  console.log(item);
  Dialog.warning({
    showIcon: false,
    title: t('paymentManagement_page_tips'),
    content: t('paymentManagement_page_tipContent'),
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: () => {
      delBankList(item)
    },
    onNegativeClick: () => {

    },
  })
};
const delBankList = (item: any) => {
  loading.value = true
  const req = NetPacket.req_del_bank_card_info();
  req.bankcard = `${item.bank_id}_${item.account_number}`;
  Net.instance.sendRequest(req);
}
const handleDelBankList = (res: any) => {
  loading.value = false
  console.log('---', res)
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

onMounted(() => {
  setTimeout(() => {
    getMyBankList();
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, handleMyBankList);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, handleDelBankList);
  }, 500)
});
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, null);
});

</script>
<style src="./style.less" lang="less" scoped></style>
