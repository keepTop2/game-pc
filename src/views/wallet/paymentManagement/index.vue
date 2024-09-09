<template>
  <AddBank v-if="showAddBankRef" @getMyBindBankList="getMyBankList" :myBankName="myBankName" :myBankList="myBankList" />
  <n-spin :show="loading">
    <div class="num_tips">{{ t('paymentManagement_page_max_bank', { num: myBankList?.length || 0 }) }}</div>
    <div class="flex payment_management">
      <div class="rel bank" v-for="(item, index) in myBankList" :key="index">
        <span v-if="index !== 0" class="abs pointer center close">
          <iconpark-icon @click="() => removeBank(item)" icon-id="Group39368" color="#fff" size="0.7em"></iconpark-icon>
        </span>

        <n-flex justify="space-between" align="flex-end" class="abs number">
          <div class="">
            <div>{{ item.bank_name }}</div>
            {{ maskString(item.account_number) }}
          </div>
          <n-flex class="list_item_r">
            <n-flex v-if="index === 0" class="set_box"> {{ t('paymentManagement_page_default_bank') }} </n-flex>
            <template v-else>
              <n-flex class="set_box mr_color button" @click="doDefaultBank(item)">
                {{ t('paymentManagement_page_set_default') }}
              </n-flex>
            </template>
          </n-flex>
        </n-flex>
        <Imgt class="abs bank_img" :src="item.bankImgURL" :alt="item.bank_name" />
        <span v-if="index === 0" class="icon_tip">
          <span class="skew_text">{{ t('paymentManagement_page_inUse') }}</span>
        </span>
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
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { onMounted, onUnmounted, ref } from "vue";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { Dialog, Message } from "@/utils/discreteApi";
import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();
const { showAddBankModal } = usePaymentManagement();
const showAddBankRef = ref(false);
const myBankList = ref();
const myBankName = ref(); // 如果有已经绑定的银行卡姓名，下次绑定需要一致
const loading = ref(false)
const curOperate = ref({}); // 当前操作的数据
const operateType = ref(); // 操作类型，del 删除，default 设为默认银行卡

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
  )).reverse();
}
// 删除银行
const removeBank = (item: any) => {
  operateType.value = 'del';
  curOperate.value = item;
  // console.log(item);
  Dialog.warning({
    showIcon: false,
    title: t('paymentManagement_page_tips'),
    content: t('paymentManagement_page_tipContent'),
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: () => {
      operateBank(item)
    },
    onNegativeClick: () => {

    },
  })
};

const operateBank = (item: any) => {
  item = curOperate.value;
  loading.value = true
  let req;
  if (operateType.value === 'del') { // 删除
    req = NetPacket.req_del_bank_card_info();
  } else { // 设为默认银行卡
    req = NetPacket.req_set_default_bankcard();
  }
  req.bankcard = `${item.bank_id}_${item.account_number}`;
  Net.instance.sendRequest(req);
}
const handleDelBankList = (res: any) => {
  loading.value = false
  // console.log('---', res)
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}
// 设置默认银行
const doDefaultBank = (item: any) => {
  operateType.value = 'default';
  curOperate.value = item;
  // console.log(item);
  Dialog.warning({
    showIcon: false,
    title: t('paymentManagement_page_tips'),
    content: t('paymentManagement_page_set_xw_default'),
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: () => {
      operateBank(item)
    },
    onNegativeClick: () => {

    },
  })
};
// 设置默认银行
const handleDefaultBank = (res: any) => {
  loading.value = false;
  // showDelBankRef.value = false
  if (res.rlt === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}
// 银行卡，显示前3位和后4位
const maskString = (str: any) => {
  if (str.length <= 7) {
    return str.replace(/./g, "***");
  }
  return str.substr(0, 3) + "**** ****" + str.substr(-4);
}
// 真实姓名显示
// const maskNameString = (str: any) => {
//   return str.substr(0, 1) + "**";
// }

onMounted(() => {
  setTimeout(() => {
    getMyBankList();
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, handleMyBankList);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, handleDelBankList);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_set_default_bankcard, handleDefaultBank);
  }, 500)
});
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_set_default_bankcard, null);
});

</script>
<style src="./style.less" lang="less" scoped></style>
