<template>
  <CommonForm :title="t('addBank_page_addBank')" :submit-text="t('home_page_confirm')" :form-ref="'formRef'"
    :form="form" :show-form="showAddBank" :showMyBank="showMyBank" @on-close="onClose" @on-submit="onSubmit"
    @onSubmitSec="onSubmitSec" @update-form-ref="updateFormRef" />
  <!-- 选择银行弹窗 -->
  <chooseBankDialog ref="chooseBankModal" @selectBank="selectBank" />
</template>

<script setup lang="ts">
import CommonForm from '@/components/CommonForm.vue';
import { storeToRefs } from 'pinia';
import pinia from '@/store/index';
import { User } from '@/store/user';
import { Page } from '@/store/page';
import { Wallet } from '@/store/wallet';
import { testBankCard, testBankName, replaceChinese } from '@/utils/is';

import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { Message } from "@/utils/discreteApi";
import usePaymentManagement from "@/views/wallet/paymentManagement/usePaymentManagement";
const chooseBankDialog = defineAsyncComponent(() => import('./chooseBankDialog.vue'));

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
const UserStore = User(pinia);
const walletInfo = Wallet(pinia);

const { showAddBank } = storeToRefs(walletInfo);
const { info: userInfo } = storeToRefs(UserStore);
const { showAddBankModal } = usePaymentManagement();
const formRef = ref();
const updateFormRef = (ref: any) => formRef.value = ref;
const showMyBank = ref({
  show: true,
  length: props.myBankList.length
});
const chooseBankModal = ref();
const curBankName: any = ref(props.myBankName);

// 币种列表
// const currencyList: TTabList = [
//   { label: '中国', value: 1 },
//   { label: '台湾', value: 2 }
// ];

// 提交参数
const dataParams = {
  // currency: null,
  bank: null,
  cardNo: '',
  code: '',
}
const form: any = reactive({
  fields: {
    // currency: {
    //   name: 'currency',
    //   label: t('addBank_page_chooseBz'),
    //   placeholder: t('addBank_page_pChoose'),
    //   hasPop: true,
    //   opts: currencyList,
    // },
    bank: {
      name: 'bank',
      label: t('addBank_page_pChooseBank'),
      placeholder: t('addBank_page_pChoose'),
      // hasPop: true,
      // opts: bkList.value,
      inputFilter: true, // 是否输入过滤
      showRight: true,
      btnText: 'deposit_page_changeWay',
      chooseBank: { label: '', value: '' }, // 选择的银行卡
    },
    cardNo: {
      name: 'cardNo',
      label: t('addBank_page_bankCard'),
      placeholder: t('addBank_page_pInput'),
      type: 'number'
    },
    name: {
      name: 'name',
      label: t('addBank_page_name'),
      placeholder: t('addBank_page_pInput'),
    },
    // code: {
    //   name: 'code',
    //   label: t('addBank_page_phoneCode'),
    //   placeholder: t('home_page_enterVerificationCode'),
    //   showRight: false, // 第一次绑定不需要手机验证码，后面都需要
    //   disabledBtn: false,
    //   loading: false,
    //   btnText: 'addBank_page_getCode',
    //   timer: null
    // },
  },
  rules: {},
  data: {
    ...dataParams,
    name: '',
  }
});

const onClose = () => walletInfo.setShowAddBank(false);
const onSubmit = () => {
  // 第二次绑定银行卡需要验证是否已绑定手机号
  // if (!userInfo.value.mobile && curBankName.value) {
  //   return Message.error(t('addBank_page_notPhone'))
  // }
  if (!form.data.bank) {
    return Message.error(t('paymentManagement_page_chBank'))
  }
  if (!form.data.cardNo) {
    return Message.error(t('paymentManagement_page_chCardNo'))
  }
  if (!testBankCard(form.data.cardNo)) {
    return Message.error(t('paymentManagement_page_tip1'))
  }
  if (!form.data.name) {
    return Message.error(t('paymentManagement_page_chName'))
  }
  if (!testBankName(form.data.name)) {
    form.data.name = replaceChinese(form.data.name);
    return Message.error(t('paymentManagement_page_chName'))
  }
  // 第二次绑定银行卡需要验证是否输入验证码
  // if (!form.data.code && curBankName.value) {
  //   return Message.error(t('home_page_enterVerificationCode'))
  // }
  handleSubmit()
};
// 绑定银行卡提交
const handleSubmit = () => {
  const req = NetPacket.req_new_bank_card_info();
  req.bank_id = form.data.bank;
  req.account_number = form.data.cardNo;
  req.cardholder_name = props.myBankName ? props.myBankName : form.data.name?.replace(/\s+/g, '').toUpperCase(); // 保存需要去除空格和转大写
  Net.instance.sendRequest(req);
};
// result: 2 // 1 成功，2 失败
const handleAddBank = (res: any) => {
  const tips: any = {
    1: 'paymentManagement_page_addBankSuc',
    2: 'paymentManagement_page_addBankFail',
    3: 'paymentManagement_page_acc_already',
  }
  if (res.result === 1) {
    showAddBankModal(false)
    emit('getMyBindBankList'); // 刷新列表
    Message.success(t(tips[res.result]))
  } else {
    Message.error(t(tips[res.result]))
  }
}
const setBaseData = () => {
  // 已经有绑定过银行卡，需要验证手机验证码
  // if (curBankName.value) {
  //   form.fields.code.showRight = true
  // }
  form.fields.name.disabled = !!curBankName.value;
  form.data.name = curBankName.value;
}

const onSubmitSec = (item: any) => {
  console.log('---', item)
  if (item.name === 'bank') {
    openChooseBank();
  }
  // 获取手机验证码
  if (item.name === 'code') {
    sendSmsCode();
  }

}
// 发送手机验证码
const sendSmsCode = () => {
  if (!userInfo.value.mobile) {
    return Message.error(t('addBank_page_notPhone'))
  }
  form.fields.code.loading = true;
  const req = NetPacket.req_get_mobile_sms_code();
  req.mobile = userInfo.value.mobile.replace(/\s+/g, ''); // '+84' + 
  req.operate_type = 1; // 手机验证码
  Net.instance.sendRequest(req);
}
// 返回手机验证码是否发送
const handleSMSback = (res: any) => {
  form.fields.code.loading = false
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message))
    }
    form.fields.code.disabledBtn = true;
    form.fields.code.btnText = 60;
    form.fields.code.timer = setInterval(() => {
      form.fields.code.btnText--;
      if (form.fields.code.btnText <= 0) {
        clearInterval(form.fields.code.timer);
        form.fields.code.disabledBtn = false;
        form.fields.code.timer = null;
        form.fields.code.btnText = 'addBank_page_getCode'
      }
    }, 1000);
  } else {
    form.fields.code.disabled = false
  }
}
// 打开银行弹窗
const openChooseBank = () => {
  chooseBankModal.value.onCloseBank();
}
// 选择银行
const selectBank = (e: any) => {
  form.data.bank = e.value;
  form.fields.bank.chooseBank = e;
}
const getBankList = () => {
  const req = NetPacket.req_bank_name_list();
  Net.instance.sendRequest(req);
};

const handleBankList = async (res: any) => {
  await Page(pinia).setBankListInfo(res.bank_name_list, res.status_list)
};

watch(
  () => props.myBankName,
  (n) => {
    curBankName.value = n;
  }
)
watch(
  () => showAddBank.value,
  (n) => {
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
  getBankList();
  setBaseData();
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, handleBankList);
  // 绑定银行卡
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, handleAddBank);
  // 监听手机号验证码返回
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_mobile_sms_code,
    handleSMSback
  );
});
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_mobile_sms_code, null);
});


</script>
