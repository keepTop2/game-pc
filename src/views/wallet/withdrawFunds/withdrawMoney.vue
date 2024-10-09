<template>

  <BankListInfo v-if="bankListInfoShow" ref="bankListInfoRef" @bindBankCheck="checkBankInfo" :myBankName="myBankName"
    :myBankList="mySecBankList" />

  <div class="form_container vertical">
    <div class="body vertical center t_md body_sec">
      <n-form ref="formRef" class="w_full" :model="form" :rules="rules">
        <!-- <n-form-item :label="t('walletInfo_page_availableMount')">
          <n-flex justify="center" align="center" class="wit_not_finish" v-if="isHasOrder">
            {{ t('withdraw_page_fail_wait') }} </n-flex>
          <n-input size="large" disabled v-model:value="form.maxValue" />
        </n-form-item> -->
        <n-form-item>
          <div class="item_box">
            <div class="withdraw_item can_withdraw">
              <span class="text"> {{ t('withdraw_page_canAmount') }}：</span>
              <span class="amount">{{ form.maxValue }}</span>
              <div class="link_positon" @click="onCloseSec"> {{ t('withdraw_page_cunqu') }}</div>
            </div>
            <div class="line"></div>
            <div class="withdraw_item">
              <span class="text"> {{ t('withdraw_page_locknAmount') }}：</span>
              <span class="amount">{{ withdrawData.canot_withdraw }}</span>
              <div class="link_positon" @click="$router.push('auditRecord')"> {{ t('withdraw_page_lockedDetail') }}
              </div>
            </div>
            <div class="withdraw_item">
              <span class="text"> {{ t('withdraw_page_needFlowAmount') }}：</span>
              <span class="amount">{{ withdrawData.turnover }}</span>
            </div>
          </div>
        </n-form-item>

        <n-flex align="center">
          <n-form-item :label="t('walletInfo_page_selectBank')" style="flex: 1;">
            <div class="selectBank">
              <div class="bankName">
                <div class="icon">
                  <Imgt :src="`/img/bankIcon/bank_logo_${backItemInfo.bank_id}.webp`"
                    :alt="backItemInfo.bank_name" />
                </div>
                <span>{{ backItemInfo.bank_name }}</span>
              </div>
              <div class="mantissa">
                <span>
                  {{ t('walletInfo_page_tailNumber') }}：{{
                    backItemInfo.account_number.substring(backItemInfo.account_number.length - 4,
                      backItemInfo.account_number.length) }}
                </span>
              </div>
            </div>
          </n-form-item>
          <n-button :bordered="false" class="btn" @click="openBankListInfo">{{ t('deposit_page_changeWay')
            }}</n-button>
        </n-flex>

        <n-form-item class="money_input" :label="t('walletInfo_page_withdrawalMon')" path="amount">
          <!-- 防止记住用户名和密码填充 -->
          <input type="text" class="hideInput" name="username-hide" autocomplete="off" />
          <n-input @input="validateInput" @blur="inputBlur" clearable autocomplete="off" size="large"
            v-model:value="form.amount" :placeholder="t('walletInfo_page_withdrawalMon')">
            <template #suffix>
              <a class="refresh_icon"></a>
            </template>
          </n-input>
        </n-form-item>

        <div class="switchVisible">
          <n-form-item :label="t('withdraw_page_payPwd')" :path="switchVisible ? 'password' : ''">
            <n-input ref="inputRef" clearable autocomplete="off" v-if="switchVisible" v-model:value="form.password"
              :type="changeRightInfo.type" @keydown.enter.prevent>
              <template #suffix>
                <iconpark-icon @click="iconClick" :icon-id="changeRightInfo.icon" color="#8e82c2"
                  size="1.5em"></iconpark-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-switch class="switch" :rail-style="railStyle" v-model:value="switchVisible" />
        </div>

        <n-flex class="kjje_div">
          <a class="kj_item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
            :key="index">
            {{ item.label }}
          </a>
        </n-flex>
      </n-form>
      <div class="btn_zone flex w_full">
        <div class="submit_btn  weight_5 center pointer" @click="onSubmit">{{ t('walletInfo_page_immediatelyMon') }}
        </div>
      </div>
      <div v-show="form.amount" class="cz_tips">
        <div class="txt"> {{ t('deposit_page_arrival') }}：{{ form.amount }} </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { Message } from "@/utils/discreteApi";
import BankListInfo from '@/views/wallet/withdrawFunds/bankListInfo.vue';
import pinia from '@/store';
import { User } from '@/store/user';
import { storeToRefs } from 'pinia';
import { verifyNumberComma, removeComma } from '@/utils/others.ts';
import { useRouter } from 'vue-router';
import Imgt from '@/components/Imgt.vue';

const router = useRouter();
const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);

const props = defineProps({
  myBankList: {
    type: Object,
    default: () => { }
  }
})

const myBankName = ref(''); // 如果有已经绑定的银行卡姓名，下次绑定需要一致
const { t } = useI18n();
const inputRef: any = ref(null);
const showSecModal = ref(false);
const switchVisible = ref(true)
const formRef = ref()
const baseObj = {
  // country: 1,
  maxValue: '0', // 可提现金额
  password: '',
  amount: '', // 金额
  bank: 0, // 银行
  address: '', // 银行卡号
}
const form: any = ref( // 存款表单提交
  { ...baseObj }
);
const isCanWithdraw = ref(false); // 是否可提现
const isHasOrder = ref(false); // 是否存在未审核的提现订单
const mySecBankList = ref(props.myBankList);

const rules = {
  amount: [
    {
      required: true,
      message: t('amount_error'),
      trigger: 'blur',
      validator: () => {
        // 正整数
        const reg = /^[1-9]\d*[\w,]*$/;
        return reg.test(form.value.amount);
      }
    }
  ],
  password: [
    {
      required: true,
      message: t('wallet_pwd_error'),
      trigger: 'blur'
    }
  ]
}
const bankListInfoRef = ref()
const bankListInfoShow = ref(false)

const inputBlur = () => {
  form.value.amount = verifyNumberComma(String(form.value.amount))
}
// 限制只能输入 正整数
const validateInput = () => {
  form.value.amount = form.value.amount.replace(/[^0-9]/g, '');
}
const openBankListInfo = () => {
  bankListInfoShow.value = true
  nextTick(() => {
    bankListInfoRef.value.openModal()
  })
}

const changeRightInfo = ref({
  icon: 'Group39364',
  type: 'password'
})
const iconClick = () => {
  inputRef.value.blur(); // 防止光标回到首位
  if (changeRightInfo.value.icon == "Group39364") {
    changeRightInfo.value.type = "text"
    changeRightInfo.value.icon = "Group39365"
  } else {
    changeRightInfo.value.type = "password"
    changeRightInfo.value.icon = "Group39364"
  }
}

const chooseMoneyArr = [
  { label: '100,000', value: 100000 },
  { label: '200,000', value: 200000 },
  { label: '500,000', value: 500000 },
  { label: '1,000,000', value: 1000000 },
  { label: '10,000,000', value: 10000000 },
  { label: '100,000,000', value: 100000000 },
];

const openModal = () => {
  showSecModal.value = true;
  nextTick(() => {
    getBaseData();
  })
}
const getBaseData = () => {
  form.value = { ...baseObj }
  initReq(); // 获取可提现金额
  getInfo();
}

const onCloseSec = () => {
  showSecModal.value = !showSecModal.value
}

const onSubmit = () => {
  // 有未审核提现记录
  if (isHasOrder.value) {
    return Message.error(t('withdraw_page_fail_tips6'))
  }
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const numMon = removeComma(form.value.amount);
      if (!form.value.bank) {
        return Message.error(t('paymentManagement_page_chBank'))
      }
      if (numMon < mySecBankList.value.min_withdraw_money) {
        return Message.error(t('withdraw_page_minAmount', { minAmount: mySecBankList.value.min_withdraw_money }))
      }
      if (numMon > mySecBankList.value.max_withdraw_money) {
        return Message.error(t('withdraw_page_maxAmount', { maxAmount: mySecBankList.value.max_withdraw_money }))
      }
      form.value.address = mySecBankList.value.bank_card_info_list.find((item: any) => item.bank_id === form.value.bank)?.account_number; // 银行卡号
      handleSubmit()
    } else {
      console.log(errors);
    }
  });
}

const handleSubmit = () => {
  const req = NetPacket.req_apply_withdraw();
  req.money = removeComma(form.value.amount);
  req.bank_card_id = form.value.address; // 卡号
  req.bank_id = form.value.bank || 0; // 银行 id
  req.passwd = form.value.password;
  req.way = 1; // 1 银行卡，2 USTD
  Net.instance.sendRequest(req);
};

// 0=>申请成功, 1=>申请失败
const handleWithDrawSubmit = (res: any) => {
  const codeTxt: any = {
    0: t('withdraw_page_subSucces'),
    1: t('withdraw_page_fail_tips1'),
    2: t('withdraw_page_fail_tips2'),
    3: t('withdraw_page_fail_tips3'),
    4: t('withdraw_page_fail_tips4'),
    5: t('withdraw_page_fail_tips5'),
    6: t('withdraw_page_fail_tips6'),
  }
  if (res.result === 0) {
    onCloseSec();
    getBaseData();
    router.push('/wallet/withdrawRecord')
    // Message.success(codeTxt[res.result]); // 提款成功不需要弹出弹窗
  } else {
    Message.error(codeTxt[res.result])
  }
}

// 选择快捷金额
const chooseFastMon = (e: any) => {
  if (!form.value.amount) { form.value.amount = '0' }
  form.value.amount = removeComma(form.value.amount) + e;
  form.value.amount = verifyNumberComma(String(form.value.amount))
}

const handleCanWithdraw = (res: any) => {

  isCanWithdraw.value = !res.rlt; // rlt: 0 可提现，1 不可提现，2 存在未审核的提现订单
  isHasOrder.value = res.rlt === 2;
  setCanWithDrawMon(res);
};
const withdrawData = ref({
  turnover: 0,
  canot_withdraw: 0,
})
// 设置可提现金额
const setCanWithDrawMon = (data: any) => {
  console.log('--setCanWithDrawMon--', data);
  withdrawData.value.turnover = data?.turnover
  withdrawData.value.canot_withdraw = data?.canot_withdraw
  if (isCanWithdraw.value) {
    form.value.maxValue = verifyNumberComma(String(data.can_withdraw))
  } else { // 不可以提现，可提现金额置为 0
    form.value.maxValue = '0';
  }
}

const backItemInfo = ref({
  bank_name: '',
  account_number: 'xxxxxxx',
  bank_id: 0
})

const getInfo = () => {
  let bankListItem = mySecBankList.value.bank_card_info_list[0]
  myBankName.value = mySecBankList.value.cardholder_name || ''
  console.log('===当前选择的提款银行信息--', bankListItem)
  form.value.bank = bankListItem.bank_id || 0
  backItemInfo.value.bank_name = bankListItem.bank_name || ''
  backItemInfo.value.account_number = bankListItem.account_number || 'xxxxxxx'
  backItemInfo.value.bank_id = bankListItem.bank_id || 0
}

const checkBankInfo = (item: any) => {
  const { bank_id, account_number, bank_name } = item
  form.value.bank = bank_id
  backItemInfo.value.bank_name = bank_name || ''
  backItemInfo.value.account_number = account_number || 'xxxxxxx'
  backItemInfo.value.bank_id = bank_id || 0
}

const initReq = () => {
  form.value.maxValue = verifyNumberComma(String(roleInfo.value.bank_money))
  Net.instance.sendRequest(NetPacket.req_can_withdraw());
};

watch(() => props.myBankList, (n) => {
  console.log('银行列表有更新--', n)
  mySecBankList.value = n;
})
onMounted(() => {
  // setTimeout(() => initReq(), 600);
  // 可提现金额
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, handleCanWithdraw);
  // 提款提交监听
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, handleWithDrawSubmit);

})
onUnmounted(() => {
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, null);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, null);
})

defineExpose({
  openModal
});

const railStyle = ({ focused, checked }: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = 'rgba(12, 197, 30, 1)'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = 'rgba(50, 44, 89, 1)'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}

</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';
@timestamp: `new Date().getTime()`;

.deposit_modal {
  font-size: 16px;
  width: 650px !important;

  .hideInput {
    position: absolute;
    opacity: 0;
  }

  .body {
    gap: 15px !important;

    .wit_not_finish {
      position: absolute;
      z-index: 9;
      color: #fff;
      background: rgba(0, 0, 0, .7);
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }

    .item_box {
      display: flex;
      flex-direction: column;
      background: #20114C;
      width: 100%;
      border-radius: 10px;

      .withdraw_item {
        padding: 10px;
        position: relative;

        .link_positon {
          position: absolute;
          right: 10px;
          top: 10px;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .can_withdraw {
        font-size: 18px;

        .amount {
          font-size: 18px;
          color: #F1C232;
          font-weight: bold;
        }

        border-bottom: 1px solid #3C3671;
      }

    }

    .item-list {
      width: 536px;
      height: 96px;
      padding: 15px 17px 10px;
      background: url('/img/payment/listBg.webp?t=@{timestamp}') center no-repeat;
      background-size: 100%;

      &.active {
        background-image: url('/img/payment/listBg_active.webp?t=@{timestamp}');
      }

      .item-list-l {

        .bank-icon {
          img {
            width: 50px;
            height: 50px;
          }
        }

        .bank-txt {
          padding-top: 3px;

          .bank-name {
            .wh-icon {
              width: 16px;
              height: 16px;
              background: url('/img/payment/wh.webp?t=@{timestamp}') center no-repeat;
              background-size: 100%;
            }
          }

          .bank-limit {
            margin-top: 13px;
            color: #fabb2d;
          }
        }
      }

      .item-list-r {
        a {
          margin-top: 8px;
          display: inline-block;
          text-align: center;
          width: 90px;
          height: 36px;
          line-height: 36px;
          background: url('/img/payment/go-btn.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;
        }
      }

    }

    .btn {
      color: #fff;
      height: 40px !important;
      width: 90px;
      font-size: 14px;
      background: url('/img/login/sendBtn.webp?t=@{timestamp}') no-repeat;
      background-size: contain;
    }

    .cz_btn {
      a {
        font-size: 18px;
        display: block;
        width: 382px;
        height: 54px;
        line-height: 52px;
        text-align: center;
        margin: 20px auto 0;
        background: url('/img/payment/sub_btn.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
      }
    }

    .selectBank {
      display: flex;
      align-items: center;
      cursor: pointer;
      //justify-content: center;
      width: 500px;
      height: 50px;
      border-radius: 12px;
      border: 1px solid rgba(50, 44, 89, 1);
      background-color: rgba(29, 14, 74, 1);

      .bankName {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 35px;
        margin-right: 16px;
        margin-left: 5px;
        border-radius: 6px;
        background: radial-gradient(87.04% 93.77% at 50% 13.97%, #4C36B3 0.17%, #3A2786 74.42%, #3C279A 100%);

        .icon {
          width: 18px;
          height: 18px;
          margin-right: 5px;
          background-color: #fff;

          img {
            width: 18px;
            height: 18px;
          }
        }

        span {
          width: calc(110px - 18px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .switchVisible {
      position: relative;

      .switch {
        position: absolute;
        top: 0;
        right: 0;

        //background-color: #fff;
        .n-switch__rail {
          width: 50px !important;
          height: 20px !important;
        }
      }
    }

    .kjje_div {
      gap: 20px !important;

      .kj_item {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: url('/img/payment/monBg.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
      }
    }

  }
}
</style>
