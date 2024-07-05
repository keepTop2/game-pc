<template>

  <BankListInfo v-if="bankListInfoShow" ref="bankListInfoRef" @bindBankCheck="checkBankInfo" :myBankName="myBankName"
    :myBankList="props.myBankList" />

  <n-modal class="deposit_modal" :show="showSecModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight-5 t-md">{{ '提款' }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onCloseSec" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md body-sec">
          <n-form ref="formRef" class="w-full" :model="form" :rules="rules">
            <n-form-item :label="'可用法币数量'">
              <n-input size="large" disabled v-model:value="form.maxValue" />
            </n-form-item>


            <n-form-item :label="'选择银行卡'">
              <div class="selectBank">
                <div class="bankName">
                  <div class="icon">
                    <img :src="`/img/bankIcon/bank_logo_${backItemInfo.bank_id}.webp`" :alt="backItemInfo.bank_name" />
                  </div>
                  <span>{{ backItemInfo.bank_name }}</span>
                </div>
                <div class="mantissa">
                  <span>尾号：{{ backItemInfo.account_number.substring(backItemInfo.account_number.length - 4,
    backItemInfo.account_number.length) }}</span>
                </div>
              </div>
              <n-button :bordered="false" class="btn" @click="openBankListInfo">更换</n-button>
            </n-form-item>

            <n-form-item :label="'输入提款金额'" path="amount">
              <n-input size="large" v-model:value="form.amount" :placeholder="'请输入充值金额'">
                <template #suffix>
                  <a class="refresh-icon"></a>
                </template>
              </n-input>
            </n-form-item>


            <div class="switchVisible">
              <n-form-item label="资金密码" path="password">
                <n-input v-if="switchVisible" v-model:value="form.password" :type="changeRightInfo.type"
                  @keydown.enter.prevent>
                  <template #suffix>
                    <iconpark-icon @click="iconClick" :icon-id="changeRightInfo.icon" color="#8e82c2"
                      size="1.5em"></iconpark-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-switch class="switch" :rail-style="railStyle" v-model:value="switchVisible" />

            </div>


            <n-flex class="kjje-div">
              <a class="kj-item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
                :key="index">
                {{ item.label }}
              </a>
            </n-flex>
          </n-form>
          <div class="btn_zone flex w-full">
            <div class="submit_btn t-lg weight-5 center pointer" block @click="onSubmit">{{ '立即提款' }}</div>
          </div>
          <div class="cz-tips">
            <div class="txt"> 预计到账：{{form.amount}} </div>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>


</template>

<script setup lang="ts">
import { CSSProperties, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
// import Deposit from '@/views/wallet/components/Deposit.vue';
import { Message } from "@/utils/discreteApi";
import BankListInfo from '@/views/wallet/withdrawFunds/bankListInfo.vue';
import pinia from '@/store';
import { User } from '@/store/user';
import { storeToRefs } from 'pinia';


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

const showSecModal = ref(false);


const switchVisible = ref(true)


const form = ref( // 存款表单提交
  {
    // country: 1,
    maxValue: '0', // 可提现金额
    password: '',
    amount: '', // 充值金额
    bank: 0, // 银行
    address: '', // 银行卡号
  }
);

const rules = {
  amount: [
    {
      required: true,
      message: t('amount_error'),
      trigger: 'blur'
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
  if (changeRightInfo.value.icon == "Group39364") {

    changeRightInfo.value.type = "text"
    changeRightInfo.value.icon = "Group39365"
    // state.rememberPassword = false
  } else {
    changeRightInfo.value.type = "password"
    changeRightInfo.value.icon = "Group39364"
    // state.rememberPassword = true
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
  showSecModal.value = !showSecModal.value;

  nextTick(() => {
    getInfo();
  })
}

const onCloseSec = () => {
  showSecModal.value = !showSecModal.value
}



const formRef = ref()

const onSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {

      if (!form.value.bank) {
        return Message.error(t('paymentManagement_page_chBank'))
      }

      if (form.value.amount < props.myBankList.min_withdraw_money) {
        return Message.error(t('withdraw_page_minAmount', { minAmount: props.myBankList.min_withdraw_money }))
      }
      if (form.value.amount > props.myBankList.max_withdraw_money) {
        return Message.error(t('withdraw_page_maxAmount', { maxAmount: props.myBankList.max_withdraw_money }))
      }
      form.value.address = props.myBankList.bank_card_info_list.find((item: any) => item.bank_id === form.value.bank)?.account_number; // 银行卡号
      handleSubmit()



    } else {
      console.log(errors);
    }
  });
}

const handleSubmit = () => {
  const req = NetPacket.req_apply_withdraw();
  req.money = form.value.amount;
  req.bank_card_id = form.value.address;
  req.bank_id = form.value.bank || 0;
  req.passwd = form.value.password;
  req.way = 1; // 1 银行卡，2 USTD
  Net.instance.sendRequest(req);
};

// 0=>申请成功, 1=>申请失败
const handleWithDrawSubmit = (res: any) => {
  openModal();
  if (res.result === 1) {
    Message.error(t('withdraw_page_subFail'))
  } else {
    Message.success(t('withdraw_page_subSucces'))

  }
}


// 选择快捷金额
const chooseFastMon = (e: any) => {
  form.value.amount = e.toString()
}





const isCanWithdraw = ref(false)
const handleCanWithdraw = (res: any) => {
  isCanWithdraw.value = !res.rlt;
  setCanWithDrawMon();
};

// 设置可提现金额
const setCanWithDrawMon = () => {
  if (isCanWithdraw.value) {
    form.value.maxValue = roleInfo.value.bank_money + ''
  } else { // 不可以提现，可提现金额置为 0
    form.value.maxValue = '0'
  }
}


const backItemInfo = ref({
  bank_name: '',
  account_number: 'xxxxxxx',
  bank_id: 0
})

const getInfo = () => {
  let bankListItem = props.myBankList.bank_card_info_list[0]
  myBankName.value = props.myBankList.cardholder_name || ''
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




// const myBankNameList = ref()

// const handleMyBankList = (res: any) => {
//   myBankNameList.value = res.cardholder_name || '';
//   myBankNameList.value = res.bank_card_info_list.map((item: any) => (
//     {
//       ...item,
//       bankImgURL: '/img/payment/mockBank.webp',
//     }
//   ))
// }



onMounted(() => {
  // 可提现金额
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, handleCanWithdraw);

  // 提款提交监听
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, handleWithDrawSubmit);


})
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, null);


  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, null);

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

.deposit_modal {
  font-size: 16px;
  width: 650px !important;

  .body {
    gap: 15px !important;

    .item-list {
      width: 536px;
      height: 96px;
      padding: 15px 17px 10px;
      background: url(/img/payment/listBg.webp) center no-repeat;
      background-size: 100%;

      &.active {
        background-image: url(/img/payment/listBg_active.webp);
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
              background: url(/img/payment/wh.webp) center no-repeat;
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
          background: url(/img/payment/go-btn.webp) center no-repeat;
          background-size: 100%;
        }
      }

    }

    .btn {
      color: #fff;
      height: 40px !important;
      width: 90px;
      font-size: 14px;
      background: url(/img/login/sendBtn.webp) no-repeat;
      background-size: contain;
    }

    .cz-btn {
      a {
        font-size: 18px;
        display: block;
        width: 382px;
        height: 54px;
        line-height: 52px;
        text-align: center;
        margin: 20px auto 0;
        background: url(/img/payment/sub_btn.webp) center no-repeat;
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

    .kjje-div {
      gap: 20px !important;

      .kj-item {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: url(/img/payment/monBg.webp) center no-repeat;
        background-size: 100%;
      }
    }

  }
}
</style>
@/netBase/NetMsgType@/netBase/NetPacket