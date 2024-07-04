<template>
  <CommonForm :title="t('withdraw_page_withdraw')" :submit-text="t('withdraw_page_withdrawNow')"
    :form-ref="'withdrawFormRef'" :tab-list="tabList" :active-tab="activeTab" :form="form" :show-form="showWithdraw"
    :showTab="false" @change-tab="changeTab" @on-close="onClose" @on-submit="onSubmit" @select-action="onSelectEmpty"
    @update-form-ref="updateFormRef" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';

import CommonForm from '@/components/CommonForm.vue';

import pinia, { User, Wallet } from '@/store/index';
import { TTabList } from '@/utils/types/formTypes';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
// import { TBankCardInfoList } from '@/utils/types';
import { Message } from "@/utils/discreteApi";

const props = defineProps({
  myBankList: {
    type: Object,
    default: () => { }
  }
})
const router = useRouter();
const { t } = useI18n();
const WalletStore = Wallet(pinia);
const UserStore = User(pinia);
const { showWithdraw } = storeToRefs(WalletStore);
const { info: userInfo, roleInfo } = storeToRefs(UserStore);

const withdrawFormRef = ref();
const updateFormRef = (ref: any) => withdrawFormRef.value = ref;
const tabList: TTabList = [
  { label: t('withdraw_page_withdrawCoins'), value: 1 },
  { label: t('withdraw_page_withdrawUsdt'), value: 2 }
];
const isCanWithdraw = ref(false); // 是否可提现

// 银行列表
const bkList = ref<TTabList>([]);
// 这里同步 way 参数 ，1 银行卡，2 USTD
const activeTab = ref<any>(1);
const changeTab = (val: any) => {
  activeTab.value = val;
  setCanWithDrawMon();
};

const form = reactive({
  fields: {
    avail: {
      name: 'availAmount',
      label: t('withdraw_page_canAmount'),
      placeholder: t('addBank_page_pInput'),
      disabled: true
    },
    unit: {
      name: 'unit',
      label: t('rechargeRecord_page_currency'),
      placeholder: t('addBank_page_pInput'),
      view: 1,
      disabled: true
    },
    bk: {
      name: 'bank',
      label: t('deposit_page_bank'),
      placeholder: t('addBank_page_pChoose'),
      hasPop: true,
      opts: bkList,
      view: 1
    },
    address: {
      name: 'address',
      label: t('withdraw_page_usdtAdd'),
      placeholder: t('addBank_page_pInput'),
      view: 2
    },
    withdraw: {
      name: 'withdrawAmount',
      label: t('withdraw_page_inputMon'),
      placeholder: t('addBank_page_pInput')
    },
    walletPwd: {
      name: 'walletPwd',
      type: 'password',
      label: t('withdraw_page_payPwd'),
      placeholder: t('addBank_page_pInput')
    },
  },
  rules: {
    withdrawAmount: [
      {
        required: true,
        message: t('amount_error'),
        trigger: 'blur'
      }
    ],
    address: [
      {
        validator: () => {
          if (activeTab.value === 2) {
            return true;
          } else if (!form.data.address) {
            return false;
          };
        },
        message: t('address_error'),
        trigger: 'blur'
      }
    ],
    walletPwd: [
      {
        required: true,
        message: t('wallet_pwd_error'),
        trigger: 'blur'
      }
    ],
  },
  data: {
    availAmount: '0',
    address: '',
    withdrawAmount: '',
    walletPwd: '',
    unit: 'VND', // 越南盾
    bank: null,
  }
});

const onSelectEmpty = (i: string) => {
  if (i === 'bank' && bkList.value.length === 0) {
    router.push({ name: 'paymentManagement' });
  }
};

const onClose = () => WalletStore.setShowWithdraw(false);
const onSubmit = () => {
  // 没有可提现金额
  if (!isCanWithdraw.value) {
    return Message.error(t('withdraw_page_CantWithdraw'))
  }
  withdrawFormRef.value?.validate((err: any) => {
    if (!err) {
      console.log(activeTab.value, '----', form.data)
      // 银行卡提款
      if (activeTab.value === 1) {
        if (!form.data.bank) {
          return Message.error(t('paymentManagement_page_chBank'))
        }
        if (form.data.withdrawAmount < props.myBankList.min_withdraw_money) {
          return Message.error(t('withdraw_page_minAmount', { minAmount: props.myBankList.min_withdraw_money }))
        }
        if (form.data.withdrawAmount > props.myBankList.max_withdraw_money) {
          return Message.error(t('withdraw_page_maxAmount', { maxAmount: props.myBankList.max_withdraw_money }))
        }
        form.data.address = props.myBankList.bank_card_info_list.find((item: any) => item.bank_id === form.data.bank)?.account_number; // 银行卡号
      }
      handleSubmit();
    }
  })
};
const handleSubmit = () => {
  const req = NetPacket.req_apply_withdraw();
  req.money = form.data.withdrawAmount;
  req.bank_card_id = form.data.address;
  req.bank_id = form.data.bank || 0;
  req.passwd = form.data.walletPwd;
  req.way = activeTab.value; // 1 银行卡，2 USTD
  Net.instance.sendRequest(req);
};

// 设置可提现金额
const setCanWithDrawMon = () => {
  if (isCanWithdraw.value) {
    form.data.availAmount = activeTab.value === 1 ? roleInfo.value.bank_money.toString() : (Number(roleInfo.value.bank_money) / Number(userInfo.value.usdt_rate)).toString();
  } else { // 不可以提现，可提现金额置为 0
    form.data.availAmount = '0';
  }
}

// 已绑定的银行卡信息
const setBankList = () => {
  bkList.value = props.myBankList.bank_card_info_list.map((bank: any) => ({ label: bank.bank_name, value: bank.bank_id }));
}

// const handleBankCardInfoRes = (res: TBankCardInfoList) => {
//     bkList.value = res.bank_card_info_list.map((bank) => ({ label: bank.bank_name, value: bank.bank_id }));
// };
// const handleAuditRecord = (res: any) => {
//     console.warn(res);
// };
// 1 没有可提现金额，提现金额显示0，0 可以提现
const handleCanWithdraw = (res: any) => {
  isCanWithdraw.value = !res.rlt;
  console.log('是否可提现---', isCanWithdraw.value)
  setCanWithDrawMon();
};
// 0=>申请成功, 1=>申请失败
const handleWithDrawSubmit = (res: any) => {
  if (res.result === 1) {
    Message.error(t('withdraw_page_subFail'))
  } else {
    router.push('/wallet/withdrawRecord')
    onClose();
    Message.success(t('withdraw_page_subSucces'))
  }
}

const initReq = () => {
  Net.instance.sendRequest(NetPacket.req_can_withdraw());
  // Net.instance.sendRequest(NetPacket.req_bank_card_info_list());
  // Net.instance.sendRequest(NetPacket.req_get_audit_record());
};

onMounted(() => {
  setBankList();
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, handleBankCardInfoRes);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, handleCanWithdraw);
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_audit_record, handleAuditRecord);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, handleWithDrawSubmit); // 提款提交监听
  setTimeout(() => initReq(), 600);
});
onUnmounted(() => {
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, null);
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_audit_record, null);
});
</script>
@/netBase/NetMsgType@/netBase/NetPacket