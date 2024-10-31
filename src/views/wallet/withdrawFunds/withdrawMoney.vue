<template>

  <BankListInfo v-if="bankListInfoShow" ref="bankListInfoRef" @bindBankCheck="checkBankInfo" :myBankName="myBankName"
    :myBankList="mySecBankList" />
  <UsdtListInfo v-if="usdtListInfoShow" ref="usdtListInfoRef" @bindBankCheck="checkUsdtInfo" :myBankName="myBankName"
                :myBankList="usdtBankList" />

  <div class="list_box bg_color">
    <div class="txt_title">{{t('withdraw_page_payWay')}}</div>
    <n-flex class="body vertical center t_md">
      <!-- 列表选择 -->
      <n-flex justify="center" align="center"
              :class="`item_list ${item.status === 0 ? 'wh_item' : ''} ${curPayWay.paymethod == item.paymethod ? 'active' : ''}`"
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
            <a class="wh_icon" @click.stop="onCloseSm(item)"></a>
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
          <n-input autocomplete="off" readonly size="large" :value="withdrawData.canot_withdraw" >
            <template #suffix>
              <div class="pointer gradient_txt" @click="$router.push('auditRecord')"> {{ t('withdraw_page_lockedDetail') }}</div>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="not_input" :label="t('withdraw_page_needFlowAmount')">
          <n-input autocomplete="off" readonly size="large" v-model:value="withdrawData.turnover" >
          </n-input>
        </n-form-item>
        <!-- 银行卡提款 -->
        <n-flex v-show="curPayWay.paymethod == '1'" justify="space-between">
          <n-form-item :label="t('walletInfo_page_selectBank')" style="flex: 1;">
            <n-input disabled v-model:value="backItemInfo.bank_name" :placeholder="t('walletInfo_page_selectBank')">
              <template #suffix>
                <iconpark-icon icon-id="fangxiangicon02" color="#fff" size="1.5rem"></iconpark-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-flex justify="center" align="center" class="button button_color mr_t_5" @click="openBankListInfo">{{t('deposit_page_changeWay')}}</n-flex>
        </n-flex>
        <!-- usdt提款 -->
        <n-flex v-show="curPayWay.paymethod == '2'"  justify="space-between">
          <n-form-item :label="t('pick_usdt')" style="flex: 1;">
            <n-input disabled v-model:value="backItemInfo.bank_name" :placeholder="t('pick_usdt')">
              <template #suffix>
                <iconpark-icon icon-id="fangxiangicon02" color="#fff" size="1.5rem"></iconpark-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-flex justify="center" align="center" class="button button_color mr_t_5" @click="openUsdtListInfo">{{t('deposit_page_changeWay')}}</n-flex>
        </n-flex>

        <n-flex justify="space-between">
          <n-form-item style="flex: 1;" class="money_input" :label="t('walletInfo_page_withdrawalMon')" path="amount">
            <!-- 防止记住用户名和密码填充 -->
            <input type="text" class="hideInput" name="username-hide" autocomplete="off" />
            <n-input @input="validateInput" @blur="inputBlur" clearable autocomplete="off" size="large"
              v-model:value="form.amount" :placeholder="t('walletInfo_page_withdrawalMon')">
            </n-input>
          </n-form-item>
          <n-flex justify="center" align="center" class="button button_color mr_t_5" @click="form.amount = ''">{{t('withdraw_page_reset')}}</n-flex>
        </n-flex>
        <n-flex class="kjje_div">
          <a class="kj_item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
             :key="index">
            {{ item.label }}
          </a>
        </n-flex>
        <n-flex class="switch_Visible">
          <n-form-item style="flex: 1;" :label="t('withdraw_page_payPwd')" :path="switchVisible ? 'password' : ''">
            <n-input ref="inputRef" clearable autocomplete="off" v-if="switchVisible" v-model:value="form.password"
              :type="changeRightInfo.type" @keydown.enter.prevent>
              <template #suffix>
                <Imgt @click="iconClick" :src="changeRightInfo.icon" class="pointer" />
              </template>
            </n-input>
          </n-form-item>

          <n-flex class="switch_box">
            <div class="coverSwitch pointer" :data-value="switchVisible" @click="handleCloseSend(switchVisible)">
            </div>
            <n-switch class="switch" :rail-style="railStyle" v-model:value="switchVisible" />
          </n-flex>
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
                {{ t('withdraw_page_mountFee') }}
                {{ t('withdraw_page_rate') }}：₫1223=1USDT
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
    <ModalDialog v-model:visible="showPwdModal" :title="t('withdraw_page_openClose')">
      <template #content>
        <div class="pay_pwd_con">
          <n-form-item style="flex: 1;" :label="t('withdraw_page_payPwd')" :path="switchVisible ? 'password' : ''">
            <n-input ref="inputRef" autocomplete="off" v-model:value="closeForm.withdraw_password"
                     :type="changeRightInfo.type" @keydown.enter.prevent>
            </n-input>
          </n-form-item>
          <n-flex align="center" justify="center" class="button_color button" @click="sendChangeCole(2)">
            {{t('home_page_confirm')}}
          </n-flex>
        </div>
      </template>
    </ModalDialog>

    <!-- 存入保险柜 -->
    <ModalDialog v-model:visible="showTranModal" :title="t('withdraw_alertTitle')">
      <template #content>
        <div class="tran_box">
          <n-flex class="top_box" justify="space-between">
            <div class="topBox">
              <n-flex align="center">
                <iconpark-icon icon-id="txxlicon01-ekipha8m" color="#fff" size="1.5rem"></iconpark-icon>
                <span>{{ t('wallet_type_map_1') }}</span>
              </n-flex>
              <span class="mon_box">{{totalMoneyTxt}}</span>
            </div>
            <div class="topBox">
              <n-flex align="center">
                <iconpark-icon icon-id="txxlicon02-ekipha9e" color="#fff" size="1.5rem"></iconpark-icon>
                <span>{{ t('wallet_type_map_2') }}</span>
              </n-flex>
              <span class="mon_box">{{verifyNumberComma(String(bankMoney))}}</span>
            </div>
          </n-flex>
          <n-flex justify="space-between" :wrap="false" class="money_input">
            <n-input @blur="inputBlur" @input="countMonRate" v-model:value="tranMoney"
                     :placeholder="t('addBank_page_pInput')" >
            </n-input>
            <n-flex align="center" justify="center" class="btn_ch button_color" @click="tranMoney = ''"> {{ t('withdraw_page_reset') }} </n-flex>
          </n-flex>
          <n-flex class="fast_box">
            <n-flex align="center" justify="center" class="button" @click="allTranferMon(item.value)" v-for="(item, index) in fastMon" :key="index">
              {{t(item.label)}}
            </n-flex>
          </n-flex>
          <div class="tips_txt red">
            {{ t('walletInfo_page_tranferTips') }}
          </div>
          <n-flex align="center" justify="center" class="sub_btn button button_color" @click="handleSubmit"> {{ t('withdraw_page_sureDeposit') }} </n-flex>
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
import UsdtListInfo from '@/views/wallet/withdrawFunds/usdtListInfo.vue';
import pinia from '@/store';
import { User } from '@/store/user';
import { storeToRefs } from 'pinia';
import { verifyNumberComma, removeComma } from '@/utils/others.ts';
import { useRouter } from 'vue-router';
import Imgt from '@/components/Imgt.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import useWalletInfo from '@/views/wallet/walletInfo/useWalletInfo.ts';

const router = useRouter();
const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);

const {
  myBankList,
  getMyBankList,
  totalMoneyTxt,
  bankMoney,
  countMonRate,
  tranMoney,
  allTranferMon,
  handleSubmit,
} = useWalletInfo()
const usdtBankList = ref([])

const myBankName = ref(''); // 如果有已经绑定的银行卡姓名，下次绑定需要一致
const { t } = useI18n();
const inputRef: any = ref(null);
const showSecModal = ref(false);
const switchVisible = ref(false);
const showTranModal = ref(true);
const formRef = ref()
const baseObj = {
  // country: 1,
  maxValue: '0', // 可提现金额
  password: '',
  amount: '', // 金额
  bank: '', // 银行
  address: '', // 银行卡号
  way: '1', // 1 银行卡，2 USTD
}
const form: any = ref( // 存款表单提交
  { ...baseObj }
);
const closeForm: any = ref(
  {
    withdraw_password: '', // 验证资金密码
  }
)
const isCanWithdraw = ref(false); // 是否可提现
const isHasOrder = ref(false); // 是否存在未审核的提现订单
const mySecBankList = ref(myBankList);

const showPwdModal = ref(false);
const showSmModal = ref(false);
const curPayWay = ref({ paymethod: '1' }); // 当前选择的提款方式

const wayArray = ref(
  [
    {
      "maxrecharge": mySecBankList.value?.max_withdraw_money || 0,
      "minrecharge": mySecBankList.value?.min_withdraw_money || 0,
      "paymethod": "1",
      "payname": "bankcard_0",
      "status": 1
    },
    {
      "maxrecharge": mySecBankList.value?.max_usdt || 0,
      "minrecharge": mySecBankList.value?.min_usdt || 0,
      "paymethod": "2",
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
const usdtListInfoRef = ref()
const bankListInfoShow = ref(false)
const usdtListInfoShow = ref(false)

const fastMon = [
  {label: '1/3', value: 0.3333},
  {label: '1/2', value: 0.5},
  {label: 'promo_page_all', value: 1},
]


const inputBlur = () => {
  form.value.amount = verifyNumberComma(String(form.value.amount))
}
// 限制只能输入 正整数
const validateInput = () => {
  form.value.amount = form.value.amount.replace(/[^0-9]/g, '');
}
// 打开银行卡弹窗
const openBankListInfo = () => {
  bankListInfoShow.value = true
  nextTick(() => {
    bankListInfoRef.value.openModal()
  })
}
// 打开usdt弹窗
const openUsdtListInfo = () => {
  usdtListInfoShow.value = true
  nextTick(() => {
    usdtListInfoRef.value.openModal()
  })
}

const changeRightInfo = ref({
  icon: '/img/wallet/eyeClose.svg',
  type: 'password'
})
const iconClick = () => {
  inputRef.value.blur(); // 防止光标回到首位
  if (changeRightInfo.value.icon == "/img/wallet/eyeClose.svg") {
    changeRightInfo.value.type = "text"
    changeRightInfo.value.icon = "/img/wallet/eyeOpen.svg"
  } else {
    changeRightInfo.value.type = "password"
    changeRightInfo.value.icon = "/img/wallet/eyeClose.svg"
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

const getBaseData = () => {
  form.value = { ...baseObj }
  initReq(); // 获取可提现金额
  getInfo();
}

const onCloseSec = () => {
  showSecModal.value = !showSecModal.value
}

const onSubmit = () => {
  // mySecBankList.value.max_withdraw_money = 20000000
  console.log('-----form', form.value)
  // 有未审核提现记录
  if (isHasOrder.value) {
    return Message.error(t('withdraw_page_fail_tips6'))
  }
  if (!form.value.way) {
    return Message.error(t('withdraw_page_ch_payWay'))
  }
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      const numMon = removeComma(form.value.amount);
      if (!form.value.bank && curPayWay.value.paymethod == '1') {
        return Message.error(t('paymentManagement_page_chBank'))
      }
      if (numMon < mySecBankList.value.min_withdraw_money) {
        return Message.error(t('withdraw_page_minAmount', { minAmount: mySecBankList.value.min_withdraw_money }))
      }
      if (numMon > mySecBankList.value.max_withdraw_money) {
        return Message.error(t('withdraw_page_maxAmount', { maxAmount: mySecBankList.value.max_withdraw_money }))
      }
      // 银行卡
      // if (curPayWay.value.paymethod == '1') {
      //   form.value.address = mySecBankList.value.bank_card_info_list.find((item: any) => item.bank_id === form.value.bank)?.account_number; // 银行卡号
      // }
      handleWdSubmit()
    } else {
      console.log(errors);
    }
  });
}
// 提款提交
const handleWdSubmit = () => {
  const req = NetPacket.req_apply_withdraw();
  req.money = removeComma(form.value.amount);
  req.bank_card_id = form.value.address; // 卡号
  req.bank_id = form.value.bank || 0; // 银行 id
  req.passwd = form.value.password;
  req.way = form.value.way; // 1 银行卡，2 USTD
  console.log('--提款参数----', req)
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

const handleCloseSend = (type: any) => {
  // 关闭资金密码需要验证资金密码才可以关闭
  if (type && !closeForm.value.withdraw_password) {
    showPwdModal.value = true // 显示资金密码
    return
  }
  // 开启走这里
  sendChangeCole(1)
};
const sendChangeCole = (type=1) => {
  if (type == 2 && !closeForm.value.withdraw_password) {
   return Message.error(t('withdraw_page_emPayPwd'))
  }
  const req = NetPacket.req_open_or_close_withdraw_password();
  req.role_id = roleInfo.value.id;
  req.operate_type = type; // 1 开启，2 关闭, 3 查询是否开启资金密码
  req.withdraw_password = closeForm.value.withdraw_password;
  Net.instance.sendRequest(req);
}
const handleWithDrawClose = (res: any) => {
  // const codeTxt: any = {
  //   1: t('开启资金密码成功'),
  //   2: t('withdraw_page_fail_tips2'),
  //   3: t('资金密码错误'),
  // }
  // code 1 已关闭，2 已开启
  if (res.code == 2) {
    switchVisible.value = true
  } else if (res.code == 1) {
    switchVisible.value = false
    // Message.error(codeTxt[res.code])
  }
  showPwdModal.value = false // 显示资金密码
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
  turnover: '0',
  canot_withdraw: '0',
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
// 银行
const getInfo = () => {
  let bankListItem = mySecBankList.value.bank_card_info_list[0]
  myBankName.value = mySecBankList.value.cardholder_name || ''
  console.log('===当前选择的提款银行信息--', bankListItem)
  checkBankInfo(bankListItem)
}
// usdt
const getUsdtInfo = () => {
  let bankListItem = usdtBankList.value[0]
  console.log('===当前选择的usdt提款银行信息--', usdtBankList.value, bankListItem)
  checkUsdtInfo(bankListItem)
}

const checkBankInfo = (item: any) => {
  console.log('--更换银行--', item)
  if (!item) return
  const { bank_id, account_number, bank_name } = item
  form.value.bank = bank_id
  form.value.address = account_number
  backItemInfo.value.bank_name = bank_name || ''
  backItemInfo.value.account_number = account_number || 'xxxxxxx'
  backItemInfo.value.bank_id = bank_id || 0
}
const checkUsdtInfo = (item: any) => {
  console.log('--更换usdt--', item)
  if (!item) return
  const { usdt_addr } = item
  form.value.bank = 0;
  form.value.address = usdt_addr || ''
  backItemInfo.value.bank_name = usdt_addr || ''
}
const initReq = () => {
  form.value.maxValue = verifyNumberComma(String(roleInfo.value.bank_money))
  Net.instance.sendRequest(NetPacket.req_can_withdraw());
};

// 选择充值方式
const chooseWay = (data: any) => {
  console.log('--切换--', data)
  form.value.way = data.paymethod;
  curPayWay.value = data;
  // 银行
  if (data.paymethod == 1) {
    getInfo();
  } else {
    getUsdtInfo();
  }
};
const onCloseSm = (data: any) => {
  curPayWay.value = data;
  // Local.set('curExplainSecWay', data);
  showSmModal.value = !showSmModal.value;
};

// 获取绑定的usdt 地址列表
const getUsdtList = () => {
  const req = NetPacket.req_usdt_info_list();
  Net.instance.sendRequest(req);
}
const handleUsdtList = (res: any) => {
  usdtBankList.value = res.usdt_info_list.map((item: any) => {
    return {
      ...item,
      label: item.usdt_addr,
      value: item.usdt_addr,
    }
  }).reverse()
}
// 清空密码输入
watch(() => showPwdModal.value, (n) => {
  if (!n) {
    closeForm.value.withdraw_password = ''
  }
})
watch(() => myBankList, (n) => {
  console.log('银行列表有更新--', n)
  mySecBankList.value = n;
})

onMounted(() => {
  getMyBankList();
  getUsdtList();
  sendChangeCole(3); // 查询是否开启资金密码
  setTimeout(() => getBaseData(), 500);
  // 可提现金额
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, handleCanWithdraw);
  // 提款提交监听
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, handleWithDrawSubmit);
  // 开启和关闭资金密码
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_open_or_close_withdraw_password, handleWithDrawClose);
  // 绑定的usdt 列表
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_usdt_info_list, handleUsdtList);

})
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_can_withdraw, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_apply_withdraw, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_open_or_close_withdraw_password, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_usdt_info_list, null);
})

// defineExpose({
//   openModal
// });

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

    .switch_Visible {
      position: relative;

      .switch_box {
        position: relative;
        margin-top: 10px;
        .coverSwitch {
          position: absolute;
          width: 60px;
          height: 30px;
          z-index: 9;
        }

        :deep(.n-switch) {
          .n-switch__rail {
            width: 50px !important;
            height: 20px !important;
            .n-switch__button {
              width: 16px;
              height: 16px;
              left: 0;
            }
          }
          &.n-switch--active {
            .n-switch__button {
              left: calc(100% - 16px);
            }
          }
        }

      }

    }

  }

  .tran_box {
    padding: 30px;
    font-size: 16px;
    .top_box {
      .topBox {
        >div {
          gap: 6px !important;
        }
        .mon_box {
          display: flex;
          align-items: center;
          width: 212px;
          height: 40px;
          background: #212443;
          border: 1px solid #26294C;
          border-radius: 8px;
          font-weight: 700;
          color: #FAC904;
          padding: 0 10px;
          margin-top: 10px;
        }
      }
    }
    .money_input {
      margin: 30px 0;
      gap: 20px !important;
    }
  }
  .fast_box {
    .button {
      font-weight: 700;
      width: 134px;
      height: 40px;
      border-radius: 8px;
      background: #1F264D;
    }
  }
  .tips_txt {
    font-size: 14px;
    font-weight: 500;
    color: #E54A45;
    margin: 16px 0 60px;
  }
  .sub_btn {
    width: 330px;
    margin: 0 auto;
  }

}
</style>
