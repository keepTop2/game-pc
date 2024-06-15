<template>
    <CommonForm :title="t('deposit_page_deposit')" :submit-text="t('deposit_page_arrival')" :form-ref="'depositFormRef'"
        :tab-list="tabList" :active-tab="activeTab" :form="form" :show-form="showDeposit" :showTab="false" @change-tab="changeTab"
        @on-close="onClose" @on-submit="onSubmit" @update-form-ref="updateFormRef" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import CommonForm from '@/components/CommonForm.vue';

import pinia, { Wallet } from "@/store";

import { TTabList } from '@/utils/types/formTypes';
import { MessageEvent2 } from '@/utils/net/MessageEvent2';
import { NetMsgType } from '@/utils/netBase/NetMsgType';
import { NetPacket } from '@/utils/netBase/NetPacket';
import { Net } from '@/utils/net/Net';
import { TBank, TDiscount, TRechargeByPaymenttype, TShopInfo } from '@/utils/types/paymentTypes';
import { useI18n } from "vue-i18n";
import { Message } from "@/utils/discreteApi.ts";

const { t } = useI18n();
const walletInfo = Wallet(pinia);
const { showDeposit } = storeToRefs(walletInfo);

const depositFormRef = ref();
const updateFormRef = (ref: any) => depositFormRef.value = ref;


const tabList: TTabList = [
    { label: t('deposit_page_coins'), value: 1 },
    { label: t('deposit_page_usdt'), value: 2 }
];

// 国家列表
// const ctList: TTabList = [
//     { label: '越南', value: 1 }
// ];
// 充值方式列表
const mtdList = ref<any>([
  { label: t('addBank_page_pChoose'), value: -1 ,  minrecharge: 0, maxrecharge: 0, paymethod: ''}
  ]);

// 优惠列表
const dcList = ref<TTabList>([{ label: t('deposit_page_notOffer'), value: 0 }]);

// 银行列表
const bkList = ref<TTabList>([]);

// 银行方式列表，参数是 type
const bkMtdList = ref<TTabList>([
    { label: t('deposit_page_bankTran'), value: 100 },
    { label: t('deposit_page_bankOnline'), value: 101 },
    { label: t('deposit_page_scanPay'), value: 102 },
]);
// 充值提交参数
const dataParams = {
  // country: 1,
  method: -1,
  discount: 0, // 优惠
  amount: '',
  bank: null, // 银行
  bankMethod: 100, // 银行支付方式，对应传给后端参数 type
}

const form = reactive({
    fields: {
        // ct: {
        //     name: 'country',
        //     label: t('deposit_page_nation'),
        //     hasPop: true,
        //     opts: ctList,
        //     view: 1
        // },
        mtd: {
            name: 'method',
            label: t('rechargeRecord_page_method'),
            hasPop: true,
            opts: mtdList,
            view: 1
        },
        dc: {
            name: 'discount',
            label: t('deposit_page_discount'),
            hasPop: true,
            opts: dcList,
            more: null
        },
        amount: {
            name: 'amount',
            label: t('rechargeRecord_page_amount'),
            placeholder: t('addBank_page_pInput')
        },
        bk: {
            name: 'bank',
            label: t('deposit_page_bank'),
            placeholder: t('addBank_page_pChoose'),
            hasPop: true,
            opts: bkList,
            view: 1,
            otherCond: false
        },
        bkMtd: {
            name: 'bankMethod',
            label: t('deposit_page_bankPay'),
            placeholder: t('addBank_page_pChoose'),
            hasPop: true,
            opts: bkMtdList,
            view: 1,
            otherCond: false
        },
        exRate: {
            name: 'exchangeRate',
            label: t('deposit_page_rate'),
            view: 2,
            disabled: true
        },
    },
    rules: {
        method: [
            {
                validator: () => {
                    if (form.data.method === -1) {
                        return false;
                    };
                    return true;
                },
                message: t('method_error'),
                trigger: 'blur'
            }
        ],
        amount: [
            {
                required: true,
                message: t('amount_error'),
                trigger: 'blur'
            }
        ]
    },
    data: {
      ...dataParams,
      exchangeRate: ''
    }
});

const activeTab = ref<any>(1);
const changeTab = (val: any) => {
  activeTab.value = val;
  // 重置参数
  form.data = {
    ...dataParams,
    exchangeRate: form.data.exchangeRate,
  };
};

const onClose = () => walletInfo.setShowDeposit(false);
const onSubmit = () => {
    depositFormRef.value?.validate((err: any) => {
        if (!err) {
          console.log(activeTab.value, '----', form.data)
          console.log('----=====', mtdList.value)
          // 获取到当前支付方式的最低最高充值金额
          let curObj;
          // usdt 充值
          if (activeTab.value === 2) {
            curObj = usdtRecharge.value
            form.data.method = curObj.paymenttype || 6; // usdt 6
          } else { // 非 usdt 充值
            curObj = mtdList.value.find((item: any) => item.value === form.data.method)
          }
          console.log('&&&&&', curObj)
          if (form.data.amount < curObj.minrecharge) {
            return  Message.error(t('deposit_page_minAmount', {minAmount: curObj.minrecharge}))
          }
          if (form.data.amount > curObj.maxrecharge) {
            return  Message.error(t('deposit_page_maxAmount', {maxAmount: curObj.maxrecharge}))
          }
          // 如果是银行卡方式，需要选择银行
          if (legalRecharge.value.find((item: any) => item.paymenttype === form.data.method)?.payname === 'bankcard' && !form.data.bank) {
            return  Message.error(t('paymentManagement_page_chBank'))
          }
           handleSubmit();
        }
    });
};
const handleSubmit = () => {
    const req = NetPacket.req_recharge_from_third();
    req.amount = form.data.amount;
    req.channel_type = form.data.method * 100; // 接口返回的 paymenttype 值乘以100
    req.bank_channel_type = legalRecharge.value.find((item: any) => item.paymenttype === form.data.method)?.payname === 'bankcard' ? form.data.bank : 0; // 只有选择银行的时候才有，usdt 是 0
    req.type = form.data.bankMethod; // 只有选择银行的时候才有，银行支付方式
    req.got_discount = form.data.discount;
    console.log('=======', req)
    Net.instance.sendRequest(req);
};
const handleDepositSubmit = (res: any) => {
  console.log('---', res)
  if (res.code === -1) {
    Message.error('充值优惠检查失败')
  }
}

const usdtRecharge = ref<TRechargeByPaymenttype>({});
const legalRecharge = ref<TRechargeByPaymenttype[]>([]);

const handleShopInfoRes = (rs: TShopInfo) => {
    bkList.value = rs.bank_list.map((bank: TBank) => ({ label: bank.pay_name, value: bank.pay_id }));
    form.data.exchangeRate = `1USDT=${rs.usdt_viet_rate}${t('accountsRecord_page_dong')}`;
    rs.discount_list.forEach((dc: TDiscount) => dcList.value.push({ label: dc.name, value: dc.discount_ID }));
    usdtRecharge.value = rs.rechargelist_by_paymenttype.filter((item) => item.payname?.toLowerCase() === 'usdt')[0];
    rs.rechargelist_by_paymenttype.filter((item) => item.payname?.toLowerCase() !== 'usdt').forEach((item) => {
        legalRecharge.value.push(item);
        mtdList.value.push(
          {
            minrecharge: item.minrecharge,
            maxrecharge: item.maxrecharge,
            paymethod: item.paymethod,
            label: t(`api_${item.payname}`),
            value: item.paymenttype }
          );
    });
};

const getShopInfo = () => {
    const req = NetPacket.req_get_shop_info();
    Net.instance.sendRequest(req);
}

watch(() => form.data.method, (m) => {
    if (legalRecharge.value.filter((item: any) => item.paymenttype === m)[0]?.payname === 'bankcard') {
        form.fields.bk.otherCond = true;
        form.fields.bkMtd.otherCond = true;
    } else {
        form.fields.bk.otherCond = false;
        form.fields.bkMtd.otherCond = false;
    }
});

onMounted(() => {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, handleShopInfoRes);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, handleDepositSubmit);
    setTimeout(() => getShopInfo(), 500);
});
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, null);
});
</script>
