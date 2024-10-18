<template>
<!--  <depositFirst ref="depositFirModal" @haveBankList="haveBankList" />-->
<!--  <Withdraw v-if="showWithdraw" :myBankList="myBankList" />-->
<!--  <RedeemCode v-if="showRedeemCode" />-->

  <!--  提款校验-->
<!--  <Calibration v-if="withdrawMoneyShow" ref="calibrationRef" :myBankList="myBankList" />-->

  <!-- 提款 -->
<!--  <WithdrawMoney v-if="withdrawMoneyShow" ref="withdrawMoneyRef" :myBankList="myBankList" />-->

  <!-- 导航 -->
  <navTab :title="t('钱包')" :showIcon="true"
          :refreshObj="{isRefreshFlag: refreshFlag, isEyeOpen: eyeOpen}"
          @refreshWallet="refreshWallet"
          @moneyShow="moneyShow"
  />
  <n-spin :show="loading">
    <n-flex vertical class="venue_wallet">
      <n-flex vertical class="game_wallet bg_color">
        <n-flex justify="space-between" align="center" class="game_wallet_top">
          <div class="top_left">
            <div class="top_mon_box">
              <div class="title"> {{ t('携带钱包') }} </div>
              <n-flex align="center" class="top_mon_box_l">
                <span class="icon"></span>
<!--                <span class="m-txt"> {{ verifyNumberComma(String(gameMoney)) }} </span>-->
                <span class="m-txt"> {{ totalMoneyTxt }} </span>
              </n-flex>
            </div>
          </div>
          <div class="top_center">
            <n-flex :class="`zz_btn button ${tranType === 'in' ? 'button_color' : ''}`" justify="center"
                    @click="changeTranType('in')"> <span class="icon icon-1"></span> <span> {{ t('walletInfo_page_in') }}
              </span> </n-flex>
            <n-flex :class="`zz_btn button ${tranType === 'out' ? 'button_color' : ''}`" justify="center"
              @click="changeTranType('out')"> <span class="icon"></span> <span> {{ t('walletInfo_page_out') }} </span>
            </n-flex>
          </div>
          <div class="top_right">
            <div class="top_mon_box">
              <div class="title"> {{ t('walletInfo_page_venue') }} </div>
              <n-flex align="center" class="top_mon_box_l">
                <span class="icon icon_bxg"></span>
                <span class="m-txt"> {{ verifyNumberComma(String(bankMoney)) }} </span>
              </n-flex>
              <n-flex class="top_mon_box_r">

              </n-flex>
            </div>
          </div>
        </n-flex>

        <!-- 金额区域 -->
        <div class="money-all-div">
          <n-flex justify="space-between" class="money_input">
            <n-input @blur="inputBlur" @input="countMonRate" v-model:value="tranMoney"
                     :placeholder="t('walletInfo_page_tranferTxt')" >
              <template #suffix>
                <a @click="tranMoney = ''" class="refresh_icon"></a>
              </template>
            </n-input>

            <n-flex class="kjje_div">
              <a :class="`kj_item ${tranMoney === item.value ? 'active' : ''}`" v-for="(item, index) in chooseMoneyArr"
                 @click="chooseFastMon(item.value)" :key="index">
                {{ item.label }}
              </a>
            </n-flex>
            <a class="btn_ch button_color" @click="allTranferMon"> {{ t('promo_page_all') }} </a>
          </n-flex>
          <div class="slider-div">
            <n-slider :default-value="0" v-model:value="slideValue" :step="1" :tooltip="false"
              :on-dragend="formatTooltip">
              <template #thumb>
                <n-icon-wrapper class="n-slider-handle">
                  {{ slideStr }}
                </n-icon-wrapper>
              </template>
            </n-slider>
          </div>

          <n-flex class="bot-tips">
            <span class="icon-tip"></span>
            {{ t('walletInfo_page_tranferTips') }}
          </n-flex>
          <a class="sub_btn button_color" @click="handleSubmit"> {{ t('home_page_confirm') }} </a>
        </div>

        <!--<n-flex justify="space-between" align="end">
                    <n-flex>
                        <div class="game">
                            <span class="size2 gray">{{ t('walletInfo_page_game') }}</span>
                            <span class="size2">{{ gameMoney }}</span>
                        </div>

                    </n-flex>
                    <div class="middleBtn" @click="getAllMoney"><span>{{ t('walletInfo_page_recovery') }}</span></div>
                </n-flex>
                <n-grid :x-gap="20" :y-gap="20" :cols="3" class="wallet_tabs">
                    <n-grid-item v-for="(v, k) in EWallets" :key="k">
                        <div class="item">
                            <span class="size0">{{ t(v) }}</span>
                            <span class="size2 item_mount">{{ gameMoney }}</span>
                            <div class="item_buttons">
                                <div class="button" @click="showTransferModal('in', `${k}`)">
                                    <span class="size2">{{ t('walletInfo_page_in') }}</span>
                                </div>
                                <div class="button" @click="showTransferModal('out', `${k}`)">
                                    <span class="size2">{{ t('walletInfo_page_out') }}</span>
                                </div>
                            </div>
                        </div>
                    </n-grid-item>
                </n-grid>
              -->
      </n-flex>
    </n-flex>
  </n-spin>
</template>

<script setup lang='ts'>
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import useWalletInfo from './useWalletInfo';
// import Withdraw from '@/views/wallet/components/Withdraw.vue';
// import depositFirst from '@/views/wallet/deposit/depositFirst.vue';
// import RedeemCode from '@/views/wallet/components/RedeemCode.vue';
// import Calibration from '@/views/wallet/withdrawFunds/calibration.vue';
// import WithdrawMoney from '@/views/wallet/withdrawFunds/withdrawMoney.vue';

import navTab from '../components/navTab.vue';
// import { Message } from "@/utils/discreteApi.ts";
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import pinia from '@/store';
import { Page } from '@/store/page';
import { verifyNumberComma } from '@/utils/others.ts';

// const formatter = (value: any) => {
//   setTimeout(() => {
//     tranMoney.value = value ? Number(value.toString().replace(/\D/g, '')) : ''
//   }, 0)
// };
const { t } = useI18n();
const route = useRoute();
// const levelRule = defineAsyncComponent(() => import('@/views/level/rules.vue'));
// const levelModal = ref();
const depositFirModal = ref();
// const haveBank = ref(false);


// 打开充值第一个弹窗
// const openDepositFir = () => {
//   if (!haveBank.value) {
//     return Message.error(t('deposit_page_notPayWay'))
//   }
//   depositFirModal.value.openModal();
// }
// const haveBankList = (e: any) => {
//   haveBank.value = e
// }

// const withdrawMoneyShow = ref(false)

// const goCalibration = () => {
//   withdrawMoneyShow.value = true
//   nextTick(() => {
//     goToWithdraw()
//   })
// }

const getBankList = () => {
  const req = NetPacket.req_bank_name_list();
  Net.instance.sendRequest(req);
};

const handleBankList = async (res: any) => {
  await Page(pinia).setBankListInfo(res.bank_name_list, res.status_list)
};

onMounted(() => {
  getBankList();
  // 打开充值页面
  if (route.query.openDialogType === 'deposit') {
    setTimeout(() => {
      depositFirModal.value.openModal();
    }, 500)
  }
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, handleBankList);
})
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, null);
});


const {
  loading,
  // themeVars,
  // currencyUnit,
  // currencyList,
  // gameMoney,
  bankMoney,
  // totalMoney,
  // handleCurrencyChange,
  // showDepositModal,
  // showRedeemCodeModal,
  // showTransferModal,
  // showDeposit,
  // showWithdraw,
  // showRedeemCode,
  // showTransfer,
  // roleInfo,
  // userInfo,
  // VIPinfo,
  // updateAuto,
  refreshWallet,
  // target,
  refreshFlag,
  // getAllMoney,
  // goToWithdraw,
  // myBankList,
  eyeOpen,
  totalMoneyTxt,
  moneyShow,
  tranType,
  changeTranType,
  tranMoney,
  chooseMoneyArr,
  allTranferMon,
  formatTooltip,
  handleSubmit,
  slideStr,
  slideValue,
  chooseFastMon,
  // calibrationRef,
  // withdrawMoneyRef,
  countMonRate,
  inputBlur,
} = useWalletInfo()


</script>

<style src="./style.less" lang='less' scoped></style>
