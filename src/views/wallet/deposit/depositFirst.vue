<template>
  <!-- <Deposit v-if="showDeposit" />-->
  <n-modal class="deposit_modal" :show="showModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight-5 t-md">{{ t('deposit_page_deposit') }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md">
          <!-- 充值列表选择 -->
          <n-flex justify="space-between" :class="`item-list ${curDepositWay.payname === item.payname ? 'active' : ''}`"
            v-for="(item, index) in usdtRecharge" :key="index">
            <n-flex align="center" class="item-list-l">
              <div class="bank-icon">
                <img :src="`/img/payment/icon/icon_${item.payname}.webp`" />
              </div>
              <div class="bank-txt">
                <n-flex class="bank-name">
                  {{ t(`api_${item.payname}`) }}
                  <a class="wh-icon" @click="onCloseSm"></a>
                </n-flex>
                <div class="bank-limit">{{ item.minrecharge }} ~ {{ item.maxrecharge }}</div>
              </div>
            </n-flex>
            <div class="item-list-r">
              <a @click="chooseWay(item)"> {{ t('deposit_page_use') }} </a>
            </div>
          </n-flex>
          <div class="cz-btn">
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
          <span class="weight-5 t-md">{{ t('deposit_page_instructions') }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onCloseSm" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md">
          <n-flex align="center" justify="center" class="sm-txt">
            <span>占位图</span>
          </n-flex>
          <n-flex justify="space-between" class="bank-list-item">
            <a v-for="(item, index) in usdtRecharge" :key="index">
              <img :src="`/img/payment/icon/icon_${item.payname}.webp`" />
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
          <span class="weight-5 t-md">{{ t('deposit_page_deposit') }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onCloseSec" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md body-sec">
          <n-form ref="formRef" class="w-full">
            <n-form-item :label="t('rechargeRecord_page_method')">
              <n-select :placeholder="t('deposit_page_chooseWay')" v-model:value="form.method" :options="mtdList" />
            </n-form-item>
            <n-form-item class="yh-item" :label="t('level_page_code')">
              <n-select v-model:value="form.discount" :options="dcList" />
              <!-- 选择优惠后 -->
              <div v-if="form.discount" class="choose-yh">
                <div>{{ t('deposit_page_upperLimit') }}：{{ curDiscount.limit }}</div>
                <div>{{ t('deposit_page_giftRatio') }}：{{ curDiscount.ratio }}%</div>
                <div>{{ t('deposit_page_multiple') }}：{{ curDiscount.require }}X</div>
                <div>{{ t('deposit_page_venues') }}：{{ curDiscount.restrict }}</div>
              </div>
            </n-form-item>
            <!-- 银行卡充值独有 -->
            <n-form-item v-if="curDepositWay.payname.indexOf('bankcard') > -1" :label="t('addBank_page_pChooseBank')">
              <n-flex class="choose-bank">
                <n-flex align="center" class="choose-bank-l">
                  <span class="bank-cicon" v-if="chooseBank.value"> <img
                      :src="`/img/bankIcon/bank_logo_${chooseBank.value}.webp`" :alt="chooseBank.label" /> </span>
                  <span class="bank-cname"> {{ chooseBank.label }} </span>
                </n-flex>
                <n-button :bordered="false" class="change-btn" @click="showChangeBank"> {{ t('deposit_page_changeWay')
                  }} </n-button>
              </n-flex>
            </n-form-item>
            <n-form-item :label="t('rechargeRecord_page_amount')">
              <n-input size="large" v-model:value="form.amount" :placeholder="t('deposit_page_enterMon')">
                <template #suffix>
                  <a class="refresh-icon"></a>
                </template>
              </n-input>
            </n-form-item>
            <n-flex class="kjje-div">
              <a class="kj-item" v-for="(item, index) in chooseMoneyArr" @click="chooseFastMon(item.value)"
                :key="index">
                {{ item.label }}
              </a>
            </n-flex>
          </n-form>
          <div class="btn_zone flex w-full">
            <n-button :bordered="false" class="submit_btn t-lg weight-5 center pointer" :disabled="loading" block
              @click="onSubmit">{{
    t('deposit_page_rechargeNow') }}</n-button>
          </div>
          <div class="cz-tips">
            <div class="txt"> {{ t('deposit_page_arrival') }}：{{ form.amount }} </div>
            <n-flex align="center" class="tip">
              <span class="icon"></span>
              <span> {{ t('deposit_page_depositTips') }} </span>
            </n-flex>
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>

  <!-- 选择银行弹窗 -->
  <chooseBankDialog ref="chooseBankModal" @selectBank="selectBank" />

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, defineAsyncComponent } from 'vue';
import { useI18n } from "vue-i18n";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { TShopInfo } from "@/utils/types";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
// import Deposit from '@/views/wallet/components/Deposit.vue';
import { Message } from "@/utils/discreteApi";
import { bankPayMethods, bankPayType } from "@/utils/others";
const chooseBankDialog = defineAsyncComponent(() => import('../components/chooseBankDialog.vue'));
import { Local } from '@/utils/storage';

const emit = defineEmits(["haveBankList"]);
const chooseBankModal = ref();
const { t } = useI18n();
const showModal = ref(false);
const showSmModal = ref(false);
const showSecModal = ref(false);
const usdtRecharge = ref<any>(); // 充值银行列表
const legalRecharge = ref<any>([]);
const curDepositWay = ref({ payname: '' }); // 当前选择的充值方式
const curDiscount = ref({ limit: 0, ratio: 0, require: 0, restrict: '' }); // 优惠

// 充值提交参数
const dataParams = {
  // country: 1,
  method: -1,
  discount: 0, // 优惠
  amount: '',
  bank: null, // 银行
  bankMethod: 100, // 银行支付方式，对应传给后端参数 type
}

const form = ref( // 存款表单提交
  { ...dataParams }
);
const curDiscountData = Local.get('curDiscountData') || {id: 0}; // 从我的优惠过来
const baseMtdList = { label: t('addBank_page_pChoose'), value: -1, minrecharge: 0, maxrecharge: 0, paymethod: '' }
// 充值方式列表
const mtdList = ref<any>([{ ...baseMtdList }]);
const baseDcList = { label: t('deposit_page_notOffer'), value: 0 }
// 优惠列表
const dcList = ref<any>([{ ...baseDcList }]);
const discountList = ref<any>([]);
const loading = ref(false);// 是否提交中

const chooseMoneyArr = [
  { label: '100,000', value: 100000 },
  { label: '200,000', value: 200000 },
  { label: '500,000', value: 500000 },
  { label: '1,000,000', value: 1000000 },
  { label: '10,000,000', value: 10000000 },
  { label: '100,000,000', value: 100000000 },
];
const chooseBank = ref({ label: '', value: '' }); // 选择的银行卡

// 打开银行弹窗
const openChooseBank = () => {
  chooseBankModal.value.onCloseBank();
}
// 重置
const resetData = () => {
  form.value.discount = curDiscountData?.id; // 从我的优惠带过来已选择的优惠
  curDepositWay.value = { payname: '' }
  form.value = { ...dataParams }
  mtdList.value = [{ ...baseMtdList }]
  dcList.value = [{ ...baseDcList }]
  chooseBank.value = { label: '', value: '' }
}
// 获取充值信息
const getShopInfo = () => {
  const req = NetPacket.req_get_shop_info();
  Net.instance.sendRequest(req);
}
const handleShopInfoRes = (rs: TShopInfo) => {
  resetData();
  // 匹配出银行的支付方式
  const newArr = [...rs.rechargelist_by_paymenttype].filter((item: any) => bankPayMethods.includes(item.paymenttype));
  // 为了赋值 payname 字段
  newArr.forEach((item: any) => {
    bankPayType.forEach((item_1: any) => {
      if (item.paymenttype === item_1.paymenttype) {
        item.payname = item_1.payname
      }
    })
  })
  console.log('-----', newArr)
  const bankNewObj: any = newArr.find((item: any) => item.payname === 'bankcard');
  const bankAll: any = [];
  if (bankNewObj.paymethod) {
    bankNewObj.paymethod.split(',').map((item: any, index: any) => {
      bankAll.push({
        maxrecharge: bankNewObj.maxrecharge,
        minrecharge: bankNewObj.minrecharge,
        paymenttype: 100 + index, // 银行转账 100,  网银直连 101， 扫码支付 102
        paymethod: item, // 没有用到
        payname: `bankcard_${index}`
      })
    })
  }
  // 非银行的支付方式
  const notBankArr = newArr.filter((item: any) => item.payname !== 'bankcard');
  usdtRecharge.value = bankAll.concat(notBankArr);
  // 需要过滤 limit 为 0 的数据
  discountList.value = rs.discount_list.filter((item) => item.limit)
  discountList.value.forEach((dc: any) => dcList.value.push({ label: dc.name, value: dc.discount_ID }));
  console.log('-------', usdtRecharge.value)
  usdtRecharge.value.map((item: any) => {
    legalRecharge.value.push(item);
    mtdList.value.push(
      {
        minrecharge: item.minrecharge,
        maxrecharge: item.maxrecharge,
        paymethod: item.paymethod,
        payname: item.payname,
        label: t(`api_${item.payname}`),
        value: item.paymenttype
      }
    );
  })
  emit('haveBankList', usdtRecharge.value.length > 0)
  // console.log('======', usdtRecharge.value)
};

const openModal = () => {
  showModal.value = !showModal.value;
  // getShopInfo();
}
const onClose = () => {
  showModal.value = false
}
const onCloseSm = () => {
  showSmModal.value = !showSmModal.value
}
const onCloseSec = () => {
  showSecModal.value = !showSecModal.value
}

// 去充值
const goToDeposit = () => {
  if (!curDepositWay.value.payname) {
    return Message.error(t('method_error'));
  }
  onClose();
  showSecModal.value = true;
}
// 选择充值方式
const chooseWay = (data: any) => {
  form.value.method = data.paymenttype
  // curDepositWay.value = data
}

const onSubmit = () => {
  // 如果是银行卡方式，需要选择银行
  if (legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('bankcard') > -1 && !form.value.bank) {
    return Message.error(t('paymentManagement_page_chBank'))
  }
  // 获取到当前支付方式的最低最高充值金额
  const curObj = mtdList.value.find((item: any) => item.value === form.value.method)
  console.log('&&&&&', curObj)
  if (form.value.amount < curObj.minrecharge) {
    return Message.error(t('deposit_page_minAmount', { minAmount: curObj.minrecharge }))
  }
  if (form.value.amount > curObj.maxrecharge) {
    return Message.error(t('deposit_page_maxAmount', { maxAmount: curObj.maxrecharge }))
  }
  loading.value = true;
  handleSubmit()
}

// 充值提交
const handleSubmit = () => {
  const req = NetPacket.req_recharge_from_third();
  req.amount = form.value.amount;
  req.channel_type = form.value.method; // 接口返回的 paymenttype 值乘以100
  req.bank_channel_type = legalRecharge.value.find((item: any) => item.paymenttype === form.value.method)?.payname.indexOf('bankcard') > -1 ? form.value.bank : 0; // 只有选择银行的时候才有，usdt 是 0
  req.type = form.value.bankMethod; // 只有选择银行的时候才有，银行支付方式
  req.got_discount = form.value.discount;
  console.log('=======充值提交参数', req)
  Net.instance.sendRequest(req);
};
const handleDepositSubmit = (res: any) => {
  console.log('---', res)
  loading.value = false;
  if (res.code === -1) {
    Message.error(t(res.msg)); // 如 recharge_channel_type_is_not_supported
  } else { // code 0 成功
    Message.success(t('deposit_page_depSuccess'))
    form.value.amount = ''; // 重置
    Local.remove('curDiscountData'); // 重置
    if (res.url.indexOf('http') > -1 || res.url.indexOf('https') > -1 ) {
      setTimeout(() => {
        window.open(res.url);
      }, 1000)
    }

  }
}
// 选择快捷金额
const chooseFastMon = (e: any) => {
  form.value.amount = e.toString()
}
// 更换银行弹窗
const showChangeBank = () => {
  openChooseBank();
}

// 选择银行
const selectBank = (e: any) => {
  form.value.bank = e.value;
  chooseBank.value = e;
}

// 切换充值方式
watch(
  () => form.value.method,
  (n) => {
    curDepositWay.value = mtdList.value.find((item: any) => item.value === n)
  }
)
// 切换优惠
watch(
  () => form.value.discount,
  (n) => {
    curDiscount.value = discountList.value.find((item: any) => item.discount_ID === n)
    console.log('-----', n, curDiscount.value)
  }
)


onMounted(() => {
  setTimeout(() => {
    getShopInfo();
  }, 600)
  // 获取银行信息
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, handleShopInfoRes);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, handleDepositSubmit);
})
onUnmounted(() => {
  Local.remove('curDiscountData'); // 重置
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_recharge_from_third, null);
})

defineExpose({
  openModal
});

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

  }
}

.deposit_sm_modal {

  .body {
    .sm-txt {
      font-size: 24px;
      width: 375px;
      height: 250px;
      margin: 0 auto;
      background: #17a1fb;
    }

    .bank-list-item {
      width: 100%;

      a {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .body-sec {
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

    .btn_zone {
      margin: 10px auto;
    }

    .cz-tips {
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
  }

}
</style>
@/netBase/NetMsgType@/netBase/NetPacket
