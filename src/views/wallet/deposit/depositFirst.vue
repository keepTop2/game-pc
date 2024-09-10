<template>
  <!-- <Deposit v-if="showDeposit" />-->
  <n-modal class="deposit_modal" :show="showMyModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('deposit_page_deposit') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t_md">
          <!-- 充值列表选择 -->
          <n-flex justify="space-between" align="center"
            :class="`item_list ${item.status === 0 ? 'wh_item' : ''} ${curDepositWay.payname === item.payname ? 'active' : ''}`"
            v-for="(item, index) in usdtRecharge" :key="index">
            <div v-if="item.status === 0" class="bank_wh">
              <Imgt src="/img/payment/wh_bank.webp" />
              <span>{{ t('addBank_page_bankPay_wh') }}</span>
            </div>
            <n-flex align="center" class="item_list_l">
              <div class="bank_icon">
                <Imgt :src="`/img/payment/icon/icon_${item.payname}.webp`" />
              </div>
              <div class="bank_txt">
                <n-flex class="bank_name">
                  {{ t(`api_${item.payname}`) }}
                  <a class="wh_icon" @click="onCloseSm(item)"></a>
                </n-flex>
                <div class="bank_limit">
                  <template v-if="['usdt'].includes(item.payname?.toLowerCase())">
                    {{ verifyNumberComma(String(item.minrecharge * usdtObj.rate)) }} ~
                    {{ verifyNumberComma(String(item.maxrecharge * usdtObj.rate)) }}
                  </template>
                  <template v-else>
                    {{ verifyNumberComma(String(item.minrecharge)) }} ~
                    {{ verifyNumberComma(String(item.maxrecharge)) }}
                  </template>
                </div>
              </div>
            </n-flex>
            <div class="item_list_r">
              <a @click="chooseWay(item)"> {{ t('deposit_page_use') }} </a>
            </div>
          </n-flex>
          <div class="cz_btn">
            <a @click="goToDeposit"> {{ t('deposit_page_rechargeNow') }} </a>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>
  <!-- 充值说明 -->
  <n-modal class="deposit_sm_modal" :show="showSmModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('deposit_page_instructions') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="showSmModal = false" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t_md">
          <n-flex align="center" justify="center" class="sm_txt">
            <div class="sm_content">
              <Imgt :src="`/img/payment/sm/sm_${curWay.payname}.webp`" />
            </div>
          </n-flex>
          <n-flex justify="space-between" class="bank_list_item">
            <a :class="`${curWay.payname === item.payname ? 'active' : ''}`" v-for="(item, index) in usdtRecharge"
              @click="chooseSmWay(item)" :key="index">
              <Imgt :src="`/img/payment/icon/icon_${item.payname}.webp`" />
            </a>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>

  <!-- 充值第二步 -->
  <n-modal class="deposit_sm_modal" :show="showSecModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <!--          <span class="icon_back button"><Imgt src="/img/home/back.webp" alt="" @click="goBackList" /></span>-->
          <span class="weight_5 t_md">{{ t('deposit_page_deposit') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onCloseSec" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t_md body_sec">
          <n-form ref="formRef" class="w_full">
            <n-form-item :label="t('rechargeRecord_page_method')">
              <n-select :placeholder="t('deposit_page_chooseWay')" v-model:value="form.method" :options="mtdList" />
            </n-form-item>
            <n-form-item class="yh-item" :label="t('level_page_code')">
              <n-select v-model:value="form.discount" :options="dcList" />
              <!-- 选择优惠后 -->
              <div v-if="form.discount" class="choose-yh">
                <div>
                  {{ curDiscount.ratio > 0 ?
                    t('deposit_page_upperLimit') : t('deposit_page_giftAmount')
                  }}
                  ：{{ verifyNumberComma(String(curDiscount.limit)) }}
                </div>
                <div v-show="curDiscount.ratio > 0">{{ t('deposit_page_giftRatio')
                  }}：{{ curDiscount.ratio }}%
                </div>
                <div>{{ t('deposit_page_multiple') }}：{{ curDiscount.require }}X</div>
                <div>{{ t('deposit_page_minimum')
                  }}：{{ verifyNumberComma(String(curDiscount.threshold)) }}
                </div>
              </div>
            </n-form-item>
            <n-form-item v-if="['usdt'].includes(curDepositWay.payname?.toLowerCase())" class="yh_item"
              :label="t('deposit_page_netWork')">
              <n-select :placeholder="t('deposit_page_chooseWay')" v-model:value="form.network_type"
                :options="netWorkArr" />
            </n-form-item>
            <!-- 银行卡充值独有 -->
            <n-form-item v-if="curDepositWay.payname?.indexOf('bankcard') > -1" :label="t('addBank_page_pChooseBank')">
              <n-flex class="choose-bank">
                <n-flex align="center" class="choose-bank-l">
                  <n-flex class="bank_cicon" v-if="chooseBank.value">
                    <Imgt :src="`/img/bankIcon/bank_logo_${chooseBank.value}.webp`" :alt="chooseBank.label" />
                  </n-flex>
                  <span class="bank_cname"> {{ chooseBank.label }} </span>
                </n-flex>
                <n-button :bordered="false" class="change-btn" @click="showChangeBank">
                  {{ t('deposit_page_changeWay')
                  }}
                </n-button>
              </n-flex>
            </n-form-item>
            <n-form-item class="money_input" :label="t('rechargeRecord_page_amount')">
              <n-input @blur="inputBlur" @input="validateInput" size="large" v-model:value="form.amount"
                :placeholder="t('deposit_page_enterMon')">
                <template #suffix>
                  <a @click="form.amount = ''" class="refresh_icon"></a>
                </template>
              </n-input>
              <n-flex v-if="['usdt'].includes(curDepositWay.payname?.toLowerCase())" justify="space-between"
                class="flex usdt_box">
                <span>USDT: {{ countUsdtMon() }}</span>
                <span class="button" @click="showModal = true">{{ t('deposit_page_toExchange')
                  }}</span>
              </n-flex>
              <span v-show="isShowError" style="color: #d03050">{{ t('deposit_page_minDeposit') }}: {{
                verifyNumberComma(String(countMinMax().min)) }}</span>
            </n-form-item>
            <n-flex class="kjje_div">
              <a class="kj_item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
                :key="index">
                {{ item.label }}
              </a>
            </n-flex>
          </n-form>
          <div class="btn_zone flex w_full">
            <n-button :bordered="false" class="submit_btn  weight_5 center pointer" :disabled="loading" block
              @click="onSubmit">{{
                t('deposit_page_rechargeNow') }}
            </n-button>
          </div>
          <div class="cz_tips">
            <div v-show="form.amount" class="txt">
              {{ t('deposit_page_arrival') }}：{{ verifyNumberComma(String(arriveAmount), false) }}
              {{ t('accountsRecord_page_dong') }}
            </div>
            <n-flex justify="center" class="tip">
              <span class="icon"></span>
              <span> {{ t('deposit_page_depositTips') }} </span>
            </n-flex>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>

  <!-- 交易所列表 -->
  <n-modal class="deposit_sm_modal" :show="showModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('deposit_page_exchange') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="showModal = false" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body center t_md exchange_list body_sec">
          <div class="ex_list_item button" v-for="(item, index) in exchangeArr" :key="index"
            @click="openWin(item.value)">
            <div class="icon">
              <Imgt :src="`/img/payment/usdt/logo${index + 1}.webp`" />
            </div>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>
  <!-- 选择银行弹窗 -->
  <chooseBankDialog v-if="showSecModal" :isDepositBank="true" :bankAllList="bankAllList" ref="chooseBankModal"
    @selectBank="selectBank" />

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { TShopInfo } from '@/utils/types';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { Local } from '@/utils/storage';
// import Deposit from '@/views/wallet/components/Deposit.vue';
import { Message } from '@/utils/discreteApi';
import { bankPayMethods, bankPayType, removeComma, verifyNumberComma } from '@/utils/others';
import Imgt from '@/components/Imgt.vue';

const chooseBankDialog = defineAsyncComponent(() => import('../components/chooseBankDialog.vue'));

const emit = defineEmits(['haveBankList']);
const chooseBankModal = ref();
const { t } = useI18n();
const showMyModal = ref(false);
const showSmModal = ref(false);
const showSecModal = ref(false);
const usdtRecharge = ref<any>(); // 充值银行列表
const legalRecharge = ref<any>([]);
const curWay = ref({ payname: '' });
const curDepositWay = ref({ payname: '' }); // 当前选择的充值方式
const baseDis = {
  discount_ID: 0,
  limit: 0,
  ratio: 0,
  require: 0,
  threshold: 0,
};
const curDiscount = ref({ ...baseDis }); // 优惠
const usdtObj = ref({
  rate: 26540, // usdt 汇率,
});
const isShowError = ref(false);

// 充值提交参数
const dataParams = {
  // country: 1,
  method: -1,
  discount: 0, // 优惠
  amount: '',
  bank: null, // 银行
  bankMethod: 100, // 银行支付方式，对应传给后端参数 type
  network_type: 0, // usdt 独有
};

const form = ref( // 存款表单提交
  { ...dataParams },
);
const curDiscountData = Local.get('curDiscountData') || { id: 0 }; // 从我的优惠过来
const baseMtdList = {
  label: t('addBank_page_pChoose'),
  value: -1,
  minrecharge: 0,
  maxrecharge: 0,
  paymethod: '',
};
// 充值方式列表
const mtdList = ref<any>([{ ...baseMtdList }]);
const baseDcList = { label: t('deposit_page_notOffer'), value: 0 };
// 优惠列表
const dcList = ref<any>([{ ...baseDcList }]);
const discountList = ref<any>([]);
const loading = ref(false);// 是否提交中
const arriveAmount = ref<any>(0); // 到账金额

const chooseMoneyArr = [
  { label: '100,000', value: 100000 },
  { label: '200,000', value: 200000 },
  { label: '500,000', value: 500000 },
  { label: '1,000,000', value: 1000000 },
  { label: '10,000,000', value: 10000000 },
  { label: '100,000,000', value: 100000000 },
];
const chooseBank = ref({ label: '', value: '' }); // 选择的银行卡
const bankAllList = ref([]); // 充值银行选择列表

// const minDepositObj = ref({
//   show: false,
//   mon: 0, // 最低充值金额
// });
const netWorkArr = [
  { label: t('deposit_page_chooseNetWork'), value: 0 },
  { label: 'TRC20', value: 1 },
  { label: 'ERC20', value: 2 },
];
const showModal = ref(false);
// 交易所链接
const exchangeArr = [
  { label: 'Binance', value: 'https://www.binance.com/vi/price/tether/VND' },
  { label: 'Coinbase', value: 'https://www.coinbase.com/zh-cn/converter' },
  { label: 'Gate.io', value: 'https://www.gate.io/zh/crypto/buy?crypto=USDT&fiat=vnd' },
  { label: 'Bybit', value: 'https://www.bybit.com/fiat/trade/express/home' },
  { label: 'OKX', value: 'https://www.okx.com/zh-hans/price/tether-usdt' },
  { label: 'HTX', value: 'https://www.htx.com/zh-cn/fiat-crypto/one-trade/buy-usdt-vnd' },
];

const depositResult = ref({ url: '' });

const inputBlur = () => {
  // 显示最低充值金额提示
  isShowError.value = form.value.amount < countMinMax().min;
  form.value.amount = verifyNumberComma(String(form.value.amount));
};
// 限制只能输入 正整数
const validateInput = () => {
  form.value.amount = form.value.amount.replace(/[^0-9]/g, '');
};
const openWin = (url: any) => {
  window.open(url);
};

// 计算预计到账金额
// 刮刮卡：比如这里充100000，按80%到账就是到账8w，再按8w参与优惠, 优惠是赠送100%  也就是再送8w
const countArriveMon = () => {
  let czMount = removeComma(form.value.amount); // 输入的充值金额
  let zsMon = 0; // 赠送的金额
  if (!curDiscount.value || !curDiscount.value?.discount_ID) {
    // 未选择优惠，刮刮卡充值方式，只到账 80%
    if (legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('scratchcard') > -1) {
      arriveAmount.value = czMount * 0.8 + zsMon;
    } else {
      arriveAmount.value = czMount + zsMon;
    }
    return;
  }

  // 刮刮卡充值方式，只到账 80%
  if (legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('scratchcard') > -1) {
    czMount = czMount * 0.8;
  }
  // 按比例赠送金额
  if (curDiscount.value.ratio > 0) {
    zsMon = czMount < curDiscount.value.threshold ? 0 : czMount * (curDiscount.value.ratio / 100);
    // 最高赠送金额
    if (zsMon > curDiscount.value.limit) {
      zsMon = curDiscount.value.limit;
    }
  } else { // 按金额
    zsMon = czMount < curDiscount.value.threshold ? 0 : curDiscount.value.limit;
  }
  arriveAmount.value = czMount + Number(zsMon);
};
// 计算usdt 金额
const countUsdtMon = () => {
  if (!usdtObj.value.rate) return;
  const num = removeComma(form.value.amount) / usdtObj.value.rate;
  return num.toFixed(2);
};

// 打开银行弹窗
const openChooseBank = () => {
  chooseBankModal.value.onCloseBank();
};
// 参数重置
const resetParams = () => {
  isShowError.value = false;
  curDiscount.value = { ...baseDis };
  curDepositWay.value = { payname: '' };
  form.value = { ...dataParams };
  chooseBank.value = { label: '', value: '' };
};
// 重置
const resetData = () => {
  resetParams();
  mtdList.value = [{ ...baseMtdList }];
  dcList.value = [{ ...baseDcList }];
  form.value.discount = curDiscountData?.id; // 从我的优惠带过来已选择的优惠
};
// 获取充值信息
const getShopInfo = () => {
  const req = NetPacket.req_get_shop_info();
  Net.instance.sendRequest(req);
};
const handleShopInfoRes = (rs: TShopInfo) => {
  resetData();
  usdtObj.value.rate = rs.usdt_viet_rate;
  // 匹配出银行的支付方式
  const newArr = [...rs.rechargelist_by_paymenttype].filter((item: any) => bankPayMethods.includes(item.paymenttype));
  // 为了赋值 payname 字段
  newArr.forEach((item: any) => {
    bankPayType.forEach((item_1: any) => {
      if (item.paymenttype === item_1.paymenttype) {
        item.payname = item_1.payname;
      }
    });
  });
  console.log('-----', newArr);
  const bankNewObj: any = newArr.find((item: any) => item.payname === 'bankcard');
  const bankAll: any = [];
  if (bankNewObj.paymethod) {
    bankNewObj.paymethod.split(',').map((item: any, index: any) => {
      bankAll.push({
        maxrecharge: bankNewObj.maxrecharge,
        minrecharge: bankNewObj.minrecharge,
        paymenttype: 100 + index, // 银行转账 100,  网银直连 101， 扫码支付 102
        paymethod: item, // 没有用到
        payname: `bankcard_${index}`,
        status: bankNewObj.status,
      });
    });
  }
  // 非银行的支付方式
  const notBankArr = newArr.filter((item: any) => item.payname !== 'bankcard').map((item: any) => {
    return { ...item, paymenttype: item.paymenttype * 100 };
  });
  usdtRecharge.value = bankAll.concat(notBankArr);
  // 需要过滤 limit 为 0 的数据
  discountList.value = rs.discount_list.filter((item) => item.limit);
  discountList.value.forEach((dc: any) => dcList.value.push({
    label: dc.name,
    value: dc.discount_ID,
  }));
  console.log('-------', usdtRecharge.value);
  usdtRecharge.value.map((item: any) => {
    legalRecharge.value.push(item);
    mtdList.value.push(
      {
        minrecharge: item.minrecharge,
        maxrecharge: item.maxrecharge,
        paymethod: item.paymethod,
        payname: item.payname,
        label: t(`api_${item.payname}`),
        value: item.paymenttype,
        status: item.status,
        disabled: !item.status,
      },
    );
  });
  emit('haveBankList', usdtRecharge.value.length > 0);
  // console.log('======', usdtRecharge.value)
};

const openModal = () => {
  showMyModal.value = !showMyModal.value;
  // getShopInfo();
};
const onClose = () => {
  showMyModal.value = false;
};
const onCloseSm = (data: any) => {
  curWay.value = data;
  Local.set('curExplainWay', data);
  showSmModal.value = !showSmModal.value;
};
const onCloseSec = () => {
  showSecModal.value = !showSecModal.value;
};

// 去充值
const goToDeposit = () => {
  if (!curDepositWay.value?.payname) {
    return Message.error(t('method_error'));
  }
  onClose();
  showSecModal.value = true;
};
// 返回充值列表
// const goBackList = () => {
//   showMyModal.value = true;
//   showSecModal.value = false;
// }
// 选择充值方式
const chooseWay = (data: any) => {
  form.value.method = data.paymenttype;
  // curDepositWay.value = data
};

// 计算最低最高充值金额
const countMinMax = () => {
  const curObj = mtdList.value.find((item: any) => item.value === form.value.method);
  console.log('*****--', curObj);
  const monObj = {
    min: curObj.minrecharge,
    max: curObj.maxrecharge,
  };
  if (curObj.payname?.toLowerCase() === 'usdt') {
    monObj.min = Number(curObj.minrecharge) * usdtObj.value.rate;
    monObj.max = Number(curObj.maxrecharge) * usdtObj.value.rate;
  }
  return monObj;
};

const onSubmit = () => {
  // 如果是银行卡方式，需要选择银行
  if (legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('bankcard') > -1 && !form.value.bank) {
    return Message.error(t('paymentManagement_page_chBank'));
  }
  // 如果是usdt ，需要选择网络
  if (legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('usdt') > -1 && !form.value.network_type) {
    return Message.error(t('deposit_page_pleChooseNetWork'));
  }
  // 获取到当前支付方式的最低最高充值金额
  const curObj = mtdList.value.find((item: any) => item.value === form.value.method);
  console.log('&&&&&', curObj);
  if (curObj.value == '-1') {
    return Message.error(t('deposit_page_chooseWay'));
  }
  const numMon = removeComma(form.value.amount);
  if (numMon < countMinMax().min) {
    return Message.error(t('deposit_page_minAmount', { minAmount: verifyNumberComma(String(curObj.minrecharge)) }));
  }
  if (numMon > countMinMax().max) {
    return Message.error(t('deposit_page_maxAmount', { maxAmount: verifyNumberComma(String(curObj.maxrecharge)) }));
  }
  // 已选择优惠的情况下，充值金额不能小于优惠参与金额
  if (form.value.discount && numMon < curDiscount.value.threshold) {
    return Message.error(t('deposit_page_min_discount', { minDis: verifyNumberComma(String(curDiscount.value.threshold)) }))
  }
  // minDepositObj.value.show = false;
  loading.value = true;
  handleSubmit();
};

// 充值提交
const handleSubmit = () => {
  const req = NetPacket.req_recharge_from_third();
  req.amount = removeComma(form.value.amount);
  req.channel_type = form.value.method; // 接口返回的 paymenttype 值乘以100
  // req.bank_channel_type = legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('bankcard') > -1 ? form.value.bank : 0; // 只有选择银行的时候才有，usdt 是 0
  req.bank_channel_type = 3; // 目前看h5 的全部是 3
  req.type = form.value.bankMethod; // 只有选择银行的时候才有，银行支付方式
  req.got_discount = form.value.discount;
  req.network_type = form.value.network_type;
  console.log('=======充值提交参数', req);
  Net.instance.sendRequest(req);
};
const handleDepositSubmit = (res: any) => {
  // console.log('---', res)
  loading.value = false;
  if (res.code === -1) {
    Message.error(t(res.msg)); // 如 recharge_channel_type_is_not_supported
  } else { // code 0 成功
    // Message.success(t('deposit_page_depSuccess'))
    form.value.amount = ''; // 重置
    Local.remove('curDiscountData'); // 重置
    depositResult.value = res;

    setTimeout(() => {
      openNewPage();
    }, 1000);

    // Dialog.warning({
    //   showIcon: false,
    //   title: t('paymentManagement_page_tips'),
    //   content: t('deposit_page_goToDeposit'),
    //   positiveText: t('home_page_confirm'),
    //   // negativeText: t('home_page_cancel'),
    //   onPositiveClick: () => {
    //     openNewPage();
    //   },
    //   onNegativeClick: () => {
    //
    //   },
    // })

  }
};
// 选择快捷金额
const chooseFastMon = (e: any) => {
  if (!form.value.amount) {
    form.value.amount = '0';
  }
  form.value.amount = removeComma(form.value.amount) + e;
  form.value.amount = verifyNumberComma(String(form.value.amount));
};
// 更换银行弹窗
const showChangeBank = () => {
  openChooseBank();
};

// 选择银行
const selectBank = (e: any) => {
  form.value.bank = e.value;
  chooseBank.value = e;
};
// 充值单独用的银行列表
const getDepositBankList = () => {
  const req = NetPacket.req_pay_name_list();
  Net.instance.sendRequest(req);
};
// 充值单独用的银行列表
const handleDepositBank = (res: any) => {
  bankAllList.value = res.pay_name_list.map((item: any) => {
    return { value: item.pay_id, label: item.pay_name };
  });
};
// 选择方式
const chooseSmWay = (data: any) => {
  Local.set('curExplainWay', data);
  curWay.value = data;
};
const openNewPage = () => {
  const res = depositResult.value;
  if (res.url.indexOf('http') > -1 || res.url.indexOf('https') > -1) {
    onCloseSec(); // 关闭窗口
    window.open(res.url);
  }
};

watch(
  () => showSecModal.value,
  (n) => {
    if (!n) {
      resetParams();
    }
  },
);
// 切换充值方式
watch(
  () => form.value.method,
  (n) => {
    curDepositWay.value = mtdList.value.find((item: any) => item.value === n);
  },
);
// 切换优惠
watch(
  () => form.value.discount,
  (n) => {
    curDiscount.value = discountList.value.find((item: any) => item.discount_ID === n);
    // console.log('-----', n, curDiscount.value)
    countArriveMon();
  },
);
watch(
  () => form.value.amount,
  (n) => {
    if (n) {
      countArriveMon();
    }
  },
);

onMounted(() => {
  setTimeout(() => {
    getDepositBankList();
    getShopInfo();
  }, 600);
  // 获取银行信息
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, handleShopInfoRes);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, handleDepositSubmit);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_pay_name_list, handleDepositBank);
});
onUnmounted(() => {
  Local.remove('curDiscountData'); // 重置
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_pay_name_list, null);
});

defineExpose({
  openModal,
});

</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';

.deposit_modal {
  font-size: 16px;
  width: 650px !important;

  .body {
    gap: 15px !important;

    .item_list {
      position: relative;
      width: 536px;
      height: 96px;
      padding: 0 17px 10px;
      background: url(/img/payment/listBg.webp) center no-repeat;
      background-size: 100%;

      &.active {
        background-image: url(/img/payment/listBg_active.webp);
      }

      &.wh_item {
        pointer-events: none;
      }

      .bank_wh {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background: rgba(0, 0, 0, .7);
        width: 100%;
        height: 100%;
        border-radius: 8px;
        top: -3px;
        left: -3px;

        img {
          width: 50px;
          margin-right: 5px;
        }
      }

      .item_list_l {

        .bank_icon {
          img {
            width: 50px;
            height: 50px;
          }
        }

        .bank_txt {
          padding-top: 3px;

          .bank_name {
            .wh_icon {
              width: 16px;
              height: 16px;
              background: url(/img/payment/wh.webp) center no-repeat;
              background-size: 100%;
            }
          }

          .bank_limit {
            margin-top: 13px;
            color: #fabb2d;
          }
        }
      }

      .item_list_r {
        a {
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

    .cz_btn {
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

  }
}

.deposit_sm_modal {

  .body {
    .sm_txt {
      font-size: 24px;
      width: 375px;
      min-height: 300px;
      max-height: 600px;
      margin: 0 auto;
      overflow-y: auto;

      .sm_content {
        img {
          width: 100%;
        }
      }
    }

    .bank_list_item {
      width: 100%;
      gap: initial !important;

      a {
        img {
          width: 30px;
          height: 30px;
        }

        &.active {
          img {
            transform: scale(1.2);
          }
        }
      }
    }
  }

  .body_sec {
    .refresh_icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(/img/payment/Vector.webp) center no-repeat;
      background-size: 100%;
    }

    .money_input {
      ::v-deep(.n-input-number) {
        width: 100%;

        .n-input {
          .n-input__input-el {
            height: 100%;
          }

          .n-input__suffix {
            button {
              display: none;
            }
          }
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
        background: url(/img/payment/monBg.webp) center no-repeat;
        background-size: 100%;
      }
    }

    .btn_zone {
      margin: 10px auto;
    }

    .cz_tips {
      font-size: 12px;
      text-align: center;
      color: #D16363;

      .txt {
        color: #60D580;
        margin-bottom: 10px;
      }

      .tip {
        gap: 4px !important;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(/img/payment/error_icon.webp) center no-repeat;
          background-size: 100%;
        }
      }
    }

    .yh-item {
      ::v-deep(.n-form-item-blank) {
        display: block;
      }

      .choose-yh {
        font-size: 16px;
        color: #8e82c2;
        height: 178px;
        padding: 17px;
        background: url(/img/payment/yh_bg.webp) center no-repeat;
        background-size: 100%;

        >div {
          margin-bottom: 10px;
        }
      }
    }

    .choose-bank {
      gap: 10px !important;
    }

    .usdt_box {
      width: 100%;

      .button {
        text-decoration: underline;
        color: #5971FF;
      }
    }

  }

  .exchange_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 40px !important;

    .ex_list_item {
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
      width: 112px;
      height: 112px;
      background: url(/img/payment/usdt/itembg.webp) center no-repeat;
      background-size: 100%;

      &:nth-child(n + 4) {
        margin-top: 15px;
      }

      .icon {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;

        img {
          width: 36px;
          height: 36px;
        }
      }
    }
  }

}
</style>
