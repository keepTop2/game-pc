<template>
  <CommonForm :title="t('paymentManagement_page_new_usdt')" :submit-text="t('home_page_confirm')" :form-ref="'formRef'"
    :form="form" :show-form="showAddUsdt" :showMyBank="showMyBank" @on-close="onClose" @on-submit="onSubmit"
    @update-form-ref="updateFormRef" />

</template>

<script setup lang="ts">
import CommonForm from '@/components/CommonForm.vue';
import { storeToRefs } from 'pinia';
import pinia from '@/store/index';
// import { User } from '@/store/user';
import { Wallet } from '@/store/wallet';

import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { Message } from "@/utils/discreteApi";
import usePaymentManagement from "@/views/wallet/paymentManagement/usePaymentManagement";

const { t } = useI18n();
const emit = defineEmits(["getMyBindBankList"]);
const props = defineProps({
  myBankName: {
    type: String,
    default: () => ''
  },
  myBankList: {
    type: Array,
    default: () => []
  }
})
// const UserStore = User(pinia);
const walletInfo = Wallet(pinia);

const { showAddUsdt } = storeToRefs(walletInfo);
// const { info: userInfo } = storeToRefs(UserStore);
const { showAddUsdtModal } = usePaymentManagement();
const formRef = ref();
const updateFormRef = (ref: any) => formRef.value = ref;
const showMyBank = ref({
  show: true,
  length: props.myBankList.length
});

const netWorkArr = [
  { label: 'TRC20', value: 1 },
  { label: 'ERC20', value: 2 },
];

// 提交参数
const dataParams = {
  bank: null,
  cardNo: '',
  desc: '',
}
const form: any = reactive({
  fields: {
    bank: {
      name: 'bank',
      label: 'deposit_page_chooseNetWork',
      placeholder: 'deposit_page_chooseNetWork',
      hasPop: true,
      opts: netWorkArr,
      // inputFilter: true, // 是否输入过滤
      chooseBank: { label: '', value: '' }, // 选择的银行卡
    },
    cardNo: {
      name: 'cardNo',
      label: 'withdraw_page_usdtAdd',
      placeholder: 'paymentManagement_page_usdt_tips',
    },
    desc: {
      name: 'desc',
      label: 'paymentManagement_page_remark',
      placeholder: 'paymentManagement_page_remark',
    },
  },
  rules: {},
  data: {
    ...dataParams,
  }
});

const onClose = () => walletInfo.setShowAddUsdt(false);
const onSubmit = () => {
  console.log('提交----', form.data)
  if (!form.data.bank) {
    return Message.error(t('deposit_page_chooseNetWork'))
  }
  if (!form.data.cardNo) {
    return Message.error(t('paymentManagement_page_usdt_tips'))
  }
  handleSubmit()
};
// 绑定银行卡提交
const handleSubmit = () => {
  const req = NetPacket.req_add_usdt_info();
  req.usdt_type = form.data.bank;
  req.usdt_addr = form.data.cardNo;
  req.desc = form.data.desc;
  Net.instance.sendRequest(req);
};
// result: 2 // 1 成功，2 失败
const handleAddBank = (res: any) => {
  const tips: any = {
    1: 'paymentManagement_page_addBankSuc',
    2: 'paymentManagement_page_errorAdd',
    3: 'paymentManagement_page_addBankFail',
    4: 'paymentManagement_page_hasAdd',
  }
  if (res.result === 1) {
    showAddUsdtModal(false)
    emit('getMyBindBankList'); // 刷新列表
    Message.success(t(tips[res.result]))
  } else {
    Message.error(t(tips[res.result]))
  }
}

watch(
  () => showAddUsdt.value,
  (n) => {
    console.log('-------&777777')
    if (n) {
      form.data = { // 重置参数
        ...dataParams,
        name: form.data.name
      };
      form.fields.bank.chooseBank = { label: '', value: '' };
      showMyBank.value.length = props.myBankList.length
    }
  }
)

onMounted(() => {
  // 绑定银行卡
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_add_usdt_info, handleAddBank);
});
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_add_usdt_info, null);
});


</script>
