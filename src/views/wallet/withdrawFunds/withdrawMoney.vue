<template>

  <BankListInfo v-if="bankListInfoShow" ref="bankListInfoRef" @bindBankCheck="checkBankInfo" :myBankName="myBankName"
    :myBankList="mySecBankList" />

  <div class="list_box bg_color">
    <div class="txt_title">{{t('提款方式')}}</div>
    <n-flex class="body vertical center t_md">
      <!-- 列表选择 -->
      <n-flex justify="center" align="center"
              :class="`item_list ${item.status === 0 ? 'wh_item' : ''} ${curPayWay.payname === item.payname ? 'active' : ''}`"
              v-for="(item, index) in wayArray"
              @click="chooseWay(item)"
              :key="index">
        <div v-if="item.status === 0" class="bank_wh">
          <Imgt src="/img/payment/wh_bank.webp" />
          <span>{{ t('addBank_page_bankPay_wh') }}</span>
        </div>
        <n-flex align="center" justify="center" class="item_list_l">
          <div class="bank_icon">
            <Imgt :src="`/img/payment/icon/icon_${item.payname}.webp`" />
            <a class="wh_icon" @click="onCloseSm(item)"></a>
          </div>
          <div class="bank_txt">
            <div class="bank_name">
              {{ t(`api_${item.payname}`) }}
            </div>
            <div class="bank_limit">
              {{ verifyNumberComma(String(item.minrecharge)) }}~{{ verifyNumberComma(String(item.maxrecharge)) }}
            </div>
          </div>
        </n-flex>
      </n-flex>
    </n-flex>
  </div>

  <!-- 说明 -->
  <ModalDialog v-model:visible="showSmModal" title="deposit_page_instructions">
    <template #content>
      <div class="deposit_shuom">
        <n-flex align="center" justify="center" class="sm_txt">
          <div class="sm_content">
            -----
          </div>
        </n-flex>
      </div>
    </template>
  </ModalDialog>

  <div class="form_container vertical bg_color">
    <div class="body vertical center t_md body_sec">
      <n-form ref="formRef" label-placement="left" class="w_full" :model="form" :rules="rules">

        <n-form-item class="not_input input_avi" :label="t('withdraw_page_canAmount')">
          <n-input autocomplete="off" readonly size="large" v-model:value="form.maxValue" >
            <template #suffix>
              <div class="pointer gradient_txt" @click="onCloseSec"> {{ t('withdraw_page_cunqu') }}</div>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="not_input" :label="t('withdraw_page_locknAmount')">
          <n-input autocomplete="off" readonly size="large" v-model:value="withdrawData.canot_withdraw" >
            <template #suffix>
              <div class="pointer gradient_txt" @click="$router.push('auditRecord')"> {{ t('withdraw_page_lockedDetail') }}</div>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="not_input" :label="t('withdraw_page_needFlowAmount')">
          <n-input autocomplete="off" readonly size="large" v-model:value="withdrawData.turnover" >
          </n-input>
        </n-form-item>


        <n-flex justify="space-between">
          <n-form-item :label="t('walletInfo_page_selectBank')" style="flex: 1;">
            <n-select v-if="myBankList" v-model:value="form.bank"
                      :options="[{label: t('paymentManagement_page_chBank'), value: ''}, ...myBankList.bank_card_info_list.map((item: any) => {return {label: item.bank_name, value: item.bank_id}})]" />
<!--            <div class="selectBank">
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
            </div>-->
          </n-form-item>
          <n-flex justify="center" align="center" class="button button_color mr_t_5" @click="openBankListInfo">{{t('更换')}}</n-flex>
        </n-flex>
        <n-flex justify="space-between">
          <n-form-item style="flex: 1;" class="money_input" :label="t('walletInfo_page_withdrawalMon')" path="amount">
            <!-- 防止记住用户名和密码填充 -->
            <input type="text" class="hideInput" name="username-hide" autocomplete="off" />
            <n-input @input="validateInput" @blur="inputBlur" clearable autocomplete="off" size="large"
              v-model:value="form.amount" :placeholder="t('walletInfo_page_withdrawalMon')">
            </n-input>
          </n-form-item>
          <n-flex justify="center" align="center" class="button button_color mr_t_5" @click="form.amount = ''">{{t('重置')}}</n-flex>
        </n-flex>
        <n-flex class="kjje_div">
          <a class="kj_item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
             :key="index">
            {{ item.label }}
          </a>
        </n-flex>
        <n-flex class="switchVisible">
          <n-form-item style="flex: 1;" :label="t('withdraw_page_payPwd')" :path="switchVisible ? 'password' : ''">
            <n-input ref="inputRef" clearable autocomplete="off" v-if="switchVisible" v-model:value="form.password"
              :type="changeRightInfo.type" @keydown.enter.prevent>
              <template #suffix>
                <iconpark-icon @click="iconClick" :icon-id="changeRightInfo.icon" color="#8e82c2"
                  size="1.5em"></iconpark-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-switch class="switch" :rail-style="railStyle" v-model:value="switchVisible" />
        </n-flex>

      </n-form>
      <div class="btn_zone">
        <n-flex align="center" justify="center" class="submit_btn weight_5 pointer button_color" @click="onSubmit">{{ t('walletInfo_page_immediatelyMon') }}
        </n-flex>
      </div>
      <div v-show="form.amount" class="cz_tips">
        <div class="txt">
          <n-flex class="txt_con" align="center" justify="center">
            <span>{{ t('deposit_page_arrival') }}：{{ form.amount }}</span>
            <n-tooltip placement="top-end" trigger="hover">
              <template #trigger>
                <iconpark-icon class="pointer" icon-id="iconyiwen" size=".8rem"></iconpark-icon>
              </template>
              <div
                style="
                width: 224px;
                height: 80px;
                padding: 14px;
                /*background:  rgba(33, 36, 67, 1);*/
                /*border: 1px solid rgba(38, 41, 76, 1)*/
              "
              >
                交易金额包括交易手续费和税费
                兑换汇率：₫1223=1USDT
              </div>
            </n-tooltip>
          </n-flex>
        </div>
        <n-flex justify="center" align="center" class="tip">
<!--          <span class="icon"></span>-->
          <span> {{ t('Kindtips') }} </span>
        </n-flex>
      </div>
    </div>

    <!-- 资金密码弹窗 -->
    <ModalDialog v-model:visible="showPwdModal" title="deposit_page_instructions">
      <template #content>
        <div class="pay_pwd_con">
          <n-form-item style="flex: 1;" :label="t('withdraw_page_payPwd')" :path="switchVisible ? 'password' : ''">
            <n-input ref="inputRef" autocomplete="off" v-if="switchVisible" v-model:value="form.password"
                     :type="changeRightInfo.type" @keydown.enter.prevent>
              <template #suffix>
                <iconpark-icon @click="iconClick" :icon-id="changeRightInfo.icon" color="#8e82c2"
                               size="1.5em"></iconpark-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-flex align="center" justify="center" class="button_color button" @click="handleSubmit">
            {{t('home_page_confirm')}}
          </n-flex>
        </div>
      </template>
    </ModalDialog>

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
import { Local } from '@/utils/storage.ts';
import ModalDialog from '@/components/ModalDialog.vue';
import useWalletInfo from '@/views/wallet/walletInfo/useWalletInfo.ts';

const router = useRouter();
const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);

const {
  myBankList,
  getMyBankList,
} = useWalletInfo()

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
  bank: '', // 银行
  address: '', // 银行卡号
}
const form: any = ref( // 存款表单提交
  { ...baseObj }
);
const isCanWithdraw = ref(false); // 是否可提现
const isHasOrder = ref(false); // 是否存在未审核的提现订单
const mySecBankList = ref(myBankList);

const showPwdModal = ref(false);
const showSmModal = ref(false);
const curWay = ref({ payname: '' });
const curPayWay = ref({ payname: '' }); // 当前选择的提款方式
const wayArray = ref(
  [
    {
      "maxrecharge": 300000000,
      "minrecharge": 50000,
      "paymenttype": 100,
      "paymethod": "1",
      "payname": "bankcard_0",
      "status": 1
    },
    {
      "maxrecharge": 300000000,
      "minrecharge": 50000,
      "paymenttype": 600,
      "paymethod": "",
      "payname": "usdt",
      "status": 1
    },
  ]
)

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
  console.log('******')
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
      showPwdModal.value = true // 显示资金密码
      // handleSubmit()
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
  withdrawData.value.turnover = verifyNumberComma(String(data?.turnover))
  withdrawData.value.canot_withdraw = verifyNumberComma(String(data?.canot_withdraw))
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

// 选择充值方式
const chooseWay = (data: any) => {
  form.value.method = data.paymenttype;
  curPayWay.value.payname = data.payname
};
const onCloseSm = (data: any) => {
  curWay.value = data;
  Local.set('curExplainSecWay', data);
  showSmModal.value = !showSmModal.value;
};


watch(() => myBankList, (n) => {
  console.log('银行列表有更新--', n)
  mySecBankList.value = n;
})
onMounted(() => {
  getMyBankList();
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

.pay_pwd_con {
  padding: 50px 87px 100px;
  :deep(.n-form-item-label__text) {
    color: #fff;
  }
  .button {
    width: 330px;
    height: 40px;
    margin-top: 20px;
  }
}
.mr_t_5 {
  margin-top: 6px;
}
.form_container {
  margin-top: 20px;
  padding: 40px;
  font-size: 16px;

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
    .not_input {
      :deep(.n-input__input-el) {
        font-size: 16px;
        font-weight: 700;
      }
      &.input_avi {
        :deep(.n-input__input-el) {
          color: rgba(250, 201, 5, 1);
        }
      }
      .pointer {
        font-size: 16px;
      }
    }
    //.item-list {
    //  width: 536px;
    //  height: 96px;
    //  padding: 15px 17px 10px;
    //  background: url('/img/payment/listBg.webp?t=@{timestamp}') center no-repeat;
    //  background-size: 100%;
    //
    //  &.active {
    //    background-image: url('/img/payment/listBg_active.webp?t=@{timestamp}');
    //  }
    //
    //  .item-list-l {
    //
    //    .bank-icon {
    //      img {
    //        width: 50px;
    //        height: 50px;
    //      }
    //    }
    //
    //    .bank-txt {
    //      padding-top: 3px;
    //
    //      .bank-name {
    //        .wh-icon {
    //          width: 16px;
    //          height: 16px;
    //          background: url('/img/payment/wh.webp?t=@{timestamp}') center no-repeat;
    //          background-size: 100%;
    //        }
    //      }
    //
    //      .bank-limit {
    //        margin-top: 13px;
    //        color: #fabb2d;
    //      }
    //    }
    //  }
    //
    //  .item-list-r {
    //    a {
    //      margin-top: 8px;
    //      display: inline-block;
    //      text-align: center;
    //      width: 90px;
    //      height: 36px;
    //      line-height: 36px;
    //      background: url('/img/payment/go-btn.webp?t=@{timestamp}') center no-repeat;
    //      background-size: 100%;
    //    }
    //  }
    //
    //}

    .kjje_div {
      margin-top: 30px;
      margin-bottom: 30px;
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
        margin-top: 10px;
        //background-color: #fff;
        .n-switch__rail {
          width: 50px !important;
          height: 20px !important;
        }
      }
    }


  }
}
</style>
